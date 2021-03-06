import React, { useEffect, useState } from 'react';

import * as actionsActions from '@/store/ducks/actions/actions';
import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SunEditorElem } from '@/components/shared/HtmlInput';
import { Handle } from '@/interfaces';
import { Upload } from '@/components/shared/Upload';
import { Action, FilesObj } from '@/store/ducks/actions/types';
import { imageParser } from '@/utils/parsers';
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
  data?: Partial<Action>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormActionPage: React.FC<Props> = ({
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
    title: t('pages:actions.details.labels.imagesTypes'),
    list: ['.JPG', '.PNG', '.SVG', '.GIF'],
  };

  const fileTypes = {
    title: t('pages:actions.details.labels.fileTypes'),
    list: ['.TXT', '.RTF', '.DOC', '.DOCX', '.PDF', '.PPT', '.PPTX', '.XLS', '.ODT'],
  };

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
      setValue('summary', data?.summary)
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
          functionDownload: (e: any) => dispatch(actionsActions.loadGetAttachmentsRequest(e))
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
            <div className={`br-input medium ${errors?.title?.type ? 'danger' : ''}`}>
              <label htmlFor="title">{t('pages:actions.details.labels.title')}*:</label>
              <input
                {...register('title', { required: true })}
                maxLength={100}
                className={`medium ${errors?.title?.type ? 'danger' : ''}`}
                id="title"
                type="text"
                placeholder={t('pages:actions.details.placeholders.title')} />
              {errors?.title?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:actions.details.required.title')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-textarea ${errors?.summary?.type ? 'danger' : ''}`}>
              <label htmlFor="summary">{t('pages:actions.details.labels.summary')}*:</label>
              <textarea
                {...register('summary', { required: true })}
                maxLength={300}
                className={`w-100 ${errors?.summary?.type ? 'danger' : ''}`}
                id="summary"
                placeholder={t('pages:actions.details.placeholders.summary')} />
              {errors?.summary?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:actions.details.required.summary')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-textarea ${errors?.SunEditor_description?.type ? 'danger' : ''}`}>
              <label htmlFor="description">{t('pages:actions.details.labels.description')}*:</label>
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
                    {t('pages:actions.details.required.description')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className='col-12'>
            <Upload
              title={`${t('pages:actions.details.labels.attachFiles')}:`}
              multiple
              translation={t}
              id="uploadFiles"
              listFiles={setListFiles}
              listDeleteFiles={setListFilesToDelete}
              defaultFileList={convertListFile('actions', data?.attachments, 'attachments')}
              suportedExt={fileTypes}
              placeholder={t('pages:actions.details.placeholders.attachFiles')}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className='col-12'>
            <Upload
              title={`${t('pages:actions.details.labels.attachImages')}:`}
              multiple
              translation={t}
              defaultRadioSelected={data?.images?.find(item => item.default)?.id}
              funcRadioSelect={funcRadioSelect}
              radioSelect
              id="uploadImages"
              listFiles={setListImages}
              listDeleteFiles={setListImagesToDelete}
              defaultFileList={convertListFile('actions', data?.images)}
              suportedExt={imagesTypes}
              placeholder={t('pages:actions.details.placeholders.attachFiles')}
            />
          </div>
        </div>
        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:actions.details.cancel')}
            </button>
          </Link>
          <button className="br-button primary mr-sm-3" value='save' type="submit">
            {t('pages:actions.details.submit')}
          </button>
          <button className="br-button primary mr-sm-3" value="publish" type="button"
            onClick={handleSubmit((d) => onSubmit({ ...d, isPublished: true }))}>
            {t('pages:actions.details.publish')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormActionPage
