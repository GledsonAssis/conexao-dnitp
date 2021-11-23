import Sequelize from 'sequelize';

import db from '../../config/database';

import Activity from './Activity';
import FileType from '../general/FileType';
import Mime from '../general/Mime';

const Attachment = db.define('Attachment', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idActivity: {
    field: 'idAtividade',
    references: {
      key: 'id',
      model: Activity,
    },
    type: Sequelize.INTEGER,
  },
  idFileType: {
    field: 'idTipoArquivo',
    references: {
      key: 'id',
      model: FileType,
    },
    required: true,
    type: Sequelize.INTEGER,
  },
  idMime: {
    references: {
      key: 'id',
      model: Mime,
    },
    type: Sequelize.INTEGER,
  },
  file: {
    field: 'arquivo',
    type: Sequelize.BLOB,
  },
  guid: {
    field: 'rowGuid',
    type: Sequelize.STRING(),
  },
  name: {
    field: 'nomefisico',
    type: Sequelize.STRING(255),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeArquivo',
});

Activity.hasMany(Attachment, {
  as: 'attachments',
  foreignKey: {
    field: 'idAtividade',
  },
  sourceKey: 'id',
});

Attachment.belongsTo(Activity, {
  foreignKey: {
    field: 'idActivity',
  },
  sourceKey: 'id',
});

Attachment.belongsTo(Mime, {
  as: 'mime',
  foreignKey: {
    field: 'idMime',
  },
  targetKey: 'id',
});

Attachment.belongsTo(FileType, {
  as: 'fileType',
  foreignKey: {
    field: 'idTipoArquivo',
  },
  targetKey: 'id',
});

export default Attachment;
