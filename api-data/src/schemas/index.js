import Action from './action/Action';
import ActionAttachment from './action/Attachment';
import ActionImageCarousel from './action/ImageCarousel';
import ActionUserComment from './action/UserComment';

import Activity from './activity/Activity';
import ActivitySubTheme from './activity/SubTheme';

import Course from './course/Course';
import CourseAttachment from './course/Attachment';
import CourseImageCarousel from './course/ImageCarousel';
import CourseUserComment from './course/UserComment';
import CourseUserRating from './course/UserRating';

import GeneralSearch from './general/GeneralSearch';

import Message from './message/Message';

import ProjectAction from './projectAction/ProjectAction';
import ProjectActionAttachment from './projectAction/Attachment';
import ProjectActionUserComment from './projectAction/UserComment';
import ProjectActionUserRating from './projectAction/UserRating';

import Project from './project/Project';
import ProjectAttachment from './project/Attachment';
import ProjectImageCarousel from './project/ImageCarousel';
import ProjectUserComment from './project/UserComment';
import ProjectUserRating from './project/UserRating';

import {
  UserSignup,
  SimpleUser,
} from './user/User';

export default {
  '/actions': Action,
  '/actions/:id/attachments': ActionAttachment,
  '/actions/comments': ActionUserComment,
  '/actions/:id/images': ActionImageCarousel,
  '/activity': Activity,
  '/activity/subthemes': ActivitySubTheme,
  '/courses': Course,
  '/courses/:id/attachments': CourseAttachment,
  '/courses/comments': CourseUserComment,
  '/courses/:id/images': CourseImageCarousel,
  '/courses/rating': CourseUserRating,
  '/general-search': GeneralSearch,
  '/messages': Message,
  '/projects': Project,
  '/projects/:id/attachments': ProjectAttachment,
  '/projects/comments': ProjectUserComment,
  '/projects/:id/images': ProjectImageCarousel,
  '/projects/actions': ProjectAction,
  '/projects/actions/:id/attachments': ProjectActionAttachment,
  '/projects/actions/comments': ProjectActionUserComment,
  '/projects/actions/rating': ProjectActionUserRating,
  '/projects/rating': ProjectUserRating,
  '/users/signup': UserSignup,
  '/users': SimpleUser,
};
