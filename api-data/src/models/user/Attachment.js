import Sequelize from 'sequelize';

import db from '../../config/database';

import Mime from '../general/Mime';

import AttachmentType from './AttachmentType';
import User from './User';

const Attachment = db.define('Attachment', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idUser: {
    allowNull: false,
    field: 'idUsuario',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.SMALLINT,
  },
  idMime: {
    allowNull: false,
    field: 'idMime',
    references: {
      key: 'id',
      model: Mime,
    },
    type: Sequelize.INTEGER,
  },
  idAttachmentType: {
    allowNull: false,
    field: 'idUsuarioAnexoTipo',
    references: {
      key: 'id',
      model: AttachmentType,
    },
    type: Sequelize.TINYINT,
  },
  guid: {
    field: 'rowguid',
    type: Sequelize.STRING,
  },
  name: {
    field: 'nome',
    type: Sequelize.CHAR(50),
  },
  file: {
    field: 'arquivo',
    type: Sequelize.BLOB,
  },
}, {
  freezeTableName: true,
  schema: 'seguranca',
  tableName: 'UsuarioAnexo',
});

Attachment.belongsTo(User, {
  as: 'attachment',
  foreignKey: {
    field: 'idUsuario',
  },
  targetKey: 'id',
});

User.hasMany(Attachment, {
  as: 'attachment',
  foreignKey: {
    field: 'idUsuario',
  },
  targetKey: 'id',
});

Attachment.belongsTo(AttachmentType, {
  as: 'attachmentType',
  foreignKey: {
    field: 'idUsuarioAnexoTipo',
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
