import UserRating from '../../models/project/UserRating';

const createUpdate = ({
  idProject,
  idUser,
  rating,
}) => UserRating.findOne({
  where: {
    idProject,
    idUser,
  },
}).then((projectActionUserRating) => {
  if (projectActionUserRating) {
    projectActionUserRating.update({
      rating,
    });
  } else {
    UserRating.create({
      idProject,
      idUser,
      rating,
    });
  }
});

const findById = ({
  idProject,
  idUser,
}) => UserRating.findOne({
  attributes: [
    'rating',
  ],
  where: {
    idProject,
    idUser,
  },
});

export default {
  createUpdate,
  findById,
};
