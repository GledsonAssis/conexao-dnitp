import Sequelize from 'sequelize';

import db from '../../config/database';
import EducationalInstitution from './EducationalInstitution';

const InstitutionPhone = db.define('InstitutionPhone', {
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
  DDD: {
    field: 'codigoDiscagemDiretaDistancia',
    type: Sequelize.STRING(2),
  },
  number: {
    field: 'numero',
    type: Sequelize.STRING(9),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'InstituicaoEnsinoTelefone',
});

EducationalInstitution.hasMany(InstitutionPhone, {
  as: 'phones',
  foreignKey: {
    field: 'idInstituicaoEnsino',
  },
  targetKey: 'id',
});

export default InstitutionPhone;
