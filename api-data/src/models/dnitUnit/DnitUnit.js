import Sequelize from 'sequelize';

import db from '../../config/database';


import State from '../general/State';
import Address from '../general/Address';
import Road from '../Road/Road';
import City from '../general/City';
import DnitUnitPhone from './DnitUnitPhone';
import DnitUnitRoads from './DnitUnitRoads';

const DnitUnit = db.define('DnitUnit', {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  idAddress: {
    field: 'idEndereco',
    references: {
      key: 'id',
      model: Address,
    },
    type: Sequelize.TINYINT,
  },
  idUFSuperintendence: {
    field: 'idUnidadeFederativaSuperintendencia',
    references: {
      key: 'id',
      model: State,
    },
    type: Sequelize.TINYINT,
  },
  idRegionalSuperintendence: {
    field: 'idSuperintendenciaRegional',
    type: Sequelize.TINYINT,
    required: false,
  },
  email: {
    field: 'email',
    type: Sequelize.STRING(320),
  },
  identification: {
    field: 'identificacao',
    type: Sequelize.STRING(50),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'UnidadeDnit',
});

DnitUnit.belongsTo(DnitUnit, {
  as: 'RegionalSuperintendence',
  foreignKey: {
    field: 'idSuperintendenciaRegional',
  },
  targetKey: 'id',
});

DnitUnit.belongsTo(Address, {
  as: 'address',
  foreignKey: {
    field: 'idEndereco',
  },
  targetKey: 'id',
});

DnitUnit.belongsTo(State, {
  as: 'UF',
  foreignKey: {
    field: 'idUnidadeFederativaSuperintendencia',
  },
  targetKey: 'id',
});

DnitUnit.belongsToMany(Road, {
  as: 'roads',
  foreignKey: 'idUnidadeDnit',
  through: DnitUnitRoads,
});

Road.belongsToMany(DnitUnit, {
  as: 'dnitUnit',
  foreignKey: 'idRodovia',
  through: DnitUnitRoads,
});

DnitUnit.belongsToMany(City, {
  as: 'cities',
  foreignKey: 'idUnidadeDnit',
  through: 'UnidadeDnitMunicipio',
});

City.belongsToMany(DnitUnit, {
  as: 'dnitUnit',
  foreignKey: 'idMunicipio',
  through: 'UnidadeDnitMunicipio',
});

DnitUnit.hasMany(DnitUnitPhone, {
  as: 'phones',
  foreignKey: {
    field: 'idUnidadeDnit',
  },
  targetKey: 'id',
});

export default DnitUnit;
