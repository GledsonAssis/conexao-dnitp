import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
import Session from '@/utils/Session';
import { isUserLogged, isUserComment } from '@/utils/validate';
import getFirstUrlPath from '@/utils/parsers/getFirstUrlPath';
import parseRoutes from '@/utils/parsers/parseRoutes';
import userParser from '@/utils/parsers/userParser';
import { useRouter } from 'next/router';
import privatePaths from '@/infra/services/privatePaths';
import headerMenuIcons from '@/infra/services/headerMenuIcons';

import { useTranslation } from 'next-i18next';
import { EnvsConfig } from '@/infra/config/envs.config';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { Breadcrumbs } from '../shared/Breadcrumbs';

interface StateProps { }
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const Template: React.FC<Props> = ({ children, ...props }) => {
  const [propsModel, setPropsModel] = useState<any>();
  const { t } = useTranslation(['toast_errors', 'components', 'general', 'pages']);
  const router = useRouter();

  useEffect(() => {
    handleLogin();
  }, []);

  function handleLogin() {
    const user = Session.getUser();
    const session = Session.getSession();
    setPropsModel({
      userParser: userParser({ ...user, imageSrc: session?.picture }),
      userRole: user.role,
      currentPath: getFirstUrlPath(router.pathname),
      isLogged: isUserLogged(user),
      isAllowComment: isUserComment(user),
      routes: parseRoutes(t),
      sociais: {
        twitter: EnvsConfig.getTwitter(),
        facebook: EnvsConfig.getFacebook(),
        instagram: EnvsConfig.getInstagram(),
        youtube: EnvsConfig.getYoutube(),
      },
      privatePaths,
      headerMenuIcons,
    });
  }

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { propsModel, t });
    }
    return child;
  });

  return (
    <Provider store={store}>
      <Header translation={t} Session={propsModel} handleLogin={handleLogin} />
      <Breadcrumbs translation={t} />
      {childrenWithProps}
      <Footer translation={t} {...propsModel} />
    </Provider>
  );
};

export default Template;
