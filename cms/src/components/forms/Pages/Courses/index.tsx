import React, { useEffect, useState } from 'react';

import * as actionsCourses from '@/store/ducks/courses/actions';
import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SunEditorElem } from '@/components/shared/HtmlInput';
import { Handle } from '@/interfaces';
import { Upload } from '@/components/shared/Upload';
import { Course, FilesObj } from '@/store/ducks/courses/types';
import { imageParser } from '@/utils/parsers';
import { useRouter } from 'next/router';

interface StateProps {
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps {
  titlePage: string
  onSubmitHandle: Function
  data?: Partial<Course>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormCoursePage: React.FC<Props> = ({
  t,
  onSubmitHandle,
  data,
  titlePage
}) => {
  const dispatch = useDispatch();
  let SunEditorHandle: Handle<typeof SunEditorElem>;
  const [listFiles, setListFiles] = useState<any[]>([]);
  const [listFilesToDelete, setListFilesToDelete] = useState<(number | string)[]>([]);
  const [listImages, setListImages] = useState<any[]>([]);
  const [listImagesToDelete, setListImagesToDelete] = useState<(number | string)[]>([]);
  const router = useRouter();

  const imagesTypes = {
    title: t('pages:courses.details.labels.imagesTypes'),
    list: ['.JPG', '.PNG', '.SVG', '.GIF'],
  };

  const fileTypes = {
    title: t('pages:courses.details.labels.fileTypes'),
    list: ['.TXT', '.RTF', '.DOC', '.DOCX', '.PDF', '.PPT', '.PPTX', '.XLS', '.ODT'],
  };

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    if (data) {
      setValue('type', `${data?.type}`)
      setValue('title', data?.title)
      setValue('summary', data?.summary)
      setValue('link', data?.link)
    }
  }, [data]);

  function onSubmit(dataForm: any) {
    const params = {
      ...dataForm,
      listFilesToDelete,
      listImagesToDelete,
      description: dataForm.SunEditor_description,
      listImages,
      listFiles
    }

    onSubmitHandle(params)
  }

  function convertListFile(ctx: string, list: FilesObj[] = [], type: string = 'images') {
    return list.map((file: FilesObj) => {
      if (imagesTypes.list.includes(file.mime.suffix.toUpperCase())) {
        return {
          type: 'image',
          ...file,
          ...imageParser(ctx, file, type)
        }
      } else {
        return {
          type: 'file',
          ...file,
          functionDownload: (e: any) => dispatch(actionsCourses.loadGetAttachmentsRequest(e))
        }
      }
    }
    )
  }

  function funcRadioSelect(data: string | number) {
    const { itemObj, indexObj } = listImages.find(item => +item.id === +data)
    if (itemObj) {
      listImages[indexObj].default = true
    }
    setListImages(listImages)
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
            <p className={'text-semi-bold mb-0'}>{t('pages:courses.details.labels.type')}*:</p>
            <div className="d-flex">
              <div className="d-inline-block mr-3">
                <div className="br-radio">
                  <input
                    {...register('type', { required: true })}
                    id="open"
                    type="radio"
                    value={1}
                    defaultChecked />
                  <label htmlFor="open">{t('pages:courses.details.types.open')}</label>
                </div>
              </div>
              <div className="d-inline-block mr-3">
                <div className="br-radio">
                  <input
                    {...register('type', { required: true })}
                    id="dnitEmployees"
                    type="radio"
                    value={2} />
                  <label htmlFor="dnitEmployees">{t('pages:courses.details.types.dnitEmployees')}</label>
                </div>
              </div>
              <div className="d-inline-block mr-3">
                <div className="br-radio">
                  <input
                    {...register('type', { required: true })}
                    id="projectParticipants"
                    type="radio"
                    value={3} />
                  <label htmlFor="projectParticipants">{t('pages:courses.details.types.projectParticipants')}</label>
                </div>
              </div>
              <div className="d-inline-block mr-3">
                <div className="br-radio">
                  <input
                    {...register('type', { required: true })}
                    id="participantsAndEmployees"
                    type="radio"
                    value={4} />
                  <label htmlFor="participantsAndEmployees">
                    {t('pages:courses.details.types.participantsAndEmployees')}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium ${errors?.title?.type ? 'danger' : ''}`}>
              <label htmlFor="title">{t('pages:courses.details.labels.title')}*:</label>
              <input
                {...register('title', { required: true })}
                maxLength={100}
                className={`medium ${errors?.title?.type ? 'danger' : ''}`}
                id="title"
                type="text"
                placeholder={t('pages:courses.details.placeholders.title')} />
              {errors?.title?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:courses.details.required.title')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-textarea ${errors?.title?.type ? 'danger' : ''}`}>
              <label htmlFor="summary">{t('pages:courses.details.labels.summary')}*:</label>
              <textarea
                {...register('summary', { required: true })}
                maxLength={300}
                className={`w-100 ${errors?.title?.type ? 'danger' : ''}`}
                id="summary"
                placeholder={t('pages:courses.details.placeholders.summary')} />
              {errors?.summary?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:courses.details.required.summary')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-textarea ${errors?.SunEditor_description?.type ? 'danger' : ''}`}>
              <label htmlFor="description">{t('pages:courses.details.labels.description')}*:</label>
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
                    {t('pages:courses.details.required.description')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium ${errors?.title?.type ? 'danger' : ''}`}>
              <label htmlFor="link">{t('pages:courses.details.labels.link')}*:</label>
              <input
                {...register('link', { required: true })}
                maxLength={2000}
                className={`medium ${errors?.title?.type ? 'danger' : ''}`}
                id="link"
                type="text"
                placeholder={t('pages:courses.details.placeholders.link')} />
              {errors?.link?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:courses.details.required.link')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className='col-12'>
            <Upload
              title={`${t('pages:courses.details.labels.attachFiles')}:`}
              multiple
              translation={t}
              id="uploadFiles"
              listFiles={setListFiles}
              listDeleteFiles={setListFilesToDelete}
              defaultFileList={convertListFile('courses', data?.attachments, 'attachments')}
              suportedExt={fileTypes}
              placeholder={t('pages:courses.details.placeholders.attachFiles')}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className='col-12'>
            <Upload
              title={`${t('pages:courses.details.labels.attachImages')}:`}
              multiple
              translation={t}
              id="uploadImages"
              defaultRadioSelected={data?.images?.find(item => item.default)?.id}
              funcRadioSelect={funcRadioSelect}
              radioSelect
              listFiles={setListImages}
              listDeleteFiles={setListImagesToDelete}
              defaultFileList={convertListFile('courses', data?.images)}
              suportedExt={imagesTypes}
              placeholder={t('pages:courses.details.placeholders.attachFiles')}
            />
          </div>
        </div>
        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:courses.details.cancel')}
            </button>
          </Link>
          <button className="br-button primary mr-sm-3" value='save' type="submit">
            {t('pages:courses.details.submit')}
          </button>
          <button className="br-button primary mr-sm-3" value="publish" type="button"
            onClick={handleSubmit((d) => onSubmit({ ...d, isPublished: true }))}>
            {t('pages:courses.details.publish')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormCoursePage
