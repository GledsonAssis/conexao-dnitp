import Sequelize from 'sequelize';

import db from '../../config/database';

import SchoolYear from './SchoolYear';

const TrafficConcept = db.define('TrafficConcept', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  description: {
    field: 'texto',
    type: Sequelize.STRING(255),
  },
  idSchoolYear: {
    field: 'idAnoEscolar',
    references: {
      key: 'id',
      model: SchoolYear,
    },
    type: Sequelize.INTEGER,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'TransitoConceito',
});

TrafficConcept.belongsTo(SchoolYear, {
  as: 'schoolYear',
  foreignKey: {
    field: 'idAnoEscolar',
  },
  targetKey: 'id',
});


export default TrafficConcept;
