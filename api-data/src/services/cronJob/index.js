import cron from 'node-cron';
import { QueryTypes } from 'sequelize';
import moment from 'moment';
import db from '../../config/database';
import Activity from '../../models/activity/Activity';
import Message from '../../models/message/Message';
import UserEvaluation from '../../models/survey/UserEvaluation';
import User from '../../models/user/User';
import SendMail from '../sendmail';

/*
                          # ┌────────────── second (optional)
                          # │ ┌──────────── minute
                          # │ │ ┌────────── hour
                          # │ │ │ ┌──────── day of month
                          # │ │ │ │ ┌────── month
                          # │ │ │ │ │ ┌──── day of week
                          # │ │ │ │ │ │
                          # │ │ │ │ │ │
                          # * * * * * *
*/
// 'Usuário enviou a iniciativa'
// 'Alerta de prazo para o avaliador gestor'
//  'Avaliador gestor encaminhou a iniciativa para o avaliador publicador'
//  'Alerta de prazo para o avaliador publicador'
//  'Avaliador publicador aceitou a iniciativa e encaminhou para processo de publicação'
export const sendMails = () => {
  console.log(`rodando job cron a cada hora ${new Date()}`, process.env.EVALUATION_MESSAGE_TYPE, process.env.PORTAL__URL);

  UserEvaluation.findAll({
    include: [
      {
        as: 'user',
        attributes: ['name', 'email'],
        model: User,
        required: true,
      },
      {
        as: 'activity',
        attributes: ['title'],
        model: Activity,
        required: true,
      },
    ],
    where: {
      resgitered: {
        $lte: moment(new Date()).subtract('2', 'hours'),
      },
      evaluated: null,
      notified: null,
    },
  })
    .then(data => data.map((result) => {
      if (result) {
        let query = 'update dnit.AtividadeUsuarioAvaliacao set dataNotificacao = getdate() where id = :idAvaliacao';
        db.query(query,
          {
            replacements: {
              idAvaliacao: result.id,
            },
            type: QueryTypes.UPDATE,
          });

        const email = {
          destinatarios: [result.user.email],
          assunto: `Conexão DNIT - Avaliação da Atividade '${result.activity.title}'`,
          name: result.user.name,
          title: result.activity.title,
          template: 'missingEvaluation',
          url: `${process.env.PORTAL__URL}/#/atividades/${result.idActivity}/avaliacoes`,
        };

        SendMail.sendMail(email);

        return Message.create(
          {
            idMessageType: process.env.EVALUATION_MESSAGE_TYPE,
            idUserFrom: 2,
            idUserRecipient: result.idUser,
            subject: 'Avaliação da Atividade',
          },
          { returning: [] },
        )
          .then(lista => lista.toJSON())
          .then((lista) => {
            query = 'insert into dnit.Mensagemresposta (idMensagem,idUsuario,dataHora,lido,texto) values (:idMensagem, :idUsuario, :dataHora,0,:texto)';
            db.query(query,
              {
                replacements: {
                  idMensagem: lista.id,
                  idUsuario: lista.idUserFrom,
                  dataHora: new Date(),
                  texto: `Oi, você possui uma atividade a ser avaliada, clique <a href="${process.env.PORTAL__URL}/#/atividades/${result.idActivity}/avaliacoes">aqui</a> e participe !`,
                },
                type: QueryTypes.SELECT,
              });
          });
      }
      return false;
    }));
};

export default cron.schedule(' 0 * * * *', sendMails);