import UserRating from '../../models/course/UserRating';

const createUpdate = ({
  idCourse,
  idUser,
  rating,
}) => UserRating.findOne({
  where: {
    idCourse,
    idUser,
  },
}).then((userRating) => {
  if (userRating) {
    userRating.update({
      rating,
    });
  } else {
    UserRating.create({
      idCourse,
      idUser,
      rating,
    });
  }
});

const findById = ({
  idCourse,
  idUser,
}) => UserRating.findOne({
  attributes: [
    'rating',
  ],
  where: {
    idCourse,
    idUser,
  },
});

export default {
  createUpdate,
  findById,
};
