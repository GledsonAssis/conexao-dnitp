import UserRating from '../../models/projectAction/UserRating';

const createUpdate = ({
  idProjectAction,
  idUser,
  rating,
}) => UserRating.findOne({
  where: {
    idProjectAction,
    idUser,
  },
}).then((userRating) => {
  if (userRating) {
    userRating.update({
      rating,
    });
  } else {
    UserRating.create({
      idProjectAction,
      idUser,
      rating,
    });
  }
});

const findById = ({
  idProjectAction,
  idUser,
}) => UserRating.findOne({
  attributes: [
    'rating',
  ],
  where: {
    idProjectAction,
    idUser,
  },
});

export default {
  createUpdate,
  findById,
};
