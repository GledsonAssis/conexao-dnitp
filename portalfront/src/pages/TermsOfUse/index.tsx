import React from 'react';
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

export const ActionsPage: React.FC<Props> = ({ }) => {
  const { i18n, t } = useTranslation(['toast_errors', 'components', 'general', 'pages']);

  const TermsOfUse = dynamic(() => import(`@/components/shared/TermsOfUse/locales/${i18n.language}`), { ssr: false });

  return (
    <div className="container-lg py-5">
      <TermsOfUse />
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function Actions() {
  return (
    <Template>
      <ActionsPage />
    </Template>
  );
}
