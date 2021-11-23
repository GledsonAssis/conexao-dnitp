import React, { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  idParent?: any;
  allowReply?: any;
  onSubmit?: any;
  maxLength?: any;
  sendText?: any;
  toggleBtnText?: any;
  placeholderText?: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export const CommentBox: FC<Props> = ({
  allowReply,
  idParent,
  maxLength,
  onSubmit,
  sendText,
  toggleBtnText,
  placeholderText,
}) => {
  React.useEffect(() => { }, []);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  function handleOnSubmit(e: any) {
    onSubmit(e);
    setValue('txtComment', '')
  }

  return (
    <>
      {allowReply && (
        <div className="comment-box mb-2 br-textarea">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="comment-box__reply-button">
              {idParent && (
                <button className="comment-box__button" type="button">
                  {toggleBtnText}
                </button>
              )}
            </div>
            <div className="comment-box__text-box comment-box__animation">
              <textarea
                id="txtComment"
                {...register('txtComment')}
                placeholder={placeholderText || ''}
                className="comment-box__text-box__textarea p-2 mb-1"
                maxLength={maxLength}
              />
              <div>
                <button className="br-button primary mt-3 mt-sm-0" disabled={!watch('txtComment')} type="submit">
                  {sendText || 'Enviar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CommentBox;
