import Sequelize from 'sequelize';
import db from '../../config/database';

const DnitUnitRoads = db.define('DnitUnitRoads', {
  idRoad: {
    field: 'idRodovia',
    primaryKey: true,
    required: true,
    type: Sequelize.TINYINT,
  },
  idDnitUnit: {
    field: 'idUnidadeDnit',
    primaryKey: true,
    required: true,
    type: Sequelize.TINYINT,
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'UnidadeDnitRodovia',
});

export default DnitUnitRoads;
