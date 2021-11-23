export enum ReportsTypes {
  LOAD_REPORTS_INITIATIVES_REQUEST_LIST = '@reports/initiatives/list/LOAD_REQUEST',
  LOAD_REPORTS_INITIATIVES_SUCCESS_LIST = '@reports/initiatives/list/LOAD_SUCCESS',
  LOAD_REPORTS_INITIATIVES_FAILURE_LIST = '@reports/initiatives/list/LOAD_FAILURE',

  LOAD_REPORTS_INTERACTIVITIES_REQUEST_LIST = '@reports/interactivities/list/LOAD_REQUEST',
  LOAD_REPORTS_INTERACTIVITIES_SUCCESS_LIST = '@reports/interactivities/list/LOAD_SUCCESS',
  LOAD_REPORTS_INTERACTIVITIES_FAILURE_LIST = '@reports/interactivities/list/LOAD_FAILURE',

  LOAD_REPORTS_PROJECTS_REQUEST_LIST = '@reports/projects/list/LOAD_REQUEST',
  LOAD_REPORTS_PROJECTS_SUCCESS_LIST = '@reports/projects/list/LOAD_SUCCESS',
  LOAD_REPORTS_PROJECTS_FAILURE_LIST = '@reports/projects/list/LOAD_FAILURE',

  LOAD_REPORTS_MESSAGES_REQUEST_LIST = '@reports/messages/list/LOAD_REQUEST',
  LOAD_REPORTS_MESSAGES_SUCCESS_LIST = '@reports/messages/list/LOAD_SUCCESS',
  LOAD_REPORTS_MESSAGES_FAILURE_LIST = '@reports/messages/list/LOAD_FAILURE',

  LOAD_REPORTS_DOWNLOADS_REQUEST_LIST = '@reports/downloads/list/LOAD_REQUEST',
  LOAD_REPORTS_DOWNLOADS_SUCCESS_LIST = '@reports/downloads/list/LOAD_SUCCESS',
  LOAD_REPORTS_DOWNLOADS_FAILURE_LIST = '@reports/downloads/list/LOAD_FAILURE',

  LOAD_REPORTS_SURVEIES_REQUEST_LIST = '@reports/surveies/list/LOAD_REQUEST',
  LOAD_REPORTS_SURVEIES_SUCCESS_LIST = '@reports/surveies/list/LOAD_SUCCESS',
  LOAD_REPORTS_SURVEIES_FAILURE_LIST = '@reports/surveies/list/LOAD_FAILURE',

  LOAD_REPORTS_PARTICIPANTS_REQUEST_LIST = '@reports/participants/list/LOAD_REQUEST',
  LOAD_REPORTS_PARTICIPANTS_SUCCESS_LIST = '@reports/participants/list/LOAD_SUCCESS',
  LOAD_REPORTS_PARTICIPANTS_FAILURE_LIST = '@reports/participants/list/LOAD_FAILURE',

  LOAD_REPORTS_REQUEST_GET_LIST_CSV = '@reports/listCsv/LOAD_REQUEST',
}

export interface Initiative {
  "Situação": string
  "Data Envio": string;
  "Autor": string;
  "Superintendência": string;
  "Unidade Local": string;
  "Instituição de Ensino": string
}

export interface Interactivity {
  "Tipo": string;
  "Categoria": string;
  "Data": string;
  "UF": string;
  "Classificação": any;
}

export interface Message {
  "Tipo": string;
  "Data": string;
  "Assunto": string;
  "Superintendência Regional": string;
  "Unidade Local": string;
  "Remetente": string;
  "Situação": string;
  "Tempo de Resposta": string
}

export interface Download {
  "Ano": number;
  "Disciplina": string;
  "Atividade": string;
  "Data Download": string;
  "Nome do Professor": string;
  "Tipo": string;
  "Superintendência": string;
  "Unidade Local": string;
  "Instituição de Ensino": string;
}

export interface Survey {
  "type": string;
  "situation": string;
  "year": number;
  "discipline": string;
  "teacher": string;
  "activity": string;
  "regionalSuperintendence": string;
  "dnitLocalUnit": string;
  "institution": string;
}

export interface Participant {
  "Data do Cadastro": string;
  "Nome": string;
  "E-mail": string;
  "Perfil": string;
  "Superintendência": string;
  "Unidade Local": string;
  "Instituição de Ensino": string;
  "Último Acesso": string;
}

export type Reports = {
  initiative: Initiative,
  interactivity: Interactivity,
  project: any, // TODO: tipar
  message: Message,
  download: Download,
  survey: Survey,
  participant: Participant,
};

export interface ReportsState {
  readonly initiatives: Initiative[];
  readonly interactivities: Interactivity[];
  readonly projects: any[]; // TODO: tipar
  readonly messages: Message[];
  readonly downloads: Download[];
  readonly surveies: Survey[];
  readonly participants: Participant[];
  readonly loading: boolean;
  readonly error: boolean;
}
