import {
  publicador,
} from '../../constants/Role';

export default (currentUser) => {
  const whereClause = {
    excludedDate: null,
  };

  if (!currentUser || currentUser.role.id !== publicador) {
    whereClause.isPublished = true;
  }

  return whereClause;
};
