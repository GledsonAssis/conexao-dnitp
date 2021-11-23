import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getTranslatedRoutes } from '@/utils/parsers';
import { routes } from '@/infra/services/routes';
import Route from 'route-parser';
import { TFunction } from 'next-i18next';
// const { routes } = require('./src/infra/services/routes')

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  translation?: TFunction;
}

type Props = StateProps & DispatchProps & OwnProps;

export const Breadcrumbs: React.FC<Props> = ({ translation }) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>(null);

  const isFunction = (value: any) => typeof value === 'function';

  const getPathTokens = (pathname: string) => {
    const paths = ['/'];

    if (pathname === '/') return paths;

    pathname.split('/').reduce((prev, curr) => {
      const currPath = `${prev}/${curr}`;
      paths.push(currPath);

      return currPath;
    });

    return paths;
  };

  const getRouteMatch = (routes: any, path: string) =>
    Object.keys(routes)
      .map((key) => {
        const params = new Route(key).match(path);

        return {
          didMatch: params !== false,
          key,
          params,
        };
      })
      .find((item) => item.didMatch);

  const getBreadcrumbs = (breadcrumbs: any) => {
    const pathTokens = getPathTokens(router.pathname);
    return pathTokens.reduce((acc, path) => {
      const routeMatch = getRouteMatch(breadcrumbs, path);
      if (routeMatch && path != '/') {
        const routeValue = breadcrumbs[routeMatch.key];
        const name = isFunction(routeValue) ? routeValue(routeMatch.params) : routeValue;

        const asPath = routes.filter(
          (itemRouters: any) => itemRouters.destination == path.replace(/\[(.*?)\]/gi, ':$1'),
        )[0];

        acc.push({
          name,
          path,
          asPath,
        });
      }

      return acc;
    }, []);
  };

  useEffect(() => {
    if (router && translation) {
      const pathTokens = getPathTokens(router.pathname);
      const arrayRoutes = pathTokens.reduce((acc, path) => {
        acc = { ...acc, ...routes.reduce(getTranslatedRoutes(translation, path), {}) };
        return acc;
      }, {});

      const breadcrumbsArray = getBreadcrumbs(arrayRoutes);
      setBreadcrumbs(breadcrumbsArray);
    }
  }, [router]);

  if (!breadcrumbs || router.pathname === '/') {
    return null;
  }

  const getParserQuery = (keys: string, routerQuery: any) => (acc: any) => {
    if (keys) {
      acc[keys] = routerQuery[keys];
    }
    return acc;
  };

  function getQuery(item: any, routerQuery: any) {
    const KeysQuery: string[] = item.path.match(/(?<=\[).+?(?=\])/g);
    if (KeysQuery) {
      return KeysQuery.reduce((acc, path) => {
        acc = { ...acc, ...routes.reduce(getParserQuery(path, routerQuery), {}) };
        return acc;
      }, {});
    }
  }

  function renderBreadcrumbs(): any {
    if (breadcrumbs) {
      return breadcrumbs.map((item) => {
        if (item.path == router.pathname || item.path === '/Initiatives' || item.path === '/Reports') {
          return (
            <li key={`breadcrumbs_${item.name}_no_link`} className="crumb" data-active="active">
              <i className="icon fas fa-chevron-right" />
              <span>{item.name}</span>
            </li>
          );
        }
        return (
          <li key={`breadcrumbs_${item.name}`} className="crumb">
            <i className="icon fas fa-chevron-right" />
            <Link
              href={{
                pathname: item?.asPath?.source.replace(/\:(\w+)/gi, '[$1]'),
                query: getQuery(item, router.query),
              }}
              locale="pt-BR"
            >
              <a>{item.name}</a>
            </Link>
          </li>
        );
      });
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className="br-breadcrumb pt-3" aria-label="Breadcumb">
        <ul className="crumb-list">
          <li className="crumb home">
            <Link href="/" locale="pt-BR">
              <div className="br-button circle">
                <span className="sr-only">Página inicial</span>
                <i className="icon fas fa-home" />
              </div>
            </Link>
          </li>
          {renderBreadcrumbs()}
        </ul>
      </div>
      <div className="w-100" style={{ borderBottom: '1px solid #bdbdbd' }} />
    </div>
  );
};

export default Breadcrumbs;
