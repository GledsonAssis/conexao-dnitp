import React, { useRef, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import store, { ApplicationState } from '@/store';
import Session from '@/utils/Session';
import { isUserLogged } from '@/utils/validate';
import { pathName as getFirstUrlPath } from '@/utils/parsers/getFirstUrlPath';
import parseRoutes from '@/utils/parsers/parseRoutes';
import { userParser } from '@/utils/parsers/userParser';
import { useRouter } from 'next/router';
import { anonimo } from '@/infra/constants/profileRoles';
import privatePaths from '@/infra/services/privatePaths';
import headerMenuIcons from '@/infra/services/headerMenuIcons';

import { useTranslation } from 'next-i18next';
import { EnvsConfig } from '@/infra/config/envs.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import Menu from '../shared/Menu';
import cookieCutter from 'cookie-cutter';

import { mock } from './mock';

interface StateProps { }
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const Template: React.FC<Props> = ({ children }) => {
  const [propsModel, setPropsModel] = useState<any>();
  const [stateMenuOpen, setStateMenuOpen] = useState<Boolean>(false);
  const { t } = useTranslation(['toast_errors', 'components', 'general', 'pages']);
  const router = useRouter();

  React.useEffect(() => {
    handleLogin();
  }, []);

  async function handleLogin() {
    const user = await Session.getUser();
    const session = await Session.getSession();
    if (!session) {
      const sessionCookie = JSON.parse(cookieCutter.get('session_cnx'))
      // const sessionCookie = JSON.parse(mock) // TODO: Remover após homologação
      Session.login(sessionCookie)
      cookieCutter.set('session_cnx', '', { expires: new Date(0) })
    }

    setPropsModel({
      userParser: userParser({ ...user, imageSrc: session?.picture }),
      userRole: user.role,
      currentPath: getFirstUrlPath(router.pathname),
      isLogged: isUserLogged(user),
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

  function openMenu() {
    setStateMenuOpen(!stateMenuOpen);
  }

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { propsModel, t });
    }
    return child;
  });

  return (
    <Provider store={store}>
      <Header
        translation={t}
        Session={propsModel}
        handleLogin={handleLogin}
        openMenu={openMenu}
        isOpen={stateMenuOpen}
      />
      <main className="d-flex flex-fill" style={{ minHeight: `calc(100vh - 193px)` }} id="main">
        <div className="container-fluid d-flex">
          <div className="d-flex min-w-100">
            <Menu stateMenuOpen={stateMenuOpen} {...propsModel} translation={t} />
            <div className="col pt-3 pb-5 overflow-auto">
              <Breadcrumbs translation={t} />
              {childrenWithProps}
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer translation={t} {...propsModel} />
    </Provider>
  );
};

export default Template;
