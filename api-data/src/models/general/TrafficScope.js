import Sequelize from 'sequelize';

import db from '../../config/database';

import Activity from '../activity/Activity';
import TrafficContent from './TrafficContent';

const ActivityTrafficScope = db.define('ActivityTrafficScope', {
  idActivity: {
    field: 'idAtividade',
    references: {
      key: 'id',
      model: Activity,
    },
    type: Sequelize.INTEGER,
  },
  idTrafficScope: {
    field: 'idTransitoCompetencia',
    references: {
      key: 'id',
      model: TrafficScope,
    },
    type: Sequelize.INTEGER,
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeTransitoCompetencia',
});

const TrafficScope = db.define('TrafficScope', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  idTrafficContent: {
    field: 'idTransitoConteudo',
    references: {
      key: 'id',
      model: TrafficContent,
    },
    type: Sequelize.INTEGER,
  },
  description: {
    field: 'texto',
    type: Sequelize.STRING(255),
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'TransitoCompetencia',
});

TrafficContent.hasMany(TrafficScope, {
  as: 'trafficScope',
  foreignKey: {
    field: 'idTransitoConteudo',
  },
  sourceKey: 'id',
});

TrafficScope.belongsTo(TrafficContent, {
  as: 'trafficContent',
  foreignKey: {
    field: 'idTransitoConteudo',
  },
  targetKey: 'id',
});

Activity.belongsToMany(TrafficScope, {
  through: ActivityTrafficScope,
  as: 'trafficScope',
  foreignKey: 'idAtividade',
  onDelete: 'CASCADE',
});

TrafficScope.belongsToMany(Activity, {
  through: ActivityTrafficScope,
  as: 'activities',
  foreignKey: 'idTransitoCompetencia',
  onDelete: 'CASCADE',
});

export {
  ActivityTrafficScope,
};

export default TrafficScope;
