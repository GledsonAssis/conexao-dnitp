import moment from 'moment';
import React, { FC, useState } from 'react';
import CustomIcons from '@/assets/icons';
import CommentBox from '../CommentBox';
import { useDispatch, useSelector } from 'react-redux';
import * as oauthActions from '@/store/ducks/oauth/actions';
import { ApplicationState } from '@/store';
import { useForm } from 'react-hook-form';
import Pagination from '../Pagination';
import { CommentsType } from '@/store/ducks/actions/types';
import SortFilter from '../SortFilter';
import actionsFieldsSortFilter from './fieldsSortFilter.json';
import { sortOptionsParser } from '@/utils/parsers';

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
  onDelete,
  onSubmitComment
}) => {
  const oauth = useSelector((state: ApplicationState) => state.oauth);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [changeFilter, setChangeFilter] = useState(actionsFieldsSortFilter[0]);
  const [optionsFilter, setOptionsFilter] = useState([]);
  const [numberItensPer, setNumberItensPer] = useState(5);
  React.useEffect(() => {
    dispatch(oauthActions.loadModeratorRequest());
    setOptionsFilter(actionsFieldsSortFilter.map(sortOptionsParser(translation)));
  }, []);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  function sortItens(data: CommentsType[]) {
    const order = changeFilter.order === 'asc' ? 1 : -1;
    switch (changeFilter.field) {
      case 'date':
        return data.sort((a, b) => order * (new Date(getValueInObject(b, changeFilter.value)).getTime() - new Date(getValueInObject(a, changeFilter.value)).getTime()))
      case 'length':
        return data.sort((a, b) => order * (getValueInObject(b, changeFilter.value).length - getValueInObject(a, changeFilter.value).length))
      case 'title':
        return data.sort((a, b) => order * ((getValueInObject(a, changeFilter.value)).localeCompare(getValueInObject(b, changeFilter.value))))
    }
  }

  function getValueInObject(obj: any, key: string) {
    let value = obj;
    const field = key.split('.')
    field.forEach(item => { value = value[item] })
    return value
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

  function component() {
    const data = sortItens(commentBoxCommentText);
    const listFiltered = changePage(currentPage, numberItensPer, data)
    return listFiltered.map((item: CommentsType) => {
      return (
        <div key={item.id} className="br-item mb-4">
          <div className="d-inline-flex w-100 m-0">
            <div>
              <span className="br-avatar mr-2" title={item.author?.name.charAt(0)}>
                <span className="image">
                  <span className="image small letter bg-primary-darken-01 text-secondary-01">{item.author?.name.charAt(0)}</span>
                </span>
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
          {allowReply &&
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
          }

          {item.replies?.length > 0 &&
            item.replies.map((repliesItem: any) => (
              <div key={`reply-item-${repliesItem.id}`} className="d-inline-flex w-100 m-0 mt-1">
                <div className={'ml-lg-comment-reply'}>
                  <span className="br-avatar mr-2" title={repliesItem.author?.name}>
                    <span className="image">
                      <span className="image small letter bg-primary-darken-01 text-secondary-01">{repliesItem.author?.name.charAt(0)}</span>
                    </span>
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

  function renderList() {
    if (commentBoxCommentText?.length > 0) {
      return (
        <>
          {component()}
          <Pagination
            id={'comments'}
            translations={translation}
            countItensPerPage={numberItensPer}
            countCurrentPage={currentPage}
            setNumberItensPer={setNumberItensPer}
            setCurrentPage={setCurrentPage}
            useFormProps={{
              watch,
              setValue,
              register
            }}
            count={commentBoxCommentText?.length}
          />
        </>
      )
    }
  }

  return (
    <>
      <div className="d-flex">
        <span className="mt-3 my-auto text-bold">{translation('general:CommentList.title')}: </span>
        <SortFilter fields={optionsFilter} onChange={(value: any) => setChangeFilter(value)} btnClassName="br-button circle small transform-none" />
      </div>
      <div className={`comment_box br-textarea mb-4 ${className}`}>
        <CommentBox
          allowReply={allowReply}
          onSubmit={onSubmitComment}
          sendText={translation('general:CommentList.commentBoxSendText')}
          placeholderText={translation('general:CommentList.placeholder')}
        />
      </div>
      {renderList()}
    </>
  );
};

export default CommentList;
