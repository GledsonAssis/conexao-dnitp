import { all, takeLatest } from 'redux-saga/effects';

import { ActionsTypes } from './actions/types';
import { ActivitiesTypes } from './activities/types';
import { CoursesTypes } from './courses/types';
import { ExternalLinksTypes } from './externalLinks/types';
import { ExternalApisTypes } from './externalApis/types';
import { ProjectsTypes } from './projects/types';
import { ProjectActionsTypes } from './projectsActions/types';
import { HighlightsTypes } from './highlights/types';
import { DisciplinesTypes } from './disciplines/types';
import { SchoolYearsTypes } from './schoolYear/types';
import { SubjectsTypes } from './subjects/types';
import { TrafficConceptsTypes } from './trafficConcepts/types';
import { TrafficContentsTypes } from './trafficContents/types';
import { TrafficScopesTypes } from './trafficScopes/types';
import { InitiativesTypes } from './initiatives/types';
import { MessagesTypes } from './messages/types';
import { OAuthTypes } from './oauth/types';
import { StatesTypes } from './states/types';
import { ParticipatingSchoolsTypes } from './participatingSchools/types';
import { RegionalSuperintendencesTypes } from './regionalSuperintendences/types';
import { DnitLocalUnitsTypes } from './dnitLocalUnits/types';
import { InstitutionsTypes } from './institutions/types';
import { KnowledgeObjectsTypes } from './knowledgeObjects/types';
import { UsersTypes } from './users/types';
import { ReportsTypes } from './reports/types';
import { SurveiesTypes } from './surveies/types';

import * as actions from './actions/sagas';
import * as activites from './activities/sagas';
import * as courses from './courses/sagas';
import * as externalLinks from './externalLinks/sagas';
import * as externalApis from './externalApis/sagas';
import * as projects from './projects/sagas';
import * as projectActions from './projectsActions/sagas';
import * as highlights from './highlights/sagas';
import * as regionalSuperintendences from './regionalSuperintendences/sagas';
import * as disciplines from './disciplines/sagas';
import * as schoolYears from './schoolYear/sagas';
import * as subjects from './subjects/sagas';
import * as trafficConcepts from './trafficConcepts/sagas';
import * as trafficContents from './trafficContents/sagas';
import * as trafficScopes from './trafficScopes/sagas';
import * as initiatives from './initiatives/sagas';
import * as messages from './messages/sagas';
import * as oauth from './oauth/sagas';
import * as states from './states/sagas';
import * as participatingSchools from './participatingSchools/sagas';
import * as dnitLocalUnits from './dnitLocalUnits/sagas';
import * as institutions from './institutions/sagas';
import * as knowledgeObects from './knowledgeObjects/sagas';
import * as users from './users/sagas';
import * as reports from './reports/sagas';
import * as surveies from './surveies/sagas';

export function* rootSaga() {
  yield all([
    // OAuth
    takeLatest(OAuthTypes.LOAD_REQUEST_LOGIN, oauth.loadLogin),
    takeLatest(OAuthTypes.LOAD_REQUEST_LOGOUT, oauth.loadLogout),
    takeLatest(OAuthTypes.LOAD_REQUEST_IS_MODERATOR, oauth.isModerator),

    // courses
    takeLatest(CoursesTypes.LOAD_REQUEST_LIST, courses.list),
    takeLatest(CoursesTypes.LOAD_REQUEST_PUBLISH, courses.publish),
    takeLatest(CoursesTypes.LOAD_REQUEST_FETCH_ID, courses.fetchOne),
    takeLatest(CoursesTypes.LOAD_REQUEST_GET_LIST_CSV, courses.getListCSV),
    takeLatest(CoursesTypes.LOAD_REQUEST_SUBMIT, courses.submit),
    takeLatest(CoursesTypes.LOAD_REQUEST_GET_ID_ATTACHMENTS, courses.getAttachment),

    // projects
    takeLatest(ProjectsTypes.LOAD_REQUEST_LIST, projects.list),
    takeLatest(ProjectsTypes.LOAD_REQUEST_PUBLISH, projects.publish),
    takeLatest(ProjectsTypes.LOAD_REQUEST_FETCH_ID, projects.fetchOne),
    takeLatest(ProjectsTypes.LOAD_REQUEST_GET_LIST_CSV, projects.getListCSV),
    takeLatest(ProjectsTypes.LOAD_REQUEST_SUBMIT, projects.submit),
    takeLatest(ProjectsTypes.LOAD_REQUEST_GET_ID_ATTACHMENTS, projects.getAttachment),

    // projectActions
    takeLatest(ProjectActionsTypes.LOAD_REQUEST_LIST, projectActions.list),
    takeLatest(ProjectActionsTypes.LOAD_REQUEST_PUBLISH, projectActions.publish),
    takeLatest(ProjectActionsTypes.LOAD_REQUEST_FETCH_ID, projectActions.fetchOne),
    takeLatest(ProjectActionsTypes.LOAD_REQUEST_GET_LIST_CSV, projectActions.getListCSV),
    takeLatest(ProjectActionsTypes.LOAD_REQUEST_SUBMIT, projectActions.submit),
    takeLatest(ProjectActionsTypes.LOAD_REQUEST_GET_ID_ATTACHMENTS, projectActions.getAttachment),

    // actions
    takeLatest(ActionsTypes.LOAD_REQUEST_LIST, actions.list),
    takeLatest(ActionsTypes.LOAD_REQUEST_PUBLISH, actions.publish),
    takeLatest(ActionsTypes.LOAD_REQUEST_FETCH_ID, actions.fetchOne),
    takeLatest(ActionsTypes.LOAD_REQUEST_GET_LIST_CSV, actions.getListCSV),
    takeLatest(ActionsTypes.LOAD_REQUEST_SUBMIT, actions.submit),
    takeLatest(ActionsTypes.LOAD_REQUEST_GET_ID_ATTACHMENTS, actions.getAttachment),

    // externalLinks
    takeLatest(ExternalLinksTypes.LOAD_REQUEST_LIST, externalLinks.list),
    takeLatest(ExternalLinksTypes.LOAD_REQUEST_PUBLISH, externalLinks.publish),
    takeLatest(ExternalLinksTypes.LOAD_REQUEST_FETCH_ID, externalLinks.fetchOne),
    takeLatest(ExternalLinksTypes.LOAD_REQUEST_GET_LIST_CSV, externalLinks.getListCSV),
    takeLatest(ExternalLinksTypes.LOAD_REQUEST_SUBMIT, externalLinks.submit),

    // highlights
    takeLatest(HighlightsTypes.LOAD_REQUEST_LIST, highlights.list),
    takeLatest(HighlightsTypes.LOAD_REQUEST_SUBMIT, highlights.submit),

    // regionalSuperintendences
    takeLatest(RegionalSuperintendencesTypes.LOAD_REQUEST_LIST, regionalSuperintendences.list),
    takeLatest(RegionalSuperintendencesTypes.LOAD_REQUEST_FETCH_ID, regionalSuperintendences.fetchOne),
    takeLatest(RegionalSuperintendencesTypes.LOAD_REQUEST_DELETE_ID, regionalSuperintendences.deleteOne),
    takeLatest(RegionalSuperintendencesTypes.LOAD_REQUEST_GET_LIST_CSV, regionalSuperintendences.getListCSV),
    takeLatest(RegionalSuperintendencesTypes.LOAD_REQUEST_SUBMIT, regionalSuperintendences.submit),

    // externalApis
    takeLatest(ExternalApisTypes.ViaCepTypes.LOAD_REQUEST_GET_ZIPOCODE, externalApis.fetchZipCode),

    // States
    takeLatest(StatesTypes.LOAD_REQUEST_LIST, states.list),
    takeLatest(StatesTypes.LOAD_REQUEST_CITIES, states.citiesList),
    takeLatest(StatesTypes.LOAD_REQUEST_INSTITUITIONS, states.institutionsList),
    takeLatest(StatesTypes.LOAD_REQUEST_FIELDKNOWLEDGES, states.fieldKnowledgesList),

    // trafficConcepts
    takeLatest(TrafficConceptsTypes.LOAD_REQUEST_FETCH_ID, trafficConcepts.fetchOne),
    takeLatest(TrafficConceptsTypes.LOAD_REQUEST_DELETE_ID, trafficConcepts.deleteOne),
    takeLatest(TrafficConceptsTypes.LOAD_REQUEST_SUBMIT, trafficConcepts.submit),
    takeLatest(TrafficConceptsTypes.LOAD_REQUEST_LIST, trafficConcepts.list),
    takeLatest(TrafficConceptsTypes.LOAD_REQUEST_GET_LIST_CSV, trafficConcepts.getListCSV),

    // trafficContents
    takeLatest(TrafficContentsTypes.LOAD_REQUEST_FETCH_ID, trafficContents.fetchOne),
    takeLatest(TrafficContentsTypes.LOAD_REQUEST_DELETE_ID, trafficContents.deleteOne),
    takeLatest(TrafficContentsTypes.LOAD_REQUEST_SUBMIT, trafficContents.submit),
    takeLatest(TrafficContentsTypes.LOAD_REQUEST_LIST, trafficContents.list),
    takeLatest(TrafficContentsTypes.LOAD_REQUEST_GET_LIST_CSV, trafficContents.getListCSV),

    // trafficScopes
    takeLatest(TrafficScopesTypes.LOAD_REQUEST_FETCH_ID, trafficScopes.fetchOne),
    takeLatest(TrafficScopesTypes.LOAD_REQUEST_DELETE_ID, trafficScopes.deleteOne),
    takeLatest(TrafficScopesTypes.LOAD_REQUEST_SUBMIT, trafficScopes.submit),
    takeLatest(TrafficScopesTypes.LOAD_REQUEST_LIST, trafficScopes.list),

    // dnitLocalUnits
    takeLatest(DnitLocalUnitsTypes.LOAD_REQUEST_LIST, dnitLocalUnits.list),
    takeLatest(DnitLocalUnitsTypes.LOAD_REQUEST_FETCH_ID, dnitLocalUnits.fetchOne),
    takeLatest(DnitLocalUnitsTypes.LOAD_REQUEST_DELETE_ID, dnitLocalUnits.deleteOne),
    takeLatest(DnitLocalUnitsTypes.LOAD_REQUEST_GET_LIST_CSV, dnitLocalUnits.getListCSV),
    takeLatest(DnitLocalUnitsTypes.LOAD_REQUEST_SUBMIT, dnitLocalUnits.submit),
    takeLatest(DnitLocalUnitsTypes.LOAD_REQUEST_LIST_SUPERINTENDENCES, dnitLocalUnits.listSuperintendences),
    takeLatest(DnitLocalUnitsTypes.LOAD_REQUEST_LIST_ROADS, dnitLocalUnits.listRoads),
    takeLatest(DnitLocalUnitsTypes.LOAD_REQUEST_LIST_CITIES_BY_LOCAL_UNIT, dnitLocalUnits.listCitiesByIdLocalUnit),

    // institutions
    takeLatest(InstitutionsTypes.LOAD_REQUEST_LIST, institutions.list),
    takeLatest(InstitutionsTypes.LOAD_REQUEST_FETCH_ID, institutions.fetchOne),
    takeLatest(InstitutionsTypes.LOAD_REQUEST_DELETE_ID, institutions.deleteOne),
    takeLatest(InstitutionsTypes.LOAD_REQUEST_GET_LIST_CSV, institutions.getListCSV),
    takeLatest(InstitutionsTypes.LOAD_REQUEST_SUBMIT, institutions.submit),

    // knowledgeObects
    takeLatest(KnowledgeObjectsTypes.LOAD_REQUEST_LIST, knowledgeObects.list),
    takeLatest(KnowledgeObjectsTypes.LOAD_REQUEST_FETCH_ID, knowledgeObects.fetchOne),
    takeLatest(KnowledgeObjectsTypes.LOAD_REQUEST_DELETE_ID, knowledgeObects.deleteOne),
    takeLatest(KnowledgeObjectsTypes.LOAD_REQUEST_GET_LIST_CSV, knowledgeObects.getListCSV),
    takeLatest(KnowledgeObjectsTypes.LOAD_REQUEST_SUBMIT, knowledgeObects.submit),

    // initiatives
    takeLatest(InitiativesTypes.LOAD_REQUEST_FETCH, initiatives.list),
    takeLatest(InitiativesTypes.LOAD_REQUEST_SUBMIT, initiatives.submitInitiative),
    takeLatest(InitiativesTypes.LOAD_REQUEST_FETCH_ID, initiatives.fetch),
    takeLatest(InitiativesTypes.LOAD_REQUEST_GET_ATTACHMENT, initiatives.getAttachment),
    takeLatest(InitiativesTypes.LOAD_REQUEST_GET_LIST_CSV, initiatives.getListCSV),
    takeLatest(InitiativesTypes.LOAD_REQUEST_LIST_BY_STATUS, initiatives.initiativesByStatus),
    takeLatest(InitiativesTypes.LOAD_REQUEST_LIST_STATUS, initiatives.initiativesStatus),

    // users
    takeLatest(UsersTypes.LOAD_REQUEST_LIST, users.list),
    takeLatest(UsersTypes.LOAD_REQUEST_SUBMIT, users.submit),
    takeLatest(UsersTypes.LOAD_REQUEST_FETCH, users.fetch),
    takeLatest(UsersTypes.LOAD_REQUEST_GET_LIST_CSV, users.getListCSV),
    takeLatest(UsersTypes.LOAD_REQUEST_ACTIVE, users.active),
    takeLatest(UsersTypes.LOAD_REQUEST_ROLES, users.listRoles),
    takeLatest(UsersTypes.LOAD_REQUEST_RELEASEACCESS, users.releaseAccess),

    // activities
    takeLatest(ActivitiesTypes.LOAD_REQUEST_SEARCH_ACTIVITES, activites.search),
    takeLatest(ActivitiesTypes.LOAD_REQUEST_SEARCH_ACTIVITY_ACTIVITES, activites.searchActivities),
    takeLatest(ActivitiesTypes.LOAD_REQUEST_PUBLISH, activites.publish),
    takeLatest(ActivitiesTypes.LOAD_REQUEST_FETCH_ID, activites.fetchId),
    takeLatest(ActivitiesTypes.LOAD_REQUEST_GET_ATTACHMENT, activites.getAttachment),
    takeLatest(ActivitiesTypes.LOAD_REQUEST_GET_LIST_CSV, activites.getListCSV),
    takeLatest(ActivitiesTypes.LOAD_REQUEST_SUBMIT, activites.submit),

    // reports
    takeLatest(ReportsTypes.LOAD_REPORTS_INITIATIVES_REQUEST_LIST, reports.listInitiatives),
    takeLatest(ReportsTypes.LOAD_REPORTS_INTERACTIVITIES_REQUEST_LIST, reports.listInteractivities),
    takeLatest(ReportsTypes.LOAD_REPORTS_PROJECTS_REQUEST_LIST, reports.listProjects),
    takeLatest(ReportsTypes.LOAD_REPORTS_MESSAGES_REQUEST_LIST, reports.listMessages),
    takeLatest(ReportsTypes.LOAD_REPORTS_DOWNLOADS_REQUEST_LIST, reports.listDownloads),
    takeLatest(ReportsTypes.LOAD_REPORTS_SURVEIES_REQUEST_LIST, reports.listSurveies),
    takeLatest(ReportsTypes.LOAD_REPORTS_PARTICIPANTS_REQUEST_LIST, reports.listParticipants),
    takeLatest(ReportsTypes.LOAD_REPORTS_REQUEST_GET_LIST_CSV, reports.getListCSV),

    // surveies
    takeLatest(SurveiesTypes.LOAD_REQUEST_LIST, surveies.list),
    takeLatest(SurveiesTypes.LOAD_REQUEST_GET_LIST_CSV, surveies.getListCSV),
    takeLatest(SurveiesTypes.LOAD_REQUEST_FETCH_ID, surveies.fetchOne),
    takeLatest(SurveiesTypes.LOAD_REQUEST_SUBMIT, surveies.submit),



    // messages
    takeLatest(MessagesTypes.LOAD_REQUEST_FETCH_INBOX, messages.fetchAllInbox),
    takeLatest(MessagesTypes.LOAD_REQUEST_FETCH_SEND, messages.fetchAllSend),
    takeLatest(MessagesTypes.LOAD_REQUEST_SUBMIT, messages.submitMessage),
    takeLatest(MessagesTypes.LOAD_REQUEST_FETCH_ID, messages.fetchId),
    takeLatest(MessagesTypes.LOAD_REQUEST_GET_ATTACHMENT, messages.getAttachment),
    takeLatest(MessagesTypes.LOAD_REQUEST_DELETE, messages.destroy),
    takeLatest(MessagesTypes.LOAD_REQUEST_MESSAGES_TYPES, messages.messageTypes),
    takeLatest(MessagesTypes.LOAD_REQUEST_MESSAGES_STATUS, messages.messageStatus),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_USERS_TO_SEND, messages.userList),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_USERS_FILTERED, messages.userListFiltered),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_PROFILES, messages.profileList),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_SUPERINTENDENCES, messages.superintendencesList),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_INSTITUTIONS, messages.institutionsList),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_LOCAL_UNITS, messages.localUnitsList),

    // subjects
    takeLatest(SubjectsTypes.LOAD_REQUEST_FETCH_ID, subjects.fetchOne),

    // disciplines
    takeLatest(DisciplinesTypes.LOAD_REQUEST_LIST, disciplines.list),

    // school
    takeLatest(SchoolYearsTypes.LOAD_REQUEST_LIST, schoolYears.list),
    takeLatest(SchoolYearsTypes.LOAD_REQUEST_SCHOOLBONDS, schoolYears.schoolbonds),
    takeLatest(ParticipatingSchoolsTypes.LOAD_REQUEST_LIST, participatingSchools.list),
  ]);
}
