import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import * as actionsInitiatives from '@/store/ducks/initiatives/actions';
import { ApplicationState } from '@/store';

import { AttachmentsType } from '@/store/ducks/courses/types';

import { Spotlight } from '@/components/shared/Spotlight';
import Link from 'next/link';
import { GetStaticPaths } from 'next';
import { Attachments } from '@/components/shared/Attachments';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const InitiativesIdPage: React.FC<Props> = ({ ...props }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const initiatives = useSelector((state: ApplicationState) => state.initiatives);

  useEffect(() => {
    if (id) {
      dispatch(actionsInitiatives.loadFetchIdRequest({ id }));
    }
    // eslint-disable-next-line
  }, []);

  function downlaodAttachment(id: string | number) {
    dispatch(actionsInitiatives.loadGetAttachmentsRequest({ id }));
  }

  function listAttachments(data: AttachmentsType[]) {
    return [
      {
        title: props.t('pages:Initiatives.details.attachment'),
        itens: data.map((item) => ({
          text: item.name,
          path: item.id,
        })),
        handleDownload: downlaodAttachment,
      },
    ];
  }

  return (
    <div className="container-lg contrast-ignore-bg">
      <div className="row contrast-ignore-bg mx-0">
        <div className="img__page col-auto py-3 pl-0">
          <div className="img__page-initiatives contrast-ignore-bg" style={{ width: 60, height: 60 }} />
        </div>
        <h2 className="text-primary-default">{props.t('pages:Initiatives.title')}</h2>
      </div>
      <div className="row mx-0 mb-3">
        <div style={{ lineHeight: '2.5em' }} dangerouslySetInnerHTML={{ __html: props.t('pages:Initiatives.aboutArea') }} />
      </div>

      <Spotlight customClassName="info text-center">
        <strong className="text-​uppercase">{props.t('pages:Initiatives.details.spotlight')}</strong>
      </Spotlight>

      {initiatives && initiatives.dataById ? (
        <form className="row justify-content-md-center mx-0 mb-5">
          <div className="row col-md-10">
            <p className="h5">
              {props.t('pages:Initiatives.details.title')}: {initiatives.dataById.title}
            </p>
          </div>
          <div className="row col-md-10 mb-5">
            <p>{initiatives.dataById.description}</p>
          </div>
          <div className="row col-md-10">
            <div className="container mb-5 p-0">
              {initiatives.dataById.attachments.length > 0 ? (
                <Attachments itensList={listAttachments(initiatives.dataById.attachments)} />
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="row col-md-10 justify-content-md-end">
            <Link href="/minhas-iniciativas">
              <a>
                <button className="br-button secondary" type="button">
                  {props.t('pages:Initiatives.share.backbtn')}
                </button>
              </a>
            </Link>
          </div>
        </form>
      ) : (
        ''
      )}
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => ({
  paths: [],
  fallback: true,
});

export default function InitiativesId() {
  return (
    <Template>
      <InitiativesIdPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
