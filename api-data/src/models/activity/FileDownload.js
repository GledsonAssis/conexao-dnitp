import Sequelize from 'sequelize';

import db from '../../config/database';
import Attachment from './Attachment';
import User from '../user/User';

const FileDownload = db.define('FileDownload', {
  idActivityAttachment: {
    field: 'idAtividadeArquivo',
    primaryKey: true,
    references: {
      key: 'id',
      model: Attachment,
    },
    type: Sequelize.INTEGER,
  },
  idUser: {
    field: 'idUsuario',
    primaryKey: true,
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.TINYINT,
  },
  downloadDate: {
    field: 'dataHoraDownload',
    type: Sequelize.DATE,
    default: new Date(),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeArquivoUsuario',
});


FileDownload.belongsTo(User, {
  foreignKey: {
    field: 'idUsuario',
  },
  targetKey: 'id',
});

// User.hasMany(FileDownload, {
//   as: 'downloads',
//   foreignKey: {
//     field: 'id',
//   },
//   targetKey: 'id',
// });


Attachment.hasMany(FileDownload, {
  as: 'downloads',
  foreignKey: {
    field: 'idAtividadeArquivo',
  },
  sourceKey: 'id',
});

FileDownload.belongsTo(Attachment, {
  as: 'attachments',
  foreignKey: {
    field: 'idAtividadeArquivo',
  },
  targetKey: 'id',
});
export default FileDownload;
