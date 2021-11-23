import Sequelize from 'sequelize';

import db from '../../config/database';

import Initiative from './Initiative';
import Mime from '../general/Mime';

const Audio = db.define('Audio', {
  idInitiative: {
    field: 'idIniciativa',
    primaryKey: true,
    references: {
      key: 'id',
      model: Initiative,
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
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'IniciativaAudio',
});

Initiative.hasOne(Audio, {
  as: 'audio',
  foreignKey: {
    field: 'idIniciativa',
  },
  targetKey: 'id',
});

Audio.belongsTo(Mime, {
  as: 'mime',
  foreignKey: {
    field: 'idMime',
  },
  targetKey: 'id',
});

export default Audio;
