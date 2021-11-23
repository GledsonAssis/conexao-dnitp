import React from 'react';
import { useDispatch } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import dynamic from 'next/dynamic';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const TeamPage: React.FC<Props> = ({ }) => {
  const { i18n, t } = useTranslation(['toast_errors', 'components', 'general', 'pages']);

  const Team = dynamic(() => import(`@/components/shared/Team/locales/${i18n.language}`), { ssr: false });

  return (
    <div className="container-lg">
      <Team />
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function Team() {
  return (
    <Template>
      <TeamPage />
    </Template>
  );
}
