import Sequelize from 'sequelize';

import db from '../../config/database';

import ProjectAction from './ProjectAction';
import User from '../user/User';

const UserRating = db.define('UserRating', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idProjectAction: {
    field: 'idProjetoAcao',
    references: {
      key: 'id',
      model: ProjectAction,
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
  tableName: 'ProjetoAcaoUsuarioClassificacao',
});

UserRating.belongsTo(ProjectAction, {
  as: 'projectAction',
  foreignKey: {
    field: 'idProjetoAcao',
  },
  targetKey: 'id',
});

UserRating.belongsTo(User, {
  as: 'author',
  foreignKey: {
    field: 'idUsuario',
  },
  targetKey: 'id',
});

export default UserRating;
