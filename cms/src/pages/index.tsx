import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HomePage from './Home';

const Home = () => <HomePage />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default Home;
