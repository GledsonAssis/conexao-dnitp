import sequelize, { QueryTypes, Op } from 'sequelize';
import HttpStatus from 'http-status-codes';
import Address from '../../models/general/Address';
import City from '../../models/general/City';
import DnitUnit from '../../models/dnitUnit/DnitUnit';
import DnitUnitCities from '../../models/dnitUnit/DnitUnitCities';
import DnitUnitPhone from '../../models/dnitUnit/DnitUnitPhone';
import DnitUnitRoads from '../../models/dnitUnit/DnitUnitRoads';
import EducationalInstitution from '../../models/EducationalInstitution/EducationalInstitution';
import Road from '../../models/Road/Road';
import State from '../../models/general/State';
import User from '../../models/user/User';
import Roles from '../../models/user/Roles';
import db from '../../config/database';
import { gestorOpLocal } from '../../constants/Role';
import { isGestorLocal, isNacional, isGestorRegional } from '../../utils/validators/roleValidator';
import Error from '../../models/general/Error';

const findAllUnits = ({ offset = 0, limit = 0 }) => DnitUnit.findAndCountAll({
  attributes: [
    'id',
    'idAddress',
    'idRegionalSuperintendence',
    'idUFSuperintendence',
    'email',
    'identification',
  ],
  include: [
    {
      as: 'address',
      attributes: [
        'id',
        'cep',
        'complement',
        'district',
        'number',
        'street',
      ],
      include: [
        {
          as: 'city',
          attributes: [
            'id',
            'name',
          ],
          include: [
            {
              as: 'state',
              attributes: [
                'code',
                'initials',
              ],
              model: State,
              required: true,
            },
          ],
          model: City,
          required: true,
        },
      ],
      model: Address,
      required: true,
    },
    // {
    //   as: 'UF',
    //   attributes: [
    //     'id',
    //     'initials',
    //   ],
    //   model: State,
    // },
    // {
    //   as: 'phones',
    //   attributes: [
    //     'id',
    //     'DDD',
    //     'number',
    //   ],
    //   model: DnitUnitPhone,
    //   required: false,
    // },
  ],
  limit,
  offset,
  order: [
    ['identification', 'ASC'],
  ],
});

const findById = (id, transaction = null) => DnitUnit.findByPk(id, {
  attributes: [
    'id',
    'idRegionalSuperintendence',
    'idUFSuperintendence',
    'email',
    'identification',
  ],
  include: [
    {
      as: 'address',
      attributes: [
        'id',
        'idCity',
        'cep',
        'complement',
        'district',
        'number',
        'street',
      ],
      include: [
        {
          as: 'city',
          attributes: [
            'name',
          ],
          include: [
            {
              as: 'state',
              attributes: [
                'id',
                'code',
                'initials',
                'name',
              ],
              model: State,
            },
          ],
          model: City,
        },
      ],
      model: Address,
    },
    {
      as: 'RegionalSuperintendence',
      attributes: [
        'id',
        'idUFSuperintendence',
        'identification',
      ],
      model: DnitUnit,
    },
    {
      as: 'UF',
      attributes: [
        'code',
        'initials',
        'name',
      ],
      model: State,
    },
    {
      as: 'roads',
      attributes: [
        'id',
        'name',
      ],
      model: Road,
      through: { attributes: [] },
    },
    {
      as: 'phones',
      attributes: [
        'id',
        'DDD',
        'number',
      ],
      model: DnitUnitPhone,
    },
    {
      as: 'cities',
      attributes: [
        'id',
        'name',
      ],
      model: City,
      through: { attributes: [] },
    },
  ],
  order: [
    ['id', 'ASC'],
  ],
  transaction,
});

const findAllRegionalSuperintendence = async ({ offset = 0, limit = 0 }, user) => {
  const idRole = user.role.id;

  const where = { $and: [] };

  if (isNacional(idRole)) {
    where.$and.push({ idRegionalSuperintendence: null });
  } else {
    if (user.idDnitUnit) {
      const dnitUnit = await findById(user.idDnitUnit);
      if (dnitUnit) {
        if (dnitUnit.idRegionalSuperintendence) {
          where.$and.push({ id: dnitUnit.idRegionalSuperintendence });
        } else {
          where.$and.push({ id: dnitUnit.id });
        }
      }
    }
  }

  const list = await DnitUnit.findAll({
    attributes: [
      'id',
      'idAddress',
      'idUFSuperintendence',
      'email',
      'identification',
      'addressId',
      'UFId',
    ],
    include: [
      {
        as: 'address',
        attributes: [
          'cep',
          'complement',
          'district',
          'number',
          'street',
        ],
        include: [
          {
            as: 'city',
            attributes: [
              'id',
              'name',
            ],
            model: City,
          },
        ],
        model: Address,
      },
      {
        as: 'UF',
        attributes: ['initials'],
        model: State,
      },
      {
        as: 'phones',
        attributes: [
          'DDD',
          'number',
        ],
        model: DnitUnitPhone,
        required: false,
      },
    ],
    order: [
      ['identification', 'ASC'],
    ],
    where,
  });

  const rows = list.map(({
    id,
    idAddress,
    idUFSuperintendence,
    identification,
    address: {
      street,
      city: {
        name: cityName,
      },
    },
    UF,
    phones,
  }) => ({
    id,
    idAddress,
    idUFSuperintendence,
    identification,
    street,
    cityName,
    UF: UF ? UF.initials : null,
    phones: phones.map(phone => (`(${phone.DDD}) ${phone.number}`)).join(', '),
  }));

  const resultRows = rows.slice(offset, (limit + offset) || rows.length);
  return ({
    count: list.length,
    rows: resultRows,
  });
};

const setDnitUnitdetails = async ({
  id: idDnitUnit,
  cities = [],
  phones,
  roads = [],
  transaction,
}) => {
  await DnitUnitPhone.destroy({
    transaction,
    where: {
      idDnitUnit,
    },
  })
    .then(() => phones.map(phone => DnitUnitPhone.create({
      ...phone,
      idDnitUnit,
    },
    {
      transaction,
    })));

  await DnitUnitCities.destroy({
    transaction,
    where: {
      idDnitUnit,
    },
  });

  await DnitUnitCities.bulkCreate(cities.map(value => ({
    idCity: value,
    idDnitUnit,
  })),
  {
    transaction,
  });

  await DnitUnitRoads.destroy({
    transaction,
    where: {
      idDnitUnit,
    },
  })
    .then(() => roads.map(value => DnitUnitRoads.create({
      idRoad: value,
      idDnitUnit,
    },
    {
      transaction,
    })));
};

const create = ({
  idRegionalSuperintendence,
  address: {
    idCity,
    idState,
    cep,
    complement,
    district,
    number,
    street,
  },
  cities,
  email,
  identification,
  phones,
  roads,
}) => db.transaction(async (transaction) => {
  const newAdress = await Address.create({
    idCity,
    cep,
    complement,
    district,
    number,
    street,
  },
  {
    transaction,
  });

  const nAddress = newAdress.dataValues;

  const where = {
    email,
    identification,
    idAddress: nAddress.id,
  };

  if (idRegionalSuperintendence) {
    where.idRegionalSuperintendence = idRegionalSuperintendence;
  } else {
    where.idUFSuperintendence = idState;
  }

  let unit = await DnitUnit.findOrCreate({
    transaction,
    where,
  });

  unit = unit[0].dataValues;

  await setDnitUnitdetails({
    id: unit.id,
    cities,
    phones,
    roads,
    transaction,
  });

  return findById(unit.id, transaction);
});

const getDnitUnitCities = id => City.findAll({
  attributes: [
    'id',
    'name',
  ],
  include: [
    {
      as: 'dnitUnit',
      attributes: [],
      model: DnitUnit,
      where: {
        id,
      },
    },
  ],
});

const findAllDnitUnitByCities = id => City.findAll({
  attributes: [
    'id',
    'name',
  ],
  include: [
    {
      as: 'dnitUnit',
      model: DnitUnit,
      where: {
        id: {
          [Op.ne]: null,
        },
      },
    },
  ],
  where: {
    id: {
      in: id.split(','),
    },
  },

});

const canRemove = async (id) => {
  const localUnits = await DnitUnit.findAndCountAll({ where: { idRegionalSuperintendence: id } });
  const users = await User.findAndCountAll({ where: { idDnitUnit: id } });
  const instituitions = await EducationalInstitution.findAndCountAll({ where: { idDnit: id } });

  const status = !(localUnits.count > 0 || users.count > 0 || instituitions.count > 0);

  const code = status
    ? HttpStatus.OK
    : HttpStatus.UNPROCESSABLE_ENTITY;

  const messageToken = status ? 'remove_allowed' : 'remove_not_allowed';

  return {
    id,
    code,
    instituitions: instituitions.rows.map(obj => obj.id),
    localUnits: localUnits.rows.map(obj => obj.id),
    messageToken,
    status,
    users: users.rows.map(obj => obj.id),
  };
};

const remove = (id, currentUser) => canRemove(id, currentUser)
  .then((data) => {
    if (!data.status) {
      return data;
    }

    return db.transaction(transaction => setDnitUnitdetails({
      id,
      cities: [],
      phones: [],
      roads: [],
      transaction,
    })
      .then(() => DnitUnit.destroy({
        transaction,
        where: {
          id,
        },
      })));
  });

const returnUnitsListByIds = async (ids, {
  idRegionalSuperintendences,
  limit = 0,
  local,
  offset = 0,
  order: sort,
}, user, validateRole) => {
  const whereClause = {
  };

  if (ids) {
    whereClause.$and = [{
      id: {
        $in: ids,
      },
    }];
  }
  if (idRegionalSuperintendences == -1 ) {
    if (!whereClause.$or) whereClause.$or = [];
    whereClause.$or.push({
      idRegionalSuperintendence: {
        $ne: idRegionalSuperintendences,
      },
    });
  }

  if (idRegionalSuperintendences != -1 && idRegionalSuperintendences && idRegionalSuperintendences.length > 0) {
    if (!whereClause.$or) whereClause.$or = [];
    whereClause.$or.push({
      idRegionalSuperintendence: {
        $in: idRegionalSuperintendences,
      },
    });
  }

  if (local || (idRegionalSuperintendences != -1 && idRegionalSuperintendences && idRegionalSuperintendences.length > 0)) {
    if (!whereClause.$and) whereClause.$and = [];
    whereClause.$and.push({
      idRegionalSuperintendence: {
        $ne: null,
      },
    });
  }

  if (!local) {
    if (!whereClause.$and) whereClause.$and = [];
    whereClause.$and.push({
      idRegionalSuperintendence: {
        $eq: null,
      },
    });
  }

  if (validateRole) {
    const idRole = user.role.id;

    if (isGestorLocal(idRole)) {
      if (!whereClause.$and) whereClause.$and = [];

      if (user.idDnitUnit) {
        const dnitUnit = await findById(user.idDnitUnit);

        if (dnitUnit) {
          if (dnitUnit.idRegionalSuperintendence) {
            whereClause.$and.push({ id: dnitUnit.id });
          }
        }
      }
    }
  }

  const order = [];
  const fields = (sort || '').split(',');

  if (fields[1] === '0') order.push(['identification', 'asc']);
  else {
    switch (fields[0]) {
      case 'identification': if (fields[1] !== '0') order.push(['identification', fields[1]]);
        break;
      case 'parentIdentification': if (fields[1] !== '0') order.push([sequelize.literal('[RegionalSuperintendence.identification]'), fields[1]]);
        break;
      case 'Phones': if (fields[1] !== '0') order.push([sequelize.literal(`[phones.DDD] ${fields[1]}, [phones.number]`), fields[1]]);
        break;
      case 'uf': if (fields[1] !== '0') order.push([sequelize.literal('[address.city.state.initials]'), fields[1]]);
        break;
      case 'municipio': if (fields[1] !== '0') order.push([sequelize.literal('[address.city.name]'), fields[1]]);
        break;
      default: order.push(['identification', 'asc']);
        break;
    }
  }

  const rows = await DnitUnit.findAll({
    attributes: [
      'id',
      'addressId',
      'UFId',
      'idRegionalSuperintendence',
      'email',
      'identification',
    ],
    include: [
      {
        as: 'address',
        attributes: [
          'id',
          'idCity',
          'cep',
          'complement',
          'district',
          'number',
          'street',
        ],
        include: [
          {
            as: 'city',
            attributes: [
              'name',
            ],
            include: [
              {
                as: 'state',
                attributes: [
                  'id',
                  'code',
                  'initials',
                  'name',
                ],
                model: State,
              },
            ],
            model: City,
          },
        ],
        model: Address,
      },
      {
        as: 'phones',
        attributes: [
          'id',
          'DDD',
          'number',
        ],
        model: DnitUnitPhone,
        required: false,
      },
      {
        as: 'RegionalSuperintendence',
        attributes: [
          'id',
          'identification',
        ],
        model: DnitUnit,
        required: false,
      },
      {
        as: 'UF',
        attributes: [
          'code',
          'initials',
          'name',
        ],
        model: State,
      },
      {
        as: 'cities',
        attributes: ['id', 'name'],
        required: false,
        model: City,
        through: { attributes: [] },
      },
    ],
    order,
    where: whereClause,
  });

  const resultRows = rows.slice(offset, (limit + offset) || rows.length);
  return ({
    count: (ids || rows).length,
    rows: resultRows,
  });
};

const search = async ({
  idRegionalSuperintendences = null,
  keyword,
  limit,
  local = false,
  offset,
  order,
}, user, validateRole) => {
  let list = null;
  if (keyword) {
    list = await db.query(
      `SELECT DISTINCT [DnitUnit].[id] 
        FROM [dnit].[UnidadeDnit] AS [DnitUnit]
        inner JOIN [dnit].[Endereco] [address] ON [DnitUnit].[idEndereco] = [address].[id]
        INNER JOIN [sistema].[Municipio] [address->city] ON [address].[idMunicipio] = [address->city].[id]
        INNER  JOIN [sistema].[UnidadeFederativa] AS [address->city->state]
        ON [address->city].[idUnidadeFederativa] = [address->city->state].[id]
        LEFT JOIN [sistema].[UnidadeFederativa] AS [UF] ON [DnitUnit].[idUnidadeFederativaSuperintendencia] = [UF].[id]
        LEFT JOIN [dnit].[UnidadeDnitTelefone] AS [phones] ON [DnitUnit].[id] = [phones].[idUnidadeDnit]
        LEFT OUTER JOIN [dnit].[UnidadeDnit] AS [RegionalSuperintendence] ON [DnitUnit].[idSuperintendenciaRegional] = [RegionalSuperintendence].[id]
        LEFT JOIN [dnit].[UnidadeDnitMunicipio] AS [municipios] ON [DnitUnit].[id] = [municipios].[idUnidadeDnit]
        LEFT JOIN [sistema].[Municipio] AS [municipioAbrangencia] ON [municipioAbrangencia].[id] = [municipios].[idMunicipio]
      WHERE (
           (upper([DnitUnit].[identificacao]) like upper('%${keyword}%'))
        or (upper([RegionalSuperintendence].[identificacao]) like upper('%${keyword}%'))
        or (upper([address->city].[nome]) like upper('%${keyword}%'))
        or (cast([phones].[numero] as varchar(20)) = '${keyword}')
        or (upper([UF].[sigla]) like upper('%${keyword}%'))
        or (upper([UF].[nome]) like upper('%${keyword}%'))
        or (upper([address->city->state].[sigla]) like upper('%${keyword}%'))
        or (upper([municipioAbrangencia].[nome]) like upper('%${keyword}%'))
        )
        and ${local ? '[DnitUnit].[idSuperintendenciaRegional] is not null' : '[DnitUnit].[idSuperintendenciaRegional] is null'} `,
      { type: QueryTypes.SELECT },
    )
      .map(element => element.id);
  }

  return returnUnitsListByIds(list, {
    idRegionalSuperintendences,
    limit,
    local,
    order,
    offset,
  }, user, validateRole);
};

const findAllCMS = async ({
  idRegionalSuperintendence = null,
  isLocalUnit = false,
  currentUser,
}) => {
  const whereClause = {
    $and: [{
      idRegionalSuperintendence: isLocalUnit
        ? idRegionalSuperintendence || { $ne: null }
        : { $eq: null },
    }],
  };

  const dnitUnit = currentUser.idDnitUnit ? await findById(currentUser.idDnitUnit) : null;

  if (isGestorLocal(currentUser.role.id)) {
    if (dnitUnit && dnitUnit.RegionalSuperintendence) {
      whereClause.$and = [
        { id: (isLocalUnit ? dnitUnit.id : dnitUnit.RegionalSuperintendence.id) },
      ];
    } else {
      return Promise.reject(
        new Error(HttpStatus.METHOD_NOT_ALLOWED, 'Usuário não possui unidade local cadastrada.', null, 'UserIncompleteRegistration'),
      );
    }
  } else if (isGestorRegional(currentUser.role.id)) {
    if (dnitUnit && !dnitUnit.RegionalSuperintendence) {
      whereClause.$and = [
        isLocalUnit
          ? { idRegionalSuperintendence: dnitUnit.id }
          : { id: dnitUnit.id },
      ];
    } else {
      return Promise.reject(
        new Error(HttpStatus.METHOD_NOT_ALLOWED, 'Usuário não possui superintendência regional cadastrada.', null, 'UserIncompleteRegistration'),
      );
    }
  }

  const order = [['identification', 'asc']];

  const rows = await DnitUnit.findAll({
    attributes: [
      'id',
      'addressId',
      'UFId',
      'idRegionalSuperintendence',
      'email',
      'identification',
    ],
    include: [
      {
        as: 'address',
        attributes: [
          'id',
          'idCity',
          'cep',
          'complement',
          'district',
          'number',
          'street',
        ],
        include: [
          {
            as: 'city',
            attributes: [
              'name',
            ],
            include: [
              {
                as: 'state',
                attributes: [
                  'id',
                  'code',
                  'initials',
                  'name',
                ],
                model: State,
              },
            ],
            model: City,
          },
        ],
        model: Address,
      },
      {
        as: 'phones',
        attributes: [
          'id',
          'DDD',
          'number',
        ],
        model: DnitUnitPhone,
        required: false,
      },
      {
        as: 'RegionalSuperintendence',
        attributes: [
          'id',
          'identification',
        ],
        model: DnitUnit,
        required: false,
      },
      {
        as: 'UF',
        attributes: [
          'code',
          'initials',
          'name',
        ],
        model: State,
      },
      {
        as: 'cities',
        attributes: ['id'],
        required: false,
        model: City,
        through: { attributes: [] },
      },
    ],
    order,
    where: whereClause,
  });

  return ({
    count: rows.length,
    rows,
  });
};

const update = ({
  id,
  idRegionalSuperintendence,
  idUFSuperintendence,
  identification,
  address: {
    id: idAddress,
    idCity,
    cep,
    complement = '',
    district,
    number = null,
    street,
  },
  cities,
  email,
  phones,
  roads,
}) => db.transaction(async (transaction) => {
  await Address.update({
    idCity,
    cep,
    complement,
    district,
    number,
    street,
  },
  {
    transaction,
    where: {
      id: idAddress,
    },
  });

  await DnitUnit.update({
    idAddress,
    idRegionalSuperintendence,
    idUFSuperintendence,
    email,
    identification,
  },
  {
    transaction,
    where: {
      id,
    },
  });

  await setDnitUnitdetails({
    id,
    cities,
    phones,
    roads,
    transaction,
  });
})
  .then(() => findById(id))
  .catch(() => ({ message: 'Não foi possível salvar o cadastro', code: HttpStatus.UNPROCESSABLE_ENTITY }));

const getGestorOpLocal = async (id) => {
  const where = {
    $and: {
      idDnitUnit: id,
    },
  };

  return User.findAll({
    attributes: [
      'id',
      'name',
      'email',
    ],
    include: [
      {
        as: 'role',
        attributes: ['id', 'name'],
        where: {
          id: {
            $eq: gestorOpLocal,
          },
        },
        model: Roles,
      },
      {
        as: 'DnitUnit',
        attributes: [
          'id',
          'identification',
          'idUFSuperintendence',
        ],
        include: [
          {
            as: 'RegionalSuperintendence',
            attributes: [
              'id',
              'idUFSuperintendence',
              'identification',
            ],
            model: DnitUnit,
            required: true,
          },
        ],
        model: DnitUnit,
        required: true,
      },
    ],
    where,
  })
    .then(list => list.map(el => el.get({ plain: true })))
    .then((list) => {
      const result = list.map(el => ({
        nome: el.name,
        email: el.email,
      }));

      return result;
    });
};

export default {
  canRemove,
  create,
  findAllCMS,
  findAllUnits,
  findAllRegionalSuperintendence,
  findById,
  getGestorOpLocal,
  getDnitUnitCities,
  findAllDnitUnitByCities,
  remove,
  search,
  update,
};
