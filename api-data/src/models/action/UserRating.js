import Sequelize from 'sequelize';

import db from '../../config/database';

import Action from './Action';
import User from '../user/User';

const UserRating = db.define('UserRating', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idAction: {
    field: 'idAcao',
    references: {
      key: 'id',
      model: Action,
    },
    type: Sequelize.INTEGER,
  },
  idUser: {
    field: 'idUsuario',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.INTEGER,
  },
  rating: {
    field: 'classificacao',
    type: Sequelize.TINYINT,
  },
  dateTime: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'dataHora',
    type: Sequelize.DATE,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AcaoUsuarioClassificacao',
});

UserRating.belongsTo(Action, {
  foreignKey: {
    field: 'idAcao',
  },
  targetKey: 'id',
  as: 'action',
});

UserRating.belongsTo(User, {
  as: 'author',
  foreignKey: {
    field: 'idUsuario',
  },
  targetKey: 'id',
});

export default UserRating;
