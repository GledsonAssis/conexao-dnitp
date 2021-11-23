module.exports = {
  routes: [
    {
      source: '/',
      destination: '/cms',
    },
    // Actions
    {
      source: '/acoes',
      destination: '/Actions',
    },
    {
      source: '/acoes/novo',
      destination: '/Actions/New',
    },
    {
      source: '/acoes/editar/:id',
      destination: '/Actions/:id',
    },

    // Activities
    {
      source: '/atividades',
      destination: '/Activities',
    },
    {
      source: '/atividades/novo',
      destination: '/Activities/New',
    },
    {
      source: '/atividades/editar/:id',
      destination: '/Activities/:id',
    },

    // ExternalLinks
    {
      source: '/links-externos',
      destination: '/ExternalLinks',
    },
    {
      source: '/links-externos/novo',
      destination: '/ExternalLinks/New',
    },
    {
      source: '/links-externos/editar/:id',
      destination: '/ExternalLinks/:id',
    },


    // Highlights
    {
      source: '/destaques',
      destination: '/Highlights',
    },

    // Initiatives
    {
      source: '/iniciativas',
      destination: '/Initiatives',
    },
    {
      source: '/iniciativas/avaliador',
      destination: '/Initiatives/Evaluate',
    },
    {
      source: '/iniciativas/avaliador/:id',
      destination: '/Initiatives/Evaluate/:id',
    },
    {
      source: '/iniciativas/publicador',
      destination: '/Initiatives/Publish',
    },
    {
      source: '/iniciativas/publicador/:id',
      destination: '/Initiatives/Publish/:id',
    },
    {
      source: '/iniciativas/visualizacao',
      destination: '/Initiatives/Visualization',
    },
    {
      source: '/iniciativas/visualizacao/:id',
      destination: '/Initiatives/Visualization/:id',
    },
    // Institutions
    {
      source: '/instituicoes',
      destination: '/Institutions',
    },
    {
      source: '/instituicoes/novo',
      destination: '/Institutions/New',
    },
    {
      source: '/instituicoes/editar/:id',
      destination: '/Institutions/:id',
    },

    // KnowledgeObjects
    {
      source: '/objetos-conhecimento',
      destination: '/KnowledgeObjects',
    },
    {
      source: '/objetos-conhecimento/novo',
      destination: '/KnowledgeObjects/New',
    },
    {
      source: '/objetos-conhecimento/editar/:id',
      destination: '/KnowledgeObjects/:id',
    },

    // ProjectActions
    {
      source: '/acoes-de-projeto',
      destination: '/ProjectActions',
    },
    {
      source: '/acoes-de-projeto/novo',
      destination: '/ProjectActions/New',
    },
    {
      source: '/acoes-de-projeto/editar/:id',
      destination: '/ProjectActions/:id',
    },

    // Projects
    {
      source: '/projetos',
      destination: '/Projects',
    },
    {
      source: '/projetos/novo',
      destination: '/Projects/New',
    },
    {
      source: '/projetos/editar/:id',
      destination: '/Projects/:id',
    },

    // RegionalSuperintendences
    {
      source: '/superintendencia-regional',
      destination: '/RegionalSuperintendences',
    },
    {
      source: '/superintendencia-regional/novo',
      destination: '/RegionalSuperintendences/New',
    },
    {
      source: '/superintendencia-regional/editar/:id',
      destination: '/RegionalSuperintendences/:id',
    },

    // DnitLocalUnits
    {
      source: '/unidade-local',
      destination: '/DnitLocalUnits',
    },
    {
      source: '/unidade-local/novo',
      destination: '/DnitLocalUnits/New',
    },
    {
      source: '/unidade-local/editar/:id',
      destination: '/DnitLocalUnits/:id',
    },

    // Surveys
    {
      source: '/avaliacoes',
      destination: '/Surveys',
    },
    {
      source: '/avaliacoes/novo',
      destination: '/Surveys/New',
    },
    {
      source: '/avaliacoes/editar/:id',
      destination: '/Surveys/:id',
    },
    {
      source: '/avaliacoes/visualizar/:id',
      destination: '/Surveys/:id',
    },

    // TrafficConcepts
    {
      source: '/conceitos-de-transito',
      destination: '/TrafficConcepts',
    },
    {
      source: '/conceitos-de-transito/novo',
      destination: '/TrafficConcepts/New',
    },
    {
      source: '/conceitos-de-transito/editar/:id',
      destination: '/TrafficConcepts/:id',
    },

    // TrafficContents
    {
      source: '/conteudo-de-transito',
      destination: '/TrafficContents',
    },
    {
      source: '/conteudo-de-transito/novo',
      destination: '/TrafficContents/New',
    },
    {
      source: '/conteudo-de-transito/editar/:id',
      destination: '/TrafficContents/:id',
    },

    // Users
    {
      source: '/usuarios',
      destination: '/Users',
    },
    {
      source: '/usuarios/novo',
      destination: '/Users/New',
    },
    {
      source: '/usuarios/editar/:id',
      destination: '/Users/:id',
    },

    // Courses
    {
      source: '/cursos',
      destination: '/Courses',
    },
    {
      source: '/cursos/novo',
      destination: '/Courses/New',
    },
    {
      source: '/cursos/editar/:id',
      destination: '/Courses/:id',
    },

    // Reports
    {
      source: '/relatorios',
      destination: '/Reports/Initiatives',
    },
    {
      source: '/relatorios/iniciativas',
      destination: '/Reports/Initiatives',
    },
    {
      source: '/relatorios/interatividade',
      destination: '/Reports/Interactivity',
    },
    {
      source: '/relatorios/projetos',
      destination: '/Reports/Projects',
    },
    {
      source: '/relatorios/mensagens',
      destination: '/Reports/Messages',
    },
    {
      source: '/relatorios/downloads',
      destination: '/Reports/Downloads',
    },
    {
      source: '/relatorios/relatorio-avaliacoes',
      destination: '/Reports/Survey',
    },
    {
      source: '/relatorios/participantes',
      destination: '/Reports/Participants',
    },

  ],
};
