import {
  gestorOpNacional,
  suportePedagogico,
  suporteTecnico,
} from './Role';

export const SUPORTE_TECNICO = {
  id: 3,
  profile: suporteTecnico,
};
export const SUPORTE_PEDAGOGICO = {
  id: 4,
  profile: suportePedagogico,
};
export const SUGESTAO = {
  id: 5,
  profile: gestorOpNacional,
};

export const RECLAMACAO = {
    id: 7,
    profile: gestorOpNacional,
};
export default [
  SUPORTE_TECNICO,
  SUPORTE_PEDAGOGICO,
  SUGESTAO,
  RECLAMACAO
];
