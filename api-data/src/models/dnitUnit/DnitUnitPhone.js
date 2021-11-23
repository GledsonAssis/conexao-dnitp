import Sequelize from 'sequelize';

import db from '../../config/database';

const DnitUnitPhone = db.define('DnitUnitPhone', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.SMALLINT,
  },
  idDnitUnit: {
    field: 'idUnidadeDnit',
    type: Sequelize.TINYINT,
    required: false,
  },
  DDD: {
    field: 'codigoDiscagemDiretaDistancia',
    type: Sequelize.STRING(2),
  },
  number: {
    field: 'numero',
    type: Sequelize.NUMERIC,
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'UnidadeDnitTelefone',
});

export default DnitUnitPhone;
