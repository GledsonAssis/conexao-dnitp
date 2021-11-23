import React, { useEffect } from 'react';
import style from '@/styles/Home.module.css';
import { Select } from '@/components/shared/Select';
import { CustomCard } from '@/components/shared/CustomCard';

import Banner from '@/assets/images/banner/bn-logo-conexao.svg';
import Background from '@/assets/images/banner/bn-backgound.svg';
import Grupo280 from '@/assets/images/banner/bn_peoples_1.svg';
import Grupo325 from '@/assets/images/banner/bn_peoples_2.svg';
import Grupo333 from '@/assets/images/banner/bn_peoples_3.svg';
import Grupo372 from '@/assets/images/banner/bn_peoples_4.svg';
import Grupo380 from '@/assets/images/banner/bn_peoples_5.svg';
import Grupo381 from '@/assets/images/banner/bn_peoples_6.svg';
import Student from '@/assets/images/banner/bn_peoples_7.svg';

import * as actionsHighlights from '@/store/ducks/highlights/actions';
import * as actionsschoolYear from '@/store/ducks/schoolYear/actions';
import * as actionsDisciplines from '@/store/ducks/disciplines/actions';
import * as actionsActivites from '@/store/ducks/activites/actions';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import { Highlights } from '@/store/ducks/highlights/types';
import { Disciplines } from '@/store/ducks/disciplines/types';
import { SchoolYears } from '@/store/ducks/schoolYear/types';
import Link from 'next/link';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Router, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Handle } from '@/interfaces';
import { useTranslation } from 'next-i18next';
import ToastMessage, { typesToast } from '@/components/shared/Toast';
interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const HomePage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const highlights = useSelector((state: ApplicationState) => state.highlights);
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);
  const disciplines = useSelector((state: ApplicationState) => state.disciplines);
  const { t } = useTranslation(['toast_errors', 'components', 'general', 'pages']);
  const router = useRouter();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();


  useEffect(() => {
    dispatch(actionsHighlights.loadListRequest());
    dispatch(actionsschoolYear.loadListRequest());
    dispatch(actionsDisciplines.loadListRequest());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (highlights.errors) {
      ToastMessage({ message: t(highlights.errors.message), type: typesToast.TOAST_ERROR })
    }
  }, [highlights.errors])

  function nth(n: number) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }

  function render_anos() {
    if (schoolYears?.data?.length > 0) {
      return schoolYears.data.map((item: SchoolYears) => (
        <div key={`ano_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('year-select')}
              value={item.id}
              id={`anos-${item.ordinal}-${item.id}`}
              type="radio" />
            <label htmlFor={`anos-${item.ordinal}-${item.id}`}>{t('pages:Home.selectYear', { year: item.ordinal, ordinal: nth(item.ordinal) })}</label>
          </div>
        </div>
      ));
    }
  }

  function render_disciplinas() {
    if (disciplines?.data?.length > 0) {
      return disciplines.data.map((item: Disciplines) => (
        <div key={`disciplines_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input {...register('disciplines-select')} value={item.id} id={`disciplines_${item.idKnoledgeArea}_${item.id}`} type="radio" />
            <label htmlFor={`disciplines_${item.idKnoledgeArea}_${item.id}`}>{item.name}</label>
          </div>
        </div>
      ));
    }
  }

  function gridCards() {
    if (highlights && highlights.data && highlights.data.length > 0) {
      return highlights.data
        .sort((cur, next) => cur.position - next.position)
        .map((row: Highlights, index: number) => (
          <div key={`grid_${row.title}_${row.id}_${index}`} className="col-sm-6 col-md-4 col-lg-4 mb-2">
            <CustomCard
              link={row.detailsUrl}
              titulo={row.type}
              srcImage={`${row.imageUrl}`}
              card={row}
              customClass="br-card-square"
            >
              {row.title}
            </CustomCard>
          </div>
        ));
    }
  }

  async function onSubmit() {
    const params: any = {};
    if (watch('year-select')) params.year = watch('year-select');
    if (watch('disciplines-select')) params.discipline = watch('disciplines-select');

    if (Object.keys(params).length) {
      dispatch(actionsActivites.searchRedirectProps(params));
      router.push('/atividades', undefined, {
        shallow: true
      });
    }
  }


  return (
    <>
      {/* Banner */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div className={style['banner-backgound']} style={{ backgroundImage: `url(${Background})` }}>
          <div className={style['banner-shadow']} />
          <div className={`${style['banner-logo']} container-lg`}>
            <img src={Banner} alt="Banner" />
            <p className="h6 mb-5 mt-1">{t('pages:Home.searchActivities.title')}</p>
            <Link href="/sobre">
              <a>
                <button className="br-button primary mt-3 mt-sm-0 ml-sm-3" type="button">
                  {t('pages:Home.searchActivities.knownMore')}
                </button>
              </a>
            </Link>
            <div className={`mt-5 ${style['banner-peoples']}`}>
              <div className={`${style['banner-group1']}`}>
                <img src={Student} alt="Student" />
                <img src={Grupo381} alt="Grupo381" />
                <img src={Grupo280} alt="Grupo280" />
                <img src={Grupo372} alt="Grupo372" />
                <img src={Grupo380} alt="Grupo380" />
              </div>
              <div className={`${style['banner-group2']}`}>
                <img src={Grupo333} alt="Grupo333" />
                <img src={Grupo325} alt="Grupo325" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Busque aqui atividades de educação */}
      <div className={`${style['banner-darkbar']}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-lg text-center p-3">
            <h3 className="text-white">{t('pages:Home.searchActivities.subTitle')}</h3>
            <div className="row justify-content-center mb-3">
              <div className="col-sm-2">
                <div className="br-input mb-1">
                  <Select placeholder={t('pages:Home.searchYear.placeholder')} id="ano" CustomclassName="mw-100">
                    {render_anos()}
                  </Select>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="br-input mb-1">
                  <Select placeholder={t('pages:Home.searchActivities.placeholder')} id="disciplina" CustomclassName="mw-100">
                    {render_disciplinas()}
                  </Select>
                </div>
              </div>
              <div className="col-sm-auto">
                <div className="br-input mb-1">
                  <button className="br-button circle primary" type="submit">
                    <i className="fas fa-search" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Destaques */}
      <div>
        <div className="container-lg text-center p-3">
          <h2 className="text-capitalize">{t('pages:Home.highlights.title')}</h2>
          <div className="container-fluid">
            <div className="row">{gridCards()}</div>
          </div>
        </div>
      </div>
      {/* Saiba mais */}
      <div className="container-lg text-center p-3 pb-5 text-primary-default">
        <div className={`h3 ${style['home-about']}`}>
          <i className="fas fa-comment mr-3" style={{ fontSize: 35 }} />
          {t('pages:Home.endPage.title')}
        </div>
        conexao.dnit@dnit.gov.br
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function Home() {
  return (
    <Template>
      <HomePage />
    </Template>
  );
}
