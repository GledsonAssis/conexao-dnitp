import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import * as actionsCourses from '@/store/ducks/courses/actions';
import { TFunction, useTranslation } from 'next-i18next';
// import Rating from '@material-ui/lab/Rating';
import Rating from 'react-rating';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton
} from 'react-share';

import moment from 'moment';

import { AttachmentsType } from '@/store/ducks/courses/types';

import CommentList from '@/components/shared/CommentList';
import Galery from '@/components/shared/Galery';
import { Attachments } from '@/components/shared/Attachments';
import { sortOptionsParser } from '@/utils/parsers';
import actionsFieldsSortFilter from './fieldsSortFilter.json';
import Link from 'next/link';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const CoursesIdPage: React.FC<Props> = ({ propsModel, t }) => {
  const router = useRouter();
  const { id } = router.query;
  const [optionsFilter, setOptionsFilter] = useState([]);

  const dispatch = useDispatch();
  const fetchCourses = useSelector((state: ApplicationState) => state.courses);

  const labels = {
    attachments: t('pages:Attachments.title'),
    sectionTitle: t('pages:Project.action.title'),
    rating: `${t('components:Rating.title')}: `,
  };

  useEffect(() => {
    if (id) {
      dispatch(actionsCourses.loadFetchRequest({ id }));
      dispatch(actionsCourses.loadFetchImagesRequest({ id }));
      dispatch(actionsCourses.loadFetchCommentsRequest({ id }));
      dispatch(actionsCourses.loadFetchAttachmentsRequest({ id }));
      dispatch(actionsCourses.loadFetchRatingRequest({ id }));

      setOptionsFilter(actionsFieldsSortFilter.map(sortOptionsParser(t)));
    }
    // eslint-disable-next-line
  }, []);

  function downlaodAttachment(id: string | number) {
    dispatch(actionsCourses.loadGetAttachmentsRequest({ id }));
  }

  function listAttachments(data: AttachmentsType[]) {
    return [
      {
        title: t('pages:Courses.details.downloads'),
        itens: data.map((item) => ({
          text: item.name,
          path: item.id,
        })),
        handleDownload: downlaodAttachment,
      },
    ];
  }

  function sendRating(rating: number | string) {
    dispatch(actionsCourses.setRateRequest({ id, rating }));
  }

  function submitNewComment(data: any) {
    const Params = { idCourse: id, comment: data.txtComment };
    data.idParent ? Params['idParent'] = data.idParent : '';
    dispatch(actionsCourses.loadSubmitNewRequest(Params));
  }

  function deleteComment(data: any) {
    dispatch(actionsCourses.loadDeleteCommentRequest({ idCourse: id, id: data.id }));
  }

  return (
    <>
      <div className="container-lg contrast-ignore-bg pb-4">
        <div className="row contrast-ignore-bg mx-0 flex-lg-nowrap pr-lg-7x">
          <div className="img__page col-auto py-3 pl-0">
            <div className="img__page-courses contrast-ignore-bg" style={{ width: 60, height: 60 }} />
          </div>
          <h2 className="text-primary-default">{fetchCourses.data.length > 0 ? fetchCourses.data[0].title : ''}</h2>
        </div>
        <p>{fetchCourses.data.length > 0 ? fetchCourses.data[0].summary : ''}</p>
        <div className={`w-100 text-right ${propsModel?.isLogged ? '' : 'd-none'}`}>
          {t('components:Rating.rating')}:
          <Rating
            onChange={(rate) => sendRating(rate)}
            initialRating={fetchCourses?.dataById?.rating}
            emptySymbol={<i className="fa fa-star text-secondary" />}
            fullSymbol={<i className="fa fa-star text-warning" />}
          />
        </div>
        <div className="row divider-top divider-bottom mt-1 mb-1 pt-2 pb-2 inline-block mx-0">
          <div className="col-auto">
            {t('components:Header.publishText')}
            {' '}
            {fetchCourses.data.length > 0 ? moment(fetchCourses.data[0].date).utcOffset(3).format('DD/MM/yyyy') : ''}
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
              <Galery images={fetchCourses.dataById && fetchCourses.dataById.images} />
            </div>
            <div className="col-8 position-relative">
              <div
                className={`text-right mb-1 ${fetchCourses.dataById?.attachments.length > 0 ? '' : 'd-none'}`}
              >
                <i className={`fas fa-download fa-2x text-primary-default`} />
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: fetchCourses.data.length > 0 ? fetchCourses.data[0].description : '' }}
              />
              {fetchCourses.data[0]?.link &&
                <Link href={fetchCourses.data[0]?.link}>
                  <a target="_blank">
                    <button className="br-button primary" type="button">
                      {t('pages:Courses.join')}
                    </button>
                  </a>
                </Link>
              }
            </div>
          </div>
        </div>
        <div className="container mb-5">
          {fetchCourses.dataById.attachments.length > 0 ? (
            <Attachments itensList={listAttachments(fetchCourses.dataById.attachments)} />
          ) : ''}
        </div>

        <CommentList
          onSubmitComment={submitNewComment}
          onDelete={deleteComment}
          allowReply={propsModel?.isLogged}
          translation={t}
          commentBoxCommentText={fetchCourses.dataById && fetchCourses.dataById.comments}
        />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => ({
  paths: [],
  fallback: true,
});

// TODO: Pegar id das props iniciais e não da rota
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  let data = null;
  try {
    data = {
      ...await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages']),
      ...params
    }
  } catch (err) {
    console.log('serverSideErrors', err)
  };

  return {
    props: data
  }
};

export default function CoursesId() {
  return (
    <Template>
      <CoursesIdPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
