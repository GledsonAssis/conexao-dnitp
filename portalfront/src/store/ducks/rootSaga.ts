import { all, takeLatest } from 'redux-saga/effects';

import { ActionsTypes } from './actions/types';
import { ActivitesTypes } from './activites/types';
import { CoursesTypes } from './courses/types';
import { ProjectsTypes } from './projects/types';
import { ProjectsActionsTypes } from './projectsActions/types';
import { HighlightsTypes } from './highlights/types';
import { DisciplinesTypes } from './disciplines/types';
import { SchoolYearsTypes } from './schoolYear/types';
import { SubjectsTypes } from './subjects/types';
import { TrafficContentsTypes } from './trafficContents/types';
import { InitiativesTypes } from './initiatives/types';
import { MessagesTypes } from './messages/types';
import { OAuthTypes } from './oauth/types';
import { StatesTypes } from './states/types';
import { ParticipatingSchoolsTypes } from './participatingSchools/types';
import { GeneralSearchTypes } from './generalSearch/types';

import * as actions from './actions/sagas';
import * as activites from './activites/sagas';
import * as courses from './courses/sagas';
import * as projects from './projects/sagas';
import * as projectsActions from './projectsActions/sagas';
import * as highlights from './highlights/sagas';
import * as generalSearch from './generalSearch/sagas';
import * as disciplines from './disciplines/sagas';
import * as schoolYears from './schoolYear/sagas';
import * as subjects from './subjects/sagas';
import * as trafficContents from './trafficContents/sagas';
import * as initiatives from './initiatives/sagas';
import * as messages from './messages/sagas';
import * as oauth from './oauth/sagas';
import * as states from './states/sagas';
import * as participatingSchools from './participatingSchools/sagas';

export function* rootSaga() {
  yield all([
    takeLatest(OAuthTypes.LOAD_REQUEST_LOGIN, oauth.loadLogin),
    takeLatest(OAuthTypes.LOAD_REQUEST_LOGOUT, oauth.loadLogout),
    takeLatest(OAuthTypes.LOAD_REQUEST_IS_MODERATOR, oauth.isModerator),
    takeLatest(OAuthTypes.LOAD_REQUEST_GET_PROFILE, oauth.getProfile),
    takeLatest(OAuthTypes.LOAD_REQUEST_SUBMIT, oauth.submit),

    // actions
    takeLatest(ActionsTypes.LOAD_REQUEST_HIGHLIGHTS, actions.highlights),
    takeLatest(ActionsTypes.LOAD_REQUEST_FETCH_ID, actions.fetchOne),
    takeLatest(ActionsTypes.LOAD_REQUEST_FETCH_ID_IMAGES, actions.fetchImages),
    takeLatest(ActionsTypes.LOAD_REQUEST_FETCH_ID_ATTACHMENTS, actions.fetchAttachments),
    takeLatest(ActionsTypes.LOAD_REQUEST_FETCH_ID_COMMENTS, actions.fetchComments),
    takeLatest(ActionsTypes.LOAD_REQUEST_FETCH_ID_RATING, actions.fetchRating),
    takeLatest(ActionsTypes.LOAD_REQUEST_GET_ID_ATTACHMENTS, actions.getAttachment),
    takeLatest(ActionsTypes.SET_RATE_REQUEST, actions.setRate),
    takeLatest(ActionsTypes.LOAD_REQUEST_SUBMIT_NEW_COMMENT, actions.submitNew),
    takeLatest(ActionsTypes.LOAD_REQUEST_DELETE_COMMENT, actions.deleteComment),

    // activities
    takeLatest(ActivitesTypes.LOAD_REQUEST_SEARCH_ACTIVITES, activites.search),
    takeLatest(ActivitesTypes.LOAD_REQUEST_FETCH_ID, activites.fetchId),
    takeLatest(ActivitesTypes.LOAD_REQUEST_GET_ATTACHMENT, activites.getAttachment),
    takeLatest(ActivitesTypes.SEARCH_REDIRECT_PROPS, activites.searchRedirect),
    takeLatest(ActivitesTypes.LOAD_REQUEST_FETCH_SURVEY, activites.fetchSurvey),
    takeLatest(ActivitesTypes.LOAD_REQUEST_SUBMIT_SURVEY, activites.submitSurvey),

    // initiatives
    takeLatest(InitiativesTypes.LOAD_REQUEST_FETCH, initiatives.fetchAll),
    takeLatest(InitiativesTypes.LOAD_REQUEST_SUBMIT, initiatives.submitInitiative),
    takeLatest(InitiativesTypes.LOAD_REQUEST_FETCH_ID, initiatives.fetchId),
    takeLatest(InitiativesTypes.LOAD_REQUEST_GET_ATTACHMENT, initiatives.getAttachment),

    // messages
    takeLatest(MessagesTypes.LOAD_REQUEST_FETCH_INBOX, messages.fetchAllInbox),
    takeLatest(MessagesTypes.LOAD_REQUEST_FETCH_SEND, messages.fetchAllSend),
    takeLatest(MessagesTypes.LOAD_REQUEST_SUBMIT, messages.submitMessage),
    takeLatest(MessagesTypes.LOAD_REQUEST_FETCH_ID, messages.fetchId),
    takeLatest(MessagesTypes.LOAD_REQUEST_GET_ATTACHMENT, messages.getAttachment),
    takeLatest(MessagesTypes.LOAD_REQUEST_DELETE, messages.destroy),
    takeLatest(MessagesTypes.LOAD_REQUEST_MESSAGES_TYPES, messages.messageTypes),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_USERS_TO_SEND, messages.userList),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_USERS_FILTERED, messages.userListFiltered),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_PROFILES, messages.profileList),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_SUPERINTENDENCES, messages.superintendencesList),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_INSTITUTIONS, messages.institutionsList),
    takeLatest(MessagesTypes.LOAD_REQUEST_LIST_LOCAL_UNITS, messages.localUnitsList),

    // courses
    takeLatest(CoursesTypes.LOAD_REQUEST_HIGHLIGHTS, courses.highlights),
    takeLatest(CoursesTypes.LOAD_REQUEST_FETCH_ID, courses.fetchOne),
    takeLatest(CoursesTypes.LOAD_REQUEST_FETCH_ID_IMAGES, courses.fetchImages),
    takeLatest(CoursesTypes.LOAD_REQUEST_FETCH_ID_ATTACHMENTS, courses.fetchAttachments),
    takeLatest(CoursesTypes.LOAD_REQUEST_FETCH_ID_COMMENTS, courses.fetchComments),
    takeLatest(CoursesTypes.LOAD_REQUEST_FETCH_ID_RATING, courses.fetchRating),
    takeLatest(CoursesTypes.LOAD_REQUEST_GET_ID_ATTACHMENTS, courses.getAttachment),
    takeLatest(CoursesTypes.SET_RATE_REQUEST, courses.setRate),
    takeLatest(CoursesTypes.LOAD_REQUEST_SUBMIT_NEW_COMMENT, courses.submitNew),
    takeLatest(CoursesTypes.LOAD_REQUEST_DELETE_COMMENT, courses.deleteComment),

    // projects
    takeLatest(ProjectsTypes.LOAD_REQUEST_HIGHLIGHTS, projects.highlights),
    takeLatest(ProjectsTypes.LOAD_REQUEST_FETCH_ID, projects.fetchOne),
    takeLatest(ProjectsTypes.LOAD_REQUEST_FETCH_ID_IMAGES, projects.fetchImages),
    takeLatest(ProjectsTypes.LOAD_REQUEST_FETCH_ID_ACTIONS, projects.fetchActions),
    takeLatest(ProjectsTypes.LOAD_REQUEST_FETCH_ID_ATTACHMENTS, projects.fetchAttachments),
    takeLatest(ProjectsTypes.LOAD_REQUEST_FETCH_ID_COMMENTS, projects.fetchComments),
    takeLatest(ProjectsTypes.LOAD_REQUEST_FETCH_ID_RATING, projects.fetchRating),
    takeLatest(ProjectsTypes.LOAD_REQUEST_GET_ID_ATTACHMENTS, projects.getAttachment),
    takeLatest(ProjectsTypes.SET_RATE_REQUEST, projects.setRate),
    takeLatest(ProjectsTypes.LOAD_REQUEST_SUBMIT_NEW_COMMENT, projects.submitNew),
    takeLatest(ProjectsTypes.LOAD_REQUEST_DELETE_COMMENT, projects.deleteComment),

    // projectsActions
    takeLatest(ProjectsActionsTypes.LOAD_REQUEST_HIGHLIGHTS, projectsActions.highlights),
    takeLatest(ProjectsActionsTypes.LOAD_REQUEST_FETCH_ID, projectsActions.fetchOne),
    takeLatest(ProjectsActionsTypes.LOAD_REQUEST_FETCH_ID_IMAGES, projectsActions.fetchImages),
    takeLatest(ProjectsActionsTypes.LOAD_REQUEST_FETCH_ID_ATTACHMENTS, projectsActions.fetchAttachments),
    takeLatest(ProjectsActionsTypes.LOAD_REQUEST_FETCH_ID_COMMENTS, projectsActions.fetchComments),
    takeLatest(ProjectsActionsTypes.LOAD_REQUEST_FETCH_ID_RATING, projectsActions.fetchRating),
    takeLatest(ProjectsActionsTypes.LOAD_REQUEST_GET_ID_ATTACHMENTS, projectsActions.getAttachment),
    takeLatest(ProjectsActionsTypes.SET_RATE_REQUEST, projectsActions.setRate),
    takeLatest(ProjectsActionsTypes.LOAD_REQUEST_SUBMIT_NEW_COMMENT, projectsActions.submitNew),
    takeLatest(ProjectsActionsTypes.LOAD_REQUEST_DELETE_COMMENT, projectsActions.deleteComment),

    // subjects
    takeLatest(SubjectsTypes.LOAD_REQUEST_FETCH_ID, subjects.fetchOne),

    // trafficContents
    takeLatest(TrafficContentsTypes.LOAD_REQUEST_FETCH_ID, trafficContents.fetchOne),

    // generalSearch
    takeLatest(GeneralSearchTypes.LOAD_REQUEST_LIST, generalSearch.list),

    // general
    takeLatest(HighlightsTypes.LOAD_REQUEST_LIST, highlights.list),
    takeLatest(DisciplinesTypes.LOAD_REQUEST_LIST, disciplines.list),

    // States
    takeLatest(StatesTypes.LOAD_REQUEST_LIST, states.list),
    takeLatest(StatesTypes.LOAD_REQUEST_CITIES, states.citiesList),
    takeLatest(StatesTypes.LOAD_REQUEST_INSTITUITIONS, states.institutionsList),

    // school
    takeLatest(SchoolYearsTypes.LOAD_REQUEST_LIST, schoolYears.list),
    takeLatest(SchoolYearsTypes.LOAD_REQUEST_SCHOOLBONDS, schoolYears.schoolbonds),
    takeLatest(ParticipatingSchoolsTypes.LOAD_REQUEST_LIST, participatingSchools.list),
  ]);
}
