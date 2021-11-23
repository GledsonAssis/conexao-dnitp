import React, { useEffect, useState } from 'react';

import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { SunEditorElem } from '@/components/shared/HtmlInput';
import { Handle } from '@/interfaces';
import { ExternalLinks } from '@/store/ducks/externalLinks/types';
import { useRouter } from 'next/router';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps {
  titlePage: string
  onSubmitHandle: Function
  data?: Partial<ExternalLinks>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormExternalLinksPage: React.FC<Props> = ({
  t,
  onSubmitHandle,
  data,
  titlePage
}) => {
  let SunEditorHandle: Handle<typeof SunEditorElem>;
  const router = useRouter();

  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    if (data) {
      setValue('title', data?.title)
      setValue('link', data?.link)
      setValue('summary', data?.summary)
    }
  }, [data]);

  function onSubmit(dataForm: any) {
    const params = {
      ...dataForm,
      description: dataForm.SunEditor_description,
    }

    onSubmitHandle(params)
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
              <label htmlFor="title">{t('pages:externalLinks.details.labels.title')}*:</label>
              <input
                {...register('title', { required: true })}
                maxLength={100}
                className={`medium ${errors?.title?.type ? 'danger' : ''}`}
                id="title"
                type="text"
                placeholder={t('pages:externalLinks.details.placeholders.title')} />
              {errors?.title?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:externalLinks.details.required.title')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium ${errors?.link?.type ? 'danger' : ''}`}>
              <label htmlFor="link">{t('pages:externalLinks.details.labels.link')}*:</label>
              <input
                {...register('link', { required: true })}
                maxLength={100}
                className={`medium ${errors?.link?.type ? 'danger' : ''}`}
                id="link"
                type="text"
                placeholder={t('pages:externalLinks.details.placeholders.link')} />
              {errors?.link?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:externalLinks.details.required.link')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-textarea ${errors?.summary?.type ? 'danger' : ''}`}>
              <label htmlFor="summary">{t('pages:externalLinks.details.labels.summary')}*:</label>
              <textarea
                {...register('summary', { required: true })}
                maxLength={300}
                className={`w-100 ${errors?.summary?.type ? 'danger' : ''}`}
                id="summary"
                placeholder={t('pages:externalLinks.details.placeholders.summary')} />
              {errors?.summary?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:externalLinks.details.required.summary')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-textarea ${errors?.SunEditor_description?.type ? 'danger' : ''}`}>
              <label htmlFor="description">{t('pages:externalLinks.details.labels.description')}*:</label>
              <SunEditorElem
                control={control}
                name={`SunEditor_description`}
                defaultValue={data?.description}
                id="description"
                ref={(c) => (SunEditorHandle = c)} />
              {errors?.SunEditor_description?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:externalLinks.details.required.description')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:externalLinks.details.cancel')}
            </button>
          </Link>
          <button className="br-button primary mr-sm-3" value='save' type="submit">
            {t('pages:externalLinks.details.submit')}
          </button>
          <button className="br-button primary mr-sm-3" value="publish" type="button"
            onClick={handleSubmit((d) => onSubmit({ ...d, isPublished: true }))}>
            {t('pages:externalLinks.details.publish')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormExternalLinksPage
