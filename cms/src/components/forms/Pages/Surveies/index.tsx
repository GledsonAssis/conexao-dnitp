import React, { useEffect } from 'react';

import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Section, Survey } from '@/store/ducks/surveies/types';
import { useRouter } from 'next/router';
import { SectionForm } from '../../Section';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps {
  titlePage: string
  onlyView?: boolean
  onSubmitHandle?: Function
  data?: Partial<Survey>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormSurveyPage: React.FC<Props> = ({
  t,
  onlyView,
  onSubmitHandle,
  data,
  titlePage
}) => {
  const router = useRouter();

  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    console.log(onlyView)
    if (data) {
      setValue('title', data?.title)
      setValue('description', data?.description)
      const sectionsParse = data?.sections.map(item => (
        {
          ...item,
          titulo: item.title,
          questions: item?.questions.map(row => (
            {
              ...row,
              type: `${row?.type}`
            }
          ))
        }
      ))
      setValue('sections', sectionsParse)
    }
  }, [data]);

  function onSubmit(dataForm: any) {
    const sectionsParse = dataForm?.sections.map(item => (
      {
        ...item,
        title: item.titulo
      }
    ))
    const params = {
      id: data?.id || 'novo',
      version: data?.version || 0,
      active: data?.active,
      ...dataForm,
      sections: sectionsParse
    }

    onSubmitHandle(params)
  }

  function addSectionHandle() {
    const sections = getValues(`sections`) as Section[]
    setValue(
      `sections.${sections.length}`,
      {
        title: "",
        description: null,
        active: true,
        questions: []
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
      <div className="main-content mt-3 px-md-3" id="main-content">
        <div className="row">
          <div className='col-12'>
            <p className="h1">{titlePage}</p>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium ${errors?.title?.type ? 'danger' : ''}`}>
              <label htmlFor="title">{t('pages:surveys.details.labels.title')}*:</label>
              <input
                {...register('title', { required: true })}
                className={`medium ${errors?.title?.type ? 'danger' : ''}`}
                id="title"
                disabled={onlyView}
                type="text"
                placeholder={t('pages:surveys.details.placeholders.title')} />
              {errors?.title?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:surveys.details.required.title')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-textarea ${errors?.description?.type ? 'danger' : ''}`}>
              <label htmlFor="description">{t('pages:surveys.details.labels.description')}*:</label>
              <textarea
                {...register('description', { required: true })}
                disabled={onlyView}
                className={`w-100 ${errors?.description?.type ? 'danger' : ''}`}
                id="description"
                placeholder={t('pages:surveys.details.placeholders.description')} />
              {errors?.description?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:surveys.details.required.description')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>

        <div className="row">
          <div className='col-12'>
            {watch(`sections`)?.map((item: Section, index: number) => (
              <SectionForm
                onlyView={onlyView}
                useFormProps={{
                  registerForm: register,
                  getValuesForm: getValues,
                  watchForm: watch,
                  controlForm: control,
                  errorsForm: errors,
                  setValueForm: setValue
                }}
                key={`section_${item.id}_${item.title}_${index}`}
                t={t} indexSection={index} sectionData={item} />
            ))}
          </div>
        </div>

        {onlyView ? '' :
          <div className="row mb-2">
            <div className='col-12'>
              <button className="br-button primary" onClick={addSectionHandle} type="button">
                {t('components:section.add')}
              </button>
            </div>
          </div>
        }

        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:surveys.details.cancel')}
            </button>
          </Link>
          {onlyView ? '' :
            <button className="br-button primary" value='save' type="submit">
              {t('pages:surveys.details.submit')}
            </button>
          }
        </div>
      </div>
    </form>
  );
};

export default FormSurveyPage
