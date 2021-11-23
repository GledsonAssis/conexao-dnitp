import React, { useEffect, useState } from 'react';

import * as actionsProjectsActions from '@/store/ducks/projectsActions/actions';
import * as actionsProjects from '@/store/ducks/projects/actions';
import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { SunEditorElem } from '@/components/shared/HtmlInput';
import { Handle } from '@/interfaces';
import { Upload } from '@/components/shared/Upload';
import { ProjectAction, FilesObj, Project } from '@/store/ducks/projectsActions/types';
import { imageParser } from '@/utils/parsers';
import Select from '@/components/shared/Select';
import { ApplicationState } from '@/store';
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
  data?: Partial<ProjectAction & { ProjectList: Project[] }>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormProjectPage: React.FC<Props> = ({
  t,
  onSubmitHandle,
  data,
  titlePage
}) => {
  const dispatch = useDispatch();
  const projectsList = useSelector((state: ApplicationState) => state.projects);
  let SunEditorHandle: Handle<typeof SunEditorElem>;
  const [listFiles, setListFiles] = useState<any[]>([]);
  const [listFilesToDelete, setListFilesToDelete] = useState<(number | string)[]>([]);
  const [listImages, setListImages] = useState<any[]>([]);
  const [listImagesToDelete, setListImagesToDelete] = useState<(number | string)[]>([]);
  const router = useRouter();

  const imagesTypes = {
    title: t('pages:projectActions.details.labels.imagesTypes'),
    list: ['.JPG', '.PNG', '.SVG', '.GIF'],
  };

  const fileTypes = {
    title: t('pages:projectActions.details.labels.fileTypes'),
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
    dispatch(actionsProjects.loadListRequest({ stage: '' }));
  }, []);

  useEffect(() => {
    if (data) {
      setValue('title', data?.title)
      setValue('summary', data?.summary)
      setValue('idProject', `${data?.idProject}`)
    }
  }, [data]);

  function onSubmit(dataForm: any) {
    const params = {
      ...dataForm,
      isCover: false,
      idProject: +dataForm.idProject,
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
          functionDownload: (e: any) => dispatch(actionsProjectsActions.loadGetAttachmentsRequest(e))
        }
      }
    }
    )
  }

  function renderProjectsAndCampaigns() {
    if (projectsList?.data?.list?.length) {
      return projectsList?.data?.list?.map(item => {
        return (
          <div key={`projects_select_${item?.id}`} className="br-item w-100" tabIndex={-1}>
            <div className="br-radio">
              <input
                {...register('idProject', { required: true })}
                value={item?.id}
                id={`projects_${item?.id}`}
                type="radio"
              />
              <label htmlFor={`projects_${item?.id}`}>
                {`${item.title}`}
              </label>
            </div>
          </div>
        );
      })
    } else {
      <></>
    }
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
              <label htmlFor="title">{t('pages:projectActions.details.labels.title')}*:</label>
              <input
                {...register('title', { required: true })}
                maxLength={100}
                className={`medium ${errors?.title?.type ? 'danger' : ''}`}
                id="title"
                type="text"
                placeholder={t('pages:projectActions.details.placeholders.title')} />
              {errors?.title?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:projectActions.details.required.title')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium ${errors?.project?.type ? 'danger' : ''}`}>
              <label htmlFor="project">{t('pages:projectActions.details.labels.project')}*:</label>
              <Select
                placeholder={t('pages:projectActions.details.placeholders.project')}
                id="project"
                CustomclassName={`mw-100 ${errors?.project?.type ? 'danger' : ''}`}
                className="mw-100"
              >
                {renderProjectsAndCampaigns()}
              </Select>
              {errors?.project?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:projectActions.details.required.project')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-textarea ${errors?.title?.type ? 'danger' : ''}`}>
              <label htmlFor="summary">{t('pages:projectActions.details.labels.summary')}*:</label>
              <textarea
                {...register('summary', { required: true })}
                maxLength={300}
                className={`w-100 ${errors?.title?.type ? 'danger' : ''}`}
                id="summary"
                placeholder={t('pages:projectActions.details.placeholders.summary')} />
              {errors?.summary?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:projectActions.details.required.summary')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-textarea ${errors?.SunEditor_description?.type ? 'danger' : ''}`}>
              <label htmlFor="description">{t('pages:projectActions.details.labels.description')}*:</label>
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
                    {t('pages:projectActions.details.required.description')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className='col-12'>
            <Upload
              title={`${t('pages:projectActions.details.labels.attachFiles')}:`}
              multiple
              translation={t}
              id="uploadFiles"
              listFiles={setListFiles}
              listDeleteFiles={setListFilesToDelete}
              defaultFileList={convertListFile('projects/actions', data?.attachments, 'attachments')}
              suportedExt={fileTypes}
              placeholder={t('pages:projectActions.details.placeholders.attachFiles')}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className='col-12'>
            <Upload
              title={`${t('pages:projectActions.details.labels.attachImages')}:`}
              multiple
              translation={t}
              id="uploadFiles"
              listFiles={setListImages}
              listDeleteFiles={setListImagesToDelete}
              defaultFileList={convertListFile('projects/actions', data?.images)}
              suportedExt={imagesTypes}
              placeholder={t('pages:projectActions.details.placeholders.attachFiles')}
            />
          </div>
        </div>
        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:projectActions.details.cancel')}
            </button>
          </Link>
          <button className="br-button primary mr-sm-3" value='save' type="submit">
            {t('pages:projectActions.details.submit')}
          </button>
          <button className="br-button primary mr-sm-3" value="publish" type="button"
            onClick={handleSubmit((d) => onSubmit({ ...d, isPublished: true }))}>
            {t('pages:projectActions.details.publish')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormProjectPage
