import { EnvsConfig } from '@/infra/config/envs.config';
import { CustomIcons } from '@/assets/icons';

const cms_url = EnvsConfig.getCmsUrl();

export default [
  {
    className: 'cms-icon',
    imageAlt: 'Ir para CMS',
    iconClass: 'fas fa-chart-bar',
    path: cms_url,
    target: '_blank',
    name: 'CMS',
    hasTag: false
  },
  {
    className: 'share-icon',
    imageAlt: 'Initiative icon',
    imageSrc: CustomIcons.uploadActivite,
    iconClass: 'far fa-lightbulb',
    path: '/minhas-iniciativas',
    target: '_self',
    name: 'Enviar Atividade',
    hasTag: false
  },
  {
    className: 'message-icon',
    imageAlt: 'Chat icon',
    iconClass: 'fas fa-comment',
    path: '/mensagens',
    target: '_self',
    name: 'Mensagens',
    hasTag: true
  },
  {
    className: 'user-icon',
    imageAlt: 'User icon',
    iconClass: 'fas fa-user',
    path: '/perfil',
    target: '_self',
    name: 'Perfil',
    hasTag: false
  },
];
