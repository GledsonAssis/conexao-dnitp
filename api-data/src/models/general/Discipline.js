import Sequelize from 'sequelize';

import db from '../../config/database';

import FieldKnowledge from './FieldKnowledge';
import SchoolYear from './SchoolYear';

const Discipline = db.define('Discipline', {
  id: {
    field: 'id',
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  color: {
    field: 'corHexa',
    type: Sequelize.STRING(255),
  },
  icon: {
    field: 'icone',
    type: Sequelize.BLOB,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(255),
  },
  idKnoledgeArea: {
    field: 'idAreaConhecimento',
    references: {
      key: 'id',
      model: FieldKnowledge,
    },
    type: Sequelize.INTEGER,
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'DisciplinaEscolar',
});

Discipline.belongsTo(FieldKnowledge, {
  as: 'knowledgeArea',
  foreignKey: {
    field: 'idAreaConhecimento',
  },
  model: FieldKnowledge,
  sourceKey: 'id',
});

SchoolYear.belongsToMany(Discipline, {
  as: 'disciplines',
  foreignKey: 'idAnoEscolar',
  through: 'AnoEscolarDisciplinaEscolar',
});

Discipline.belongsToMany(SchoolYear, {
  as: 'schoolYears',
  foreignKey: 'idDisciplinaEscolar',
  through: 'AnoEscolarDisciplinaEscolar',
});

export default Discipline;
