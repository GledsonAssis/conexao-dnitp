import Sequelize from 'sequelize';

import db from '../../config/database';

import ProjectAction from './ProjectAction';
import Mime from '../general/Mime';

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
  idProjectAction: {
    field: 'idProjetoAcao',
    references: {
      key: 'id',
      model: ProjectAction,
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
  tableName: 'ProjetoAcaoImagemCarrossel',
});

ProjectAction.hasMany(ImageCarousel, {
  as: 'images',
  foreignKey: {
    field: 'idProjetoAcao',
  },
  sourceKey: 'id',
});

ImageCarousel.belongsTo(ProjectAction, {
  as: 'images',
  foreignKey: {
    field: 'idProjetoAcao',
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
