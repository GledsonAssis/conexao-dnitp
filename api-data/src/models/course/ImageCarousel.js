import Sequelize from 'sequelize';

import db from '../../config/database';

import Mime from '../general/Mime';
import Course from './Course';

const ImageCarousel = db.define('ImageCarousel', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  default: {
    field: 'principal',
    type: Sequelize.BOOLEAN,
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
  tableName: 'CapacitacaoImagemCarrossel',
});

Course.hasMany(ImageCarousel, {
  as: 'images',
  foreignKey: {
    field: 'idCapacitacao',
  },
  sourceKey: 'id',
});

ImageCarousel.belongsTo(Course, {
  as: 'images',
  foreignKey: {
    field: 'idCapacitacao',
  },
  targetKey: 'id',
});

ImageCarousel.belongsTo(Mime, {
  as: 'mime',
  foreignKey: {
    field: 'idMime',
  },
  targetKey: 'id',
});

export default ImageCarousel;
