import sequelize from 'sequelize';
import HttpStatus from 'http-status-codes';
import db from '../../config/database';
import Publish from '../../models/initiative/Publish';
import SendMail from '../sendmail';
import Initiative from '../../models/initiative/Initiative';
import EvaluationHistory from '../../models/initiative/History';
import User from '../../models/user/User';

import {
  aguardandoPublicacao,
  arquivado,
} from '../../constants/InitiativeStatus';

const accept = ({
  idInitiativeEvaluation,
  comment,
}, {
  id: idEvaluator,
}) => Publish.create({
  accepted: true,
  idEvaluator,
  idInitiativeEvaluation,
  rejected: false,
  rejectedComment: comment,
});

const reject = ({
  idInitiativeEvaluation,
  comment,
}, {
  id: idEvaluator,
}) => Publish.create({
  accepted: false,
  idEvaluator,
  idInitiativeEvaluation,
  rejected: true,
  rejectedComment: comment,
});

const save = ({
  idInitiative,
  idInitiativeEvaluation,
  comment,
  accepted = false,
}, {
  id: idEvaluator,
}) => db.transaction(async (transaction) => {
  const initiative = await Initiative.findOne({
    include: [{
      as: 'author',
      attributes: ['id', 'name', 'email'],
      model: User,
    }],
    transaction,
    where: {
      id: idInitiative,
    },
  });

  if (initiative.dataValues.idStatus > 3) {
    return ({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message_token: 'already_published',
      message: 'A Iniciativa ja possui avaliação para publicação',
    });
  }

  await db.query(`insert into [dnit].[IniciativaTramitePublicacao]
  (idIniciativaTramiteAvaliacao,idUsuarioPublicador,rejeitada,aceita,justificativa) VALUES (${idInitiativeEvaluation},${idEvaluator},${accepted ? 0 : 1},${accepted ? 1 : 0},'${comment}')`,
  {
    transaction,
    type: sequelize.QueryTypes.UPDATE,
  });

  await db.query(`UPDATE dnit.Iniciativa SET idStatus = ${(accepted ? aguardandoPublicacao : arquivado)} WHERE id = ${idInitiative}`,
    {
      transaction,
      type: sequelize.QueryTypes.UPDATE,
    });

  await EvaluationHistory.create({
    idInitiative,
    text: `${accepted
      ? 'Avaliador publicador aceitou a iniciativa e encaminhou para processo de publicação'
      : 'Avaliador gestor arquivou a iniciativa'}`,
    alert: false,
  },
  {
    transaction,
  });

  const message = {
    destinatarios: [initiative.author.email],
    assunto: `Avaliação da iniciativa: '${initiative.title}'`,
    name: initiative.author.name,
    title: initiative.title,
    template: accepted ? 'approvedInitiative' : 'archivedInitiative',
  };

  SendMail.sendMail(message);

  return ({
    code: HttpStatus.OK,
    message: 'Iniciativa avaliada com sucesso',
    messagetoken: 'Initiative.Evaluate.Success',
  });
});

export default {
  accept,
  reject,
  save,
};
