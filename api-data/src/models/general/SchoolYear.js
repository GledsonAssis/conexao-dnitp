import Sequelize from 'sequelize';

import db from '../../config/database';

import ActivitySubTheme from './SubTheme';

const SchoolYear = db.define('SchoolYear', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idSubTheme: {
    field: 'idSubTemaAtividade',
    references: {
      key: 'id',
      model: ActivitySubTheme,
    },
    type: Sequelize.INTEGER,
  },
  color: {
    field: 'corHexa',
    type: Sequelize.CHAR(6),
  },
  ordinal: {
    allowNull: false,
    field: 'numeroOrdinal',
    type: Sequelize.TINYINT,
  },
  startYear: {
    allowNull: false,
    field: 'anoInicial',
    type: Sequelize.BOOLEAN,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AnoEscolar',
});

SchoolYear.belongsTo(ActivitySubTheme, {
  as: 'subTheme',
  foreignKey: {
    field: 'idSubTemaAtividade',
  },
  targetKey: 'id',
});

export default SchoolYear;
