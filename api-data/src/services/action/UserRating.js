import UserRating from '../../models/action/UserRating';

const createUpdate = ({
  idAction,
  idUser,
  rating,
}) => UserRating.findOne({
  where: {
    idAction,
    idUser,
  },
}).then((userRating) => {
  if (userRating) {
    userRating.update({
      rating,
    });
  } else {
    UserRating.create({
      idAction,
      idUser,
      rating,
    });
  }
});

const deleteUserRating = ({ idUser, idAction }) => UserRating.destroy({
  where: {
    idUser,
    idAction,
  },
});

const findById = ({
  idAction,
  idUser,
}) => UserRating.findOne({
  attributes: [
    'rating',
  ],
  where: {
    idAction,
    idUser,
  },
});

export default {
  createUpdate,
  deleteUserRating,
  findById,
};
