import Storage from '../Storage';

import { anonimo } from '@/infra/constants/profileRoles';

interface idName {
  id: number
  name?: string
}
interface City {
  id?: number,
  name?: string,
  state?: idName
}
export interface User extends idName {
  instituitions: any[];
  DnitUnit: any
  active: true
  attachment: any[]
  birthDate: Date
  city: City
  cpf: string
  educationalInstitution: idName
  email: string
  idCity: number
  idDnitUnit: number
  idRole: number
  institutions: any[]
  phones: any[]
  primeiroAcessoGovbr: Boolean
  role: idName
  schoolBonds: idName
}

const annonymousUser = {
  role: {
    id: anonimo,
  },
};

const keySession = 'session';
const keyUser = 'user';

const authorizationHeader = () => {
  const session = Storage.get(keySession);

  if (!session) {
    return undefined;
  }

  return `${session.token_type} ${session.access_token}`;
};

const getUser = () => Storage.get(keyUser) as User || annonymousUser as User;
const getSession = () => Storage.get(keySession);

const login = (item: any) => {
  Storage.put(keySession, item);
};

const logout = () => {
  const keys = [keySession, keyUser];
  keys.forEach((key) => Storage.remove(key));
};

const setUser = (item: any) => {
  Storage.put(keyUser, item);
};

export default {
  authorizationHeader,
  getUser,
  getSession,
  login,
  logout,
  setUser,
};
