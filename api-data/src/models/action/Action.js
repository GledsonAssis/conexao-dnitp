import Sequelize from 'sequelize';
import User from '../user/User';

import db from '../../config/database';

const Action = db.define('Action', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idUser: {
    field: 'idUsuarioLog',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.INTEGER,
  },
  date: {
    defaultValue: Sequelize.NOW,
    field: 'data',
    type: Sequelize.DATE,
  },
  description: {
    field: 'descricao',
    type: Sequelize.STRING(),
  },
  endDate: {
    field: 'dataExclusao',
    type: Sequelize.DATE,
  },
  excludedDate: {
    field: 'dataExclusao',
    type: Sequelize.DATE,
  },
  isCover: {
    field: 'capa',
    type: Sequelize.BOOLEAN,
  },
  isHighlight: {
    field: 'destaque',
    type: Sequelize.BOOLEAN,
  },
  isPublished: {
    field: 'publicado',
    type: Sequelize.BOOLEAN,
  },
  summary: {
    field: 'descricaoResumida',
    type: Sequelize.STRING(200),
  },
  title: {
    field: 'titulo',
    type: Sequelize.STRING(100),
  },
  modifyDate: {
    field: 'dataAlteracao',
    type: Sequelize.DATE,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'Acao',
});

Action.belongsTo(User, {
  as: 'author',
  foreignKey: {
    field: 'idUsuarioLog',
  },
  targetKey: 'id',
});

export default Action;
