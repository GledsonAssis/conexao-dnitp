import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks/rootReducer';
import { rootSaga } from './ducks/rootSaga';

import { ActionsState } from './ducks/actions/types';
import { ActivitiesState } from './ducks/activities/types';
import { CoursesState } from './ducks/courses/types';
import { ExternalLinksState } from './ducks/externalLinks/types';
import { ProjectsState } from './ducks/projects/types';
import { ProjectActionsState } from './ducks/projectsActions/types';
import { HighlightsState } from './ducks/highlights/types';
import { DisciplinesState } from './ducks/disciplines/types';
import { SchoolYearsState } from './ducks/schoolYear/types';
import { SubjectsState } from './ducks/subjects/types';
import { TrafficConceptsState } from './ducks/trafficConcepts/types';
import { TrafficContentsState } from './ducks/trafficContents/types';
import { TrafficScopesState } from './ducks/trafficScopes/types';
import { InitiativesState } from './ducks/initiatives/types';
import { MessagesState } from './ducks/messages/types';
import { OAuthState } from './ducks/oauth/types';
import { StatesState } from './ducks/states/types';
import { ParticipatingSchoolsState } from './ducks/participatingSchools/types';
import { GeneralSearchState } from './ducks/generalSearch/types';
import { RegionalSuperintendencesState } from './ducks/regionalSuperintendences/types';
import { ExternalApisState } from './ducks/externalApis/types';
import { DnitLocalUnitsState } from './ducks/dnitLocalUnits/types';
import { InstitutionsState } from './ducks/institutions/types';
import { KnowledgeObjectsState } from './ducks/knowledgeObjects/types';
import { UsersState } from './ducks/users/types';
import { ReportsState } from './ducks/reports/types';
import { SurveiesState } from './ducks/surveies/types';

export interface ApplicationState {
  actions: ActionsState;
  activities: ActivitiesState;
  courses: CoursesState;
  externalLinks: ExternalLinksState;
  projects: ProjectsState;
  projectsActions: ProjectActionsState;
  highlights: HighlightsState;
  disciplines: DisciplinesState;
  schoolYears: SchoolYearsState;
  subjects: SubjectsState;
  trafficConcepts: TrafficConceptsState;
  trafficContents: TrafficContentsState;
  trafficScopes: TrafficScopesState;
  initiatives: InitiativesState;
  messages: MessagesState;
  oauth: OAuthState;
  states: StatesState;
  participatingSchools: ParticipatingSchoolsState;
  generalSearch: GeneralSearchState;
  regionalSuperintendences: RegionalSuperintendencesState;
  externalApis: ExternalApisState;
  dnitLocalUnits: DnitLocalUnitsState;
  institutions: InstitutionsState;
  knowledgeObjects: KnowledgeObjectsState;
  users: UsersState;
  reports: ReportsState;
  surveies: SurveiesState;
}

const sagaMiddleware = createSagaMiddleware();
const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
