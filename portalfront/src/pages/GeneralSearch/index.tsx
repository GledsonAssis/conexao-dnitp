// TO DO:
// Permissões na listagem com relação ao typo e usuário logado

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction, useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Session from '@/utils/Session';

import { Spotlight } from '@/components/shared/Spotlight';
import { Datapicker } from '@/components/shared/DataPicker';
import generalSearchParser from '@/utils/parsers/generalSearchParser';
import { Handle } from '@/interfaces';
import getPathName from '@/utils/formatters/getPathName';
import * as actionsTrafficContents from '@/store/ducks/trafficContents/actions';
import * as actionsSubjects from '@/store/ducks/subjects/actions';
import * as actionsGeneralSearch from '@/store/ducks/generalSearch/actions';
import { ApplicationState } from '@/store';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

const checkBoxActionPermission = [4, 5, 6, 7, 10];

export const GeneralSearchPage: React.FC<Props> = ({ children, ...propos }) => {
  const dispatch = useDispatch();
  const generalSearch = useSelector((state: ApplicationState) => state.generalSearch);
  const user = Session.getUser();
  let BRDatapicker: Handle<typeof Datapicker>;

  const [stAdvancedSearch, setStAdvancedSearch] = useState(false);
  const [intervalChange, setIntervalChange] = useState('anytime');

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  const router = useRouter();
  const { search } = router.query;

  useEffect(() => {
    if (search) {
      setValue('keyword_input', search);
      onSubmit({ keyword_input: search, category: {} });
    }
  }, [search]);

  function refreshAdvancedSearchOptions() {
    if (stAdvancedSearch) {
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
  }, [stAdvancedSearch]);

  useEffect(() => {
    setValue(
      'category.all',
      (watch('category.actions') || !checkBoxActionPermission.includes(user.role.id)) &&
      watch('category.courses') &&
      watch('category.projects') &&
      watch('category.projectActions'),
    );
    // eslint-disable-next-line
  }, [
    watch('category.actions'),
    watch('category.courses'),
    watch('category.projects'),
    watch('category.projectActions'),
  ]);

  const selectAll = (value: React.ChangeEvent<HTMLInputElement>) => {
    setValue('category.actions', value.target.checked);
    setValue('category.courses', value.target.checked);
    setValue('category.projects', value.target.checked);
    setValue('category.projectActions', value.target.checked);
  };

  function render_advanced_search() {
    if (stAdvancedSearch) {
      return (
        <div className="row">
          <div className="col-12 col-md-6">
            <p className="label mb-0">{propos.t('pages:GeneralSearch.category')}</p>
            <p className="help-text">{propos.t('pages:GeneralSearch.categoryLabel')}</p>
            <div className="br-checkbox">
              <input
                id="category.all"
                {...register('category.all')}
                defaultChecked
                value="all"
                onChange={(e) => selectAll(e)}
                type="checkbox"
              />
              <label htmlFor="category.all">{propos.t('pages:GeneralSearch.allCheck')}</label>
            </div>

            {checkBoxActionPermission.includes(user.role.id) ?? (
              <div className="br-checkbox">
                <input id="category.actions" defaultChecked {...register('category.actions')} type="checkbox" />
                <label htmlFor="category.actions">{propos.t('pages:GeneralSearch.actions')}</label>
              </div>
            )}
            <div className="br-checkbox">
              <input id="category.courses" defaultChecked {...register('category.courses')} type="checkbox" />
              <label htmlFor="category.courses">{propos.t('pages:GeneralSearch.courses')}</label>
            </div>
            <div className="br-checkbox">
              <input id="category.projects" defaultChecked {...register('category.projects')} type="checkbox" />
              <label htmlFor="category.projects">{propos.t('pages:GeneralSearch.projects')}</label>
            </div>
            <div className="br-checkbox">
              <input
                id="category.projectActions"
                defaultChecked
                {...register('category.projectActions')}
                type="checkbox"
              />
              <label htmlFor="category.projectActions">{propos.t('pages:GeneralSearch.projectActions')}</label>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <p className="label mb-0">{propos.t('pages:GeneralSearch.interval')}</p>
            <p className="help-text">{propos.t('pages:GeneralSearch.intervalLabel')}</p>

            <div className="br-radio mb-1">
              <input
                onChange={() => setIntervalChange('anytime')}
                defaultChecked
                id="interval.anytime"
                value="anytime"
                name="interval.type"
                type="radio"
              />
              <label htmlFor="interval.anytime">{propos.t('pages:GeneralSearch.anytime')}</label>
            </div>
            <div className="br-radio mb-1">
              <input
                onChange={() => setIntervalChange('last7Days')}
                id="interval.last7Days"
                value="last7Days"
                name="interval.type"
                type="radio"
              />
              <label htmlFor="interval.last7Days">{propos.t('pages:GeneralSearch.last7Days')}</label>
            </div>
            <div className="br-radio mb-1">
              <input
                onChange={() => setIntervalChange('last30Days')}
                id="interval.last30Days"
                value="last30Days"
                name="interval.type"
                type="radio"
              />
              <label htmlFor="interval.last30Days">{propos.t('pages:GeneralSearch.last30Days')}</label>
            </div>
            <div className="br-radio mb-1">
              <input
                onChange={() => setIntervalChange('last12Months')}
                id="interval.last12Months"
                value="last12Months"
                name="interval.type"
                type="radio"
              />
              <label htmlFor="interval.last12Months">{propos.t('pages:GeneralSearch.last12Months')}</label>
            </div>
            <div className="br-radio mb-1">
              <input
                onChange={() => setIntervalChange('customDate')}
                id="interval.customDate"
                value="customDate"
                name="interval.type"
                type="radio"
              />
              <label htmlFor="interval.customDate">{propos.t('pages:GeneralSearch.interval')}</label>
              <div className={'mt-1'}>
                <Datapicker
                  id="interval-data"
                  ref={(c) => (BRDatapicker = c)}
                  inputProps={{ ...register('interval-data-input') }}
                  disabled={intervalChange !== 'customDate'}
                  dataMode="range"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  async function onSubmit(data: any) {
    const arrDate = data['interval-data-input'] ? data['interval-data-input'].split(' até ') : '';
    let categories = {
      projects: true,
      actions: checkBoxActionPermission.includes(user.role.id),
      courses: true,
      projectActions: true,
    };
    if (stAdvancedSearch) {
      categories = {
        projects: data.category.projects,
        actions: data.category.actions && checkBoxActionPermission.includes(user.role.id),
        courses: data.category.courses,
        projectActions: data.category.projectActions,
      };
    }
    const params = generalSearchParser({
      advancedSearch: {
        categories,
        interval: {
          arrDate,
          type: intervalChange,
        },
      },
      keyword: data.keyword_input,
    });

    dispatch(actionsGeneralSearch.loadListRequest(params));
  }

  return (
    <div className="container-lg contrast-ignore-bg">
      <div className="row contrast-ignore-bg mx-0">
        <div className="img__page col-auto py-3 pl-0">
          <div className="img__page-search contrast-ignore-bg" style={{ width: 60, height: 60 }} />
        </div>
        <h2 className="text-primary-default">{propos.t('pages:GeneralSearch.title')}</h2>
      </div>
      <div style={{ lineHeight: '2.5em' }} dangerouslySetInnerHTML={{ __html: propos.t('pages:GeneralSearch.aboutArea') }} />

      <Spotlight customClassName="info text-center">
        <strong className="text-​uppercase">{propos.t('pages:GeneralSearch.title')}</strong>
      </Spotlight>

      <div className="row justify-content-md-center mx-0">
        <div className="col-md-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <div className="br-input has-icon">
                <label htmlFor="password-id">{propos.t('pages:GeneralSearch.keyword')}:</label>
                <input
                  className="has-icon"
                  id="password-id"
                  {...register('keyword_input')}
                  type="text"
                  placeholder={propos.t('pages:GeneralSearch.keyword')}
                />
                <button className="br-button circle small" type="submit" aria-label={propos.t('pages:GeneralSearch.keyword')}>
                  <i className="fas fa-search" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mb-3">
              <button
                style={{ minWidth: 182 }}
                className="br-button secondary mr-1 mb-3"
                onClick={() => setStAdvancedSearch(!stAdvancedSearch)}
                type="button"
              >
                {propos.t('pages:GeneralSearch.advancedSearch')}
              </button>
              {render_advanced_search()}
            </div>

            <div className="mb-5">
              <button style={{ minWidth: 182 }} className="br-button primary mr-1 mb-1" type="submit">
                {propos.t('pages:GeneralSearch.submit')}
              </button>
            </div>
          </form>
        </div>
        {generalSearch && generalSearch.data && generalSearch.data.length > 0 ? (
          <>
            <div className="col-12 mb-5">
              <div className="text-center py-2">
                <strong className="text-​uppercase">{propos.t('pages:GeneralSearch.searchResults')}</strong>
              </div>
              <span className="br-divider" />
            </div>
            <div className="col-md-10 mb-5">
              <div className="br-list" role="list">
                {generalSearch.data.map((item) => (
                  <Link
                    href={`${getPathName({ type: item.type, id: item.id, extra: item.idProject })}`}
                    locale="pt-BR"
                    key={`list_general_search_${item.id}`}
                  >
                    <a>
                      <Spotlight customClassName="info ellipsis-2 section-list-item p-0 w-100">
                        <div className="front">
                          <div className="d-flex align-items-center">
                            <div className="flex-fill">
                              <div className="ellipsis-1 text-primary-default text-up-01 text-bold">{item.title}</div>
                              <span className="ellipsis-1">{item.description}</span>
                            </div>
                          </div>
                        </div>
                      </Spotlight>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function GeneralSearch() {
  return (
    <Template>
      <GeneralSearchPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
