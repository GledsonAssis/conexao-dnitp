export const UserLogin = {
  userParser: {
    id: 206,
    phones: [
      {
        idPhoneType: 1,
        fullNumber: '',
      },
      {
        idPhoneType: 2,
        id: 1610,
        DDD: '84',
        number: 991867371,
        fullNumber: '(84) 99186-7371',
      },
    ],
    imageUri: 'https://conexao-dnit-hom.labtrans.ufsc.br/api/users/avatar/206?Wed Jul 07 2021 11:13:32 GMT-0300 (Horário Padrão de Brasília)',
    educationalInstitution: {
      id: null,
    },
    schoolBonds: {
      id: null,
    },
    birthDate: '1994-09-09',
    idCity: 1163,
    idRole: 10,
    idDnitUnit: null,
    active: true,
    cpf: '109.649.054-42',
    email: 'gledson.dev@gmail.com',
    name: 'Gledson',
    city: {
      id: 1163,
      name: 'Mossoró',
      state: {
        id: 18,
        name: 'Rio Grande do Norte',
      },
    },
    role: {
      id: 10,
      name: 'admin',
    },
    attachment: [],
    DnitUnit: null,
    institutions: [],
  },
  userRole: {
    id: 10,
    name: 'admin',
  },
  currentPath: '/',
  isLogged: true,
  routes: [
    {
      label: 'Cursos',
      path: '/cursos',
      private: false,
      roles: [10, -1, 2, 3, 4, 5, 11, 14, 6, 15, 12, 7, 16, 13, 9, 8, 17, 18],
    },
    {
      label: 'Projetos e Campanhas',
      path: '/projetos',
      private: false,
      roles: [10, -1, 9, 4, 7, 16, 13, 5, 14, 11, 6, 15, 12, 3, 8, 17, 18, 2],
    },
    {
      label: 'Ações de Ativação',
      path: '/acoes',
      private: true,
      roles: [10, 5, 14, 11, 7, 16, 13, 6, 15, 12, 8, 9],
    },
    {
      label: 'Atividades',
      path: '/atividades',
      private: false,
      roles: [10, -1, 2, 3, 4, 5, 11, 14, 6, 15, 12, 7, 16, 13, 9, 8, 17, 18],
    },
  ],
  sociais: {
    twitter: 'https://twitter.com/DNIToficial',
    facebook: 'https://www.facebook.com/dnitoficial',
    instagram: 'https://www.instagram.com/dnitoficial',
    youtube: 'https://www.youtube.com/channel/UC2Npkytzi0k8YwgNDerVeyQ',
  },
  privatePaths: {
    '/login': [
      {
        role: -1,
        permissions: ['read'],
      },
    ],
    '/': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read'],
      },
      {
        role: 9,
        permissions: ['read'],
      },
      {
        role: 4,
        permissions: ['read'],
      },
      {
        role: 7,
        permissions: ['read'],
      },
      {
        role: 16,
        permissions: ['read'],
      },
      {
        role: 13,
        permissions: ['read'],
      },
      {
        role: 5,
        permissions: ['read'],
      },
      {
        role: 14,
        permissions: ['read'],
      },
      {
        role: 11,
        permissions: ['read'],
      },
      {
        role: 6,
        permissions: ['read'],
      },
      {
        role: 15,
        permissions: ['read'],
      },
      {
        role: 12,
        permissions: ['read'],
      },
      {
        role: 3,
        permissions: ['read'],
      },
      {
        role: 8,
        permissions: ['read'],
      },
      {
        role: 17,
        permissions: ['read'],
      },
      {
        role: 18,
        permissions: ['read'],
      },
      {
        role: 2,
        permissions: ['read'],
      },
    ],
    '/cursos': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read'],
      },
      {
        role: 9,
        permissions: ['read', 'comment'],
      },
      {
        role: 4,
        permissions: ['read', 'comment'],
      },
      {
        role: 7,
        permissions: ['read', 'comment'],
      },
      {
        role: 16,
        permissions: ['read', 'comment'],
      },
      {
        role: 13,
        permissions: ['read', 'comment'],
      },
      {
        role: 5,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 14,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 11,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 6,
        permissions: ['read', 'comment'],
      },
      {
        role: 15,
        permissions: ['read', 'comment'],
      },
      {
        role: 12,
        permissions: ['read', 'comment'],
      },
      {
        role: 3,
        permissions: ['read', 'comment'],
      },
      {
        role: 8,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 17,
        permissions: ['read', 'comment'],
      },
      {
        role: 18,
        permissions: ['read', 'comment'],
      },
      {
        role: 2,
        permissions: ['read', 'comment'],
      },
    ],
    '/cursos/:id': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read'],
      },
      {
        role: 9,
        permissions: ['read', 'comment'],
      },
      {
        role: 4,
        permissions: ['read', 'comment'],
      },
      {
        role: 7,
        permissions: ['read', 'comment'],
      },
      {
        role: 16,
        permissions: ['read', 'comment'],
      },
      {
        role: 13,
        permissions: ['read', 'comment'],
      },
      {
        role: 5,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 14,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 11,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 6,
        permissions: ['read', 'comment'],
      },
      {
        role: 15,
        permissions: ['read', 'comment'],
      },
      {
        role: 12,
        permissions: ['read', 'comment'],
      },
      {
        role: 3,
        permissions: ['read', 'comment'],
      },
      {
        role: 8,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 17,
        permissions: ['read', 'comment'],
      },
      {
        role: 18,
        permissions: ['read', 'comment'],
      },
      {
        role: 2,
        permissions: ['read', 'comment'],
      },
    ],
    '/busca-geral': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read'],
      },
      {
        role: 9,
        permissions: ['read'],
      },
      {
        role: 4,
        permissions: ['read'],
      },
      {
        role: 7,
        permissions: ['read'],
      },
      {
        role: 16,
        permissions: ['read'],
      },
      {
        role: 13,
        permissions: ['read'],
      },
      {
        role: 5,
        permissions: ['read'],
      },
      {
        role: 14,
        permissions: ['read'],
      },
      {
        role: 11,
        permissions: ['read'],
      },
      {
        role: 6,
        permissions: ['read'],
      },
      {
        role: 15,
        permissions: ['read'],
      },
      {
        role: 12,
        permissions: ['read'],
      },
      {
        role: 3,
        permissions: ['read'],
      },
      {
        role: 8,
        permissions: ['read'],
      },
      {
        role: 17,
        permissions: ['read'],
      },
      {
        role: 18,
        permissions: ['read'],
      },
      {
        role: 2,
        permissions: ['read'],
      },
    ],
    '/acoes/:id': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read', 'comment'],
      },
      {
        role: 7,
        permissions: ['read', 'comment'],
      },
      {
        role: 16,
        permissions: ['read', 'comment'],
      },
      {
        role: 13,
        permissions: ['read', 'comment'],
      },
      {
        role: 5,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 14,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 11,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 6,
        permissions: ['read', 'comment'],
      },
      {
        role: 15,
        permissions: ['read', 'comment'],
      },
      {
        role: 12,
        permissions: ['read', 'comment'],
      },
      {
        role: 8,
        permissions: ['read', 'comment', 'moderateComments'],
      },
    ],
    '/acoes': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read', 'comment'],
      },
      {
        role: 7,
        permissions: ['read', 'comment'],
      },
      {
        role: 16,
        permissions: ['read', 'comment'],
      },
      {
        role: 13,
        permissions: ['read', 'comment'],
      },
      {
        role: 5,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 14,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 11,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 6,
        permissions: ['read', 'comment'],
      },
      {
        role: 15,
        permissions: ['read', 'comment'],
      },
      {
        role: 12,
        permissions: ['read', 'comment'],
      },
      {
        role: 8,
        permissions: ['read', 'comment', 'moderateComments'],
      },
    ],
    '/cadastro': [
      {
        role: -1,
        permissions: ['read', 'write'],
      },
    ],
    '/atividades': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read'],
      },
      {
        role: 4,
        permissions: ['read'],
      },
      {
        role: 7,
        permissions: ['read'],
      },
      {
        role: 16,
        permissions: ['read'],
      },
      {
        role: 13,
        permissions: ['read'],
      },
      {
        role: 5,
        permissions: ['read'],
      },
      {
        role: 14,
        permissions: ['read'],
      },
      {
        role: 11,
        permissions: ['read'],
      },
      {
        role: 6,
        permissions: ['read'],
      },
      {
        role: 15,
        permissions: ['read'],
      },
      {
        role: 12,
        permissions: ['read'],
      },
      {
        role: 3,
        permissions: ['read'],
      },
      {
        role: 8,
        permissions: ['read'],
      },
      {
        role: 17,
        permissions: ['read'],
      },
      {
        role: 18,
        permissions: ['read'],
      },
      {
        role: 2,
        permissions: ['read'],
      },
    ],
    '/atividades/:id': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read'],
      },
      {
        role: 4,
        permissions: ['read'],
      },
      {
        role: 7,
        permissions: ['read'],
      },
      {
        role: 16,
        permissions: ['read'],
      },
      {
        role: 13,
        permissions: ['read'],
      },
      {
        role: 5,
        permissions: ['read'],
      },
      {
        role: 14,
        permissions: ['read'],
      },
      {
        role: 11,
        permissions: ['read'],
      },
      {
        role: 6,
        permissions: ['read'],
      },
      {
        role: 15,
        permissions: ['read'],
      },
      {
        role: 12,
        permissions: ['read'],
      },
      {
        role: 3,
        permissions: ['read'],
      },
      {
        role: 8,
        permissions: ['read'],
      },
      {
        role: 17,
        permissions: ['read'],
      },
      {
        role: 18,
        permissions: ['read'],
      },
      {
        role: 2,
        permissions: ['read'],
      },
    ],
    '/atividades/:id/avaliacoes': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read'],
      },
      {
        role: 4,
        permissions: ['read'],
      },
      {
        role: 7,
        permissions: ['read'],
      },
      {
        role: 16,
        permissions: ['read'],
      },
      {
        role: 13,
        permissions: ['read'],
      },
      {
        role: 5,
        permissions: ['read'],
      },
      {
        role: 14,
        permissions: ['read'],
      },
      {
        role: 11,
        permissions: ['read'],
      },
      {
        role: 6,
        permissions: ['read'],
      },
      {
        role: 15,
        permissions: ['read'],
      },
      {
        role: 12,
        permissions: ['read'],
      },
      {
        role: 3,
        permissions: ['read'],
      },
      {
        role: 8,
        permissions: ['read'],
      },
      {
        role: 17,
        permissions: ['read'],
      },
      {
        role: 18,
        permissions: ['read'],
      },
      {
        role: 2,
        permissions: ['read'],
      },
    ],
    '/mensagens/:id': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read', 'write'],
      },
      {
        role: 4,
        permissions: ['read', 'write'],
      },
      {
        role: 7,
        permissions: ['read', 'write'],
      },
      {
        role: 16,
        permissions: ['read', 'write'],
      },
      {
        role: 13,
        permissions: ['read', 'write'],
      },
      {
        role: 5,
        permissions: ['read', 'write'],
      },
      {
        role: 14,
        permissions: ['read', 'write'],
      },
      {
        role: 11,
        permissions: ['read', 'write'],
      },
      {
        role: 6,
        permissions: ['read', 'write'],
      },
      {
        role: 15,
        permissions: ['read', 'write'],
      },
      {
        role: 12,
        permissions: ['read', 'write'],
      },
      {
        role: 3,
        permissions: ['read', 'write'],
      },
      {
        role: 8,
        permissions: ['read', 'write'],
      },
      {
        role: 17,
        permissions: ['read', 'write'],
      },
      {
        role: 18,
        permissions: ['read', 'write'],
      },
      {
        role: 2,
        permissions: ['read', 'write'],
      },
    ],
    '/mensagens': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read', 'write'],
      },
      {
        role: 4,
        permissions: ['read', 'write'],
      },
      {
        role: 7,
        permissions: ['read', 'write'],
      },
      {
        role: 16,
        permissions: ['read', 'write'],
      },
      {
        role: 13,
        permissions: ['read', 'write'],
      },
      {
        role: 5,
        permissions: ['read', 'write'],
      },
      {
        role: 14,
        permissions: ['read', 'write'],
      },
      {
        role: 11,
        permissions: ['read', 'write'],
      },
      {
        role: 6,
        permissions: ['read', 'write'],
      },
      {
        role: 15,
        permissions: ['read', 'write'],
      },
      {
        role: 12,
        permissions: ['read', 'write'],
      },
      {
        role: 3,
        permissions: ['read', 'write'],
      },
      {
        role: 8,
        permissions: ['read', 'write'],
      },
      {
        role: 17,
        permissions: ['read', 'write'],
      },
      {
        role: 18,
        permissions: ['read', 'write'],
      },
      {
        role: 2,
        permissions: ['read', 'write'],
      },
    ],
    '/mensagens/enviar': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read', 'write'],
      },
      {
        role: 4,
        permissions: ['read', 'write'],
      },
      {
        role: 7,
        permissions: ['read', 'write'],
      },
      {
        role: 16,
        permissions: ['read', 'write'],
      },
      {
        role: 13,
        permissions: ['read', 'write'],
      },
      {
        role: 5,
        permissions: ['read', 'write'],
      },
      {
        role: 14,
        permissions: ['read', 'write'],
      },
      {
        role: 11,
        permissions: ['read', 'write'],
      },
      {
        role: 6,
        permissions: ['read', 'write'],
      },
      {
        role: 15,
        permissions: ['read', 'write'],
      },
      {
        role: 12,
        permissions: ['read', 'write'],
      },
      {
        role: 3,
        permissions: ['read', 'write'],
      },
      {
        role: 8,
        permissions: ['read', 'write'],
      },
      {
        role: 17,
        permissions: ['read', 'write'],
      },
      {
        role: 18,
        permissions: ['read', 'write'],
      },
      {
        role: 2,
        permissions: ['read', 'write'],
      },
    ],
    '/minhas-iniciativas/:id': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 4,
        permissions: ['read', 'write'],
      },
      {
        role: 7,
        permissions: ['read', 'write'],
      },
      {
        role: 16,
        permissions: ['read', 'write'],
      },
      {
        role: 13,
        permissions: ['read', 'write'],
      },
      {
        role: 5,
        permissions: ['read', 'write'],
      },
      {
        role: 14,
        permissions: ['read', 'write'],
      },
      {
        role: 11,
        permissions: ['read', 'write'],
      },
      {
        role: 6,
        permissions: ['read', 'write'],
      },
      {
        role: 15,
        permissions: ['read', 'write'],
      },
      {
        role: 12,
        permissions: ['read', 'write'],
      },
      {
        role: 3,
        permissions: ['read', 'write'],
      },
    ],
    '/minhas-iniciativas/enviar': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 4,
        permissions: ['read', 'write'],
      },
      {
        role: 7,
        permissions: ['read', 'write'],
      },
      {
        role: 16,
        permissions: ['read', 'write'],
      },
      {
        role: 13,
        permissions: ['read', 'write'],
      },
      {
        role: 5,
        permissions: ['read', 'write'],
      },
      {
        role: 14,
        permissions: ['read', 'write'],
      },
      {
        role: 11,
        permissions: ['read', 'write'],
      },
      {
        role: 6,
        permissions: ['read', 'write'],
      },
      {
        role: 15,
        permissions: ['read', 'write'],
      },
      {
        role: 12,
        permissions: ['read', 'write'],
      },
      {
        role: 3,
        permissions: ['read', 'write'],
      },
    ],
    '/minhas-iniciativas': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 4,
        permissions: ['read', 'write'],
      },
      {
        role: 7,
        permissions: ['read', 'write'],
      },
      {
        role: 16,
        permissions: ['read', 'write'],
      },
      {
        role: 13,
        permissions: ['read', 'write'],
      },
      {
        role: 5,
        permissions: ['read', 'write'],
      },
      {
        role: 14,
        permissions: ['read', 'write'],
      },
      {
        role: 11,
        permissions: ['read', 'write'],
      },
      {
        role: 6,
        permissions: ['read', 'write'],
      },
      {
        role: 15,
        permissions: ['read', 'write'],
      },
      {
        role: 12,
        permissions: ['read', 'write'],
      },
      {
        role: 3,
        permissions: ['read', 'write'],
      },
    ],
    '/perfil': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read', 'write'],
      },
      {
        role: 4,
        permissions: ['read', 'write'],
      },
      {
        role: 7,
        permissions: ['read', 'write'],
      },
      {
        role: 16,
        permissions: ['read', 'write'],
      },
      {
        role: 13,
        permissions: ['read', 'write'],
      },
      {
        role: 5,
        permissions: ['read', 'write'],
      },
      {
        role: 14,
        permissions: ['read', 'write'],
      },
      {
        role: 11,
        permissions: ['read', 'write'],
      },
      {
        role: 6,
        permissions: ['read', 'write'],
      },
      {
        role: 15,
        permissions: ['read', 'write'],
      },
      {
        role: 12,
        permissions: ['read', 'write'],
      },
      {
        role: 3,
        permissions: ['read', 'write'],
      },
      {
        role: 8,
        permissions: ['read', 'write'],
      },
      {
        role: 17,
        permissions: ['read', 'write'],
      },
      {
        role: 18,
        permissions: ['read', 'write'],
      },
      {
        role: 2,
        permissions: ['read', 'write'],
      },
    ],
    '/projetos': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read'],
      },
      {
        role: 9,
        permissions: ['read', 'comment'],
      },
      {
        role: 4,
        permissions: ['read', 'comment'],
      },
      {
        role: 7,
        permissions: ['read', 'comment'],
      },
      {
        role: 16,
        permissions: ['read', 'comment'],
      },
      {
        role: 13,
        permissions: ['read', 'comment'],
      },
      {
        role: 5,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 14,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 11,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 6,
        permissions: ['read', 'comment'],
      },
      {
        role: 15,
        permissions: ['read', 'comment'],
      },
      {
        role: 12,
        permissions: ['read', 'comment'],
      },
      {
        role: 3,
        permissions: ['read', 'comment'],
      },
      {
        role: 8,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 17,
        permissions: ['read', 'comment'],
      },
      {
        role: 18,
        permissions: ['read', 'comment'],
      },
      {
        role: 2,
        permissions: ['read', 'comment'],
      },
    ],
    '/projetos/:id': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read'],
      },
      {
        role: 9,
        permissions: ['read', 'comment'],
      },
      {
        role: 4,
        permissions: ['read', 'comment'],
      },
      {
        role: 7,
        permissions: ['read', 'comment'],
      },
      {
        role: 16,
        permissions: ['read', 'comment'],
      },
      {
        role: 13,
        permissions: ['read', 'comment'],
      },
      {
        role: 5,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 14,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 11,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 6,
        permissions: ['read', 'comment'],
      },
      {
        role: 15,
        permissions: ['read', 'comment'],
      },
      {
        role: 12,
        permissions: ['read', 'comment'],
      },
      {
        role: 3,
        permissions: ['read', 'comment'],
      },
      {
        role: 8,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 17,
        permissions: ['read', 'comment'],
      },
      {
        role: 18,
        permissions: ['read', 'comment'],
      },
      {
        role: 2,
        permissions: ['read', 'comment'],
      },
    ],
    '/projetos/:idProject/acoes/:idAction': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read'],
      },
      {
        role: 9,
        permissions: ['read', 'comment'],
      },
      {
        role: 4,
        permissions: ['read', 'comment'],
      },
      {
        role: 7,
        permissions: ['read', 'comment'],
      },
      {
        role: 16,
        permissions: ['read', 'comment'],
      },
      {
        role: 13,
        permissions: ['read', 'comment'],
      },
      {
        role: 5,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 14,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 11,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 6,
        permissions: ['read', 'comment'],
      },
      {
        role: 15,
        permissions: ['read', 'comment'],
      },
      {
        role: 12,
        permissions: ['read', 'comment'],
      },
      {
        role: 3,
        permissions: ['read', 'comment'],
      },
      {
        role: 8,
        permissions: ['read', 'comment', 'moderateComments'],
      },
      {
        role: 17,
        permissions: ['read', 'comment'],
      },
      {
        role: 18,
        permissions: ['read', 'comment'],
      },
      {
        role: 2,
        permissions: ['read', 'comment'],
      },
    ],
    '/relatorios': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 7,
        permissions: ['read'],
      },
      {
        role: 16,
        permissions: ['read'],
      },
      {
        role: 13,
        permissions: ['read'],
      },
      {
        role: 5,
        permissions: ['read'],
      },
      {
        role: 14,
        permissions: ['read'],
      },
      {
        role: 11,
        permissions: ['read'],
      },
      {
        role: 6,
        permissions: ['read'],
      },
      {
        role: 15,
        permissions: ['read'],
      },
      {
        role: 12,
        permissions: ['read'],
      },
    ],
    '/sobre': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 4,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 7,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 16,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 13,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 5,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 14,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 11,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 6,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 15,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 12,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 3,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 8,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 17,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 18,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 2,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
    ],
    '/como-participar': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 4,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 7,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 16,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 13,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 5,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 14,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 11,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 6,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 15,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 12,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 3,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 8,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 17,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 18,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 2,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
    ],
    '/equipe': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 4,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 7,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 16,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 13,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 5,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 14,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 11,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 6,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 15,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 12,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 3,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 8,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 17,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 18,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 2,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
    ],
    '/escolas-participantes': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 9,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 4,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 7,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 16,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 13,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 5,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 14,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 11,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 6,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 15,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 12,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 3,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 8,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 17,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 18,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: 2,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
    ],
    'https://conexao-dnit-hom.labtrans.ufsc.br/cms': [
      {
        role: 10,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 5,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 6,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 7,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 11,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 12,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 13,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 14,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 15,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 16,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 8,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 9,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 17,
        permissions: ['share', 'publish', 'read', 'write'],
      },
      {
        role: 18,
        permissions: ['share', 'publish', 'read', 'write'],
      },
    ],
    '/politica-de-privacidade': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read'],
      },
      {
        role: 9,
        permissions: ['read'],
      },
      {
        role: 4,
        permissions: ['read'],
      },
      {
        role: 7,
        permissions: ['read'],
      },
      {
        role: 16,
        permissions: ['read'],
      },
      {
        role: 13,
        permissions: ['read'],
      },
      {
        role: 5,
        permissions: ['read'],
      },
      {
        role: 14,
        permissions: ['read'],
      },
      {
        role: 11,
        permissions: ['read'],
      },
      {
        role: 6,
        permissions: ['read'],
      },
      {
        role: 15,
        permissions: ['read'],
      },
      {
        role: 12,
        permissions: ['read'],
      },
      {
        role: 3,
        permissions: ['read'],
      },
      {
        role: 8,
        permissions: ['read'],
      },
      {
        role: 17,
        permissions: ['read'],
      },
      {
        role: 18,
        permissions: ['read'],
      },
      {
        role: 2,
        permissions: ['read'],
      },
    ],
    '/termos-de-uso': [
      {
        role: 10,
        permissions: ['read', 'comment', 'write', 'publish', 'moderateComments', 'share'],
      },
      {
        role: -1,
        permissions: ['read'],
      },
      {
        role: 9,
        permissions: ['read'],
      },
      {
        role: 4,
        permissions: ['read'],
      },
      {
        role: 7,
        permissions: ['read'],
      },
      {
        role: 16,
        permissions: ['read'],
      },
      {
        role: 13,
        permissions: ['read'],
      },
      {
        role: 5,
        permissions: ['read'],
      },
      {
        role: 14,
        permissions: ['read'],
      },
      {
        role: 11,
        permissions: ['read'],
      },
      {
        role: 6,
        permissions: ['read'],
      },
      {
        role: 15,
        permissions: ['read'],
      },
      {
        role: 12,
        permissions: ['read'],
      },
      {
        role: 3,
        permissions: ['read'],
      },
      {
        role: 8,
        permissions: ['read'],
      },
      {
        role: 17,
        permissions: ['read'],
      },
      {
        role: 18,
        permissions: ['read'],
      },
      {
        role: 2,
        permissions: ['read'],
      },
    ],
  },
  headerMenuIcons: [
    {
      className: 'cms-icon',
      imageAlt: 'Ir para CMS',
      iconClass: 'fas fa-chart-bar',
      path: 'https://conexao-dnit-hom.labtrans.ufsc.br/cms',
      target: '_blank',
      name: 'CMS',
    },
    {
      className: 'share-icon',
      imageAlt: 'Initiative icon',
      imageSrc: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMS40NiIgaGVpZ2h0PSIzMS40NiIgdmlld0JveD0iMCAwIDMxLjQ2IDMxLjQ2Ij4NCiAgPGcgaWQ9Ikljb25fU2hhcmVfRmlsbGVkIiBkYXRhLW5hbWU9Ikljb24gU2hhcmUgRmlsbGVkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTA4OS44NzYgLTE3LjQxNikiPg0KICAgIDxyZWN0IGlkPSJCb3gtMyIgd2lkdGg9IjMxLjQ2IiBoZWlnaHQ9IjMxLjQ2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDg5Ljg3NiAxNy40MTYpIiBmaWxsPSJub25lIi8+DQogICAgPHBhdGggaWQ9IkNhbWluaG9fOTcwIiBkYXRhLW5hbWU9IkNhbWluaG8gOTcwIiBkPSJNMTEwMi4wOSw0Mi4wODRhLjcuNywwLDAsMCwuMTE4LjM4OGwxLjA3OCwxLjYyMWEuNy43LDAsMCwwLC41ODYuMzE0aDMuNDY4YS43LjcsMCwwLDAsLjU4Ni0uMzE0TDExMDksNDIuNDcyYS43LjcsMCwwLDAsLjExOC0uMzg4bDAtMS45aC03LjAzNlptMy41MTYtMjAuMmE3LjczNyw3LjczNywwLDAsMC01LjgyNiwxMi44MzQsMTIuNTg3LDEyLjU4NywwLDAsMSwyLjMwNiw0LjA1NHYwaDIuMTEydi0uMDA1YTIuMDkzLDIuMDkzLDAsMCwwLS4wOTUtLjYxOSwxMy44NjcsMTMuODY3LDAsMCwwLTIuNzM1LTQuODI0LDUuNjMxLDUuNjMxLDAsMSwxLDguNDc3LDAsMTMuODg4LDEzLjg4OCwwLDAsMC0yLjczMiw0LjgxNSwyLjA2LDIuMDYsMCwwLDAtLjEuNjI5djBoMi4xMTJ2MGExMi41ODMsMTIuNTgzLDAsMCwxLDIuMzA1LTQuMDU0LDcuNzM4LDcuNzM4LDAsMCwwLTUuODI2LTEyLjgzNVptMy43NzYsOC4wOTNhLjMwNy4zMDcsMCwwLDEtLjIyNi4wOTVIMTEwNi45djMuNTVhLjMyOC4zMjgsMCwwLDEtLjMyMy4zMjJoLTEuOTM2YS4zMjguMzI4LDAsMCwxLS4zMjItLjMyMnYtMy41NWgtMi4yNThhLjMwOC4zMDgsMCwwLDEtLjMyMy0uMzIyLjM4LjM4LDAsMCwxLC4xLS4yNDJsMy41MzgtMy41MzhhLjMxNi4zMTYsMCwwLDEsLjIzMi0uMDkyLjMxMS4zMTEsMCwwLDEsLjIzMi4wOTJsMy41NDksMy41NDhhLjMyOC4zMjgsMCwwLDEtLjAwNS40NTlaIiBmaWxsPSIjMTM1MWI0IiBzdHlsZT0iaXNvbGF0aW9uOiBpc29sYXRlIi8+DQogIDwvZz4NCjwvc3ZnPg0K',
      iconClass: 'far fa-lightbulb',
      path: '/minhas-iniciativas',
      target: '_self',
      name: 'Enviar Atividade',
    },
    {
      className: 'message-icon',
      imageAlt: 'Chat icon',
      iconClass: 'fas fa-comment',
      path: '/mensagens',
      target: '_self',
      name: 'Mensagens',
    },
  ],
};

const EMPTY = [];

module.exports = { UserLogin };
