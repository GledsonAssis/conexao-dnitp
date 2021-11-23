import moment from 'moment';
import React, { FC, useState } from 'react';
import CustomIcons from '@/assets/icons';
import CommentBox from '../CommentBox';
// import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import * as oauthActions from '@/store/ducks/oauth/actions';
import { ApplicationState } from '@/store';
import { userParser } from '@/utils/parsers/userParser';
import { useForm } from 'react-hook-form';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  customClassName?: string;
  canRemove?: any;
  commentBoxCommentText?: any;
  commentBoxReplyText?: any;
  commentBoxSendText?: any;
  allowReply?: Boolean;
  onDelete?: Function;
  onSubmitComment: any;
  translation?: any;
  className?: string;
  sortData?: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export const CommentList: FC<Props> = ({
  translation,
  allowReply,
  commentBoxCommentText,
  className,
  sortData = 'dateTime',
  onDelete,
  onSubmitComment
}) => {
  const oauth = useSelector((state: ApplicationState) => state.oauth);
  const dispatch = useDispatch();
  const [stReply, setStReply] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(5);
  React.useEffect(() => {
    dispatch(oauthActions.loadModeratorRequest());
  }, []);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  function sortItens(data: any[]) {
    return data.sort((a, b) => (new Date(b[sortData]).getTime() - new Date(a[sortData]).getTime()))
  }

  function changePage(pageChange: number, itensPerChange: number, data: any[]): any[] {
    pageChange = Math.min(Math.max(pageChange, 1), numPages(data.length, itensPerChange));
    const arrayItens = [];
    for (let i = (pageChange - 1) * itensPerChange; i < pageChange * itensPerChange; i++) {
      if (data[i]) {
        arrayItens.push(data[i]);
      }
    }
    return arrayItens;
  }

  function numPages(numItens: number, itensPerChange: number) {
    return Math.ceil(numItens / itensPerChange);
  }

  function submitReply(data: any) {
    onSubmitComment(data);
    setValue(`reply_btn_${data.idParent}`, false);
  }

  function renderList() {
    if (commentBoxCommentText?.length > 0) {
      const data = sortItens(commentBoxCommentText);
      // const paginated = changePage(currentPage, numberItensPer, data);
      return data.map((item: any) => {
        return (
          <div key={item.id} className="br-item mb-4">
            <div className="d-inline-flex w-100 m-0">
              <div>
                <span className="br-avatar mr-2" title={item.author?.name}>
                  {item.author?.attachment?.length ?
                    <span className="image">
                      <img src={userParser(item.author).imageUri} alt="Avatar" />
                    </span>
                    :
                    <span className="image">
                      <i className="fas fa-user" aria-hidden="true" />
                    </span>
                  }
                </span>
              </div>

              <div className="content">
                <div className="row mx-0" style={{ alignItems: 'center' }}>
                  <p className="text-capitalize font-weight-semi-bold mb-0 text-dark">
                    {String(item.author.name).toLowerCase()}
                    <span className="font-weight-normal ml-2">
                      {moment(item.dateTime).utcOffset(3).format('DD/MM/yyyy')}
                    </span>
                  </p>
                  {oauth.isModerator &&
                    <button onClick={() => onDelete({ id: item.id })} className="br-button text-secondary circle m-0 small ml-1" type="button" aria-label="Deletar">
                      <img src={CustomIcons.iconTrash} alt="icon-trash" />
                    </button>
                  }
                </div>
                <span className="text-capitalize text-dark">{String(item.comment).toLowerCase()}</span>
                <br />
              </div>
            </div>
            <div className="d-inline-flex w-100 m-0 mt-1">
              <input
                type="checkbox"
                {...register(`reply_btn_${item.id}`)}
                id={`reply_btn_${item.id}`}
              />
              <label htmlFor={`reply_btn_${item.id}`} className={'br-button secondary small'}>
                {!watch(`reply_btn_${item.id}`) ? translation('general:CommentList.commentBoxReplyText') : translation('general:CommentList.commentBoxCancelText')}
              </label>
            </div>

            {item.replies?.length > 0 &&
              item.replies.map((repliesItem: any) => (
                <div key={`reply-item-${repliesItem.id}`} className="d-inline-flex w-100 m-0 mt-1">
                  <div className={'ml-lg-comment-reply'}>
                    <span className="br-avatar mr-2" title={repliesItem.author?.name}>
                      {repliesItem.author?.attachment?.length ?
                        <span className="image">
                          <img src={userParser(repliesItem.author).imageUri} alt="Avatar" />
                        </span>
                        :
                        <span className="image">
                          <i className="fas fa-user" aria-hidden="true" />
                        </span>
                      }
                    </span>
                  </div>

                  <div className="content">
                    <div className="row mx-0" style={{ alignItems: 'center' }}>
                      <p className="text-capitalize font-weight-semi-bold mb-0 text-dark">
                        {String(repliesItem.author.name).toLowerCase()}
                        <span className="font-weight-normal ml-2">
                          {moment(repliesItem.dateTime).utcOffset(3).format('DD/MM/yyyy')}
                        </span>
                      </p>
                      {oauth.isModerator &&
                        <button onClick={() => onDelete({ id: repliesItem.id })} className="br-button text-secondary circle m-0 small ml-1" type="button" aria-label="Deletar">
                          <img src={CustomIcons.iconTrash} alt="icon-trash" />
                        </button>
                      }
                    </div>
                    <span className="text-capitalize text-dark">{String(repliesItem.comment).toLowerCase()}</span>
                    <br />
                  </div>
                </div>
              ))
            }

            {watch(`reply_btn_${item.id}`) &&
              <CommentBox
                allowReply={allowReply}
                onSubmit={(data: any) => submitReply({ ...data, idParent: item.id })}
                sendText={translation('general:CommentList.commentBoxSendText')}
                placeholderText={translation('general:CommentList.placeholder')}
              />
            }
          </div >
        )
      });
    }
  }

  return (
    <>
      <span className="mt-3 text-bold">{translation('general:CommentList.title')}</span>
      <div className={`comment_box br-textarea mb-4 ${className}`}>
        <CommentBox
          allowReply={allowReply}
          onSubmit={onSubmitComment}
          sendText={translation('general:CommentList.commentBoxSendText')}
          placeholderText={translation('general:CommentList.placeholder')}
        />
      </div>
      {renderList()}
      {/* <Pagination countItensPerPage={numberItensPer} countCurrentPage={currentPage} itensShow={7} count={commentBoxCommentText.length} /> */}
    </>
  );
};

export default CommentList;
