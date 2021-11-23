import React, { useEffect } from 'react';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import * as actionsActions from '@/store/ducks/actions/actions';
import { TFunction, useTranslation } from 'next-i18next';
import moment from 'moment';

import { AttachmentsType } from '@/store/ducks/actions/types';

import CommentList from '@/components/shared/CommentList';
import Galery from '@/components/shared/Galery';
import { Attachments } from '@/components/shared/Attachments';
import { FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';
import Rating from 'react-rating';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => ({
  paths: [],
  fallback: true,
});

export const ActionsIdPage: React.FC<Props> = ({ propsModel, t }) => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const fetchActions = useSelector((state: ApplicationState) => state.actions);

  useEffect(() => {
    if (id) {
      dispatch(actionsActions.loadFetchRequest({ id }));
      dispatch(actionsActions.loadFetchImagesRequest({ id }));
      dispatch(actionsActions.loadFetchCommentsRequest({ id }));
      dispatch(actionsActions.loadFetchAttachmentsRequest({ id }));
      dispatch(actionsActions.loadFetchRatingRequest({ id }));
    }
    // eslint-disable-next-line
  }, []);

  function downlaodAttachment(id: string | number) {
    dispatch(actionsActions.loadGetAttachmentsRequest({ id }));
  }

  function listAttachments(data: AttachmentsType[]) {
    return [
      {
        title: t('pages:Action.details.downloads'),
        itens: data.map((item) => ({
          text: item.name,
          path: item.id,
        })),
        handleDownload: downlaodAttachment,
      },
    ];
  }

  function sendRating(rating: number | string) {
    dispatch(actionsActions.setRateRequest({ id, rating }));
  }

  function submitNewComment(data: any) {
    const Params = { idAction: id, comment: data.txtComment };
    data.idParent ? Params['idParent'] = data.idParent : '';
    dispatch(actionsActions.loadSubmitNewRequest(Params));
  }

  function deleteComment(data: any) {
    dispatch(actionsActions.loadDeleteCommentRequest({ idAction: id, id: data.id }));
  }

  return (
    <>
      <div className="container-lg contrast-ignore-bg pb-4">
        <div className="row contrast-ignore-bg mx-0">
          <div className="img__page col-auto py-3 pl-0">
            <div className="img__page-actions contrast-ignore-bg" style={{ width: 60, height: 60 }} />
          </div>
          <h2 className="text-primary-default">{fetchActions.data.length > 0 ? fetchActions.data[0].title : ''}</h2>
        </div>
        <p>{fetchActions.data.length > 0 ? fetchActions.data[0].summary : ''}</p>
        <div className={`w-100 text-right ${propsModel?.isLogged ? '' : 'd-none'}`}>
          {t('components:Rating.rating')}:
          <Rating
            onChange={(rate) => sendRating(rate)}
            initialRating={fetchActions?.dataById?.rating}
            emptySymbol={<i className="fa fa-star text-secondary" />}
            fullSymbol={<i className="fa fa-star text-warning" />}
          />
        </div>
        <div className="row divider-top divider-bottom mt-1 mb-1 pt-2 pb-2 inline-block mx-0">
          <div className="col-auto">
            {t('components:Header.publishText')}
            {' '}
            {fetchActions.data.length > 0 ? moment(fetchActions.data[0].date).utcOffset(3).format('DD/MM/yyyy') : ''}
          </div>
        </div>
        <div className="container-lg">
          <div className="row my-5 mx-0">
            <div className="col-4">
              <Galery images={fetchActions.dataById ? fetchActions.dataById.images : []} />
            </div>
            <div className="col-8">
              <div
                className={`text-right mb-1 ${fetchActions.dataById?.attachments.length > 0 ? '' : 'd-none'}`}
              >
                <i className={`fas fa-download fa-2x text-primary-default`} />
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: fetchActions.data.length > 0 ? fetchActions.data[0].description : '' }}
              />
            </div>
          </div>
        </div>
        <div className="container mb-5">
          {fetchActions.dataById?.attachments.length > 0 ? (
            <Attachments itensList={listAttachments(fetchActions.dataById?.attachments)} />
          ) : ''}
        </div>

        <CommentList
          onSubmitComment={submitNewComment}
          onDelete={deleteComment}
          allowReply={propsModel?.isLogged}
          translation={t}
          commentBoxCommentText={fetchActions.dataById && fetchActions.dataById.comments}
        />
      </div>
    </>
  );
};

export default function ActionsId() {
  return (
    <Template>
      <ActionsIdPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
