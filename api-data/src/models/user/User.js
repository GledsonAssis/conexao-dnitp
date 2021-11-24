import Sequelize, { DataTypes } from 'sequelize';
import moment from 'moment';

import db from '../../config/database';

import City from '../general/City';
import { anonimo } from '../../constants/Role';
import SchoolBonds from './SchoolBonds';
import Roles from './Roles';
import Terms from '../general/Terms';
import DnitUnit from '../dnitUnit/DnitUnit';
import Address from '../general/Address';
import UserInstituition from './UserInstituition';
import EducationalInstitution from '../EducationalInstitution/EducationalInstitution';

const User = db.define('User', {
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
  idCity: {
    field: 'idMunicipio',
    references: {
      key: 'id',
      model: City,
    },
    type: Sequelize.SMALLINT,
  },
  idDnitUnit: {
    field: 'idUnidadeDnit',
    references: {
      key: 'id',
      model: DnitUnit,
    },
    type: Sequelize.SMALLINT,
  },
  idSchoolBonds: {
    field: 'idVinculoEscolar',
    references: {
      key: 'id',
      model: SchoolBonds,
    },
    type: Sequelize.TINYINT,
  },
  idIdentityServer: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  idRole: {
    allowNull: false,
    defaultValue: anonimo,
    field: 'idPerfil',
    references: {
      key: 'id',
      model: Roles,
    },
    type: Sequelize.TINYINT,
  },
  idUserTerms: {
    field: 'idTermoUso',
    references: {
      key: 'id',
      model: Terms,
    },
    type: Sequelize.TINYINT
  },
  birthDate: {
    field: 'dataNascimento',
    type: DataTypes.DATEONLY,
    get() {
      const bDate = this.getDataValue('birthDate');
      return bDate ? moment.utc(bDate).format('YYYY-MM-DD') : bDate;
    },
  },
  cpf: {
    field: 'cpf',
    type: Sequelize.CHAR(14),
  },
  email: {
    field: 'email',
    type: Sequelize.STRING(320),
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(100),
  },
  active: {
    field: 'ativo',
    type: Sequelize.BOOLEAN,
  },
  primeiroAcessoGovbr: {
    field: 'primeiroAcessoGovbr',
    type: Sequelize.BOOLEAN,
  },
  registerDate: {
    field: 'dataCadastro',
    type: Sequelize.DATE,
  },
  lastAccessDate: {
    field: 'dataUltimoAcesso',
    type: Sequelize.DATE,
  },
}, {
  freezeTableName: true,
  schema: 'seguranca',
  tableName: 'Usuario',
});

User.belongsTo(Address, {
  as: 'address',
  foreignKey: {
    field: 'idEndereco',
  },
  targetKey: 'id',
});

User.belongsTo(City, {
  foreignKey: {
    field: 'idMunicipio',
  },
  targetKey: 'id',
  as: 'city',
});

User.belongsTo(DnitUnit, {
  as: 'DnitUnit',
  foreignKey: {
    field: 'idUnidadeDnit',
  },
  targetKey: 'id',
});

User.belongsTo(SchoolBonds, {
  as: 'schoolBonds',
  foreignKey: {
    field: 'idVinculoEscolar',
  },
  targetKey: 'id',
});

User.belongsTo(Roles, {
  as: 'role',
  foreignKey: {
    field: 'idPerfil',
  },
  targetKey: 'id',
});


EducationalInstitution.belongsToMany(User, {
  as: 'users',
  foreignKey: 'idInstituicaoEnsino',
  through: UserInstituition,
});

User.belongsToMany(EducationalInstitution, {
  as: 'instituitions',
  foreignKey: 'idUsuario',
  through: UserInstituition,
});

export default User;
