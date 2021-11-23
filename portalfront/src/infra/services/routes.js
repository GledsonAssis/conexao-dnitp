module.exports = {
  routes: [
    {
      source: '/cms/:path*',
      destination: '/cms/:path*',
    },
    {
      source: '/equipe',
      destination: '/Team',
    },
    {
      source: '/sobre',
      destination: '/About',
    },
    {
      source: '/login',
      destination: '/Login',
    },
    {
      source: '/projetos',
      destination: '/Projects',
    },
    {
      source: '/projetos/:id(\\d{1,})',
      destination: '/Projects/:id',
    },
    {
      source: '/projetos/:id/acoes/:idAction(\\d{1,})',
      destination: '/Projects/:id/:idAction',
    },
    {
      source: '/cursos',
      destination: '/Courses',
    },
    {
      source: '/cursos/:id(\\d{1,})',
      destination: '/Courses/:id',
    },
    {
      source: '/acoes',
      destination: '/Actions',
    },
    {
      source: '/acoes/:id(\\d{1,})',
      destination: '/Actions/:id',
    },
    {
      source: '/atividades',
      destination: '/Activities',
    },
    {
      source: '/atividades/:id',
      destination: '/Activities/:id',
    },
    {
      source: '/atividades/:id/avaliacoes',
      destination: '/Activities/:id/Survey',
    },
    {
      source: '/minhas-iniciativas',
      destination: '/Initiatives',
    },
    {
      source: '/minhas-iniciativas/enviar',
      destination: '/Initiatives/Send',
    },
    {
      source: '/minhas-iniciativas/:id(\\d{1,})',
      destination: '/Initiatives/:id',
    },
    {
      source: '/escolas-participantes',
      destination: '/ParticipatingSchools',
    },
    {
      source: '/como-participar',
      destination: '/Participate'
    },
    {
      source: '/equipe',
      destination: '/Team'
    },
    {
      source: '/mensagens',
      destination: '/Messages',
    },
    {
      source: '/mensagens/enviar',
      destination: '/Messages/Send',
    },
    {
      source: '/mensagens/:id(\\d{1,})',
      destination: '/Messages/:id',
    },
    {
      source: '/busca-geral',
      destination: '/GeneralSearch',
    },
    {
      source: '/perfil',
      destination: '/Profile',
    },
    {
      source: '/termos-de-uso',
      destination: '/TermsOfUse',
    },
    {
      source: '/politica-de-privacidade',
      destination: '/PrivacyPolicy',
    },
  ],
};
