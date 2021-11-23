import Sequelize from 'sequelize';

import db from '../../config/database';
import User from '../user/User';

const Project = db.define('Project', {
  id: {
    autoIncrement: true,
    primaryKey: true,
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
  date: {
    field: 'data',
    type: Sequelize.DATE,
  },
  description: {
    field: 'descricao',
    type: Sequelize.STRING(),
  },
  endDate: {
    field: 'dataFim',
    type: Sequelize.DATE,
  },
  excludedDate: {
    field: 'dataExclusao',
    type: Sequelize.DATE,
  },
  isCover: {
    field: 'capa',
    type: Sequelize.BOOLEAN,
  },
  isHighlight: {
    field: 'destaque',
    type: Sequelize.BOOLEAN,
  },
  isPublished: {
    field: 'publicado',
    type: Sequelize.BOOLEAN,
  },
  summary: {
    field: 'descricaoResumida',
    type: Sequelize.STRING(200),
  },
  title: {
    field: 'titulo',
    type: Sequelize.STRING(100),
  },
  modifyDate: {
    field: 'dataAlteracao',
    type: Sequelize.DATE,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'Projeto',
});

Project.belongsTo(User, {
  as: 'author',
  foreignKey: {
    field: 'idUsuario',
  },
  targetKey: 'id',
});

export default Project;
