import sequelize from "sequelize";
import db from "../../config/database";
import Skill, {ActivitySkill} from "../../models/general/Skill";
import TrafficConcept from "../../models/general/TrafficConcept";
import TrafficContent from "../../models/general/TrafficContent";
import TrafficScope, {
  ActivityTrafficScope,
} from "../../models/general/TrafficScope";

const transitConceptAttributes = ["id", "description", "trafficConceptId"];

const findById = (id) =>
  TrafficContent.findByPk(id, {
    attributes: [...transitConceptAttributes, "idTransitConcept"],
    include: [
      {
        as: "trafficConcept",
        attributes: ["id", "description", "idSchoolYear"],
        model: TrafficConcept,
      },
      {
        as: "trafficScope",
        attributes: ["id", "description"],
        include: [
          {
            as: "skills",
            attributes: ["id", "description"],
            model: Skill,
          },
        ],
        model: TrafficScope,
      },
    ],
  });

const createTrafficContent = (payload) =>
  db.transaction(async (transaction) => {
    const { description, idTransitConcept, trafficScope } = payload;

    const content = await TrafficContent.create(
      {
        description,
        idTransitConcept,
      },
      {
        transaction,
      }
    );

    const {
      dataValues: { id },
    } = content;

    if (trafficScope && trafficScope.length) {
      const scopesList = await trafficScope.map((scope) => ({
        ...scope,
        idTrafficContent: id,
      }));

      await TrafficScope.bulkCreate(scopesList, { transaction });

      let scopes = await TrafficScope.findAll({
        transaction,
        where: {
          idTrafficContent: id,
        },
      }).map((el) => el.get({ plain: true }));

      scopes = await scopes.map((el) => {
        const old = scopesList.find(
          (item) => item.description === el.description
        );
        return {
          ...el,
          skills: old.skills.map((skill) => ({
            ...skill,
            idTransitCompetence: el.id,
          })),
        };
      });

      await scopes.forEach((scope) => Skill.bulkCreate(scope.skills));

      return content.id;
    }
  });

const findAll = () =>
  TrafficContent.findAll({
    attributes: transitConceptAttributes,
    include: [
      {
        as: "trafficConcept",
        attributes: ["idSchoolYear"],
        model: TrafficConcept,
      },
      {
        as: "trafficScope",
        attributes: ["id", "description"],
        include: [
          {
            as: "skills",
            attributes: ["id", "description"],
            model: Skill,
          },
        ],
        model: TrafficScope,
      },
    ],
  });

const remove = (id) =>
  TrafficContent.destroy({
    where: {
      id,
    },
  });

const search = ({
  idTransitConcept,
  idSchoolYear,
  keyword,
  page = 1,
  order: sort,
  limit = 0,
}) => {
  let offset = 0;
  if (limit > 0) {
    offset = limit * (page - 1);
  }

  const where = {};

  if (keyword) {
    where.$or = [
      { description: { $like: `%${keyword}%` } },
      sequelize.literal(`[trafficConcept].[texto] like '%${keyword}%' `),
      sequelize.literal(
        `cast([trafficConcept].[idAnoEscolar] as varchar(10)) = '${keyword}'`
      ),
    ];
  }

  if (idTransitConcept || idSchoolYear) {
    where.$and = [];
    if (idTransitConcept)
      where.$and.push({ idTransitConcept: { $in: idTransitConcept } });
    if (idSchoolYear)
      where.$and.push(
        sequelize.literal(
          `[trafficConcept].[idAnoEscolar] in (${idSchoolYear})`
        )
      );
  }

  const order = [];
  const fields = (sort || "").split(",");

  if (fields[1] === "0") order.push(["description", "asc"]);
  else {
    switch (fields[0]) {
      case "Year":
        if (fields[1] !== "0")
          order.push([
            sequelize.literal("[trafficConcept.idSchoolYear]"),
            fields[1],
          ]);
        break;
      case "Name":
        if (fields[1] !== "0") order.push(["description", fields[1]]);
        break;
      case "Concept":
        if (fields[1] !== "0")
          order.push([
            sequelize.literal("[trafficConcept.description]"),
            fields[1],
          ]);
        break;
      default:
        order.push(["description", "asc"]);
        break;
    }
  }

  return TrafficContent.findAll({
    attributes: transitConceptAttributes,
    include: [
      {
        as: "trafficConcept",
        attributes: ["id", "description", "idSchoolYear"],
        model: TrafficConcept,
        required: false,
      },
      {
        as: "trafficScope",
        attributes: ["id", "description"],
        include: [
          {
            as: "skills",
            attributes: ["id", "description"],
            model: Skill,
          },
        ],
        model: TrafficScope,
        required: false,
      },
    ],
    order,
    subQuery: false,
    where,
  })
    .then((resultSet) => resultSet.map((el) => el.get({ plain: true })))
    .then((resultSet) => ({
      count: resultSet.length,
      rows: resultSet.slice(
        offset,
        limit > 0 ? offset + limit : resultSet.length
      ),
    }));
};

const updateTrafficContent = ({
  id,
  idTransitConcept,
  description,
  trafficScope,
}) =>
  db.transaction(async (transaction) => {
    const scopeWithActivities = [];
    const skillWithActivities = [];

    const scopesList = trafficScope.map((scope) => ({
      ...scope,
      idTrafficContent: id,
    }));

    const baseScopeList = await TrafficScope.findAll({
      transaction,
      where: {
        idTrafficContent: id,
      },
    }).map((el) => el.get({ plain: true }));

    const scopesToBeDeleted = baseScopeList.filter(
      (baseScope) => !scopesList.some((scope) => scope.id === baseScope.id)
    );

    const promisesScopesDeleted = scopesToBeDeleted.map(
      async (scopeToBeDeleted) => {
        const { id } = scopeToBeDeleted;

        const scopeActivities = await ActivityTrafficScope.findAll({
          transaction,
          where: {
            idTrafficScope: id,
          },
        });

        if (scopeActivities.length > 0) {
          scopeWithActivities.push(scopeToBeDeleted);
          return;
        }

        await Skill.destroy({
          transaction,
          where: {
            idTransitCompetence: id,
          },
        });

        await TrafficScope.destroy({
          transaction,
          where: {
            id,
          },
        });
      }
    );

    await Promise.all(promisesScopesDeleted);

    if (scopeWithActivities.length > 0) {
      throw new Error("scopeWithActivities");
    }

    const scopesToBeCreated = scopesList.filter((scope) => !scope.id);

    const promisesScopesCreated = scopesToBeCreated.map(
      async (scopeToBeCreated) => {
        const scopeCreated = await TrafficScope.create(scopeToBeCreated, {
          transaction,
        });

        const {
          dataValues: { id: idScopeCreated },
        } = scopeCreated;

        await Skill.bulkCreate(
          scopeToBeCreated.skills.map((skill) => ({
            description: skill.description,
            idTransitCompetence: idScopeCreated,
          })),
          {
            transaction,
          }
        );
      }
    );

    await Promise.all(promisesScopesCreated);

    const scopesToBeUpdated = scopesList.filter((scope) => scope.id);

    const promisesScopesUpdated = scopesToBeUpdated.map(
      async (scopeToBeUpdated) => {
        await TrafficScope.update(
          {
            idTrafficContent: id,
            description: scopeToBeUpdated.description,
          },
          {
            transaction,
            where: {
              id: scopeToBeUpdated.id,
            },
          }
        );

        const scopeSkills = scopeToBeUpdated.skills;
        const baseScopeSkills = await Skill.findAll({
          transaction,
          where: {
            idTransitCompetence: scopeToBeUpdated.id,
          },
        });

        const skillsToBeDeleted = baseScopeSkills.filter(
          (baseSkill) => !scopeSkills.some((skill) => skill.id === baseSkill.id)
        );

        const promisesSkillsDeleted = skillsToBeDeleted.map(
          async (skillToBeDeleted) => {
            const { id } = skillToBeDeleted;

            const skillActivities = await ActivitySkill.findAll({
              transaction,
              where: {
                idSkill: id,
              },
            });

            if (skillActivities.length > 0) {
              skillWithActivities.push(skillToBeDeleted);
              return;
            }

            await Skill.destroy({
              transaction,
              where: {
                id,
              },
            });
          }
        );

        await Promise.all(promisesSkillsDeleted);

        const skillsToBeCreated = scopeSkills.filter((skill) => !skill.id);

        await Skill.bulkCreate(
          skillsToBeCreated.map((skill) => ({
            idTransitCompetence: scopeToBeUpdated.id,
            description: skill.description,
          })),
          {
            transaction,
          }
        );

        const skillsToBeUpdated = scopeSkills.filter((skill) => skill.id);

        const promisesSkillsUpdated = skillsToBeUpdated.map(async (skill) => {
          await Skill.update(
            {
              idTransitCompetence: scopeToBeUpdated.id,
              description: skill.description,
            },
            {
              transaction,
              where: {
                id: skill.id,
              },
            }
          );
        });

        await Promise.all(promisesSkillsUpdated);
      }
    );

    await Promise.all(promisesScopesUpdated);

    if (skillWithActivities.length > 0) {
      throw new Error("skillWithActivities");
    }

    await TrafficContent.update(
      {
        idTransitConcept,
        description,
      },
      {
        transaction,
        where: {
          id,
        },
      }
    );
  });

export default {
  createTrafficContent,
  findAll,
  findById,
  remove,
  search,
  updateTrafficContent,
};
