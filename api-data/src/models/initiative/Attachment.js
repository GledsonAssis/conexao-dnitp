import Sequelize from 'sequelize';

import db from '../../config/database';

import Initiative from './Initiative';
import Mime from '../general/Mime';

const Attachment = db.define('Attachment', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.SMALLINT,
  },
  idInitiative: {
    field: 'idIniciativa',
    references: {
      key: 'id',
      model: Initiative,
    },
    type: Sequelize.TINYINT,
  },
  idMime: {
    field: 'idMime',
    references: {
      key: 'id',
      model: Mime,
    },
    type: Sequelize.TINYINT,
  },
  guid: {
    field: 'rowguid',
    type: Sequelize.STRING,
  },
  file: {
    field: 'arquivo',
    type: Sequelize.BLOB,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(100),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'IniciativaAnexo',
});

Attachment.belongsTo(Initiative, {
  as: 'attachment',
  foreignKey: {
    field: 'idIniciativa',
  },
  targetKey: 'id',
});

Initiative.hasMany(Attachment, {
  as: 'attachments',
  foreignKey: {
    field: 'idIniciativa',
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
