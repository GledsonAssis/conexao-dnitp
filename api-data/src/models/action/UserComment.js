import Sequelize from 'sequelize';

import db from '../../config/database';

import Action from './Action';
import User from '../user/User';

const UserComment = db.define('UserComment', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  comment: {
    field: 'comentario',
    type: Sequelize.STRING(500),
  },
  dateTime: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'dataHora',
    type: Sequelize.DATE,
  },
  excludedDate: {
    field: 'dataExclusao',
    type: Sequelize.DATE,
  },
  idAction: {
    field: 'idAcao',
    references: {
      key: 'id',
      model: Action,
    },
    type: Sequelize.INTEGER,
  },

  idParent: {
    field: 'idComentarioPai',
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
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AcaoUsuarioComentario',
});

UserComment.belongsTo(User, {
  as: 'author',
  foreignKey: {
    field: 'idUsuario',
  },
  targetKey: 'id',
});

UserComment.hasMany(UserComment, {
  as: 'replies',
  foreignKey: {
    field: 'idComentarioPai',
  },
});

export default UserComment;
