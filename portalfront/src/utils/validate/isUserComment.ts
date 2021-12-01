import { anonimo, infantil } from '../../infra/constants/profileRoles';

const userLogger = (user: { role: { id: number } }) => user && user.role && ![anonimo, infantil].includes(user.role.id);

export default userLogger;
