import Sequelize from 'sequelize';

import db from '../../config/database';

import Mime from '../general/Mime';
import Project from './Project';

const Attachment = db.define('Attachment', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  file: {
    field: 'arquivo',
    type: Sequelize.BLOB,
  },
  idMime: {
    references: {
      key: 'id',
      model: Mime,
    },
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
  name: {
    field: 'nome',
    type: Sequelize.STRING(255),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'ProjetoAnexo',
});

Project.hasMany(Attachment, {
  as: 'attachments',
  foreignKey: {
    field: 'idProjeto',
  },
  sourceKey: 'id',
});

Attachment.belongsTo(Project, {
  as: 'attachments',
  foreignKey: {
    field: 'idProjeto',
  },
  targetKey: 'id',
});

Attachment.belongsTo(Mime, {
  as: 'mime',
  foreignKey: {
    field: 'idMime',
  },
  targetKey: 'id',
});

export default Attachment;
