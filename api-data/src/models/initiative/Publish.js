import Sequelize from 'sequelize';

import db from '../../config/database';

import Initiative from './Initiative';
import Evaluation from './Evaluation';

import User from '../user/User';

const Publish = db.define('Publish', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idInitiativeEvaluation: {
    defaultValue: 1,
    field: 'idIniciativaTramiteAvaliacao',
    references: {
      key: 'id',
      model: Initiative,
    },
    type: Sequelize.TINYINT,
  },
  idEvaluator: {
    field: 'idUsuarioPublicador',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.TINYINT,
  },
  comment: {
    field: 'justificativa',
    type: Sequelize.STRING(3000),
  },
  rejected: {
    field: 'rejeitada',
    type: Sequelize.BOOLEAN,
  },
  accepted: {
    field: 'aceita',
    type: Sequelize.BOOLEAN,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'IniciativaTramitePublicacao',
});

Publish.belongsTo(Evaluation, {
  as: 'initiative',
  foreignKey: {
    field: 'idIniciativaTramiteAvaliacao',
  },
  targetKey: 'id',
});

Publish.belongsTo(User, {
  as: 'evaluator',
  foreignKey: {
    field: 'idUsuarioPublicador',
  },
  targetKey: 'id',
});

export default Publish;
