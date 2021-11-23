import Sequelize from 'sequelize';

import db from '../../config/database';

import Project from './Project';
import User from '../user/User';

const UserRating = db.define('UserRating', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idProject: {
    field: 'idProjeto',
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
  tableName: 'ProjetoUsuarioClassificacao',
});

UserRating.belongsTo(Project, {
  as: 'project',
  foreignKey: {
    field: 'idProjeto',
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
