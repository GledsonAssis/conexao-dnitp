import sequelize from "sequelize";
import moment from "moment";
import User from "../../models/user/User";
import DnitUnit from "../../models/dnitUnit/DnitUnit";
import EducationalInstitution from "../../models/EducationalInstitution/EducationalInstitution";
import Roles from "../../models/user/Roles";

const getReport = async (filters, user) => {
  const {
    dateInit = new Date("1990", "01", "01"),
    dateEnd = new Date(),
    idRegionalSuperintendence: idSuperintendencia,
    localUnit: idUnidadeLocal,
    educationalInstitution: idInstituicaoEnsino,
    order: sort,
    role: idPerfil,
    active: isActive,
  } = filters;

  const where = {
    $and: [
      sequelize.literal(`[instituitions].[participaConexaoDnit] = 1`),
      {
        registerDate: {
          $between: [
            dateInit,
            moment(dateEnd)
              .hour("23")
              .minute(59)
              .second(59)
              .format("YYYY-MM-DDTHH:mm:ss"),
          ],
        },
      },
    ],
  };

  if (isActive) {
    where.$and.push({
      ativo: sequelize.literal(`[ativo] = 1`),
    });
  }

  if (idPerfil) {
    where.$and.push({
      idPerfil: sequelize.literal(`[idPerfil] = ${idPerfil}`),
    });
  }

  if (idInstituicaoEnsino) {
    where.$and.push({
      idInstituicaoEnsino: sequelize.literal(
        `[instituitions].[id] = ${idInstituicaoEnsino}`
      ),
    });
  }

  if (idUnidadeLocal) {
    const param = sequelize.literal(`[DnitUnit].[id] = ${idUnidadeLocal}`);
    where.$and.push(param);
  }

  if (idSuperintendencia) {
    const param = sequelize.literal(
      `[DnitUnit->RegionalSuperintendence].[id] = ${idSuperintendencia}`
    );
    where.$and.push(param);
  }

  if (idUnidadeLocal && !idSuperintendencia) {
    where.$or = [
      sequelize.literal(`[DnitUnit].[id] = ${idUnidadeLocal}`),
      sequelize.literal(
        `[DnitUnit->RegionalSuperintendence].[id] = ${idUnidadeLocal}`
      ),
    ];
  }

  if (
    !(idUnidadeLocal || idSuperintendencia) &&
    user.idDnitUnit &&
    user.idDnitUnit !== null
  ) {
    where.$or = [
      sequelize.literal(`[DnitUnit].[id] = ${user.idDnitUnit}`),
      sequelize.literal(
        `[DnitUnit->RegionalSuperintendence].[id] = ${user.idDnitUnit}`
      ),
    ];
  }

  let order = [];
  const sorter = sort ? sort.split(",") : "";
  order = [["id", "DESC"]];
  if (sorter[1] !== "0") {
    switch (sorter[0]) {
      case "Data do Cadastro":
        order = [[sequelize.col("[registerDate]"), sorter[1] || "ASC"]];
        break;
      case "Último Acesso":
        order = [[sequelize.col("[lastAccessDate]"), sorter[1] || "ASC"]];
        break;
      case "Nome":
        order = [[sequelize.col("[name]"), sorter[1] || "ASC"]];
        break;
      case "E-mail":
        order = [[sequelize.col("[email]"), sorter[1] || "ASC"]];
        break;
      case "Superintendência":
        order = [
          [
            sequelize.col(
              "[DnitUnit->RegionalSuperintendence].[identificacao]"
            ),
            sorter[1] || "ASC",
          ],
        ];
        break;
      case "Unidade Local":
        order = [
          [sequelize.col("[DnitUnit].[identificacao]"), sorter[1] || "ASC"],
        ];
        break;
      case "Instituição de Ensino":
        order = [
          [
            sequelize.col("[instituitions].[identificacao]"),
            sorter[1] || "ASC",
          ],
        ];
      case "Perfil":
        order = [[sequelize.col("[role].[nome]"), sorter[1] || "ASC"]];
        break;
      default:
        break;
    }
  }
  return User.findAll({
    attributes: [
      "name",
      "email",
      "registerDate",
      "lastAccessDate",
      "idRole",
      "active",
    ],
    include: [
      {
        as: "role",
        attributes: ["id", "nome"],
        model: Roles,
        required: true,
      },
      {
        as: "DnitUnit",
        attributes: ["id", "identificacao", "idUFSuperintendence"],
        model: DnitUnit,
        required: true,
        include: [
          {
            as: "RegionalSuperintendence",
            attributes: ["id", "idUFSuperintendence", "identification"],
            model: DnitUnit,
            required: true,
          },
        ],
      },
      {
        as: "instituitions",
        attributes: ["id", "identificacao", "participaConexaoDnit"],
        model: EducationalInstitution,
        required: true,
      },
    ],
    where,
    order,
  })
    .then((list) => list.map((el) => el.get({ plain: true })))
    .then((list) =>
      list.map((el) => ({
        "Data do Cadastro": moment(el.registerDate).format("DD/MM/YYYY"),
        Nome: el.name,
        "E-mail": el.email,
        Perfil: el.role.nome,
        Superintendência: el.DnitUnit.RegionalSuperintendence.identification,
        "Unidade Local": el.DnitUnit.identificacao,
        "Instituição de Ensino": el.instituitions
          .map((i) => i.identificacao)
          .join(", "),
        "Último Acesso": el.lastAccessDate
          ? moment(el.lastAccessDate).format("DD/MM/YYYY")
          : "",
      }))
    );
};

export default {
  getReport,
};
