import Sequelize from 'sequelize';

import db from '../../config/database';
import State from '../general/State';

const Road = db.define('Road', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.SMALLINT,
  },
  name: {
    field: 'nomenclatura',
    type: Sequelize.STRING(50),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'Rodovia',
});

Road.belongsToMany(State, {
  as: 'states',
  foreignKey: 'idRodovia',
  through: 'RodoviaUnidadeFederativa',
});

State.belongsToMany(Road, {
  as: 'roads',
  foreignKey: 'idunidadeFederativa',
  through: 'RodoviaUnidadeFederativa',
});

export default Road;
