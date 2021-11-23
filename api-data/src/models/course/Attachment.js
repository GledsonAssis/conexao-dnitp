import Sequelize from 'sequelize';

import db from '../../config/database';

import Mime from '../general/Mime';
import Course from './Course';

const Attachment = db.define('Attachment', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
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
  idCourse: {
    field: 'idCapacitacao',
    references: {
      key: 'id',
      model: Course,
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
  tableName: 'CapacitacaoAnexo',
});

Course.hasMany(Attachment, {
  as: 'attachments',
  foreignKey: {
    field: 'idCapacitacao',
  },
  sourceKey: 'id',
});

Attachment.belongsTo(Course, {
  as: 'attachments',
  foreignKey: {
    field: 'idCapacitacao',
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
