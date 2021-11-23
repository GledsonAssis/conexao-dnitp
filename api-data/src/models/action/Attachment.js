import Sequelize from 'sequelize';

import db from '../../config/database';

import Mime from '../general/Mime';
import Action from './Action';

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
  idAction: {
    field: 'idAcao',
    references: {
      key: 'id',
      model: Action,
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
  tableName: 'AcaoAnexo',
});

Action.hasMany(Attachment, {
  as: 'attachments',
  foreignKey: {
    field: 'idAcao',
  },
  sourceKey: 'id',
});

Attachment.belongsTo(Action, {
  as: 'attachments',
  foreignKey: {
    field: 'idAcao',
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
