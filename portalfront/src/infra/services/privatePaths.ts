import { C, M, R, W, P, O } from '../constants/permissions';

import permission from './permission';

import {
  admin,
  anonimo,
  cadastrador,
  gestorEscolar,
  gestorEstratLocal,
  gestorEstratNacional,
  gestorEstratRegional,
  gestorOpLocal,
  gestorOpNacional,
  gestorOpRegional,
  gestorTatLocal,
  gestorTatNacional,
  gestorTatRegional,
  professor,
  publicador,
  suportePedagogico,
  visitante,
  suporteTecnico,
} from '../constants/profileRoles';
import { EnvsConfig } from '../config/envs.config';

const CMS_URL = EnvsConfig.getCmsUrl();

export default {
  '/login': [permission(anonimo, [R])],
  '/': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R]),
    permission(cadastrador, [R]),
    permission(gestorEscolar, [R]),
    permission(gestorEstratLocal, [R]),
    permission(gestorEstratNacional, [R]),
    permission(gestorEstratRegional, [R]),
    permission(gestorOpLocal, [R]),
    permission(gestorOpNacional, [R]),
    permission(gestorOpRegional, [R]),
    permission(gestorTatLocal, [R]),
    permission(gestorTatNacional, [R]),
    permission(gestorTatRegional, [R]),
    permission(professor, [R]),
    permission(publicador, [R]),
    permission(suportePedagogico, [R]),
    permission(suporteTecnico, [R]),
    permission(visitante, [R]),
  ],
  '/cursos': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R]),
    permission(cadastrador, [R, C]),
    permission(gestorEscolar, [R, C]),
    permission(gestorEstratLocal, [R, C]),
    permission(gestorEstratNacional, [R, C]),
    permission(gestorEstratRegional, [R, C]),
    permission(gestorOpLocal, [R, C, M]),
    permission(gestorOpNacional, [R, C, M]),
    permission(gestorOpRegional, [R, C, M]),
    permission(gestorTatLocal, [R, C]),
    permission(gestorTatNacional, [R, C]),
    permission(gestorTatRegional, [R, C]),
    permission(professor, [R, C]),
    permission(publicador, [R, C, M]),
    permission(suportePedagogico, [R, C]),
    permission(suporteTecnico, [R, C]),
    permission(visitante, [R, C]),
  ],
  '/cursos/:id': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R]),
    permission(cadastrador, [R, C]),
    permission(gestorEscolar, [R, C]),
    permission(gestorEstratLocal, [R, C]),
    permission(gestorEstratNacional, [R, C]),
    permission(gestorEstratRegional, [R, C]),
    permission(gestorOpLocal, [R, C, M]),
    permission(gestorOpNacional, [R, C, M]),
    permission(gestorOpRegional, [R, C, M]),
    permission(gestorTatLocal, [R, C]),
    permission(gestorTatNacional, [R, C]),
    permission(gestorTatRegional, [R, C]),
    permission(professor, [R, C]),
    permission(publicador, [R, C, M]),
    permission(suportePedagogico, [R, C]),
    permission(suporteTecnico, [R, C]),
    permission(visitante, [R, C]),
  ],
  '/busca-geral': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R]),
    permission(cadastrador, [R]),
    permission(gestorEscolar, [R]),
    permission(gestorEstratLocal, [R]),
    permission(gestorEstratNacional, [R]),
    permission(gestorEstratRegional, [R]),
    permission(gestorOpLocal, [R]),
    permission(gestorOpNacional, [R]),
    permission(gestorOpRegional, [R]),
    permission(gestorTatLocal, [R]),
    permission(gestorTatNacional, [R]),
    permission(gestorTatRegional, [R]),
    permission(professor, [R]),
    permission(publicador, [R]),
    permission(suportePedagogico, [R]),
    permission(suporteTecnico, [R]),
    permission(visitante, [R]),
  ],

  '/acoes/:id': [
    permission(admin, [R, C, W, P, M, O]),
    permission(cadastrador, [R, C]),
    permission(gestorEstratLocal, [R, C]),
    permission(gestorEstratNacional, [R, C]),
    permission(gestorEstratRegional, [R, C]),
    permission(gestorOpLocal, [R, C, M]),
    permission(gestorOpNacional, [R, C, M]),
    permission(gestorOpRegional, [R, C, M]),
    permission(gestorTatLocal, [R, C]),
    permission(gestorTatNacional, [R, C]),
    permission(gestorTatRegional, [R, C]),
    permission(publicador, [R, C, M]),
  ],
  '/acoes': [
    permission(admin, [R, C, W, P, M, O]),
    permission(cadastrador, [R, C]),
    permission(gestorEstratLocal, [R, C]),
    permission(gestorEstratNacional, [R, C]),
    permission(gestorEstratRegional, [R, C]),
    permission(gestorOpLocal, [R, C, M]),
    permission(gestorOpNacional, [R, C, M]),
    permission(gestorOpRegional, [R, C, M]),
    permission(gestorTatLocal, [R, C]),
    permission(gestorTatNacional, [R, C]),
    permission(gestorTatRegional, [R, C]),
    permission(publicador, [R, C, M]),
  ],
  '/cadastro': [permission(anonimo, [R, W])],
  '/atividades': [
    permission(admin, [R, C, W, P, M, O]),
    permission(cadastrador, [R]),
    permission(gestorEscolar, [R]),
    permission(gestorEstratLocal, [R]),
    permission(gestorEstratNacional, [R]),
    permission(gestorEstratRegional, [R]),
    permission(gestorOpLocal, [R]),
    permission(gestorOpNacional, [R]),
    permission(gestorOpRegional, [R]),
    permission(gestorTatLocal, [R]),
    permission(gestorTatNacional, [R]),
    permission(gestorTatRegional, [R]),
    permission(professor, [R]),
    permission(publicador, [R]),
    permission(suportePedagogico, [R]),
    permission(suporteTecnico, [R]),
    permission(visitante, [R]),
  ],
  '/atividades/:id': [
    permission(admin, [R, C, W, P, M, O]),
    permission(cadastrador, [R]),
    permission(gestorEscolar, [R]),
    permission(gestorEstratLocal, [R]),
    permission(gestorEstratNacional, [R]),
    permission(gestorEstratRegional, [R]),
    permission(gestorOpLocal, [R]),
    permission(gestorOpNacional, [R]),
    permission(gestorOpRegional, [R]),
    permission(gestorTatLocal, [R]),
    permission(gestorTatNacional, [R]),
    permission(gestorTatRegional, [R]),
    permission(professor, [R]),
    permission(publicador, [R]),
    permission(suportePedagogico, [R]),
    permission(suporteTecnico, [R]),
    permission(visitante, [R]),
  ],
  '/atividades/:id/avaliacoes': [
    permission(admin, [R, C, W, P, M, O]),
    permission(cadastrador, [R]),
    permission(gestorEscolar, [R]),
    permission(gestorEstratLocal, [R]),
    permission(gestorEstratNacional, [R]),
    permission(gestorEstratRegional, [R]),
    permission(gestorOpLocal, [R]),
    permission(gestorOpNacional, [R]),
    permission(gestorOpRegional, [R]),
    permission(gestorTatLocal, [R]),
    permission(gestorTatNacional, [R]),
    permission(gestorTatRegional, [R]),
    permission(professor, [R]),
    permission(publicador, [R]),
    permission(suportePedagogico, [R]),
    permission(suporteTecnico, [R]),
    permission(visitante, [R]),
  ],
  '/mensagens/:id': [
    permission(admin, [R, C, W, P, M, O]),
    permission(cadastrador, [R, W]),
    permission(gestorEscolar, [R, W]),
    permission(gestorEstratLocal, [R, W]),
    permission(gestorEstratNacional, [R, W]),
    permission(gestorEstratRegional, [R, W]),
    permission(gestorOpLocal, [R, W]),
    permission(gestorOpNacional, [R, W]),
    permission(gestorOpRegional, [R, W]),
    permission(gestorTatLocal, [R, W]),
    permission(gestorTatNacional, [R, W]),
    permission(gestorTatRegional, [R, W]),
    permission(professor, [R, W]),
    permission(publicador, [R, W]),
    permission(suportePedagogico, [R, W]),
    permission(suporteTecnico, [R, W]),
    permission(visitante, [R, W]),
  ],
  '/mensagens': [
    permission(admin, [R, C, W, P, M, O]),
    permission(cadastrador, [R, W]),
    permission(gestorEscolar, [R, W]),
    permission(gestorEstratLocal, [R, W]),
    permission(gestorEstratNacional, [R, W]),
    permission(gestorEstratRegional, [R, W]),
    permission(gestorOpLocal, [R, W]),
    permission(gestorOpNacional, [R, W]),
    permission(gestorOpRegional, [R, W]),
    permission(gestorTatLocal, [R, W]),
    permission(gestorTatNacional, [R, W]),
    permission(gestorTatRegional, [R, W]),
    permission(professor, [R, W]),
    permission(publicador, [R, W]),
    permission(suportePedagogico, [R, W]),
    permission(suporteTecnico, [R, W]),
    permission(visitante, [R, W]),
  ],
  '/mensagens/enviar': [
    permission(admin, [R, C, W, P, M, O]),
    permission(cadastrador, [R, W]),
    permission(gestorEscolar, [R, W]),
    permission(gestorEstratLocal, [R, W]),
    permission(gestorEstratNacional, [R, W]),
    permission(gestorEstratRegional, [R, W]),
    permission(gestorOpLocal, [R, W]),
    permission(gestorOpNacional, [R, W]),
    permission(gestorOpRegional, [R, W]),
    permission(gestorTatLocal, [R, W]),
    permission(gestorTatNacional, [R, W]),
    permission(gestorTatRegional, [R, W]),
    permission(professor, [R, W]),
    permission(publicador, [R, W]),
    permission(suportePedagogico, [R, W]),
    permission(suporteTecnico, [R, W]),
    permission(visitante, [R, W]),
  ],
  '/minhas-iniciativas/:id': [
    permission(admin, [R, C, W, P, M, O]),
    permission(gestorEscolar, [R, W]),
    permission(gestorEstratLocal, [R, W]),
    permission(gestorEstratNacional, [R, W]),
    permission(gestorEstratRegional, [R, W]),
    permission(gestorOpLocal, [R, W]),
    permission(gestorOpNacional, [R, W]),
    permission(gestorOpRegional, [R, W]),
    permission(gestorTatLocal, [R, W]),
    permission(gestorTatNacional, [R, W]),
    permission(gestorTatRegional, [R, W]),
    permission(professor, [R, W]),
  ],
  '/minhas-iniciativas/enviar': [
    permission(admin, [R, C, W, P, M, O]),
    permission(gestorEscolar, [R, W]),
    permission(gestorEstratLocal, [R, W]),
    permission(gestorEstratNacional, [R, W]),
    permission(gestorEstratRegional, [R, W]),
    permission(gestorOpLocal, [R, W]),
    permission(gestorOpNacional, [R, W]),
    permission(gestorOpRegional, [R, W]),
    permission(gestorTatLocal, [R, W]),
    permission(gestorTatNacional, [R, W]),
    permission(gestorTatRegional, [R, W]),
    permission(professor, [R, W]),
  ],
  '/minhas-iniciativas': [
    permission(admin, [R, C, W, P, M, O]),
    permission(gestorEscolar, [R, W]),
    permission(gestorEstratLocal, [R, W]),
    permission(gestorEstratNacional, [R, W]),
    permission(gestorEstratRegional, [R, W]),
    permission(gestorOpLocal, [R, W]),
    permission(gestorOpNacional, [R, W]),
    permission(gestorOpRegional, [R, W]),
    permission(gestorTatLocal, [R, W]),
    permission(gestorTatNacional, [R, W]),
    permission(gestorTatRegional, [R, W]),
    permission(professor, [R, W]),
  ],
  '/perfil': [
    permission(admin, [R, C, W, P, M, O]),
    permission(cadastrador, [R, W]),
    permission(gestorEscolar, [R, W]),
    permission(gestorEstratLocal, [R, W]),
    permission(gestorEstratNacional, [R, W]),
    permission(gestorEstratRegional, [R, W]),
    permission(gestorOpLocal, [R, W]),
    permission(gestorOpNacional, [R, W]),
    permission(gestorOpRegional, [R, W]),
    permission(gestorTatLocal, [R, W]),
    permission(gestorTatNacional, [R, W]),
    permission(gestorTatRegional, [R, W]),
    permission(professor, [R, W]),
    permission(publicador, [R, W]),
    permission(suportePedagogico, [R, W]),
    permission(suporteTecnico, [R, W]),
    permission(visitante, [R, W]),
  ],
  '/projetos': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R]),
    permission(cadastrador, [R, C]),
    permission(gestorEscolar, [R, C]),
    permission(gestorEstratLocal, [R, C]),
    permission(gestorEstratNacional, [R, C]),
    permission(gestorEstratRegional, [R, C]),
    permission(gestorOpLocal, [R, C, M]),
    permission(gestorOpNacional, [R, C, M]),
    permission(gestorOpRegional, [R, C, M]),
    permission(gestorTatLocal, [R, C]),
    permission(gestorTatNacional, [R, C]),
    permission(gestorTatRegional, [R, C]),
    permission(professor, [R, C]),
    permission(publicador, [R, C, M]),
    permission(suportePedagogico, [R, C]),
    permission(suporteTecnico, [R, C]),
    permission(visitante, [R, C]),
  ],
  '/projetos/:id': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R]),
    permission(cadastrador, [R, C]),
    permission(gestorEscolar, [R, C]),
    permission(gestorEstratLocal, [R, C]),
    permission(gestorEstratNacional, [R, C]),
    permission(gestorEstratRegional, [R, C]),
    permission(gestorOpLocal, [R, C, M]),
    permission(gestorOpNacional, [R, C, M]),
    permission(gestorOpRegional, [R, C, M]),
    permission(gestorTatLocal, [R, C]),
    permission(gestorTatNacional, [R, C]),
    permission(gestorTatRegional, [R, C]),
    permission(professor, [R, C]),
    permission(publicador, [R, C, M]),
    permission(suportePedagogico, [R, C]),
    permission(suporteTecnico, [R, C]),
    permission(visitante, [R, C]),
  ],
  '/projetos/:idProject/acoes/:idAction': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R]),
    permission(cadastrador, [R, C]),
    permission(gestorEscolar, [R, C]),
    permission(gestorEstratLocal, [R, C]),
    permission(gestorEstratNacional, [R, C]),
    permission(gestorEstratRegional, [R, C]),
    permission(gestorOpLocal, [R, C, M]),
    permission(gestorOpNacional, [R, C, M]),
    permission(gestorOpRegional, [R, C, M]),
    permission(gestorTatLocal, [R, C]),
    permission(gestorTatNacional, [R, C]),
    permission(gestorTatRegional, [R, C]),
    permission(professor, [R, C]),
    permission(publicador, [R, C, M]),
    permission(suportePedagogico, [R, C]),
    permission(suporteTecnico, [R, C]),
    permission(visitante, [R, C]),
  ],

  '/relatorios': [
    permission(admin, [R, C, W, P, M, O]),
    permission(gestorEstratLocal, [R]),
    permission(gestorEstratNacional, [R]),
    permission(gestorEstratRegional, [R]),
    permission(gestorOpLocal, [R]),
    permission(gestorOpNacional, [R]),
    permission(gestorOpRegional, [R]),
    permission(gestorTatLocal, [R]),
    permission(gestorTatNacional, [R]),
    permission(gestorTatRegional, [R]),
  ],
  '/sobre': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R, C, W, P, M, O]),
    permission(cadastrador, [R, C, W, P, M, O]),
    permission(gestorEscolar, [R, C, W, P, M, O]),
    permission(gestorEstratLocal, [R, C, W, P, M, O]),
    permission(gestorEstratNacional, [R, C, W, P, M, O]),
    permission(gestorEstratRegional, [R, C, W, P, M, O]),
    permission(gestorOpLocal, [R, C, W, P, M, O]),
    permission(gestorOpNacional, [R, C, W, P, M, O]),
    permission(gestorOpRegional, [R, C, W, P, M, O]),
    permission(gestorTatLocal, [R, C, W, P, M, O]),
    permission(gestorTatNacional, [R, C, W, P, M, O]),
    permission(gestorTatRegional, [R, C, W, P, M, O]),
    permission(professor, [R, C, W, P, M, O]),
    permission(publicador, [R, C, W, P, M, O]),
    permission(suportePedagogico, [R, C, W, P, M, O]),
    permission(suporteTecnico, [R, C, W, P, M, O]),
    permission(visitante, [R, C, W, P, M, O]),
  ],
  '/como-participar': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R, C, W, P, M, O]),
    permission(cadastrador, [R, C, W, P, M, O]),
    permission(gestorEscolar, [R, C, W, P, M, O]),
    permission(gestorEstratLocal, [R, C, W, P, M, O]),
    permission(gestorEstratNacional, [R, C, W, P, M, O]),
    permission(gestorEstratRegional, [R, C, W, P, M, O]),
    permission(gestorOpLocal, [R, C, W, P, M, O]),
    permission(gestorOpNacional, [R, C, W, P, M, O]),
    permission(gestorOpRegional, [R, C, W, P, M, O]),
    permission(gestorTatLocal, [R, C, W, P, M, O]),
    permission(gestorTatNacional, [R, C, W, P, M, O]),
    permission(gestorTatRegional, [R, C, W, P, M, O]),
    permission(professor, [R, C, W, P, M, O]),
    permission(publicador, [R, C, W, P, M, O]),
    permission(suportePedagogico, [R, C, W, P, M, O]),
    permission(suporteTecnico, [R, C, W, P, M, O]),
    permission(visitante, [R, C, W, P, M, O]),
  ],
  '/equipe': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R, C, W, P, M, O]),
    permission(cadastrador, [R, C, W, P, M, O]),
    permission(gestorEscolar, [R, C, W, P, M, O]),
    permission(gestorEstratLocal, [R, C, W, P, M, O]),
    permission(gestorEstratNacional, [R, C, W, P, M, O]),
    permission(gestorEstratRegional, [R, C, W, P, M, O]),
    permission(gestorOpLocal, [R, C, W, P, M, O]),
    permission(gestorOpNacional, [R, C, W, P, M, O]),
    permission(gestorOpRegional, [R, C, W, P, M, O]),
    permission(gestorTatLocal, [R, C, W, P, M, O]),
    permission(gestorTatNacional, [R, C, W, P, M, O]),
    permission(gestorTatRegional, [R, C, W, P, M, O]),
    permission(professor, [R, C, W, P, M, O]),
    permission(publicador, [R, C, W, P, M, O]),
    permission(suportePedagogico, [R, C, W, P, M, O]),
    permission(suporteTecnico, [R, C, W, P, M, O]),
    permission(visitante, [R, C, W, P, M, O]),
  ],
  '/escolas-participantes': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R, C, W, P, M, O]),
    permission(cadastrador, [R, C, W, P, M, O]),
    permission(gestorEscolar, [R, C, W, P, M, O]),
    permission(gestorEstratLocal, [R, C, W, P, M, O]),
    permission(gestorEstratNacional, [R, C, W, P, M, O]),
    permission(gestorEstratRegional, [R, C, W, P, M, O]),
    permission(gestorOpLocal, [R, C, W, P, M, O]),
    permission(gestorOpNacional, [R, C, W, P, M, O]),
    permission(gestorOpRegional, [R, C, W, P, M, O]),
    permission(gestorTatLocal, [R, C, W, P, M, O]),
    permission(gestorTatNacional, [R, C, W, P, M, O]),
    permission(gestorTatRegional, [R, C, W, P, M, O]),
    permission(professor, [R, C, W, P, M, O]),
    permission(publicador, [R, C, W, P, M, O]),
    permission(suportePedagogico, [R, C, W, P, M, O]),
    permission(suporteTecnico, [R, C, W, P, M, O]),
    permission(visitante, [R, C, W, P, M, O]),
  ],
  [CMS_URL]: [
    permission(admin, [O, P, R, W]),
    permission(gestorOpLocal, [O, P, R, W]),
    permission(gestorTatLocal, [O, P, R, W]),
    permission(gestorEstratLocal, [O, P, R, W]),
    permission(gestorOpRegional, [O, P, R, W]),
    permission(gestorTatRegional, [O, P, R, W]),
    permission(gestorEstratRegional, [O, P, R, W]),
    permission(gestorOpNacional, [O, P, R, W]),
    permission(gestorTatNacional, [O, P, R, W]),
    permission(gestorEstratNacional, [O, P, R, W]),
    permission(publicador, [O, P, R, W]),
    permission(cadastrador, [O, P, R, W]),
    permission(suportePedagogico, [O, P, R, W]),
    permission(suporteTecnico, [O, P, R, W]),
  ],
  '/politica-de-privacidade': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R]),
    permission(cadastrador, [R]),
    permission(gestorEscolar, [R]),
    permission(gestorEstratLocal, [R]),
    permission(gestorEstratNacional, [R]),
    permission(gestorEstratRegional, [R]),
    permission(gestorOpLocal, [R]),
    permission(gestorOpNacional, [R]),
    permission(gestorOpRegional, [R]),
    permission(gestorTatLocal, [R]),
    permission(gestorTatNacional, [R]),
    permission(gestorTatRegional, [R]),
    permission(professor, [R]),
    permission(publicador, [R]),
    permission(suportePedagogico, [R]),
    permission(suporteTecnico, [R]),
    permission(visitante, [R]),
  ],
  '/termos-de-uso': [
    permission(admin, [R, C, W, P, M, O]),
    permission(anonimo, [R]),
    permission(cadastrador, [R]),
    permission(gestorEscolar, [R]),
    permission(gestorEstratLocal, [R]),
    permission(gestorEstratNacional, [R]),
    permission(gestorEstratRegional, [R]),
    permission(gestorOpLocal, [R]),
    permission(gestorOpNacional, [R]),
    permission(gestorOpRegional, [R]),
    permission(gestorTatLocal, [R]),
    permission(gestorTatNacional, [R]),
    permission(gestorTatRegional, [R]),
    permission(professor, [R]),
    permission(publicador, [R]),
    permission(suportePedagogico, [R]),
    permission(suporteTecnico, [R]),
    permission(visitante, [R]),
  ],
};
