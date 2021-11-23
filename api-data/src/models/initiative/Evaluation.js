import Sequelize from 'sequelize';

import db from '../../config/database';

import Initiative from './Initiative';
import User from '../user/User';

const Evaluation = db.define('Evaluation', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idInitiative: {
    defaultValue: 1,
    field: 'idIniciativa',
    references: {
      key: 'id',
      model: Initiative,
    },
    type: Sequelize.TINYINT,
  },
  idEvaluator: {
    field: 'idUsuarioAvaliador',
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
  tableName: 'IniciativaTramiteAvaliacao',
});

Evaluation.belongsTo(Initiative, {
  as: 'initiative',
  foreignKey: {
    field: 'idIniciativa',
  },
  targetKey: 'id',
});

Initiative.hasOne(Evaluation, {
  as: 'evaluation',
  foreignKey: {
    field: 'idIniciativa',
  },
  targetKey: 'id',
});

Evaluation.belongsTo(User, {
  as: 'evaluator',
  foreignKey: {
    field: 'idUsuarioAvaliador',
  },
  targetKey: 'id',
});

export default Evaluation;
