import Sequelize from 'sequelize';

import db from '../../config/database';

const Terms = db.define('Terms', {
  id: {
    autoIncrement: true,
    type: Sequelize.SMALLINT,
    primaryKey: true,
  },
  active: {
    defaultValue: false,
    field: 'ativo',
    type: Sequelize.TINYINT,
  },
  endDate: {
    field: 'dataFimVigencia',
    type: Sequelize.DATE,
  },
  text: {
    field: 'texto',
    type: Sequelize.STRING(8000),
  },
  startDate: {
    field: 'dataInicioVigencia',
    type: Sequelize.DATE,
  },
}, {
  freezeTableName: true,
  schema: 'sistema',
  tableName: 'TermoUso',
});

export default Terms;
