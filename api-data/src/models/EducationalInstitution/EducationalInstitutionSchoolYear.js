import Sequelize from 'sequelize';

import db from '../../config/database';
import EducationalInstitution from './EducationalInstitution';
import SchoolYear from '../general/SchoolYear';

const EducationalInstitutionSchoolYear = db.define('EducationalInstitutionSchoolYear', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.SMALLINT,
  },
  idEducationalInstitution: {
    field: 'idInstituicaoEnsino',
    references: {
      key: 'id',
      model: EducationalInstitution,
    },
    type: Sequelize.TINYINT,
  },
  idSchoolYear: {
    field: 'idAnoEscolar',
    references: {
      key: 'id',
      model: SchoolYear,
    },
    type: Sequelize.TINYINT,
  },
  amountStudents: {
    field: 'quatidadeAlunos',
    type: Sequelize.INTEGER,
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'InstituicaoEnsinoAnoEscolar',
});

EducationalInstitution.hasMany(EducationalInstitutionSchoolYear, {
  as: 'studentsPerCycle',
  foreignKey: {
    field: 'idInstituicaoEnsino',
  },
  targetKey: 'id',
});

SchoolYear.hasMany(EducationalInstitutionSchoolYear, {
    as: 'FK_AnoEscolar',
    foreignKey: {
        field: 'idAnoEscolar',
    },
    targetKey: 'id',
});

export default EducationalInstitutionSchoolYear;
