import { combineReducers } from 'redux';

import actions from './actions';
import activites from './activites';
import courses from './courses';
import projects from './projects';
import projectsActions from './projectsActions';
import highlights from './highlights';
import disciplines from './disciplines';
import schoolYears from './schoolYear';
import subjects from './subjects';
import trafficContents from './trafficContents';
import messages from './messages';
import initiatives from './initiatives';
import oauth from './oauth';
import states from './states';
import participatingSchools from './participatingSchools';
import generalSearch from './generalSearch';

export default combineReducers({
  actions,
  activites,
  courses,
  projects,
  projectsActions,
  highlights,
  disciplines,
  schoolYears,
  subjects,
  trafficContents,
  initiatives,
  messages,
  oauth,
  states,
  participatingSchools,
  generalSearch,
});
