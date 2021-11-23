import React, { useEffect } from 'react';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import * as actionsActivites from '@/store/ducks/activites/actions';
import * as actionsSchoolYear from '@/store/ducks/schoolYear/actions';
import { TFunction, useTranslation } from 'next-i18next';

import { IconsDisciplines } from '@/assets/icons/disciplinas';
import { Attachments } from '@/components/shared/Attachments';

import { attachmentsItens } from '@/store/ducks/activites/types';
import Link from 'next/link';

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

function typeToClass(type: number, fill: string) {
  switch (type) {
    case 1:
      return <IconsDisciplines.IconPortugues fill={fill} width={50} height={50} />;
    case 2:
      return <IconsDisciplines.IconArtes fill={fill} width={50} height={50} />;
    case 3:
      return <IconsDisciplines.IconEdFisica fill={fill} width={50} height={50} />;
    case 4:
      return <IconsDisciplines.IconIngles fill={fill} width={50} height={50} />;
    case 5:
      return <IconsDisciplines.IconMatematica fill={fill} width={50} height={50} />;
    case 6:
      return <IconsDisciplines.IconCiencias fill={fill} width={50} height={50} />;
    case 7:
      return <IconsDisciplines.IconGeografia fill={fill} width={50} height={50} />;
    case 8:
      return <IconsDisciplines.IconHistoria_2 fill={fill} width={50} height={50} />;
    default:
      return 'Default';
  }
}

export const ActivitesIdPage: React.FC<Props> = ({ children, ...props }) => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const activites = useSelector((state: ApplicationState) => state.activites);
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);

  useEffect(() => {
    if (id) {
      dispatch(actionsSchoolYear.loadListRequest());
      dispatch(actionsActivites.loadFetchIdRequest({ id }));
    }
    // eslint-disable-next-line
  }, []);

  function downlaodAttachment(id: string | number) {
    dispatch(actionsActivites.loadGetAttachmentsRequest({ id }));
  }

  function listAttachments(data: attachmentsItens[]) {
    return data.map((item) => ({
      title: item.name,
      itens: item.files.map((row) => ({
        text: row.name,
        path: row.id,
      })),
      handleDownload: downlaodAttachment,
    }));
  }

  function render_page() {
    if (activites && activites.fetchId && schoolYears && schoolYears.data) {
      const activite = activites.fetchId;
      const schoolYear = schoolYears.data;
      const schoolYearsOptions = schoolYear.find((item) => item.id === activite.trafficConcept.schoolYear.id);
      const colotYear = `#${schoolYearsOptions ? schoolYearsOptions.color : '1351b4'}`;

      return (
        <>
          <div className="container pb-4">
            <div className="row mx-0">
              <div className="img__page col-auto py-3 pr-md-5 d-flex" style={{ alignItems: 'center' }}>
                {typeToClass(activite.discipline.id, colotYear)}
              </div>
              <h2 className="text-primary-default">{activite.discipline.name || ''}</h2>
            </div>
            <div className="row justify-content-md-center mx-0">
              <div className="row col-12 col-md-10 mb-5  mx-0">
                <div className="col-auto px-0">
                  <span className="br-avatar">
                    <span className="image text-secondary-01 no-user-content" style={{ backgroundColor: colotYear }}>
                      {activite.trafficConcept.schoolYear.ordinal}
                    </span>
                  </span>
                  <div
                    className="bar-activites"
                    style={{
                      backgroundColor: colotYear,
                    }}
                  />
                </div>
                <div className="col">
                  {activite.userEvaluation ?
                    <Link href={`${router.asPath}/avaliacoes`}>
                      <a>
                        <button style={{ minWidth: 182 }} className="br-button primary d-none d-sm-block mb-1 float-right" type="submit">
                          {props.t('pages:Activities.details.evaluateActivityBtnText')}
                        </button>
                      </a>
                    </Link>
                    : ''}
                  <p className="h3">{activite.title}</p>
                  <p className="mb-0">
                    <strong>{props.t('pages:Activities.details.discipline')}</strong>
                  </p>
                  <p>{activite.discipline.name}</p>

                  <p className="mb-0">
                    <strong>{props.t('pages:Activities.details.knowledgeObject')}</strong>
                  </p>
                  <p>{activite.discipline.knowledgeArea.description}</p>

                  <p className="mb-0">
                    <strong>{props.t('pages:Activities.details.trafficContent')}</strong>
                  </p>
                  <p>{activite.trafficConcept.description}</p>

                  <p className="mb-0">
                    <strong>{props.t('pages:Activities.details.teachingArticulation')}</strong>
                  </p>
                  <p>{activite.teachingArticulation}</p>

                  <p className="mb-0">
                    <strong>{props.t('pages:Activities.details.time')}</strong>
                  </p>
                  <p>{activite.duration}</p>

                  <p className="mb-0">
                    <strong>{props.t('pages:Activities.details.resources')}</strong>
                  </p>
                  <p>{activite.resource}</p>
                </div>
                {activite.userEvaluation ?
                  <div className="col-12 d-block d-sm-none">
                    <Link href={`${router.asPath}/avaliacoes`}>
                      <a>
                        <button style={{ minWidth: 182 }} className="br-button primary w-100 mb-1" type="submit">
                          {props.t('pages:Activities.details.evaluateActivityBtnText')}
                        </button>
                      </a>
                    </Link>
                  </div>
                  : ''}
              </div>
              <div className="row col-md-10  mx-0">
                <div className="container p-0">
                  {activites && activites.fetchId ? (
                    <Attachments itensList={listAttachments(activites.fetchId.attachments)} />
                  ) : ('')}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    return <></>;
  }

  return <>{render_page()}</>;
};

export default function ActivitiesId() {
  return (
    <Template>
      <ActivitesIdPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
