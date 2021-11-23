import Sequelize from 'sequelize';
import db from '../../config/database';
import Initiative from './Initiative';
import Evaluation from './Evaluation';

const History = db.define('History', {
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
  text: {
    field: 'texto',
    type: Sequelize.STRING(100),
  },
  date: {
    defaultValue: Sequelize.NOW,
    field: 'dataHora',
    type: Sequelize.DATE,
  },
  alert: {
    field: 'alerta',
    type: Sequelize.BOOLEAN,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'IniciativaTramiteHistorico',
});

History.belongsTo(Evaluation, {
  as: 'evaluations',
  foreignKey: {
    field: 'idIniciativa',
  },
  targetKey: 'id',
});

Evaluation.hasMany(History, {
  as: 'evaluation',
  foreignKey: {
    field: 'idIniciativa',
  },
  targetKey: 'id',
});

History.belongsTo(Initiative, {
  as: 'initiative',
  foreignKey: {
    field: 'idIniciativa',
  },
  targetKey: 'id',
});

Initiative.hasMany(History, {
  as: 'evaluation_history',
  foreignKey: {
    field: 'idIniciativa',
  },
  targetKey: 'id',
});

export default History;
