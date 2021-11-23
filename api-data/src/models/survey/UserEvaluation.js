import Sequelize from 'sequelize';

import db from '../../config/database';
import Activity from '../activity/Activity';
import Survey from './Survey';
import User from '../user/User';

const UserEvaluation = db.define('UserEvaluation', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
    type: Sequelize.INTEGER,
  },
  idActivity: {
    field: 'idAtividade',
    references: {
      key: 'id',
      model: Activity,
    },
    type: Sequelize.INTEGER,
  },
  idActivityEvaluation: {
    field: 'idAtividadeAvaliacao',
    references: {
      key: 'id',
      model: Survey,
    },
    type: Sequelize.INTEGER,
  },
  idUser: {
    field: 'idUsuario',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.TINYINT,
  },
  status: {
    field: 'idAvaliacaoStatus',
    type: Sequelize.TINYINT,
    default: 1,
  },
  resgitered: {
    field: 'dataRegistro',
    type: Sequelize.DATE,
    default: new Date(),
  },
  evaluated: {
    field: 'dataAvaliacao',
    type: Sequelize.DATE,
  },
  notified: {
    field: 'dataNotificacao',
    type: Sequelize.DATE,
  },
  answer: {
    field: 'resposta',
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeUsuarioAvaliacao',
});

Activity.hasOne(UserEvaluation, {
  as: 'userEvaluation',
  foreignKey: {
    field: 'idAtividade',
  },
});

UserEvaluation.belongsTo(User, {
  as: 'user',
  foreignKey: {
    field: 'idUsuario',
  },
});

UserEvaluation.belongsTo(Activity, {
  as: 'activity',
  foreignKey: {
    field: 'idAtividade',
  },
});

export default UserEvaluation;
