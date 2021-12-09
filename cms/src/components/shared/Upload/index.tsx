import React, { useEffect, useRef, useState } from 'react';
import BRUpload from './upload';

import Modal from '../Modal';
import Zoom from '../Galery/Zoom';
import { TFunction } from 'next-i18next';
import { useForm } from 'react-hook-form';

interface suportedList {
  title: string;
  list: string[];
}

export interface Mime {
  suffix: string;
}

interface FilesObj {
  type: string;
  id: number;
  name: string;
  default: boolean;
  mime: Mime;
  uri?: string;
  functionDownload?: Function;
}

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  id: string;
  multiple: boolean;
  title: string;
  placeholder: string;
  suportedExt: suportedList;
  listFiles?: Function;
  listDeleteFiles?: Function;
  uploadFile?: Function;
  defaultFileList?: FilesObj[];
  translation: TFunction,
  radioSelect?: boolean,
  funcRadioSelect?: Function,
  defaultRadioSelected?: string | number
}

type Props = StateProps & DispatchProps & OwnProps;

export const Upload: React.FC<Props> = ({
  multiple = false,
  title = 'Send files',
  placeholder = 'Click or drag files to send...',
  id,
  suportedExt = {
    title: 'See here the types of files that can be uploaded',
    list: [],
  },
  defaultFileList = [],
  listFiles = null,
  listDeleteFiles = null,
  uploadFile = null,
  translation,
  radioSelect,
  funcRadioSelect,
  defaultRadioSelected
}) => {
  const child1 = useRef<HTMLDivElement>();
  const [stModalFiles, setStModalFiles] = useState(false);
  const [defaultListDeleted, setDefaultListDeleted] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [StGallery, setStGallery] = useState(false);

  const { register, watch, setValue } = useForm<any>();

  function uploadTimeout() {
    return new Promise((resolve) =>
      // Colocar aqui um upload para o servidor e retirar o timeout
      setTimeout(resolve, 100),
    );
  }

  function listUpdateFiles(data: File[]) {
    listFiles(data);
  }

  useEffect(() => {
    if (child1.current && !child1.current.querySelectorAll('.upload-button').length) {
      new BRUpload(
        'br-upload',
        child1.current,
        uploadFile || uploadTimeout,
        listUpdateFiles
      );
    }
    setValue('radioSelect', `${defaultRadioSelected}`)
  }, []);

  useEffect(() => {
    if (watch('radioSelect') && funcRadioSelect) {
      funcRadioSelect(watch('radioSelect'))
    }
  }, [watch('radioSelect')]);

  function addToDelete(id: number) {
    if (!defaultListDeleted.includes(id)) {
      const idsArray = [...defaultListDeleted, id]
      setDefaultListDeleted(idsArray)
      listDeleteFiles(idsArray)
    } else {
      const idsArray = defaultListDeleted.filter(item => item !== id)
      setDefaultListDeleted(idsArray)
      listDeleteFiles(idsArray)
    }
  }

  function handleAction(file: FilesObj) {
    switch (file.type) {
      case 'image':
        setStGallery(true)
        setSelectedImage(file.uri)
        break;
      case 'file':
        file.functionDownload({ id: file.id })
        break;
    }
  }

  return (
    <>
      <div className="br-upload" ref={child1}>
        <label className="upload-label mb-0" htmlFor={id}>
          <span>{title}</span>
        </label>
        <input
          accept={suportedExt && suportedExt.list ? suportedExt.list.join() : ''}
          className="upload-input"
          id={id}
          type="file"
          multiple={multiple}
        />
        <div className="row mt-1 info-row">
          <p className="text-base col mb-0">{placeholder}</p>
          {suportedExt.list.length ? (
            <p
              onClick={() => setStModalFiles(!stModalFiles)}
              className="text-base col-auto float-right cursor-pointer text-primary-default mb-0"
            >
              {suportedExt.title}
            </p>
          ) : (
            ''
          )}
        </div>
        <div className="upload-list" />
        <div className="default-list">
          {defaultFileList.map(item =>
            <div key={item.id} className="br-item">
              <strong className="mr-1">{translation('components:Upload.Submited')}</strong>
              <div
                onClick={() => handleAction(item)}
                className={`cursor-pointer content mr-auto ${defaultListDeleted.includes(item.id)
                  ? 'to-delete-item text-danger' : 'text-primary-default'}`}>
                {item.name}
              </div>
              <div className={`name mr-1 ml-1
              ${defaultListDeleted.includes(item.id) ? 'to-delete-item' : ''}`}>
                {item.name}
              </div>
              {radioSelect ?
                <div className="support">
                  <div key={`select_radio_${item.name}_${item.id}`} className="br-item w-100 mt-0" tabIndex={-1}>
                    <div className="br-radio">
                      <input
                        {...register('radioSelect', { required: true })}
                        value={item.id}
                        id={`radio_${item.name}_${item.id}`}
                        type="radio" />
                      <label className={'mt-0 mb-0 mr-3'} htmlFor={`radio_${item.name}_${item.id}`}>
                        {translation('components:Upload.radio.default')}
                      </label>
                    </div>
                  </div>
                </div>
                : ''}
              <div className="support">
                <button
                  className="br-button"
                  type="button"
                  {...{ circle: 'true' }}
                  onClick={() => addToDelete(item.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedImage && StGallery ?
        <Zoom
          imageZoomSrc={selectedImage}
          onClickImageZoomHide={setStGallery}
        />
        : ''}
      <Modal handleClose={() => setStModalFiles(!stModalFiles)} statusModal={stModalFiles} customClass="p-0">
        <div className="br-modal-header">
          {typeof title === 'string' ? (
            <div className="br-modal-title text-bold" title={suportedExt.title}>
              {suportedExt.title}
            </div>
          ) : (
            title
          )}
        </div>
        <div className="br-modal-body">
          {suportedExt.list.map((item) => (
            <p key={item} className="mb-0">
              {item}
            </p>
          ))}
        </div>
        <div className="br-modal-footer justify-content-end">
          <button className="br-button primary small m-2" onClick={() => setStModalFiles(!stModalFiles)} type="button">
            {translation('components:Modal.Close')}
          </button>
        </div>
      </Modal>
    </>
  );
};
