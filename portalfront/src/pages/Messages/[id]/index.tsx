import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import * as actionsMessages from '@/store/ducks/messages/actions';
import { ApplicationState } from '@/store';

import { Attachment } from '@/store/ducks/messages/types';

import { SunEditorElem } from '@/components/shared/HtmlInput';

import { Spotlight } from '@/components/shared/Spotlight';
import Link from 'next/link';
import { GetStaticPaths } from 'next';
import { Attachments } from '@/components/shared/Attachments';
import moment from 'moment';
import { Handle } from '@/interfaces';
import { EnvsConfig } from '@/infra/config/envs.config';
import { Upload } from '@/components/shared/Upload';
import Session from '@/utils/Session';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const MessagesIdPage: React.FC<Props> = ({ ...props }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [stReply, setStReply] = useState(false);
  const [listFiles, setListFiles] = useState(false);
  const [stMessage, setStMessage] = useState<string>();

  const fileTypes = {
    title: props.t('pages:Messages.details.fileTypes'),
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

  let SunEditorHandle: Handle<typeof SunEditorElem>;

  function handleChange(event: FocusEvent, editorContents: string) {
    setStMessage(editorContents);
  }

  const messages = useSelector((state: ApplicationState) => state.messages);
  const user = Session.getUser();

  useEffect(() => {
    if (id) {
      dispatch(actionsMessages.loadFetchIdRequest({ id }));
    }
    // eslint-disable-next-line
  }, []);

  function downlaodAttachment(id: string | number) {
    dispatch(actionsMessages.loadGetAttachmentsRequest({ id }));
  }

  function listAttachments(data: any[]) {
    return [
      {
        title: props.t('pages:Messages.details.attachment'),
        itens: data.map((item) => ({
          text: item.name,
          path: item.id,
        })),
        handleDownload: downlaodAttachment,
      },
    ];
  }

  function canAnswer() {
    const canAns =
      messages.dataById.type?.id !== 6 &&
      messages.dataById.from?.id !== user.id;
    if (!canAns && stReply) {
      setStReply(false);
    }

    return canAns;
  }

  function renderReplys() {
    if (messages.dataById && messages.dataById.reply.length) {
      return messages.dataById.reply.map((item) => (
        <div key={item.id} className="render-replys-list w-100">
          <div className="br-item mb-2">
            <div className="d-inline-flex w-100 m-0">
              <div className="align-self-center">
                <span className="br-avatar mr-2" title={item.replyFrom.name}>
                  <span className="image">
                    <i className="fas fa-user" aria-hidden="true" />
                  </span>
                </span>
              </div>

              <div className="content">
                <p className="text-capitalize font-weight-semi-bold mb-0 text-dark">
                  {`${props.t('pages:Messages.details.type')}: ${messages.dataById.type.name}`}
                </p>
                <p className="text-capitalize font-weight-semi-bold mb-0 text-dark">
                  {`${props.t('pages:Messages.details.date')}: ${moment(item.dateTime)
                    .utcOffset(3)
                    .format('DD/MM/yyyy - HH:mm:ss')}`}
                </p>
                <p className="font-weight-semi-bold mb-0 text-dark">
                  {`${props.t('pages:Messages.details.recipient')}: ${item.replyFrom.name}`}
                </p>
              </div>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: item.text }} />
        </div>
      ));
    }
  }

  function SubmitSent(value: string) {
    console.log(value);
  }

  return (
    <div className="container-lg contrast-ignore-bg">
      <div className="row contrast-ignore-bg mx-0">
        <div className="img__page col-auto py-3 pl-0">
          <div className="img__page-messages contrast-ignore-bg" style={{ width: 60, height: 60 }} />
        </div>
        <h2 className="text-primary-default">{props.t('pages:Messages.title')}</h2>
      </div>
      <div className="row mx-0 mb-3">
        <div dangerouslySetInnerHTML={{ __html: props.t('pages:Messages.pageDescription') }} />
      </div>

      <div className="row mx-0 mb-3">
        <Link href="/mensagens/enviar">
          <a>
            <button className="br-button primary mt-0" type="button">
              {props.t('pages:Messages.buttonNewMessage')}
            </button>
          </a>
        </Link>
      </div>

      <Spotlight customClassName="info text-center">
        <strong className="text-​uppercase">{props.t('pages:Messages.details.title')}</strong>
      </Spotlight>

      {messages && messages.dataById ? (
        <form className="row justify-content-md-center mx-0 mb-5">
          <div className="row col-md-10">
            <p className="h5">
              {props.t('pages:Messages.details.subject')}: {messages.dataById.subject}
            </p>
            {renderReplys()}
          </div>
          {messages.dataById.messageAttachments?.length > 0 ? (
            <div className="row col-md-10 mt-5">
              <Attachments itensList={listAttachments(messages.dataById.messageAttachments)} />
            </div>
          ) : (
            ''
          )}
          <div className="row col-md-10 justify-content-md-end mt-5">
            <Link href="/mensagens">
              <a>
                <button className="br-button secondary" type="button">
                  {props.t('pages:Messages.goBack')}
                </button>
              </a>
            </Link>
            {canAnswer() ? (
              <button onClick={() => setStReply(!stReply)} className="br-button primary ml-1" type="button">
                {!stReply ? props.t('pages:Messages.details.reply') : props.t('pages:Messages.details.cancel')}
              </button>
            ) : (
              ''
            )}
          </div>
        </form>
      ) : (
        ''
      )}

      {stReply ? (
        <>
          <Spotlight customClassName="info text-center">
            <strong className="text-​uppercase">{props.t('pages:Messages.details.replyTitle')}</strong>
          </Spotlight>
          <form className="row justify-content-md-center mx-0 mb-5 mt-5">
            <div className="row col-md-10">
              <SunEditorElem handleChange={handleChange} id="reply" ref={(c) => (SunEditorHandle = c)} />

              <div className="mt-2 w-100">
                <Upload
                  title={props.t('pages:Messages.details.fileSendTitle')}
                  multiple
                  id="uploadFiles"
                  listFiles={setListFiles}
                  placeholder={props.t('pages:Messages.details.maxSizeInfo', {
                    max: `${EnvsConfig.apiMaxSize() / 1024 / 1024}MB`,
                  })}
                  suportedExt={fileTypes}
                />
              </div>

              <div className="row col-md-12 mx-0 px-0 justify-content-md-end">
                <button
                  onClick={() => SubmitSent(SunEditorHandle.onSubmit())}
                  className="br-button primary mt-2"
                  type="button"
                >
                  {props.t('pages:Messages.details.replySubmit')}
                </button>
              </div>
            </div>
          </form>
        </>
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

export default function MessagesId() {
  return (
    <Template>
      <MessagesIdPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
