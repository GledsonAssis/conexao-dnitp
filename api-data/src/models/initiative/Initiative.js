import Sequelize from 'sequelize';

import db from '../../config/database';

import InitiativeStatus from './Status';
import InitiativeStageStatus from './StageStatus';
import User from '../user/User';

const Initiative = db.define('Initiative', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idStatus: {
    defaultValue: 1,
    field: 'idStatus',
    references: {
      key: 'id',
      model: InitiativeStatus,
    },
    type: Sequelize.TINYINT,
  },
  idInitiativeStageStatus: {
    defaultValue: 1,
    field: 'idIniciativaTramiteStatus',
    references: {
      key: 'id',
      model: InitiativeStageStatus,
    },
    type: Sequelize.TINYINT,
  },
  idUser: {
    field: 'idUsuarioAutor',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.TINYINT,
  },
  comment: {
    field: 'comentario',
    type: Sequelize.STRING(255),
  },
  date: {
    defaultValue: Sequelize.NOW,
    field: 'date',
    type: Sequelize.DATEONLY,
  },
  description: {
    field: 'descricao',
    type: Sequelize.STRING(5000),
  },
  title: {
    field: 'titulo',
    type: Sequelize.STRING(255),
  }
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'Iniciativa',
});

Initiative.belongsTo(InitiativeStatus, {
  as: 'status',
  foreignKey: {
    field: 'idStatus',
  },
  targetKey: 'id',
});

Initiative.belongsTo(InitiativeStageStatus, {
  as: 'stage',
  foreignKey: {
    field: 'idIniciativaTramiteStatus',
  },
  targetKey: 'id',
});

Initiative.belongsTo(User, {
  as: 'author',
  foreignKey: {
    field: 'idUsuarioAutor',
  },
  targetKey: 'id',
});

export default Initiative;
