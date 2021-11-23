import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks/rootReducer';
import { rootSaga } from './ducks/rootSaga';

import { ActionsState } from './ducks/actions/types';
import { ActivitesState } from './ducks/activites/types';
import { CoursesState } from './ducks/courses/types';
import { ProjectsState } from './ducks/projects/types';
import { ProjectsActionsState } from './ducks/projectsActions/types';
import { HighlightsState } from './ducks/highlights/types';
import { DisciplinesState } from './ducks/disciplines/types';
import { SchoolYearsState } from './ducks/schoolYear/types';
import { SubjectsState } from './ducks/subjects/types';
import { TrafficContentsState } from './ducks/trafficContents/types';
import { InitiativesState } from './ducks/initiatives/types';
import { MessagesState } from './ducks/messages/types';
import { OAuthState } from './ducks/oauth/types';
import { StatesState } from './ducks/states/types';
import { ParticipatingSchoolsState } from './ducks/participatingSchools/types';
import { GeneralSearchState } from './ducks/generalSearch/types';

export interface ApplicationState {
  actions: ActionsState;
  activites: ActivitesState;
  courses: CoursesState;
  projects: ProjectsState;
  projectsActions: ProjectsActionsState;
  highlights: HighlightsState;
  disciplines: DisciplinesState;
  schoolYears: SchoolYearsState;
  subjects: SubjectsState;
  trafficContents: TrafficContentsState;
  initiatives: InitiativesState;
  messages: MessagesState;
  oauth: OAuthState;
  states: StatesState;
  participatingSchools: ParticipatingSchoolsState;
  generalSearch: GeneralSearchState;
}

const sagaMiddleware = createSagaMiddleware();
const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
