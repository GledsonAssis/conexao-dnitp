import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction, useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as actionsInitiatives from '@/store/ducks/initiatives/actions';
import { ApplicationState } from '@/store';

import { Spotlight } from '@/components/shared/Spotlight';
import { Upload } from '@/components/shared/Upload';
import { EnvsConfig } from '@/infra/config/envs.config';
import Link from 'next/link';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const InitiativesPage: React.FC<Props> = ({ children, ...props }) => {
  const dispatch = useDispatch();

  const [listFiles, setListFiles] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  const fileTypes = {
    title: props.t('pages:Initiatives.share.fileTypes'),
    list: [
      '.TXT',
      '.DOC',
      '.DOCX',
      '.PDF',
      '.PPT',
      '.PPTX',
      '.JPEG',
      '.PNG',
      '.XLS',
      '.XLSX',
      '.AVI',
      '.WMV',
      '.MOV',
      '.MKV',
      '.MP4',
      '.MP3',
      '.MPEG',
    ],
  };

  const router = useRouter();

  function onSubmit(data: any) {
    const params = {
      title: data.title_input,
      description: data.description_input,
      attachments: listFiles,
    };

    dispatch(actionsInitiatives.loadSubmitRequest(params));
    router.replace('/minhas-iniciativas');
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
        <strong className="text-​uppercase">{props.t('pages:Initiatives.share.pageTitle')}</strong>
      </Spotlight>

      <form className="row justify-content-md-center mx-0 mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="row col-md-10">
          <div className="br-input mb-2 w-100">
            <label htmlFor="Title-id1">{props.t('pages:Initiatives.share.title')}:</label>
            <input
              maxLength={255}
              className="has-icon"
              id="Title-id1"
              {...register('title_input')}
              type="text"
              placeholder={props.t('pages:Initiatives.share.placeholders.title')}
            />
            <p className="text-base mt-1">{props.t('pages:Initiatives.share.titleMaxChar')}</p>
          </div>
        </div>
        <div className="row col-md-10">
          <div className="br-textarea mb-2 w-100">
            <label className="mb-0" htmlFor="description-id1">
              {props.t('pages:Initiatives.share.description')}:
            </label>
            <textarea
              maxLength={5000}
              {...register('description_input')}
              style={{ minWidth: '100%', maxWidth: '100%' }}
              id="description-id1"
              placeholder={props.t('pages:Initiatives.share.placeholders.description')}
            />
            <p className="text-base mt-1">{props.t('pages:Initiatives.share.descriptionMaxChar')}</p>
          </div>
        </div>
        <div className="row col-md-10">
          <div className="mb-2 w-100">
            <Upload
              title={props.t('pages:Initiatives.share.fileSendTitle')}
              multiple
              id="uploadFiles"
              listFiles={setListFiles}
              // {register(`files_input`)}
              placeholder={props.t('pages:Initiatives.share.maxSizeInfo', {
                max: `${EnvsConfig.apiMaxSize() / 1024 / 1024}MB`,
              })}
              suportedExt={fileTypes}
            />
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

          <button className="br-button primary mt-0 ml-1" type="submit">
            {props.t('pages:Initiatives.share.submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function Initiatives() {
  return (
    <Template>
      <InitiativesPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
