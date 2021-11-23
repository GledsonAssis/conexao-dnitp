import Sequelize from 'sequelize';

import db from '../../config/database';

import Mime from '../general/Mime';
import ProjectAction from './ProjectAction';

const Attachment = db.define('Attachment', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idMime: {
    references: {
      key: 'id',
      model: Mime,
    },
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
  file: {
    field: 'arquivo',
    type: Sequelize.BLOB,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(255),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'ProjetoAcaoAnexo',
});

ProjectAction.hasMany(Attachment, {
  as: 'attachments',
  foreignKey: {
    field: 'idProjetoAcao',
  },
  sourceKey: 'id',
});

Attachment.belongsTo(ProjectAction, {
  as: 'attachments',
  foreignKey: {
    field: 'idProjetoAcao',
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
