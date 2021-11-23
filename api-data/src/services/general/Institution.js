import sequelize, { QueryTypes, TableHints } from 'sequelize';
import HttpStatus from 'http-status-codes';
import Address from '../../models/general/Address';
import City from '../../models/general/City';
import DnitUnit from '../../models/dnitUnit/DnitUnit';
import EducationalInstitution from '../../models/EducationalInstitution/EducationalInstitution';
import InstitutionPhone from '../../models/EducationalInstitution/Phone';
import State from '../../models/general/State';
import User from '../../models/user/User';
import db from '../../config/database';
import EducationalInstitutionSchoolYear from '../../models/EducationalInstitution/EducationalInstitutionSchoolYear';

const createInstituition = ({
  idDnit,
  idDnitUnitCity,
  idInep,
  idTeachingNetwork,
  address: {
    idCity,
    cep,
    complement,
    district,
    number,
    street,
  },
  isDF,
  joinProgram,
  latitude,
  longitude,
  name,
  phones,
  quantidadeAlunos,
  quantidadeProfessores,
  studentsPerCycle,
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
  const idAddress = newAdress.dataValues.id;

  const result = await EducationalInstitution.create({
    idAddress,
    idDnit,
    idDnitUnitCity,
    idInep,
    idTeachingNetwork,
    isDF,
    joinProgram,
    latitude,
    longitude,
    name,
    quantidadeAlunos,
    quantidadeProfessores,
  },
    {
      transaction,
    });

  if (phones && phones.length) {
    await Promise.all(phones.map(phone => InstitutionPhone.create({
      ...phone,
      idEducationalInstitution: result.id,
    },
      {
        transaction,
      })));
  }

  if (studentsPerCycle && studentsPerCycle.length) {
    await Promise.all(studentsPerCycle.map(item => EducationalInstitutionSchoolYear.create({
      amountStudents: item.amountStudents,
      idSchoolYear: item.idSchoolYear,
      idEducationalInstitution: result.id,
    },
      {
        transaction,
      }
    )));
  }

  return result;
});

const findByDnitUnitIds = async (dnitUnitIds) => {
  let whereClause = {};

  if (dnitUnitIds.sRegional.includes(-1) &&  !dnitUnitIds.uLocal.includes(-1)) {
    whereClause = {
      idDnit: {
        $in: dnitUnitIds.uLocal,
      },
      joinProgram: true,
    }
  } else if(!dnitUnitIds.sRegional.includes(-1) && dnitUnitIds.uLocal.includes(-1)) {
    //subquery para pegar todos os ids
    var test = await db.query(`SELECT id FROM [dnit].[UnidadeDnit] WHERE idSuperintendenciaRegional in (${dnitUnitIds.sRegional})`,
    {
      type: QueryTypes.SELECT,
    })
    .map(element => element.id);

    whereClause = {
      idDnit: {
        $in: test,
      },
      joinProgram: true,
    }
  }else if(dnitUnitIds.sRegional.includes(-1) && dnitUnitIds.uLocal.includes(-1) ){
    whereClause = {
      joinProgram: true,
    }

  }else{
    whereClause = {
      idDnit: {
        $in: dnitUnitIds.uLocal.concat(dnitUnitIds.sRegional),
      },
      joinProgram: true,
    }
  }

  return EducationalInstitution.findAll({
    attributes: [
      'id',
      'name',
      'idDnit',
    ],
    tableHint: TableHints.NOLOCK,
    subQuery: false,
    where: whereClause,
  });
}

const findInstituitionsByDnitUnitId = async dnitUnitId => findByDnitUnitIds([dnitUnitId]);

const findInstitutionsByIdCity = idCity => EducationalInstitution.findAll({
  attributes: [
    'id',
    'name',
  ],
  include: [{
    as: 'address',
    attributes: [
      'id',
      'idCity',
      'cep',
      'street',
    ],
    include: [{
      as: 'city',
      attributes: [
        'id',
        'name',
      ],
      model: City,
    }],
    where: {
      idCity,
    },
    model: Address,
  },
  {
    as: 'dnitUnit',
    attributes: [
      'id',
      'identification',
    ],
    model: DnitUnit,
    required: false,
  },
  {
    as: 'phones',
    attributes: [
      'DDD',
      'number',
    ],
    model: InstitutionPhone,
    required: false,
  },
  {
    as: 'dnitUnitCity',
    attributes: [
      'id',
      'name',
    ],
    model: City,
    required: false,
  },
  ],
});

const getById = id => EducationalInstitution.findByPk(id, {
  attributes: [
    'id',
    'idInep',
    'idTeachingNetwork',
    'isDF',
    'joinProgram',
    'latitude',
    'longitude',
    'name',
    'quantidadeAlunos',
    'quantidadeProfessores',
  ],
  include: [{
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
    include: [{
      as: 'city',
      attributes: [
        'id',
        'name',
      ],
      model: City,
    }],
    model: Address,
  },
  {
    as: 'dnitUnit',
    attributes: [
      'id',
      'identification',
    ],
    include: [
      {
        as: 'RegionalSuperintendence',
        attributes: [
          'id',
          'identification',
        ],
        model: DnitUnit,
        required: false,
      },
    ],
    model: DnitUnit,
    required: false,
  },
  {
    as: 'phones',
    attributes: [
      'DDD',
      'number',
    ],
    model: InstitutionPhone,
    required: false,
  },
  {
    as: 'dnitUnitCity',
    attributes: [
      'id',
      'name',
    ],
    model: City,
    required: false,
  },
  {
    as: 'studentsPerCycle',
    attributes: [
      'idEducationalInstitution',
      'idSchoolYear',
      'amountStudents',
    ],
    model: EducationalInstitutionSchoolYear,
    required: false,
  },
  ],
});

const canRemove = async (id) => {
  const users = await User.findAndCountAll({
    include: [
      {
        as: 'instituitions',
        attributes: [
          'id',
        ],
        model: EducationalInstitution,
        where: {
          id,
        },
      },
    ],
  });

  const status = users.count === 0;

  const code = status
    ? HttpStatus.OK
    : HttpStatus.UNPROCESSABLE_ENTITY;

  const messageToken = status ? 'remove_allowed' : 'remove_not_allowed';

  return {
    id,
    code,
    messageToken,
    status,
    users: users.rows.map(obj => obj.id),
  };
};

const deleteById = (id, currentUser) => canRemove(id, currentUser)
  .then((data) => {
    if (data.status) {
      db.transaction(async (transaction) => {
        await InstitutionPhone.destroy({ transaction, where: { idEducationalInstitution: id } });
        await EducationalInstitutionSchoolYear.destroy({ transaction, where: { idEducationalInstitution: id } });
        await EducationalInstitution.destroy({ transaction, where: { id } });
      });
    }

    return data;
  });

const search = async ({
  dnitUnitId = null,
  idTeachingNetwork = null,
  keyword,
  searchDnit,
  limit = 500,
  offset = 0,
  sort,
  participaConexaoDnit,
  uf,
}) => {
  let searchKeyword = null;

  let ids = [];

  if (keyword) {
    searchKeyword = keyword
      .toString()
      .trim()
      .split(/[\s,]+/)
      .map(word => (word.length > 0
        ? `formsOf(inflectional,${word}) OR "${word}*" `
        : undefined))
      .join(' OR ');

    let whereString = ' WHERE ';
    let query = `SELECT DISTINCT [InstituicaoEnsino].[identificacao], InstituicaoEnsino.id
     FROM[dnit].[InstituicaoEnsino]  AS InstituicaoEnsino WITH (NOLOCK)
      LEFT JOIN [dnit].[Endereco] [address] ON InstituicaoEnsino.idEndereco = [address].[id]
      LEFT JOIN [sistema].[Municipio] [address->city] ON [address].[idMunicipio] = [address->city].[id]
      LEFT JOIN [dnit].[InstituicaoEnsinoTelefone] AS [phones] ON InstituicaoEnsino.id = [phones].[idInstituicaoEnsino]
      LEFT JOIN [sistema].[Municipio] MunicipioDnit on InstituicaoEnsino.idMunicipioUnidadeDnit = MunicipioDnit.id
      LEFT join [dnit].UnidadeDnit on UnidadeDnit.id = InstituicaoEnsino.idUnidadeDnit
      LEFT join [dnit].UnidadeDnit as Regional on Regional.id = UnidadeDnit.idSuperintendenciaRegional
      LEFT JOIN [sistema].[UnidadeFederativa] AS [UF] ON Regional.[idUnidadeFederativaSuperintendencia] = [UF].[id] `;

    if (searchDnit == 0 || searchDnit == 1) {
      whereString += ` ([InstituicaoEnsino].[participaConexaoDnit] = ${searchDnit}) and  `;
    }


    whereString += `  ( [InstituicaoEnsino].[identificacao] like '%${keyword}%')
       or (UnidadeDnit.identificacao like '%${keyword}%')
       or (Regional.identificacao like '%${keyword}%')
       or ([address->city].[nome] like '%${keyword}%')
       or (MunicipioDnit.nome like '%${keyword}%')
       or ([UF].[sigla] like '%${keyword}%') `;

    query += whereString;

    if (dnitUnitId) {
      query += '\n and (:dnitUnitId is null or (:dnitUnitId in (Regional.id, UnidadeDnit.id)))';
    }

    if (idTeachingNetwork) {
      query += '\n and (:idTeachingNetwork is null or InstituicaoEnsino.idRedeEnsino = :idTeachingNetwork)';
    }

    ids = await db.query(query,
      {
        replacements: {
          idTeachingNetwork,
          searchKeyword,
          dnitUnitId,
        },
        type: QueryTypes.SELECT,
      })
      .map(element => element.id);
  }

  const where = {
    $and: [],
  };

  if (keyword && ids) {
    where.$and.push({ id: { $in: ids } });
  }

  if (dnitUnitId) {
    where.$and.push({
      $or: [
        { dnitUnitId },
        sequelize.literal(`[dnitUnit->RegionalSuperintendence].[id] = ${dnitUnitId}`),
      ],
    });
  }

  if (idTeachingNetwork) {
    where.$and.push({ idTeachingNetwork });
  }

  if (participaConexaoDnit) { where.$and.push({ participaConexaoDnit }); }

  if (uf) {
    where.$and.push({
      $or: [
        sequelize.literal(`[address->city->state].[id] = ${uf}`),
      ],
    });
  }

  if (searchDnit == 1 || searchDnit == 0) {
    where.$and.push({
      $and: [
        sequelize.literal(` [EducationalInstitution].[participaConexaoDnit] = ${searchDnit} `),
      ],
    });
  }

  let order = [['identificacao', 'asc']];
  const fields = (sort || '').split(',');

  if (fields[1] !== '0') {
    switch (fields[0]) {
      case 'institution': if (fields[1] !== '0') order = [['identificacao', fields[1]]];
        break;
      case 'parentIdentification': if (fields[1] !== '0') order = [[sequelize.literal('[dnitUnit->RegionalSuperintendence].[identificacao]'), fields[1]]];
        break;
      case 'identification': if (fields[1] !== '0') order = [[sequelize.literal('[dnitUnit].[identificacao]'), fields[1]]];
        break;
      case 'local': if (fields[1] !== '0') order = [[sequelize.literal('[dnitUnit].[identificacao]'), fields[1]]];
        break;
      case 'phones': if (fields[1] !== '0') order = [[sequelize.literal('[phones.number]'), fields[1]]];
        break;
      case 'uf': if (fields[1] !== '0') order = [[sequelize.literal('[address->city->state].[sigla]'), fields[1]]];
        break;
      case 'municipio': if (fields[1] !== '0') order = [[sequelize.literal('[address->city].[nome]'), fields[1]]];
        break;
      case 'Nome': if (fields[1] !== '0') order = [['identificacao', fields[1]]];
        break;
      case 'Cidade': if (fields[1] !== '0') order = [[sequelize.literal('[address->city].[nome]'), fields[1]]];
        break;
      case 'Estado': if (fields[1] !== '0') order = [[sequelize.literal('[address->city->state].[sigla]'), fields[1]]];
        break;
      case 'participaConexaoDnit': if (fields[1] !== '0') order = [[sequelize.literal('participaConexaoDnit'), fields[1]]];
        break;
      default: order = [['identificacao', 'asc']];
        break;
    }
  }

  return EducationalInstitution.findAndCountAll({
    attributes: [
      'id',
      'idInep',
      'idTeachingNetwork',
      'dnitUnitId',
      'name',
      'participaConexaoDnit',
      'quantidadeAlunos',
      'quantidadeProfessores',
    ],
    include: [
      {
        as: 'address',
        attributes: [
          'id',
          'cep',
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
                  'id',
                  'initials',
                ],
                required: true,
                model: State,
              },
            ],
            required: true,
            model: City,
          },
        ],
        model: Address,
        required: true,
      },
      {
        as: 'dnitUnit',
        attributes: [
          'id',
          'identificacao',
        ],
        include: [
          {
            as: 'RegionalSuperintendence',
            attributes: [
              'id',
              'identificacao',
            ],
            model: DnitUnit,
          },
        ],
        model: DnitUnit,
      },
      {
        as: 'phones',
        attributes: [
          'id',
          'DDD',
          'number',
        ],
        model: InstitutionPhone,
      },
    ],
    limit,
    offset,
    order,
    tableHint: TableHints.NOLOCK,
    subQuery: false,
    where,
  });
};


const updateInstituition = ({
  id,
  idDnit,
  idDnitUnitCity,
  idInep,
  idTeachingNetwork,
  idAddress,
  idCity,
  cep,
  complement,
  district,
  number,
  street,
  isDF,
  joinProgram,
  latitude,
  longitude,
  name,
  phones,
  quantidadeAlunos,
  quantidadeProfessores,
  studentsPerCycle,
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

  await EducationalInstitution.update({
    idAddress,
    idDnit,
    idDnitUnitCity,
    idInep,
    idTeachingNetwork,
    cep,
    isDF,
    joinProgram,
    latitude,
    longitude,
    name,
    phones: phones || [],
    quantidadeAlunos,
    quantidadeProfessores,
  },
    {
      transaction,
      where: {
        id,
      },
    });

  await InstitutionPhone.destroy({
    where: {
      idEducationalInstitution: id,
    },
  });

  if (phones && phones.length) {
    await Promise.all(phones.map(phone => InstitutionPhone.create({
      ...phone,
      idEducationalInstitution: id,
    },
      {
        transaction,
      })));
  }

  await EducationalInstitutionSchoolYear.destroy({
    where: {
      idEducationalInstitution: id,
    },
  });

  if (studentsPerCycle && studentsPerCycle.length) {
    await Promise.all(studentsPerCycle.map(item => EducationalInstitutionSchoolYear.create({
      amountStudents: item.amountStudents,
      idSchoolYear: item.idSchoolYear,
      idEducationalInstitution: id,
    },
      {
        transaction,
      }
    )));
  }

  const result = await EducationalInstitution.findAll({
    attributes: [
      'id',
      'idInep',
      'idTeachingNetwork',
      'dnitUnitId',
      'latitude',
      'longitude',
      'name',
      'isDF',
      'joinProgram',
      'quantidadeAlunos',
      'quantidadeProfessores',
    ],
    include: [
      {
        as: 'address',
        attributes: [
          'id',
          'cep',
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
                  'id',
                  'initials',
                ],
                required: true,
                model: State,
              },
            ],
            required: true,
            model: City,
          },
        ],
        model: Address,
        required: true,
      },
      {
        as: 'dnitUnit',
        attributes: [
          'id',
          'identification',
        ],
        model: DnitUnit,
        required: false,
      },
      {
        as: 'phones',
        attributes: [
          'DDD',
          'number',
        ],
        model: InstitutionPhone,
        required: false,
      },
      {
        as: 'dnitUnitCity',
        attributes: [
          'id',
          'name',
        ],
        model: City,
        required: false,
      },
    ],
    transaction,
    where: {
      id,
    },
  });

  return result;
});

const findCodeInep = idInep => EducationalInstitution.findAll({
  attributes: [
    'idInep',
  ],
  where: {
    idInep,
  },
});

export default {
  canRemove,
  createInstituition,
  deleteById,
  findInstitutionsByIdCity,
  getById,
  search,
  updateInstituition,
  findInstituitionsByDnitUnitId,
  findByDnitUnitIds,
  findCodeInep,
};
