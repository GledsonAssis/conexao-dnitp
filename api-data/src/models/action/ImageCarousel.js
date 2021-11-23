import Sequelize from 'sequelize';

import db from '../../config/database';

import Action from './Action';
import Mime from '../general/Mime';

const ImageCarousel = db.define('ImageCarousel', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  default: {
    defaultValue: false,
    field: 'principal',
    type: Sequelize.BOOLEAN,
  },
  file: {
    field: 'arquivo',
    type: Sequelize.BLOB,
  },
  idMime: {
    field: 'idMime',
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
  tableName: 'AcaoImagemCarrossel',
});

Action.hasMany(ImageCarousel, {
  as: 'images',
  foreignKey: {
    field: 'idAcao',
  },
  sourceKey: 'id',
});

ImageCarousel.belongsTo(Action, {
  as: 'images',
  foreignKey: {
    field: 'idAcao',
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
