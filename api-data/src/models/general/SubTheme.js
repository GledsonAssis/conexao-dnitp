import Sequelize from 'sequelize';

import db from '../../config/database';

import Theme from './Theme';

const SubTheme = db.define('SubTheme', {
  id: {
    field: 'id',
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(255),
  },
  idActivityTheme: {
    field: 'idTemaAtividade',
    references: {
      key: 'id',
      model: Theme,
    },
    type: Sequelize.INTEGER,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeSubTema',
});

SubTheme.belongsTo(Theme, {
  as: 'theme',
  foreignKey: {
    field: 'idTemaAtividade',
  },
  targetKey: 'id',
});

Theme.hasMany(SubTheme, {
  as: 'subtheme',
  foreignKey: {
    field: 'idTemaAtividade',
  },
  targetKey: 'id',
});

export default SubTheme;
