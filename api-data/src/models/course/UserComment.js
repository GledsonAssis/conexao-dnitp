import Sequelize from 'sequelize';

import db from '../../config/database';

import Course from './Course';
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
  idParent: {
    field: 'idComentarioPai',
    type: Sequelize.INTEGER,
  },
  idCourse: {
    field: 'idCapacitacao',
    references: {
      key: 'id',
      model: Course,
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
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'CapacitacaoUsuarioComentario',
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
