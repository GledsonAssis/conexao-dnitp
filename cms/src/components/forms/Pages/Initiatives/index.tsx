import React, { FC, useEffect } from 'react';
import { TFunction } from 'next-i18next';
import { DeepMap, FieldError, useForm, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Attachment, Initiative } from '@/store/ducks/initiatives/types';
import moment from 'moment';
import { Spotlight } from '@/components/shared/Spotlight';
import { Attachments } from '@/components/shared/Attachments';
import { useDispatch } from 'react-redux';
import * as actionsInitiatives from '@/store/ducks/initiatives/actions';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  data: Partial<Initiative>,
  titlePage: string,
  onSubmitHandle: Function,
  type?: string,
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const JustifyForm: FC<Props> = ({ t, data, titlePage, onSubmitHandle, type }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm<any>();

  function downlaodAttachment(id: string | number) {
    dispatch(actionsInitiatives.loadGetAttachmentsRequest({ id }));
  }

  function listAttachments(data: Attachment[]) {
    return [
      {
        title: t('pages:initiatives.details.labels.attachments'),
        itens: data.map((item) => ({
          text: item.name,
          path: item.id,
        })),
        handleDownload: downlaodAttachment,
      },
    ];
  }

  useEffect(() => {
    if (watch('acceptSt') === '2' && !watch('comment')) {
      setValue('comment', t('pages:initiatives.details.archiveReason'))
    } else if (watch('acceptSt') === '1' && !watch('comment')) {
      setValue('comment', t('pages:initiatives.details.acceptReason'))
    }
    // eslint-disable-next-line
  }, [watch('acceptSt')]);

  function onSubmit(dataForm: any) {
    const params = {
      ...dataForm,
      accepted: dataForm.acceptSt === '1'
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
            <div className={`br-input medium`}>
              <label htmlFor="description">{t('pages:initiatives.details.labels.author')}*:</label>
              <input
                readOnly
                defaultValue={data.author.name}
                className={`medium`}
                id="title"
                type="text"
                placeholder={t('pages:initiatives.details.labels.author')} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium`}>
              <label htmlFor="description">{t('pages:initiatives.details.labels.title')}*:</label>
              <input
                readOnly
                defaultValue={data.title}
                className={`medium`}
                id="title"
                type="text"
                placeholder={t('pages:initiatives.details.labels.title')} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-textarea`}>
              <label htmlFor="description">{t('pages:initiatives.details.labels.description')}*:</label>
              <textarea
                readOnly
                defaultValue={data.description}
                className={`w-100`}
                id="description"
                placeholder={t('pages:initiatives.details.labels.description')} />
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className='col-12'>
            {data.attachments.length > 0 &&
              <Attachments itensList={listAttachments(data.attachments)} />
            }
          </div>
        </div>
        {type !== 'visualization' ?
          <>
            <div className="row mb-2">
              <div className='col-12'>
                <label className={`br-button ${watch('acceptSt') === '1' ? 'success' : 'secondary'} mt-3 mt-sm-0 mr-sm-3`}>
                  <input type="radio" name="options" value="1" {...register('acceptSt', { required: true })} />
                  <i className="fas fa-check"></i>{t('pages:initiatives.details.labels.accept')}
                </label>
                <label className={`br-button ${watch('acceptSt') === '2' ? 'danger' : 'secondary'} mt-3 mt-sm-0 mr-sm-3`}>
                  <input type="radio" name="options" value="2" {...register('acceptSt', { required: true })} />
                  <i className="fas fa-archive"></i>{t('pages:initiatives.details.labels.archive')}
                </label>
              </div>
            </div>
            <div className="row">
              <div className='col-12'>
                <div className={`br-textarea medium ${errors?.comment?.type ? 'danger' : ''}`}>
                  <label htmlFor="street">{t('pages:initiatives.details.labels.reason')}*:</label>
                  <textarea
                    disabled={!watch('acceptSt')}
                    {...register('comment', { required: watch('acceptSt') === '2' })}
                    defaultValue={data.comment}
                    className={`medium ${errors?.street?.type ? 'danger' : ''}`}
                    id="street"
                    placeholder={t('pages:initiatives.details.placeholders.reason')} />
                  {errors?.comment?.type ?
                    <div className="mt-1">
                      <span className="feedback danger" role="alert">
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                        {t('pages:initiatives.details.required.reason')}
                      </span>
                    </div>
                    : ''}
                </div>
              </div>
            </div>
          </>
          : ''}
        <div className="row">
          <div className='col-12'>
            <Spotlight customClassName="info ellipsis-2 section-list-item p-0 w-100">
              <div className="front">
                <div className="d-flex align-items-center">
                  <div className="flex-fill">
                    <div className="ellipsis-1 text-primary-default text-up-01 text-bold">
                      {t('pages:initiatives.details.labels.history')}
                    </div>
                    {data?.evaluation_history?.map(item =>
                      <span key={item.id} className="ellipsis-1">
                        {`${moment.utc(item.date).format('DD/MM/YYYY')} - ${item.text}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Spotlight>
          </div>
        </div>
        <div className="d-flex">
          <Link href={router.asPath.substring(0, router.asPath.lastIndexOf('/'))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:initiatives.details.cancel')}
            </button>
          </Link>
          {watch('acceptSt') ?
            <button className="br-button primary" value='save' type="submit">
              {t('pages:initiatives.details.submit')}
            </button>
            : ''}
        </div>
      </div>
    </form>
  );
};

export default JustifyForm
