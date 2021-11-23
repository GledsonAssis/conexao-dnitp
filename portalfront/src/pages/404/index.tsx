import React from 'react';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image404 from '@/assets/images/404.svg';

interface StateProps { }
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export const Page404Page: React.FC<Props> = () => (
  <div className="container-lg page-404">
    <img src={Image404} alt="logo" />
  </div>
);

export default function Page404() {
  return (
    <Template>
      <Page404Page />
    </Template>
  );
}
