import sequelize, { Op, QueryTypes, literal } from 'sequelize';

import moment from 'moment';

import DnitUnitService from '../dnitUnit/DnitUnit';

import Attachment from '../../models/user/Attachment';
import AttachmentType from '../../models/user/AttachmentType';
import City from '../../models/general/City';
import Phone from '../../models/user/Phone';
import Roles from '../../models/user/Roles';
import SchoolBonds from '../../models/user/SchoolBonds';
import State from '../../models/general/State';
import User from '../../models/user/User';

import db from '../../config/database';
import DnitUnit from '../../models/dnitUnit/DnitUnit';
import Address from '../../models/general/Address';
import EducationalInstitution from '../../models/EducationalInstitution/EducationalInstitution';
import UserInstituition from '../../models/user/UserInstituition';

import userPermissionsWhereClause from '../../utils/validators/userPermissionsWhereClause';

const create = ({
  idCity,
  idRole,
  cpf,
  email,
  name,
  phones = [],
}) => db.transaction(async (transaction) => {
  const newUser = await User.create(
    {
      idCity,
      idRole,
      cpf,
      email,
      name,
      registerDate: new Date(),
    },
    {
      transaction,
    },
  );

  for (const phone of phones) {
    await Phone.create(
      {
        idUser: newUser.id,
        ...phone,
      },
      {
        transaction,
      },
    )
  }
});

const findList = (search = '') => User.findAll({
  where: {
    [Op.or]: [
      {
        id: {
          [Op.like]: `%${search}%`,
        },
      },
      {
        cpf: {
          [Op.like]: `${search}`,
        },
      },
      {
        email: {
          [Op.like]: `%${search}%`,
        },
      },
      {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
    ],
  },
});

const activateUser = async (payload) => {
  const {
    id,
    situation,
  } = payload;

  const result = await db.query('update seguranca.Usuario set ativo = :situation where id = :id',
    {
      replacements: {
        situation,
        id,
      },
      type: QueryTypes.UPDATE,
    });

  return result;
};

const findById = id => User.findByPk(id, {
  attributes: [
    'id',
    'idCity',
    'idRole',
    'idDnitUnit',
    'active',
    'birthDate',
    'cpf',
    'email',
    'name',
    'primeiroAcessoGovbr'
  ],
  include: [
    {
      as: 'city',
      attributes: ['id', 'name'],
      include: [
        {
          as: 'state',
          attributes: ['id', 'name'],
          model: State,
        },
      ],
      model: City,
    },
    {
      as: 'schoolBonds',
      attributes: ['id', 'name'],
      model: SchoolBonds,
    },
    {
      as: 'role',
      attributes: ['id', 'name'],
      model: Roles,
    },
    {
      as: 'phones',
      attributes: ['id', 'idPhoneType', 'DDD', 'number'],
      model: Phone,
    },
    {
      as: 'attachment',
      attributes: ['id'],
      include: [
        {
          as: 'attachmentType',
          attributes: ['id', 'name'],
          model: AttachmentType,
        },
      ],
      model: Attachment,
    },
    {
      as: 'DnitUnit',
      attributes: ['id', 'identification', 'idUFSuperintendence'],
      include: [
        {
          as: 'RegionalSuperintendence',
          attributes: ['id', 'idUFSuperintendence', 'identification'],
          model: DnitUnit,
        },
      ],
      model: DnitUnit,
      required: false,
    },
    {
      as: 'instituitions',
      attributes: ['id', 'name'],
      model: EducationalInstitution,
      required: false,
      through: { attributes: [] },
    },
  ],
});

const findByUuid = idIdentityServer => User.findOne({
  attributes: [
    'id',
    'idCity',
    'idIdentityServer',
    'idDnitUnit',
    'idSchoolBonds',
    'active',
    'email',
    'name',
    'primeiroAcessoGovbr'
  ],
  include: [
    {
      as: 'role',
      attributes: ['id', 'name'],
      model: Roles,
    },
  ],
  where: {
    idIdentityServer,
  },
}).then(user => user.get({ plain: true }));

const findByProfile = idRole => User.findAll({
  attributes: ['id', 'email', 'name'],
  include: [
    {
      as: 'role',
      attributes: ['id', 'name'],
      model: Roles,
    },
  ],
  where: {
    idRole,
  },
});

const findExistsByCPF = cpf => User.findOne({
  attributes: [
    'id',
    'idCity',
    'idIdentityServer',
    'idDnitUnit',
    'idSchoolBonds',
    'active',
    'roleId',
    'email',
    'name',
    'primeiroAcessoGovbr'
  ],
  include: [
    {
      as: 'role',
      attributes: ['id', 'name'],
      model: Roles,
    },
    {
      as: 'phones',
      attributes: ['DDD', 'number'],
      model: Phone,
      required: false,
    },
  ],
  where: {
    cpf,
  },
}).then(result => result);

const findByCpf = cpf => User.findOne({
  attributes: [
    'id',
    'idCity',
    'idIdentityServer',
    'idDnitUnit',
    'idSchoolBonds',
    'active',
    'email',
    'name',
    'primeiroAcessoGovbr'
  ],
  include: [
    {
      as: 'role',
      attributes: ['id', 'name'],
      model: Roles,
    },
  ],
  where: {
    cpf,
  },
}).then(user => user ? user.get({ plain: true }) : null);

const findExistsByEmail = email => User.findOne({
  attributes: ['id', 'name'],
  where: {
    email,
  },
}).then(result => result !== null);

const signUp = payload => ({ id: idIdentityServer }) => db
  .transaction(async (transaction) => {
    const {
      idCity,
      idDnitUnit,
      idRole,
      idUserTerms,
      address,
      birthDate,
      cpf,
      email,
      instituitions = [],
      name,
      phones = [],
      idSchoolBonds,
    } = payload;

    let newAddress = null;

    if (address) {
      const {
        cep,
        city: { id: idCityAddres },
        street,
      } = address;

      newAddress = await Address.create(
        {
          cep,
          idCity: idCityAddres,
          street,
        },
        {
          transaction,
        },
      );
    }

    const user = await User.findOrCreate(
      {
        defaults: {
          idAddress: newAddress ? newAddress.id : null,
          idCity,
          idDnitUnit,
          idIdentityServer,
          idRole,
          idSchoolBonds,
          idUserTerms,
          birthDate,
          cpf,
          name,
          registerDate: new Date(),
        },
        where: {
          email,
        },
        transaction,
        fields: [
          'idAddress',
          'idCity',
          'idDnitUnit',
          'idIdentityServer',
          'idRole',
          'idSchoolBonds',
          'idUserTerms',
          'birthDate',
          'cpf',
          'email',
          'name',
          'registerDate',
        ],
      },
    )
      .then(result => result[0].dataValues);

    await Phone.bulkCreate(phones.map(phone => ({
      idUser: user.id,
      ...phone,
    })),
      {
        transaction,
      });

    await UserInstituition.bulkCreate(instituitions.map(idInstituition => ({
      idUser: user.id,
      idInstituition,
    })),
      {
        transaction,
      });

    return user;
  });

const update = payload => db.transaction(async (transaction) => {
  const {
    id: idUser,
    idCity,
    idDnitUnit,
    idRole,
    idState,
    idSchoolBonds,
    birthDate,
    email,
    instituitions = [],
    name,
    phones = [],
  } = payload;
  await Phone.destroy({
    transaction,
    where: {
      idUser,
    },
  });
  await Promise.all(
    phones.map(({ id, ...rest }) => Phone.create(
      {
        idUser,
        ...rest,
      },
      {
        transaction,
      },
    )),
  );

  await UserInstituition.destroy({
    transaction,
    where: {
      idUser,
    },
  });

  await UserInstituition.bulkCreate(instituitions.map(idInstituition => ({
    idUser,
    idInstituition,
  })),
    {
      transaction,
    });

  return User.update(
    {
      idCity,
      idDnitUnit,
      idRole,
      idSchoolBonds,
      idState,
      primeiroAcessoGovbr: true,
      birthDate: birthDate ? moment.parseZone(`${moment(birthDate).format('YYYY-MM-DD')}T00:00:00-03:00`) : null,
      email,
      name,
    },
    {
      transaction,
      where: {
        id: idUser,
      },
    },
  );
});

const searchUsers = async ({
  idDnitUnit,
  keyword = '',
  limit = 0,
  offset = 0,
  order: sort,
  roleId,
  currentUser,
}) => {
  let searchKeyword = null;
  const whereClause = {};

  if (keyword && keyword.length > 0) {
    if (!whereClause.$and) whereClause.$and = [];

    if ((keyword.indexOf('Ativo') > -1) || (keyword.indexOf('Inativo') > -1)) {
      whereClause.$and.push({ active: (keyword.indexOf('Ativo') > -1) });
    }

    searchKeyword = keyword
      .replace('Ativo', '')
      .replace('Inativo', '')
      .trim()
      .split(' ');

    if (searchKeyword.join('').length > 0) {
      searchKeyword.map((key) => {
        whereClause.$and.push({
          $or: [
            literal(`[User].[id] LIKE '%${key}%'`),
            literal(`[User].[cpf] LIKE '%${key}%'`),
            literal(`[User].[email] LIKE '%${key}%'`),
            literal(`[User].[nome] LIKE '%${key}%'`),
            literal(`[city].nome LIKE '%${key}%'`),
            literal(`[city->state].nome LIKE '%${key}%'`),
            literal(`role.nome LIKE '%${key}%'`),
            literal(`[schoolBonds].nome LIKE '%${key}%'`),
            literal(`DnitUnit.identificacao LIKE '%${key}%'`),
          ],
        });
        return key;
      });
    }
  }

  if (currentUser) {
    const dnitUnit = await DnitUnitService.findById(currentUser.idDnitUnit);
    const where = userPermissionsWhereClause(currentUser, dnitUnit);
    if (where) {
      if (!whereClause.$and) whereClause.$and = [];
      whereClause.$and.push(where);
    }
  }

  if (roleId && roleId > 0) {
    if (!whereClause.$and) whereClause.$and = [];
    whereClause.$and.push({ roleId });
  }

  if (idDnitUnit) {
    if (!whereClause.$and) whereClause.$and = [];
    whereClause.$and.push({
      $or: [
        { idDnitUnit },
        literal(`[DnitUnit->RegionalSuperintendence].[id] = ${idDnitUnit}`),
      ],
    });
  }

  const order = [];
  const fields = (sort || '').split(',');

  if (fields[1] === '0') order.push(['name', 'asc']);
  else {
    switch (fields[0]) {
      case 'CPF':
        if (fields[1] !== '0') order.push(['cpf', fields[1]]);
        break;
      case 'Name':
        if (fields[1] !== '0') order.push(['name', fields[1]]);
        break;
      case 'Email':
        if (fields[1] !== '0') order.push(['email', fields[1]]);
        break;
      case 'Profile':
        if (fields[1] !== '0') { order.push([sequelize.literal('[role].[nome]'), fields[1]]); }
        break;
      case 'City':
        if (fields[1] !== '0') order.push([sequelize.literal('[city].[nome]'), fields[1]]);
        break;
      case 'State':
        if (fields[1] !== '0') order.push([sequelize.literal('[city->state].[nome]'), fields[1]]);
        break;
      case 'RegisterDate':
        if (fields[1] !== '0') order.push([sequelize.literal('[registerDate]'), fields[1]]);
        break;
      case 'Situation':
        if (fields[1] !== '0') {
          order.push([
            sequelize.literal('[ativo]'),
            fields[1],
          ]);
        }
        break;
      default:
        order.push(['name', 'asc']);
        break;
    }
  }

  return User.findAll({
    attributes: [
      'id',
      'addressId',
      'cpf',
      'email',
      'name',
      'DnitUnitId',
      'schoolBondsId',
      'roleId',
      'ativo',
      ['ativo', 'usuarioAtivo'],
      'registerDate',
      'dataUltimoAcesso',
      'primeiroAcessoGovbr'
    ],
    include: [
      {
        as: 'city',
        attributes: ['id', 'name'],
        include: [
          {
            as: 'state',
            attributes: ['id', 'name'],
            model: State,
          },
        ],
        model: City,
      },
      {
        as: 'DnitUnit',
        attributes: ['id', 'identification'],
        include: [
          {
            as: 'RegionalSuperintendence',
            attributes: ['id', 'identification'],
            model: DnitUnit,
            required: false,
          },
        ],
        model: DnitUnit,
        required: false,
      },
      {
        as: 'role',
        attributes: ['id', 'name'],
        model: Roles,
        required: false,
      },
      {
        as: 'schoolBonds',
        attributes: ['id', 'name'],
        model: SchoolBonds,
        required: false,
      },
      {
        as: 'phones',
        attributes: ['DDD', 'number'],
        model: Phone,
        required: false,
      },
      {
        as: 'instituitions',
        attributes: ['id', 'name'],
        model: EducationalInstitution,
        required: false,
        through: { attributes: [] },
      },
    ],
    order,
    where: whereClause,
  }).then(resultSet => ({
    count: resultSet.length,
    rows: resultSet.slice(
      offset,
      limit > 0 ? offset + limit : resultSet.length,
    ),
  }));
};

const findCPFAndEmail = ({ cpf, email }) => User.findAll({
  attributes: ['cpf', 'email'],
  where: {
    $or: [{ cpf }, { email }],
  },
});

const updateLastAccess = (id) => {
  return User.update(
    {
      lastAccessDate: new Date(),
    },
    {
      where: {
        id,
      },
    },
  );
}

const updateGovbrData = payload => db.transaction(async (transaction) => {
  const {
    id: idUser,
    email,
    name,
    phones = [],
  } = payload;
  if (phones.length) {
    await Phone.destroy({
      transaction,
      where: {
        idUser,
      },
    });
    await Promise.all(
      phones.map(({ id, ...rest }) => Phone.create(
        {
          idUser,
          ...rest,
        },
        {
          transaction,
        },
      )),
    );
  }

  return User.update(
    {
      email,
      name,
    },
    {
      transaction,
      where: {
        id: idUser,
      },
    },
  );
});

const releaseAccess = (id) => {
  return User.update(
    {
      ativo: 1,
    },
    {
      where: {
        id,
      },
    },
  );
}

export default {
  activateUser,
  create,
  findById,
  findByUuid,
  findByCpf,
  findByProfile,
  findExistsByCPF,
  findExistsByEmail,
  findList,
  searchUsers,
  signUp,
  update,
  findCPFAndEmail,
  updateLastAccess,
  releaseAccess,
  updateGovbrData
};
