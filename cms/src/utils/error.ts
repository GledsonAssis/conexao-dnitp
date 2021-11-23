import i18n from "./i18n";

export enum types {
  Actions = 'Actions',
  Activities = 'Activities',
  Courses = 'Courses',
  DnitLocalUnits = 'DnitLocalUnits',
  ExternalLinks = 'ExternalLinks',
  Highlights = 'Highlights',
  Initiatives = 'Initiatives',
  Home = 'Home',
  Institutions = 'Institutions',
  KnowledgeObjects = 'KnowledgeObjects',
  ProjectActions = 'ProjectActions',
  Projects = 'Projects',
  RegionalSuperintendences = 'RegionalSuperintendences',
  ReportsDownloads = 'Reports.Downloads',
  ReportsInitiatives = 'Reports.Initiatives',
  ReportsInteractivity = 'Reports.Interactivity',
  ReportsMessages = 'Reports.Messages',
  ReportsParticipants = 'Reports.Participants',
  ReportsProjects = 'Reports.Projects',
  ReportsSurvey = 'Reports.Survey',
  Surveys = 'Surveys',
  TrafficConcepts = 'TrafficConcepts',
  TrafficContents = 'TrafficContents',
  Users = 'Users',
  Auth = 'Auth',
  ComponentsAddress = 'Components.Address',
  ParticipatingSchools = 'ParticipatingSchools',
  Disciplines = 'Disciplines',
  GeneralSearch = 'GeneralSearch',
  Messages = 'Messages',
  GenericCsv = 'Generic.Csv',
  SchoolYear = 'SchoolYear',
  States = 'States',
  Subjects = 'Subjects',
  TrafficScopes = 'TrafficScopes',
  Surveies = 'Surveies',
}

export const parseError = (data: any, reference?: types): { code: number, message: string } => {
  switch (data?.status) {
    case 404:
      return {
        code: 404,
        message: i18n.t(`Generic.404`)
      }
    case 500:
      return {
        code: 500,
        message: i18n.t(`Generic.500`)
      }
    default: {
      return {
        code: +data?.status,
        message: i18n.t(`${reference}.${(data?.data?.error || data?.message_token)}`)
      }
    }
  }
};
