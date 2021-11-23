import Sequelize from 'sequelize';

import db from '../../config/database';

import Mime from '../general/Mime';
import Project from './Project';

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
  tableName: 'ProjetoImagemCarrossel',
});

Project.hasMany(ImageCarousel, {
  as: 'images',
  foreignKey: {
    field: 'idProjeto',
  },
  sourceKey: 'id',
});

ImageCarousel.belongsTo(Project, {
  as: 'images',
  foreignKey: {
    field: 'idProjeto',
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
