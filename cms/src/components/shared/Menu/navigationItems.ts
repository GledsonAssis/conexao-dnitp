export default [
  {
    key: '1',
    // icon: 'home-icon',
    label: 'components:sideNav.pages.home',
    link: '/',
  },
  {
    key: '2',
    // icon: 'info-icon',
    title: 'components:sideNav.info',
    items: [
      {
        key: '2.1',
        label: 'components:sideNav.pages.courses',
        link: '/cursos',
      },
      {
        key: '2.2',
        label: 'components:sideNav.pages.projects',
        link: '/projetos',
      },
      {
        key: '2.3',
        label: 'components:sideNav.pages.projectActions',
        link: '/acoes-de-projeto',
      },
      {
        key: '2.4',
        label: 'components:sideNav.pages.actions',
        link: '/acoes',
      },
      {
        key: '2.5',
        label: 'components:sideNav.pages.externalLinks',
        link: '/links-externos',
      },
      {
        key: '2.6',
        label: 'components:sideNav.pages.highlights',
        link: '/destaques',
      },
    ],
  },
  {
    key: '3',
    // icon: 'register-icon',
    title: 'components:sideNav.register',
    items: [
      {
        key: '3.1',
        label: 'components:sideNav.pages.regionalSuperintendence',
        link: '/superintendencia-regional',
      },
      {
        key: '3.2',
        label: 'components:sideNav.pages.localUnit',
        link: '/unidade-local',
      },
      {
        key: '3.3',
        label: 'components:sideNav.pages.institution',
        link: '/instituicoes',
      },
      {
        key: '3.4',
        label: 'components:sideNav.pages.user',
        link: '/usuarios',
      },
    ],
  },
  {
    key: '4',
    // icon: 'materials-icon',
    title: 'components:sideNav.materials',
    items: [
      {
        key: '4.1',
        label: 'components:sideNav.pages.trafficConcept',
        link: '/conceitos-de-transito',
      },
      {
        key: '4.2',
        label: 'components:sideNav.pages.trafficContent',
        link: '/conteudo-de-transito',
      },
      {
        key: '4.3',
        label: 'components:sideNav.pages.knowledgeObject',
        link: '/objetos-conhecimento',
      },
      {
        key: '4.4',
        label: 'components:sideNav.pages.activities',
        link: '/atividades',
      },
      {
        key: '4.5',
        label: 'components:sideNav.pages.evaluateInitiative',
        link: '/iniciativas/avaliador',
      },
      {
        key: '4.6',
        label: 'components:sideNav.pages.publishInitiative',
        link: '/iniciativas/publicador',
      },
      {
        key: '4.7',
        label: 'components:sideNav.pages.initiativeVisualization',
        link: '/iniciativas/visualizacao',
      },
      {
        key: '4.8',
        label: 'components:sideNav.pages.surveys',
        link: '/avaliacoes',
      },
    ],
  },
  {
    key: '5',
    // icon: 'reports-icon',
    title: 'components:sideNav.reports',
    items: [
      {
        key: '5.1',
        label: 'components:sideNav.pages.reportIniciatives',
        link: '/relatorios/iniciativas',
      },
      {
        key: '5.2',
        label: 'components:sideNav.pages.reportInteractivity',
        link: '/relatorios/interatividade',
      },
      {
        key: '5.3',
        label: 'components:sideNav.pages.reportProjects',
        link: '/relatorios/projetos',
      },
      {
        key: '5.4',
        label: 'components:sideNav.pages.reportMessages',
        link: '/relatorios/mensagens',
      },
      {
        key: '5.5',
        label: 'components:sideNav.pages.reportDownloads',
        link: '/relatorios/downloads',
      },
      {
        key: '5.6',
        label: 'components:sideNav.pages.reportSurveys',
        link: '/relatorios/relatorio-avaliacoes',
      },
      {
        key: '5.7',
        label: 'components:sideNav.pages.reportParticipants',
        link: '/relatorios/participantes',
      },
    ],
  }
];
