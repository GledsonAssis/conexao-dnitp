import Sequelize from 'sequelize';

import db from '../../config/database';

import Address from '../general/Address';
import DnitUnit from '../dnitUnit/DnitUnit';
import TeachingNetwork from '../general/TeachingNetwork';
import City from '../general/City';

const EducationalInstitution = db.define('EducationalInstitution', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idAddress: {
    field: 'idEndereco',
    references: {
      key: 'id',
      model: Address,
    },
    type: Sequelize.TINYINT,
  },
  idDnit: {
    field: 'idUnidadeDnit',
    references: {
      key: 'id',
      model: DnitUnit,
    },
    type: Sequelize.TINYINT,
  },
  idDnitUnitCity: {
    field: 'idMunicipioUnidadeDnit',
    references: {
      key: 'id',
      model: DnitUnit,
    },
    type: Sequelize.TINYINT,
  },
  idInep: {
    field: 'codigoInep',
    type: Sequelize.INTEGER,
  },
  idTeachingNetwork: {
    field: 'idRedeEnsino',
    references: {
      key: 'id',
      model: TeachingNetwork,
    },
    type: Sequelize.TINYINT,
  },
  name: {
    field: 'identificacao',
    type: Sequelize.STRING(100),
  },
  joinProgram: {
    field: 'participaConexaoDnit',
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isDF: {
    field: 'distritoFederal',
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  latitude: {
    field: 'latitudeGeoreferenciamento',
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  longitude: {
    field: 'longitudeGeoreferenciamento',
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  quantidadeAlunos: {
    field: 'quantidadeAlunos',
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  quantidadeProfessores: {
    field: 'quantidadeProfessores',
    type: Sequelize.INTEGER,
    allowNull: true,
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'InstituicaoEnsino',
});

EducationalInstitution.belongsTo(Address, {
  as: 'address',
  foreignKey: {
    field: 'idEndereco',
  },
  targetKey: 'id',
});

EducationalInstitution.belongsTo(DnitUnit, {
  as: 'dnitUnit',
  foreignKey: {
    field: 'idUnidadeDnit',
  },
  targetKey: 'id',
});

EducationalInstitution.belongsTo(City, {
  as: 'dnitUnitCity',
  foreignKey: {
    field: 'idMunicipioUnidadeDnit',
  },
  targetKey: 'id',
});

export default EducationalInstitution;
