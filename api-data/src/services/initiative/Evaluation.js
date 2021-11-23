import sequelize from 'sequelize';
import HttpStatus from 'http-status-codes';
import db from '../../config/database';
import Evaluation from '../../models/initiative/Evaluation';
import EvaluationHistory from '../../models/initiative/History';
import Initiative from '../../models/initiative/Initiative';
import SendMail from '../sendmail';
import User from '../../models/user/User';

import {
  avaliacaoParaPublicacao,
  arquivado,
} from '../../constants/InitiativeStatus';

const saveEvaluation = ({
  idInitiative,
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

  await Evaluation.create({
    idInitiative,
    idEvaluator,
    comment,
    accepted,
    rejected: !accepted,
  },
  {
    transaction,
  });

  await db.query(`UPDATE dnit.Iniciativa SET idStatus = ${(accepted ? avaliacaoParaPublicacao : arquivado)} WHERE id = ${idInitiative}`,
    {
      transaction,
      type: sequelize.QueryTypes.UPDATE,
    });

  await EvaluationHistory.create({
    idInitiative,
    text: `${accepted
      ? 'Avaliador gestor encaminhou a iniciativa para o avaliador publicador'
      : 'Avaliador gestor arquivou a iniciativa'}`,
    alert: false,
  },
  {
    transaction,
  });

  if (!accepted) {
    const message = {
      destinatarios: [initiative.author.email],
      assunto: `Avaliação da iniciativa: '${initiative.title}'`,
      name: initiative.author.name,
      title: initiative.title,
      template: 'archivedInitiative',
    };

    SendMail.sendMail(message);
  }
  return ({
    code: HttpStatus.OK,
    message: 'Iniciativa avaliada com sucesso',
    messagetoken: 'Initiative.Evaluate.Success',
  });
})
  .catch((error) => {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return ({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Iniciativa já possui avaliação',
        messagetoken: 'Initiative.AlreadyEvaluated',
      });
    }
    throw error;
  });


export default {
  saveEvaluation,
};
