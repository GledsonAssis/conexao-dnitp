import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import PresentationPage from '@/components/shared/PresentationPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ApplicationState } from '@/store';
import * as actionsActions from '@/store/ducks/actions/actions';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const ActionsPage: React.FC<Props> = ({ children, header }) => {
  const dispatch = useDispatch();
  const highlightsActions = useSelector((state: ApplicationState) => state.actions);

  useEffect(() => {
    dispatch(actionsActions.loadHighlightsRequest());
    // eslint-disable-next-line
  }, []);

  function render() {
    if (highlightsActions && highlightsActions.highlights && highlightsActions.highlights.cover) {
      return (
        <PresentationPage
          titulo={highlightsActions.highlights.cover.title}
          description={highlightsActions.highlights.cover.description}
          listItens={highlightsActions.highlights.list}
        />
      );
    }
  }

  return <div className="container-lg contrast-ignore-bg">{render()}</div>;
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['components', 'general'])),
  },
});

export default function Actions() {
  return (
    <Template>
      <ActionsPage />
    </Template>
  );
}
