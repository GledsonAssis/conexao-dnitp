import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ApplicationState } from '@/store';
import * as actionsParticipatingSchools from '@/store/ducks/participatingSchools/actions';
import * as actionsStates from '@/store/ducks/states/actions';
import { TFunction, useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Handle } from '@/interfaces';

import { Table, TBody, THead } from '@/components/shared/Table';
import { Select } from '@/components/shared/Select';
import { States } from '@/store/ducks/states/types';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const ParticipatingSchoolsPage: React.FC<Props> = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const states = useSelector((state: ApplicationState) => state.states);
  const participatingSchools = useSelector((state: ApplicationState) => state.participatingSchools);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  let BrSelectState: Handle<typeof Select>;
  const [idState, setIdState] = useState<string | number>('all');

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  const router = useRouter();

  useEffect(() => {
    dispatch(actionsParticipatingSchools.loadListRequest());
    dispatch(actionsStates.loadListRequest());
    // eslint-disable-next-line
  }, []);

  function renderList() {
    if (participatingSchools?.data?.count) {
      return participatingSchools.data.rows.map((item) => (
        <tr key={`schools_${item.id}`}>
          <td className={'px-0'} />
          <td className={`w-100`} data-th="Nome">{item.name}</td>
          <td data-th="Cidade">{item.address.city.name}</td>
          <td data-th="Estado">{item.address.city.state.initials}</td>
        </tr>
      ));
    } else {
      return <tr className="empty-data">
        <td colSpan={6} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {props.t('pages:ParticipatingSchools.emptyList')}
        </td>
      </tr>
    }
  }

  useEffect(() => {
    dispatch(actionsParticipatingSchools.loadListRequest({ uf: idState }));
    // eslint-disable-next-line
  }, [idState]);

  function render_states() {
    if (states?.data?.length > 0) {
      return states.data.map((item: States) => (
        <div key={`states_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              onChange={() => setIdState(item.id)}
              id={`states_${item.id}`}
              value={item.id}
              type="radio"
              name="radio"
            />
            <label htmlFor={`states_${item.id}`}>{`${item.initials}`}</label>
          </div>
        </div>
      ));
    }
  }

  useEffect(() => {
    dispatch(
      actionsParticipatingSchools.loadListRequest({
        page: currentPage,
        limit: numberItensPer,
      }),
    );
    // eslint-disable-next-line
  }, [currentPage, numberItensPer]);

  function paramsNavigation(item: any) {
    setCurrentPage(item.currentPage);
    setNumberItensPer(item.numberItensPer);
  }

  return (
    <div className="container-lg contrast-ignore-bg">
      <div className="row contrast-ignore-bg mx-0">
        <div className="img__page col-auto py-3 pl-0">
          <div className="img__page-initiatives contrast-ignore-bg" style={{ width: 60, height: 60 }} />
        </div>
        <h2 className="text-primary-default">{props.t('pages:ParticipatingSchools.title')}</h2>
      </div>
      <div className="row mx-2 mb-3">
        <div style={{ lineHeight: '2.5em' }} dangerouslySetInnerHTML={{ __html: props.t('pages:ParticipatingSchools.aboutArea') }} />
      </div>
      <div className="row mx-0 mb-3">
        <div className="br-input mb-1">
          <Select
            CustomclassName="has-icon mw-100"
            id="state"
            ref={(c) => (BrSelectState = c)}
            inputProps={{ ...register('state') }}
            type="text"
            placeholder={props.t('pages:ParticipatingSchools.selectPlaceholder')}
          >
            <div className="br-item w-100" tabIndex={-1}>
              <div className="br-radio">
                <input
                  onChange={() => setIdState('all')}
                  name="radio"
                  id="states_all"
                  defaultChecked
                  value={'all'}
                  type="radio"
                />
                <label htmlFor="states_all">{props.t('pages:ParticipatingSchools.selectPlaceholder')}</label>
              </div>
            </div>
            {render_states()}
          </Select>
        </div>
      </div>
      <div className="row mx-0 mb-5">
        <Table
          Title={props.t('pages:ParticipatingSchools.title')}
          Options={{
            id: 'participingSchools',
            paginate: true,
            count: participatingSchools.data.count,
          }}
          translations={props.t}
          elemListName="ParticipatingSchools"
          paramsNavigation={paramsNavigation}
        >
          <THead nameKey='t-head'>
            <tr>
              <th scope="col" className={'px-0'} />
              <th scope="col"><span>{props.t('pages:ParticipatingSchools.tableLabels.name')}</span></th>
              <th scope="col"><span>{props.t('pages:ParticipatingSchools.tableLabels.city')}</span></th>
              <th scope="col"><span>{props.t('pages:ParticipatingSchools.tableLabels.state')}</span></th>
            </tr>
          </THead>
          <TBody nameKey='t-body' style={{ whiteSpace: 'nowrap' }}>{renderList()}</TBody>
        </Table>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function ParticipatingSchools() {
  return (
    <Template>
      <ParticipatingSchoolsPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
