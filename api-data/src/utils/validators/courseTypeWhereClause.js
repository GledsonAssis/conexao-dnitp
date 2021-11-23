import {
  admin,
  cadastrador,
  gestorEstratLocal,
  gestorEstratNacional,
  gestorEstratRegional,
  gestorOpLocal,
  gestorOpNacional,
  gestorOpRegional,
  gestorTatLocal,
  gestorTatNacional,
  gestorTatRegional,
  publicador,
  suportePedagogico,
  suporteTecnico,
} from '../../constants/Role';
import User from '../../models/user/User';
import EducationalInstitution from '../../models/EducationalInstitution/EducationalInstitution';

const dnitEmployees = [
  admin,
  gestorEstratLocal,
  gestorEstratNacional,
  gestorEstratRegional,
  gestorOpLocal,
  gestorOpNacional,
  gestorOpRegional,
  gestorTatLocal,
  gestorTatNacional,
  gestorTatRegional,
  publicador,
  cadastrador,
  suportePedagogico,
  suporteTecnico,
];

const courseTypeWhereClause = async (currentUser) => {
  const whereClause = {
    type: {
      $in: [1],
    },
  };

  if (currentUser) {
    const projectParticipant = !!(await User.findByPk(currentUser.id, {
      attributes: ['id'],
      include: [{
        as: 'instituitions',
        model: EducationalInstitution,
        where: { joinProgram: true },
      }],
    }));
    const dnitEmployee = dnitEmployees.includes(currentUser.role.id);

    if (projectParticipant) {
      whereClause.type.$in.push(2);
    }
    if (dnitEmployee) {
      whereClause.type.$in.push(3);
    }
    if (projectParticipant || dnitEmployee) {
      whereClause.type.$in.push(4);
    }
  }

  return whereClause;
};

export default courseTypeWhereClause;
