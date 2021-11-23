import React, { useEffect, useState } from 'react';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import * as actionsProjects from '@/store/ducks/projects/actions';
import { TFunction, useTranslation } from 'next-i18next';
import Rating from 'react-rating';
import moment from 'moment';
import Section from '@/components/shared/Section';
import SortFilter from '@/components/shared/SortFilter';

import Link from 'next/link';
import CommentList from '@/components/shared/CommentList';
import Galery from '@/components/shared/Galery';
import { Spotlight } from '@/components/shared/Spotlight';
import { sortOptionsParser } from '@/utils/parsers';
import actionsFieldsSortFilter from './fieldsSortFilter.json';
import { FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';
import { Attachments } from '@/components/shared/Attachments';

import { AttachmentsType } from '@/store/ducks/projects/types';

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

export const Profile: React.FC<Props> = ({ propsModel, t }) => {
  const router = useRouter();
  const { id } = router.query;
  const [optionsFilter, setOptionsFilter] = useState([]);
  const [changeFilter, setChangeFilter] = useState(actionsFieldsSortFilter[0]);

  const dispatch = useDispatch();
  const fetchProject = useSelector((state: ApplicationState) => state.projects);

  const labels = {
    attachments: t('pages:Attachments.title'),
    sectionTitle: t('pages:Project.action.title'),
    rating: `${t('components:Rating.title')}: `,
  };

  useEffect(() => {
    if (id) {
      dispatch(actionsProjects.loadFetchRequest({ id }));
      dispatch(actionsProjects.loadFetchActionsRequest({ id }));
      dispatch(actionsProjects.loadFetchImagesRequest({ id }));
      dispatch(actionsProjects.loadFetchCommentsRequest({ id }));
      dispatch(actionsProjects.loadFetchAttachmentsRequest({ id }));
      dispatch(actionsProjects.loadFetchRatingRequest({ id }));

      setOptionsFilter(actionsFieldsSortFilter.map(sortOptionsParser(t)));
    }
    // eslint-disable-next-line
  }, []);

  function sortItens(data: any[]) {
    let order = 1;
    if (changeFilter.order === 'desc') order = -1;

    return data.sort((a, b) => {
      if (a[changeFilter.field] < b[changeFilter.field]) {
        return -1 * order;
      }
      if (a[changeFilter.field] > b[changeFilter.field]) {
        return 1 * order;
      }
      return 0;
    })
  }

  function renderList() {
    if (fetchProject?.dataById?.actions) {
      const data = sortItens(fetchProject.dataById.actions);
      return data.map((item: any) => (
        <Link
          href={{
            pathname: `${router.asPath}/acoes/[idAction]`,
            query: { idAction: item.id },
          }}
          key={`${item.idProject}_${item.id}`}
        >
          <a>
            <Spotlight customClassName="info section-list-item p-0">
              <div className="front">
                <div className="d-flex align-items-center">
                  <div className="flex-fill mx-3">
                    <div className="text-primary-default text-up-01 text-bold">{item.title}</div>
                    <span>{moment(item.date).utcOffset(3).format('DD/MM/yyyy')}</span>
                  </div>
                </div>
              </div>
            </Spotlight>
          </a>
        </Link>
      ));
    }
  }

  function sendRating(rating: number | string) {
    dispatch(actionsProjects.setRateRequest({ id, rating }));
  }

  function submitNewComment(data: any) {
    const Params = { idProject: id, comment: data.txtComment };
    data.idParent ? Params['idParent'] = data.idParent : '';
    dispatch(actionsProjects.loadSubmitNewRequest(Params));
  }

  function deleteComment(data: any) {
    dispatch(actionsProjects.loadDeleteCommentRequest({ idProject: id, id: data.id }));
  }

  function downlaodAttachment(id: string | number) {
    dispatch(actionsProjects.loadGetAttachmentsRequest({ id }));
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

  return (
    <>
      <div className="container-lg contrast-ignore-bg pb-4" style={{ position: 'relative' }}>
        <div className="row contrast-ignore-bg mx-0 flex-lg-nowrap pr-lg-7x">
          <div className="img__page col-auto py-3 pl-0">
            <div className="img__page-projects contrast-ignore-bg" style={{ width: 60, height: 60 }} />
          </div>
          <h2 className="text-primary-default">{fetchProject.data.length > 0 ? fetchProject.data[0].title : ''}</h2>
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
              <Galery images={fetchProject.dataById && fetchProject.dataById.images} />
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

        {Boolean(fetchProject?.dataById?.actions?.length) &&
          <Section
            title={labels.sectionTitle}
            className="mb-5"
            options={
              optionsFilter.length ? (
                <SortFilter fields={optionsFilter} onChange={(value: any) => setChangeFilter(value)} btnClassName="br-button circle small transform-none" />
              ) : undefined
            }
          >
            <div className="mx-0">{renderList()}</div>
          </Section>
        }
        <CommentList
          onSubmitComment={submitNewComment}
          onDelete={deleteComment}
          allowReply={propsModel?.isLogged}
          translation={t}
          commentBoxCommentText={fetchProject.dataById && fetchProject.dataById.comments}
          className="mb-5"
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
