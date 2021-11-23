import Sequelize from 'sequelize';

import db from '../../config/database';

const DnitUnitCities = db.define('DnitUnitCities', {
  idCity: {
    field: 'idMunicipio',
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
  tableName: 'UnidadeDnitMunicipio',
});

export default DnitUnitCities;
