import Sequelize from 'sequelize';

import db from '../../config/database';

import Project from '../project/Project';
import User from '../user/User';

const UserComment = db.define('UserComment', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idParent: {
    field: 'idComentarioPai',
    type: Sequelize.INTEGER,
  },
  idProject: {
    field: 'idProjetoAcao',
    references: {
      key: 'id',
      model: Project,
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
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'ProjetoAcaoUsuarioComentario',
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
