import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction, useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Spotlight } from '@/components/shared/Spotlight';
import { Select } from '@/components/shared/Select';
import { ApplicationState } from '@/store';
import * as actionsSchoolYear from '@/store/ducks/schoolYear/actions';
import * as actionsActivites from '@/store/ducks/activites/actions';
import * as actionsDisciplines from '@/store/ducks/disciplines/actions';
import * as actionsSubjects from '@/store/ducks/subjects/actions';
import * as actionsTrafficContents from '@/store/ducks/trafficContents/actions';

import { Subjects } from '@/store/ducks/subjects/types';
import { TrafficContents } from '@/store/ducks/trafficContents/types';
import Pagination from '@/components/shared/Pagination';

interface StateProps {
  header?: string;
  t: TFunction;
  propsModel: any
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const ActivitesPage: React.FC<Props> = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);
  const disciplines = useSelector((state: ApplicationState) => state.disciplines);
  const subjects = useSelector((state: ApplicationState) => state.subjects);
  const trafficContents = useSelector((state: ApplicationState) => state.trafficContents);
  const activites = useSelector((state: ApplicationState) => state.activites);

  const [stCheckAll, setStCheckAll] = useState(true);
  const [stCheckAny, setStCheckAny] = useState(false);
  const [stCheckAnyDisciplines, setStCheckAnyDisciplines] = useState(false);
  const [stCheckAllDisciplines, setStCheckAllDisciplines] = useState(true);
  const [stAdvancedSearch, setStAdvancedSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);

  const router = useRouter();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    if (activites.dataProps?.year && activites.dataProps?.discipline) {
      const params = {
        disciplines: [activites.dataProps.discipline],
        schoolYears: [activites.dataProps.year],
      }

      dispatch(actionsActivites.loadSearchRequest(params));
      dispatch(actionsActivites.clearDataProps());
    }
    // eslint-disable-next-line
  }, [activites.dataProps]);

  useEffect(() => {
    dispatch(actionsSchoolYear.loadListRequest());
    dispatch(actionsDisciplines.loadListRequest());
    // eslint-disable-next-line
  }, []);

  function refreshAdvancedSearchOptions() {
    if (stCheckAnyDisciplines && stCheckAny && stAdvancedSearch) {
      const itensYear = [];
      const checkboxesYears = document.querySelectorAll('[name^="year_item"]');
      checkboxesYears.forEach((item: any) => {
        item.checked ? itensYear.push(item.value) : '';
      });

      const itensDisciplines = [];
      const checkboxesDisciplines = document.querySelectorAll('[name^="disciplines_item"]');
      checkboxesDisciplines.forEach((item: any) => {
        item.checked ? itensDisciplines.push(item.value) : '';
      });

      dispatch(
        actionsSubjects.loadFetchRequest({
          idSchoolYear: itensYear.join(),
          idDiscipline: itensDisciplines.join(),
        }),
      );
      dispatch(
        actionsTrafficContents.loadFetchRequest({
          idSchoolYear: itensYear.join(),
        }),
      );
    }
  }

  useEffect(() => {
    refreshAdvancedSearchOptions();
    // eslint-disable-next-line
  }, [stCheckAnyDisciplines, stCheckAny, stAdvancedSearch]);

  function checkSelectAll(name: string) {
    const checkboxes = document.querySelectorAll(`[name^="${name}"]`);
    let stValidaAll = true;
    let stValidaAny = false;
    checkboxes.forEach((item: any) => {
      stValidaAll = stValidaAll && item.checked;
      stValidaAny = stValidaAny || item.checked;
    });
    refreshAdvancedSearchOptions();
    setStCheckAny(stValidaAny);
    setStCheckAll(!stValidaAll);
  }

  function checkSelectAllDisciplines(name: string) {
    const checkboxes = document.querySelectorAll(`[name^="${name}"]`);
    let stValidaAll = true;
    let stValidaAny = false;
    checkboxes.forEach((item: any) => {
      stValidaAll = stValidaAll && item.checked;
      stValidaAny = stValidaAny || item.checked;
    });
    refreshAdvancedSearchOptions();
    setStCheckAnyDisciplines(stValidaAny);
    setStCheckAllDisciplines(!stValidaAll);
  }

  const selectAll = (name: string) => {
    setStCheckAll(!stCheckAll);
    const checkboxes = document.querySelectorAll(`[name^="${name}"]`);
    checkboxes.forEach((item: any) => {
      setValue(item.name, stCheckAll);
    });

    setStCheckAny(stCheckAll);
  };

  function selectAllDisciplines(name: string) {
    const checkboxes = document.querySelectorAll(`[name^="${name}"]`);
    setStCheckAllDisciplines(!stCheckAllDisciplines);
    checkboxes.forEach((item: any) => {
      setValue(item.name, stCheckAllDisciplines);
    });

    setStCheckAnyDisciplines(stCheckAllDisciplines);
  }

  function render_years_selector() {
    if (schoolYears?.data?.length > 0) {
      return schoolYears.data.map((item) => (
        <div key={`year_selector_${item.id}`} className="mr-1">
          <div className={`year-seletor mb-1`}>
            <input
              type="checkbox"
              value={item.id}
              defaultChecked={activites.dataProps?.year == item.id}
              onClick={() => checkSelectAll('year_item')}
              {...register(`year_item_${item.id}`)}
              id={`year_item_${item.id}`}
            />
            <label htmlFor={`year_item_${item.id}`} style={{ backgroundColor: `#${item.color}` }}>
              {item.ordinal}
            </label>
          </div>
        </div>
      ));
    }
  }

  function render_disciplines_selector() {
    if (disciplines?.data?.length > 0) {
      return disciplines.data.map((item) => (
        <div key={`disciplines_selector_${item.id}`} className="mr-1">
          <div className="disciplines-seletor mb-1" style={{ height: 32, display: 'flex' }}>
            <input
              type="checkbox"
              value={item.id}
              defaultChecked={activites.dataProps?.discipline == item.id}
              onClick={() => checkSelectAllDisciplines('disciplines_item')}
              {...register(`disciplines_item_${item.id}`)}
              id={`disciplines_item_${item.id}`}
            />
            <label htmlFor={`disciplines_item_${item.id}`}>{item.name}</label>
          </div>
        </div>
      ));
    }
  }

  function render_objeto_conhecimento() {
    if (subjects?.data?.rows) {
      return subjects.data.rows.map((item: Subjects) => {
        return (
          <div key={`objeto_conhecimento_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
            <div className="br-radio">
              <input
                id={`objeto_conhecimento_${item.idDiscipline}_${item.idSchoolYear}_${item.id}`}
                {...register('disciplineSubject')}
                value={item.id}
                type="radio"
              />
              <label htmlFor={`objeto_conhecimento_${item.idDiscipline}_${item.idSchoolYear}_${item.id}`}>
                {item.description}
              </label>
            </div>
          </div>
        );
      });
    }
  }

  function render_conteudo_transito() {
    if (trafficContents?.data?.length > 0) {
      return trafficContents.data.map((item: TrafficContents) => {
        return (
          <div key={`conteudo_transito_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
            <div className="br-radio">
              <input
                id={`conteudo_transito_${item.trafficConceptId}_${item.id}`}
                {...register('trafficContent')}
                value={item.id}
                type="radio"
              />
              <label htmlFor={`conteudo_transito_${item.trafficConceptId}_${item.id}`}>
                {item.trafficConcept.idSchoolYear} - {item.description}
              </label>
            </div>
          </div>
        );
      });
    }
  }

  function render_advanced_search() {
    if (stAdvancedSearch) {
      const newAtt = { 'form-value': null };
      return (
        <>
          <div className="br-input mb-1">
            <label htmlFor="conteudo_transito">{props.t('pages:Activities.details.trafficContent')}:</label>
            <Select
              placeholder={props.t('general:Form.placeholderSelect')}
              id="conteudo_transito"
              className="mw-100"
            >
              <div className="br-item w-100" tabIndex={-1}>
                <div className="br-radio">
                  <input id="conteudo_transito_null" {...newAtt} type="radio" name="radio" />
                  <label htmlFor="conteudo_transito_null">{props.t('general:Form.placeholderSelect')}</label>
                </div>
              </div>
              {render_conteudo_transito()}
            </Select>
          </div>

          <div className="br-input mb-5">
            <label htmlFor="objeto_conhecimento">{props.t('pages:Activities.details.knowledgeObject')}:</label>
            <Select
              placeholder={props.t('general:Form.placeholderSelect')}
              id="objeto_conhecimento"
              className="mw-100"
            >
              <div className="br-item w-100" tabIndex={-1}>
                <div className="br-radio">
                  <input id="objeto_conhecimento_null" {...newAtt} type="radio" name="radio" />
                  <label htmlFor="objeto_conhecimento_null">{props.t('general:Form.placeholderSelect')}</label>
                </div>
              </div>
              {render_objeto_conhecimento()}
            </Select>
          </div>
        </>
      );
    }
  }

  function changePage(pageChange: number, itensPerChange: number, data: any[]): any[] {
    pageChange = Math.min(Math.max(pageChange, 1), numPages(data.length, itensPerChange));
    const arrayItens = [];
    for (let i = (pageChange - 1) * itensPerChange; i < pageChange * itensPerChange; i++) {
      if (data[i]) {
        arrayItens.push(data[i]);
      }
    }
    return arrayItens;
  }

  function numPages(numItens: number, itensPerChange: number) {
    return Math.ceil(numItens / itensPerChange);
  }

  function renderList() {
    const listFiltered = changePage(currentPage, numberItensPer, activites?.data)
    return (
      listFiltered.map((item) => (
        <Link href={`${router.asPath}/${item.id}`} as={`${router.asPath}/${item.id}`} locale="pt-BR" key={`list_activites_${item.id}`}>
          <a>
            <Spotlight customClassName="info">
              <div className="front">
                <div className="d-flex align-items-center">
                  <span className="br-avatar">
                    <span
                      className="image text-secondary-01 no-user-content"
                      style={{ backgroundColor: `#${item.schoolYear.color || '1351b4'}` }}
                    >
                      {item.schoolYear.year}
                    </span>
                  </span>
                  <div className="flex-fill mx-3">
                    <div className="text-primary-default text-up-01">{item.title}</div>
                    <span>{item.discipline.name}</span>
                  </div>
                </div>
              </div>
            </Spotlight>
          </a>
        </Link>
      ))
    )
  }

  function onSubmit() {
    const itensYear = [];
    const checkboxesYears = document.querySelectorAll('[name^="year_item"]');
    checkboxesYears.forEach((item: any) => {
      item.checked ? itensYear.push(item.value) : '';
    });

    const itensDisciplines = [];
    const checkboxesDisciplines = document.querySelectorAll('[name^="disciplines_item"]');
    checkboxesDisciplines.forEach((item: any) => {
      item.checked ? itensDisciplines.push(item.value) : '';
    });

    const disciplineSubject = watch('disciplineSubject');
    const trafficContent = watch('trafficContent');

    const params = {
      disciplineSubject: Number(disciplineSubject) || null,
      trafficContent: Number(trafficContent) || null,
      disciplines: itensDisciplines,
      isStartYear: true,
      keyword: watch('keyword_input'),
      schoolYears: itensYear,
    }

    dispatch(actionsActivites.loadSearchRequest(params));
  }

  return (
    <div className="container-lg contrast-ignore-bg">
      <div className="row contrast-ignore-bg mx-0">
        <div className="img__page col-auto py-3 pl-0">
          <div className="img__page-activities contrast-ignore-bg" style={{ width: 60, height: 60 }} />
        </div>
        <h2 className="text-primary-default">{props.t('pages:Activities.title')}</h2>
      </div>
      <div style={{ lineHeight: '2.5em' }} dangerouslySetInnerHTML={{ __html: props.t('pages:Activities.aboutArea') }} />

      <Spotlight customClassName="info text-center">
        <strong className="text-​uppercase">{props.t('pages:Activities.searchtitle')}</strong>
      </Spotlight>

      <div className="row justify-content-md-center mx-0 pb-5">
        <div className="col-md-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <strong>{props.t('components:MultiSelectButton.schoolYearsTitle')}:</strong>
              <div className="wrapper align-items-center mt-1" style={{ display: 'flex' }}>
                <button
                  className="br-button primary mr-1 mb-1"
                  onClick={() => selectAll('year_item')}
                  style={stCheckAll ? { backgroundColor: '#c8dbff' } : {}}
                  type="button"
                >
                  {props.t('components:MultiSelectButton.selectAll')}
                </button>
                {render_years_selector()}
              </div>
            </div>
            <div className="mb-3">
              <strong>{props.t('components:MultiSelectButton.title')}:</strong>
              <div className="align-items-center mt-1" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <button
                  className="br-button primary mr-1 mb-1"
                  onClick={() => selectAllDisciplines('disciplines_item')}
                  style={stCheckAllDisciplines ? { backgroundColor: '#c8dbff' } : {}}
                  type="button"
                >
                  {props.t('components:MultiSelectButton.selectAll')}
                </button>
                {render_disciplines_selector()}
              </div>
            </div>

            <div className="mb-5">
              <div className="br-input has-icon mb-5">
                <label htmlFor="password-id1">{props.t('pages:Activities.keyword')}:</label>
                <input
                  className="has-icon"
                  id="password-id1"
                  {...register('keyword_input')}
                  type="text"
                  placeholder={props.t('pages:Activities.keyword')}
                />
                <button className="br-button circle small" type="submit" aria-label={props.t('pages:Activities.keyword')}>
                  <i className="fas fa-search" aria-hidden="true" />
                </button>
              </div>
            </div>

            {stCheckAnyDisciplines && stCheckAny ? (
              <div className="mb-3">
                <button
                  style={{ minWidth: 182 }}
                  className="br-button secondary mr-1 mb-3"
                  onClick={() => setStAdvancedSearch(!stAdvancedSearch)}
                  type="button"
                >
                  {props.t('pages:Activities.advancedSearch')}
                </button>
                {render_advanced_search()}
              </div>
            ) : (
              ''
            )}

            <div className="mb-5">
              <button style={{ minWidth: 182 }} className="br-button primary mr-1 mb-1" type="submit">
                {props.t('pages:Activities.submit')}
              </button>
            </div>
          </form>
        </div>
        {activites?.data ? (
          <>
            <div className="col-12 mb-5">
              <div className="text-center py-2">
                <strong className="text-​uppercase">{props.t('pages:Activities.details.searchResult')}</strong>
              </div>
              <span className="br-divider" />
            </div>
            {activites?.data?.length > 0 ? (
              <>
                <div className="col-md-10 mb-2">
                  <div className="br-list" role="list">
                    {renderList()}
                  </div>
                  <Pagination
                    id={'listActivities'}
                    translations={props.t}
                    countItensPerPage={numberItensPer}
                    countCurrentPage={currentPage}
                    setNumberItensPer={setNumberItensPer}
                    setCurrentPage={setCurrentPage}
                    useFormProps={{
                      watch,
                      setValue,
                      register
                    }}
                    count={activites?.data?.length}
                  />
                </div>
              </>
            ) : (
              <div className="col-md-10 mb-5">
                <div className="br-list text-center" role="list">
                  <Spotlight customClassName="info">
                    <div className={'text-secondary'}>
                      <i className="fas fa-inbox fa-5x" /><br />
                      {props.t('pages:Activities.emptyResults')}
                    </div>
                  </Spotlight>
                </div>
              </div>
            )}
          </>
        ) : ''}
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  return ({
    props: {
      ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
    },
  })
};

export default function Activities({ ...props }) {
  return (
    <Template>
      <ActivitesPage {...props}
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
