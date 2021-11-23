import React, { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HomePage from './Home';
import Template from '@/components/layout';

const Home = () => <HomePage />;

export const getStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['toast_errors', 'components', 'general', 'pages']))
    },
  }
};

export default Home;
