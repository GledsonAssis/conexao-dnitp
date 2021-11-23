import React, { useEffect, useState } from 'react';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import * as actionsProjectsActions from '@/store/ducks/projectsActions/actions';
import { TFunction, useTranslation } from 'next-i18next';
// import Rating from '@material-ui/lab/Rating';
import Rating from 'react-rating';
import moment from 'moment';

import { AttachmentsType } from '@/store/ducks/projects/types';

import { sortOptionsParser } from '@/utils/parsers';
import CommentList from '@/components/shared/CommentList';
import Galery from '@/components/shared/Galery';
import { Attachments } from '@/components/shared/Attachments';
import actionsFieldsSortFilter from '../fieldsSortFilter.json';
import { FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';

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

export const getStaticPaths: GetStaticPaths<{ id: string; idAction: string }> = async () => ({
  paths: [],
  fallback: true,
});

export const Profile: React.FC<Props> = ({ propsModel, t }) => {
  const router = useRouter();
  const { idAction } = router.query;
  const [optionsFilter, setOptionsFilter] = useState([]);

  const dispatch = useDispatch();
  const fetchProject = useSelector((state: ApplicationState) => state.projectsActions);

  useEffect(() => {
    if (idAction) {
      dispatch(actionsProjectsActions.loadFetchRequest({ id: idAction }));
      dispatch(actionsProjectsActions.loadFetchImagesRequest({ id: idAction }));
      dispatch(actionsProjectsActions.loadFetchCommentsRequest({ id: idAction }));
      dispatch(actionsProjectsActions.loadFetchAttachmentsRequest({ id: idAction }));
      dispatch(actionsProjectsActions.loadFetchRatingRequest({ id: idAction }));

      setOptionsFilter(actionsFieldsSortFilter.map(sortOptionsParser(t)));
    }
    // eslint-disable-next-line
  }, []);

  function downlaodAttachment(id: string | number) {
    dispatch(actionsProjectsActions.loadGetAttachmentsRequest({ id }));
  }

  function listAttachments(data: AttachmentsType[]) {
    return [
      {
        title: t('pages:Project.details.downloads'),
        itens: data.map((item) => ({
          text: item.name,
          path: item.id,
        })),
        handleDownload: downlaodAttachment,
      },
    ];
  }

  function sendRating(rating: number | string) {
    dispatch(actionsProjectsActions.setRateRequest({ id: idAction, rating }));
  }

  function submitNewComment(data: any) {
    const Params = { idProject: idAction, comment: data.txtComment };
    data.idParent ? Params['idParent'] = data.idParent : '';
    dispatch(actionsProjectsActions.loadSubmitNewRequest(Params));
  }

  function deleteComment(data: any) {
    dispatch(actionsProjectsActions.loadDeleteCommentRequest({ idProject: idAction, id: data.id }));
  }

  return (
    <>
      <div className="container-lg contrast-ignore-bg pb-4">
        <div className="row contrast-ignore-bg mx-0 flex-lg-nowrap pr-lg-7x">
          <div className="img__page col-auto py-3 pl-0">
            <div className="img__page-projects contrast-ignore-bg" style={{ width: 60, height: 60 }} />
          </div>
          <h2 className="text-primary-default">{fetchProject?.data?.length > 0 ? fetchProject.data[0].title : ''}</h2>
        </div>
        <p>{fetchProject.data.length > 0 ? fetchProject.data[0].summary : ''}</p>
        <div className={`w-100 text-right ${propsModel?.isLogged ? '' : 'd-none'}`}>
          {t('components:Rating.rating')}:
          <Rating
            onChange={(rate) => sendRating(rate)}
            initialRating={fetchProject?.dataById?.rating}
            emptySymbol={<i className="fa fa-star text-secondary" />}
            fullSymbol={<i className="fa fa-star text-warning" />}
          />
        </div>
        <div className="row divider-top divider-bottom mt-1 mb-1 pt-2 pb-2 inline-block mx-0">
          <div className="col-auto">
            {t('components:Header.publishText')}
            {' '}
            {fetchProject.data.length > 0 ? moment(fetchProject.data[0].date).utcOffset(3).format('DD/MM/yyyy') : ''}
          </div>
          <div className="col-auto">
            {fetchProject.data.length > 0 && fetchProject.data[0].updateDate
              ? `${t('components:Header.updatedAt')} ${fetchProject.data[0].updateDate}`
              : ''}
          </div>
          <div className={`col text-right ${propsModel?.isLogged ? '' : 'd-none'}`}>
            {t('components:Header.shereText')}
            <FacebookShareButton url={typeof window !== 'undefined' && window.location.href ? window.location.href : ''}>
              <i className="fab fa-facebook text-primary-default" />
            </FacebookShareButton>
            <LinkedinShareButton url={typeof window !== 'undefined' && window.location.href ? window.location.href : ''}>
              <i className="fab fa-linkedin-in text-primary-default"></i>
            </LinkedinShareButton>
            <TwitterShareButton url={typeof window !== 'undefined' && window.location.href ? window.location.href : ''}>
              <i className="fab fa-twitter text-primary-default" />
            </TwitterShareButton>
            <TelegramShareButton url={typeof window !== 'undefined' && window.location.href ? window.location.href : ''}>
              <i className="fab fa-telegram-plane text-primary-default" />
            </TelegramShareButton>
          </div>
        </div>
        <div className="container">
          <div className="row my-5 mx-0">
            <div className="col-4">
              <Galery images={fetchProject?.dataById?.images} />
            </div>
            <div className="col-8 position-relative">
              <div
                className={`text-right mb-1 ${fetchProject.dataById?.attachments.length > 0 ? '' : 'd-none'}`}
              >
                <i className={`fas fa-download fa-2x text-primary-default`} />
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: fetchProject.data.length > 0 ? fetchProject.data[0].description : '' }}
              />
            </div>
          </div>
        </div>

        <div className="container mb-5">
          {fetchProject.dataById.attachments?.length > 0 ? (
            <Attachments itensList={listAttachments(fetchProject.dataById?.attachments)} />
          ) : ''}
        </div>
        <CommentList
          onSubmitComment={submitNewComment}
          onDelete={deleteComment}
          allowReply={propsModel?.isLogged}
          translation={t}
          commentBoxCommentText={fetchProject.dataById?.comments}
        />
      </div>
    </>
  );
};

export default function Projects() {
  return (
    <Template>
      <Profile
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
