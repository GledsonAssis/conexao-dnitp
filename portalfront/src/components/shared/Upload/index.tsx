import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import BRUpload from './upload';

import Modal from '../Modal';

interface suportedList {
  title: string;
  list: string[];
}

interface StateProps {}
interface DispatchProps {}
interface OwnProps {
  multiple?: boolean;
  title?: string;
  placeholder?: string;
  suportedExt: suportedList;
  id: string;
  listFiles?: any;
  uploadFile?: any;
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
  listFiles = null,
  uploadFile = null,
}) => {
  const child1 = useRef<HTMLDivElement>();
  const [stModalFiles, setStModalFiles] = useState(false);
  const { register } = useForm<any>();

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
      new BRUpload('br-upload', child1.current, uploadFile || uploadTimeout, listUpdateFiles);
    }
  }, []);

  return (
    <>
      <div className="br-upload" ref={child1}>
        <label className="upload-label mb-0" htmlFor={id}>
          <span>{title}</span>
        </label>
        <input
          {...register('files_input')}
          accept={suportedExt && suportedExt.list ? suportedExt.list.join() : ''}
          className="upload-input"
          id={id}
          type="file"
          multiple={multiple}
        />
        <div className="upload-list" />
      </div>
      <div className="row mt-1">
        <p className="text-base col">{placeholder}</p>
        {suportedExt.list ? (
          <p
            onClick={() => setStModalFiles(!stModalFiles)}
            className="text-base col-auto float-right cursor-pointer text-primary-default"
          >
            {suportedExt.title}
          </p>
        ) : (
          ''
        )}
      </div>

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
            Fechar
          </button>
        </div>
      </Modal>
    </>
  );
};
