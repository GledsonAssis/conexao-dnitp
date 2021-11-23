import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import PresentationPage from '@/components/shared/PresentationPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ApplicationState } from '@/store';
import * as actionsProjects from '@/store/ducks/projects/actions';
// import { GetStaticPaths } from 'next';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export const ProjectsPage: React.FC<Props> = ({ children, header }) => {
  const dispatch = useDispatch();
  const highlightsProjects = useSelector((state: ApplicationState) => state.projects);

  useEffect(() => {
    dispatch(actionsProjects.loadHighlightsRequest());
    // eslint-disable-next-line
  }, []);

  function render() {
    if (highlightsProjects && highlightsProjects.highlights && highlightsProjects.highlights.cover) {
      return (
        <PresentationPage
          titulo={highlightsProjects.highlights.cover.title}
          description={highlightsProjects.highlights.cover.description}
          listItens={highlightsProjects.highlights.list}
        />
      );
    }
  }

  return <div className="container-lg contrast-ignore-bg">{render()}</div>;
};

export default function Projects() {
  return (
    <Template>
      <ProjectsPage />
    </Template>
  );
}
