import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import PresentationPage from '@/components/shared/PresentationPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { render } from 'enzyme';
import { ApplicationState } from '@/store';
import * as actionsCourses from '@/store/ducks/courses/actions';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const CoursesPage: React.FC<Props> = ({ }) => {
  const dispatch = useDispatch();
  const highlightsCourses = useSelector((state: ApplicationState) => state.courses);

  useEffect(() => {
    dispatch(actionsCourses.loadHighlightsRequest());
    // eslint-disable-next-line
  }, []);

  function render() {
    if (highlightsCourses && highlightsCourses.highlights && highlightsCourses.highlights.cover) {
      return (
        <PresentationPage
          titulo={highlightsCourses.highlights.cover.title}
          description={highlightsCourses.highlights.cover.description}
          listItens={highlightsCourses.highlights.list}
        />
      );
    }
  }

  return <div className="container-lg contrast-ignore-bg">{render()}</div>;
};

export const getStaticProps = async ({ params, locale }) => {
  let data = null;
  try {
    data = await {
      ...await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages']),
      ...params
    }
  } catch (err) {
    console.log('serverSideErrors', err)
  };

  return {
    props: data
  }
};

export default function Courses() {
  return (
    <Template>
      <CoursesPage />
    </Template>
  );
}
