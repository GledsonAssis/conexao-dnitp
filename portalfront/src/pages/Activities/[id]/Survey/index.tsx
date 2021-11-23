import React, { useEffect } from 'react';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import * as actionsActivites from '@/store/ducks/activites/actions';
import * as actionsSchoolYear from '@/store/ducks/schoolYear/actions';
import { TFunction } from 'next-i18next';
import { IconsDisciplines } from '@/assets/icons/disciplinas';

import { Question, Section, typeQuestion } from '@/store/ducks/activites/types';
import { useForm } from 'react-hook-form';
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

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  const dispatch = useDispatch();
  const activites = useSelector((state: ApplicationState) => state.activites);
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);

  useEffect(() => {
    if (id) {
      dispatch(actionsSchoolYear.loadListRequest());
      dispatch(actionsActivites.loadFetchIdRequest({ id }));
      dispatch(actionsActivites.loadFetchSurveyRequest({ id }));
    }
    // eslint-disable-next-line
  }, []);

  function itemQuestion(item: Question, indexSection: number, indexQuestion: number, disable: boolean = false) {
    switch (+item.type) {
      case typeQuestion.TEXT:
        return (
          <div className={`mb-4`}>
            <div className={`br-input mb-2 w-100 ${errors?.sections?.[indexSection]?.questions?.[indexQuestion]?.alternatives[0]?.justify?.type ? 'danger' : ''}`}>
              <label htmlFor={`text_quartion_${item.idSection}_${item.id}`}>
                {item.question}
              </label>
              <input
                maxLength={255}
                className={`has-icon ${errors?.sections?.[indexSection]?.questions?.[indexQuestion]?.alternatives[0]?.justify?.type ? 'danger' : ''}`}
                id={`text_quartion_${item.idSection}_${item.id}`}
                {...register(`sections[${indexSection}].questions[${indexQuestion}].alternatives[0].justify`, { required: item.required && !disable })}
                defaultValue={item.alternatives[0].justify}
                disabled={disable}
                type="text"
              />
              {errors?.sections?.[indexSection]?.questions?.[indexQuestion]?.alternatives[0]?.justify?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {props.t('general:Form.validation.required')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        )
      case typeQuestion.ONE_CHOICE:
        return (
          <div className={`mb-4`}>
            <div className={`br-input mb-2 w-100 ${errors?.sections?.[indexSection]?.questions?.[indexQuestion]?.alternatives.option?.type ? 'danger' : ''}`}>
              <label className="mb-1" htmlFor={`text_quartion_${item.idSection}_${item.id}`}>
                {item.question}<br />
                {errors?.sections?.[indexSection]?.questions?.[indexQuestion]?.alternatives.option?.type ?
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {props.t('general:Form.validation.required')}
                  </span>
                  : ''}
              </label>
              {item.alternatives.map((alternative, indexAlternative) =>
                <div className={`mb-2`} key={`radio_quartion_${item.idSection}_${item.id}_${alternative.id}`}>
                  <div className="br-radio">
                    <input
                      id={`radio_quartion_${item.idSection}_${item.id}_${alternative.id}`}
                      {...register(`sections[${indexSection}].questions[${indexQuestion}].alternatives.option`, { required: item.required && !disable })}
                      disabled={disable}
                      defaultChecked={alternative.selected}
                      type="radio"
                      value={alternative.id}
                    />
                    <label htmlFor={`radio_quartion_${item.idSection}_${item.id}_${alternative.id}`}>{alternative.option}</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      case typeQuestion.MULTI_CHOICE:
        return (
          <div className={`mb-4`}>
            <div className="br-input mb-2 w-100">
              <label className="mb-1" htmlFor={`text_quartion_${item.idSection}_${item.id}`}>
                {item.question}
              </label>
              {item.alternatives.map((alternative, indexAlternative) =>
                <div className={`mb-2`} key={`checkbox_quartion_${item.idSection}_${item.id}_${alternative.id}`}>
                  <div className="br-checkbox">
                    <input
                      id={`checkbox_quartion_${item.idSection}_${item.id}_${alternative.id}`}
                      {...register(`sections[${indexSection}].questions[${indexQuestion}].alternatives[${indexAlternative}].option`, { required: item.required && !disable })}
                      disabled={disable}
                      defaultChecked={alternative.selected}
                      type="checkbox"
                      value={alternative.id} />
                    <label htmlFor={`checkbox_quartion_${item.idSection}_${item.id}_${alternative.id}`}>
                      {alternative.option}
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
    }
  }

  function itemSection(item: Section, indexSection: number, disable: boolean) {
    if (indexSection! === 0) {
      return (
        <div className={`mb-4`}>
          <p className="mb-0 h6">
            <strong>{item.title}</strong>
          </p>
          <p className="mb-2">{item.description}</p>
          <div className={`mb-4`}>
            <p className="mb-0 text-semi-bold">
              1. {props.t('pages:Activities.Surveys.userName')}:
            </p>
            <p>{props.propsModel?.userParser?.name}</p>
          </div>

          <div className={`mb-4`}>
            <p className="mb-0 text-semi-bold">
              2. {props.t('pages:Activities.Surveys.userRegion')}:
            </p>
            <p>{props.propsModel?.userParser?.DnitUnit?.identification || '-'}</p>
          </div>
          {console.log(props.propsModel?.userParser)}
          <div className={`mb-4`}>
            <p className="mb-0 text-semi-bold">
              3. {props.t('pages:Activities.Surveys.city')}:
            </p>
            <p>{props.propsModel?.userParser?.city?.name || '-'}</p>
          </div>

          <div className={`mb-4`}>
            <p className="mb-0 text-semi-bold">
              4. {props.t('pages:Activities.Surveys.state')}:
            </p>
            <p>{props.propsModel?.userParser?.city?.state?.name || '-'}</p>
          </div>
          {item.questions.map((question, indexQuestion) => {
            if (indexQuestion > 3) {
              return (
                <div key={`question_${item.id}_${question.id}_${item.idSurvey}`}>
                  {itemQuestion(question, indexSection, indexQuestion, disable)}
                </div>
              )
            }
          })}
        </div>)
    } else {
      return (
        <div className={`mb-4`}>
          <p className="mb-0 h6">
            <strong>{item.title}</strong>
          </p>
          <p className="mb-2">{item.description}</p>
          {item.questions.map((question, indexQuestion) => {
            return (
              <div key={`question_${item.id}_${question.id}_${item.idSurvey}`}>
                {itemQuestion(question, indexSection, indexQuestion, disable)}
              </div>
            )
          })}
        </div>
      )
    }
  }

  function parserAnswer(data: any, sections: Section[]) {
    return sections?.map((iSection, idxSection) => {
      return {
        ...iSection,
        questions: iSection.questions.map((iQuestion, idxQuestion) => {
          switch (iQuestion.type) {
            case typeQuestion.TEXT:
              return {
                ...iQuestion,
                alternatives: iQuestion?.alternatives.map((iAlternative, idxAlternative) => {
                  return {
                    ...iAlternative,
                    justify: data.sections?.[idxSection]?.questions?.[idxQuestion]?.alternatives?.[idxAlternative]?.justify
                  }
                })
              }
            case typeQuestion.ONE_CHOICE:
              return {
                ...iQuestion,
                alternatives: iQuestion?.alternatives.map((iAlternative) => {
                  return {
                    ...iAlternative,
                    selected: iAlternative.id === +data.sections?.[idxSection]?.questions?.[idxQuestion]?.alternatives?.option,
                    justify: +data.sections?.[idxSection]?.questions?.[idxQuestion]?.alternatives?.option
                  }
                })
              }
            case typeQuestion.MULTI_CHOICE:
              return {
                ...iQuestion,
                alternatives: iQuestion?.alternatives.map((iAlternative, idxAlternative) => {
                  return {
                    ...iAlternative,
                    selected: iAlternative.id === +data.sections?.[idxSection]?.questions?.[idxQuestion]?.alternatives?.[idxAlternative]?.option
                  }
                })
              }
          }
        })
      }
    })
  }

  function onSubmit(data: any) {
    const sections = activites.fetchSurvey.answer.sections;
    const params = {
      ...activites.fetchSurvey,
      answer: {
        ...activites.fetchSurvey.answer,
        sections: parserAnswer(data, sections)
      }
    }
    dispatch(actionsActivites.loadSubmitSurveyRequest({ params }));
    router.replace(router.asPath.substring(0, router.asPath.lastIndexOf('/')))
  }

  function render_page() {
    if (activites && activites.fetchId && schoolYears && schoolYears.data) {
      const activite = activites.fetchId;
      const schoolYear = schoolYears.data;
      const schoolYearsOptions = schoolYear.find((item) => item.id === activite.trafficConcept.schoolYear.id);
      const colotYear = `#${schoolYearsOptions ? schoolYearsOptions.color : '1351b4'}`;

      return (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container pb-4">
              <div className="row mx-0">
                <div className="img__page col-auto py-3 pr-md-5 d-flex" style={{ alignItems: 'center' }}>
                  {typeToClass(activite.discipline.id, colotYear)}
                </div>
                <h2 className="text-primary-default">{activite.discipline.name || ''}</h2>
              </div>
              <div className="row justify-content-md-center mx-0">
                <div className="row col-md-10 mb-5">
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
                    <p className="h3">{activite.title}</p>

                    <p className="h5 mb-1">
                      <strong>{activites?.fetchSurvey?.answer?.title}</strong>
                    </p>
                    <p className="mb-5"
                      style={{ whiteSpace: 'pre-line' }}
                      dangerouslySetInnerHTML={{ __html: `${activites?.fetchSurvey?.answer?.description}` }} />

                    {activites?.fetchSurvey?.answer?.sections ?
                      <>
                        {activites.fetchSurvey.answer.sections.map((item, indexSection) => {
                          return (<div key={`section_${item.id}_${item.idSurvey}`}>
                            {itemSection(item, indexSection, activites?.fetchSurvey?.answered)}
                          </div>)
                        })}

                        <div className="row">
                          <div className="col-12 col-sm text-center text-sm-left">
                            <Link href={router.asPath.substring(0, router.asPath.lastIndexOf('/'))}>
                              <a>
                                <div className="mb-3">
                                  <button className="br-button mb-1" type="submit">
                                    {props.t('pages:Activities.Surveys.cancel')}
                                  </button>
                                </div>
                              </a>
                            </Link>
                          </div>
                          {
                            activites?.fetchSurvey?.answer?.active ?
                              <div className="col-12 col-sm text-center text-sm-right">
                                <div className="mb-3">
                                  <button style={{ minWidth: 182 }} className="br-button primary mb-1" type="submit">
                                    {props.t('pages:Activities.Surveys.save')}
                                  </button>
                                </div>
                              </div>
                              : ''
                          }
                        </div>
                      </>
                      :
                      <div className="mt-5 loading medium mb-5" />
                    }
                  </div>
                </div>
              </div>
            </div>
          </form>
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
