import Sequelize from 'sequelize';

import db from '../../config/database';
import Message from './Message';
import Mime from '../general/Mime';

const Attachment = db.define('Attachment', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.SMALLINT,
  },
  idMessage: {
    field: 'idMensagem',
    references: {
      key: 'id',
      model: Message,
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
  tableName: 'MensagemAnexo',
});

Attachment.belongsTo(Message, {
    as: 'attachment',
    foreignKey: {
        field: 'idMensagem',
    },
    targetKey: 'id',
});

Message.hasMany(Attachment, {
    as: 'messageAttachments',
    foreignKey: {
        field: 'idMensagem',
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