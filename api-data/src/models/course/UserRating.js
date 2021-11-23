import Sequelize from 'sequelize';

import db from '../../config/database';

import Course from './Course';
import User from '../user/User';

const UserRating = db.define('UserRating', {
  id: {
    autoIncrement: true,
    primaryKey: true,
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
  tableName: 'CapacitacaoUsuarioClassificacao',
});

UserRating.belongsTo(Course, {
  as: 'course',
  foreignKey: {
    field: 'idCapacitacao',
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
