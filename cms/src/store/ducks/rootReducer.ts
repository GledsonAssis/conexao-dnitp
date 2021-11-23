import { combineReducers } from 'redux';

import actions from './actions';
import activities from './activities';
import courses from './courses';
import externalLinks from './externalLinks';
import projects from './projects';
import projectsActions from './projectsActions';
import highlights from './highlights';
import disciplines from './disciplines';
import schoolYears from './schoolYear';
import subjects from './subjects';
import trafficConcepts from './trafficConcepts';
import trafficContents from './trafficContents';
import messages from './messages';
import initiatives from './initiatives';
import oauth from './oauth';
import states from './states';
import participatingSchools from './participatingSchools';
import generalSearch from './generalSearch';
import regionalSuperintendences from './regionalSuperintendences';
import externalApis from './externalApis';
import dnitLocalUnits from './dnitLocalUnits';
import institutions from './institutions';
import knowledgeObjects from './knowledgeObjects';
import users from './users';
import trafficScopes from './trafficScopes';
import reports from './reports';
import surveies from './surveies';

export default combineReducers({
  oauth,
  actions,
  courses,
  projects,
  externalLinks,
  projectsActions,
  highlights,
  regionalSuperintendences,
  activities,
  disciplines,
  schoolYears,
  subjects,
  trafficConcepts,
  trafficContents,
  initiatives,
  messages,
  states,
  participatingSchools,
  generalSearch,
  externalApis,
  dnitLocalUnits,
  institutions,
  knowledgeObjects,
  users,
  trafficScopes,
  reports,
  surveies
});
