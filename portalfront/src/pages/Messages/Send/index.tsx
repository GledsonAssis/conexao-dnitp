import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as actionsMessages from '@/store/ducks/messages/actions';
import { ApplicationState } from '@/store';

import { Spotlight } from '@/components/shared/Spotlight';
import { Upload } from '@/components/shared/Upload';
import { EnvsConfig } from '@/infra/config/envs.config';
import Link from 'next/link';
import { IdName, Institutions, SuperintendencesUnits } from '@/store/ducks/messages/types';
import { Select } from '@/components/shared/Select';
import { Handle } from '@/interfaces';
import { SunEditorElem } from '@/components/shared/HtmlInput';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const MesssagesSendPage: React.FC<Props> = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: ApplicationState) => state.messages);
  const [listFiles, setListFiles] = useState([]);
  const [stUpdateSuperintendence, setStUpdateSuperintendence] = useState(false);
  const [stUpdateInstitutitions, setStUpdateInstitutitions] = useState(false);
  const [stMessage, setStMessage] = useState<string>();
  const [superitendencesArr, setSuperitendencesArr] = useState<string[]>([]);
  const [localUnitsArr, setLocalUnitsArr] = useState<string[]>([]);
  const [listUserFiltered, setListUserFiltered] = useState<number[]>([]);
  const [instArr, setInstArr] = useState<string[]>([]);
  const [rolesArr, setRolesArr] = useState<string[]>([]);
  const [messageType, setMessageType] = useState<number>();
  let BrSelectType: Handle<typeof Select>;
  let BrSelectSuperitendences: Handle<typeof Select>;
  let BrSelectLocalUnits: Handle<typeof Select>;
  let BrSelectProfiles: Handle<typeof Select>;
  let BrSelectInstitutions: Handle<typeof Select>;
  let BrSelectRecipients: Handle<typeof Select>;
  let SunEditorHandle: Handle<typeof SunEditorElem>;
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsMessages.loadMessagesTypesRequest());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (arrFilter.includes(messageType)) {
      const params = {
        Institutions: [],
        idDnitUnits: [],
        idRoles: [],
        idSuperintendences: [],
      };
      dispatch(actionsMessages.loadListUsersRequest(params));
      dispatch(actionsMessages.loadRolesRequest());
      dispatch(actionsMessages.loadSuperintendencesRequest());
    }
    // eslint-disable-next-line
  }, [messageType]);

  const fileTypes = {
    title: props.t('pages:Messages.compose.fileTypes'),
    list: [
      '.TXT',
      '.DOC',
      '.DOCX',
      '.PDF',
      '.PPT',
      '.PPTX',
      '.JPEG',
      '.PNG',
      '.XLS',
      '.XLSX',
      '.AVI',
      '.WMV',
      '.MOV',
      '.MKV',
      '.MP4',
      '.MP3',
      '.MPEG',
    ],
  };

  const arrFilter = [6];

  const router = useRouter();

  function getReceptes() {
    const trList = document.querySelectorAll(`[type="checkbox"][id^="users-"]:checked`);
    return Array.from(trList).map((item: HTMLInputElement) => item.value);
  }

  function handleChange(event: FocusEvent, editorContents: string) {
    setStMessage(editorContents);
  }

  async function onSubmit(data: any) {
    const params = {
      message: stMessage,
      messageType: messageType,
      subject: watch('subject_input'),
    };

    if (messageType === 6) {
      params['recipients'] = getReceptes();
    }
    if (listFiles) {
      params['attachments'] = listFiles;
    }

    dispatch(actionsMessages.loadSubmitRequest(params));
    router.replace('/mensagens');
  }

  function searchRecepts() {
    const params = {
      Institutions: instArr.length ? instArr.map(Number) : [],
      idDnitUnits: localUnitsArr.length ? localUnitsArr.map(Number) : [],
      idRoles: rolesArr.length ? rolesArr.map(Number) : [],
      idSuperintendences: superitendencesArr.length ? superitendencesArr.map(Number) : [],
    };

    dispatch(actionsMessages.loadListUsersFilteredRequest(params));
  }

  useEffect(() => {
    if (messages.userListFiltered?.length) {
      const arrayIds = messages.userListFiltered.map(item => String(item.id))
      BrSelectRecipients.setSelectedArray(arrayIds)
    }
    // eslint-disable-next-line
  }, [messages.userListFiltered]);

  useEffect(() => {
    if (stUpdateSuperintendence) {
      const params = {
        dnitUnitIds: {
          sRegional: superitendencesArr.length ? superitendencesArr : [-1],
          uLocal: localUnitsArr.length ? localUnitsArr : [-1],
        },
        withAll: true,
      };
      dispatch(actionsMessages.loadLocalUnitRequest(superitendencesArr));
      dispatch(actionsMessages.loadInstitutionsRequest(params));
      setStUpdateSuperintendence(!stUpdateSuperintendence);
    }
    // eslint-disable-next-line
  }, [stUpdateSuperintendence]);

  useEffect(() => {
    if (stUpdateInstitutitions) {
      const params = {
        dnitUnitIds: {
          sRegional: superitendencesArr.length ? superitendencesArr : [-1],
          uLocal: localUnitsArr.length ? localUnitsArr : [-1],
        },
        withAll: true,
      };
      dispatch(actionsMessages.loadInstitutionsRequest(params));
      setStUpdateInstitutitions(!stUpdateInstitutitions);
    }
    // eslint-disable-next-line
  }, [stUpdateInstitutitions]);

  async function selectedHandleSup(elem: string) {
    const arrValuesSup = await BrSelectSuperitendences.getSelected(elem);
    setSuperitendencesArr(arrValuesSup);
  }

  async function selectedHandleLoc(elem: string) {
    const arrValuesLoc = await BrSelectLocalUnits.getSelected(elem);
    setLocalUnitsArr(arrValuesLoc);
  }

  async function selectedHandleRoles(elem: string) {
    const arrValuesRoles = await BrSelectProfiles.getSelected(elem);
    setRolesArr(arrValuesRoles);
  }

  async function selectedHandleInst(elem: string) {
    const arrValuesInst = await BrSelectInstitutions.getSelected(elem);
    setInstArr(arrValuesInst);
  }

  function render_types() {
    return messages.messagesTypes.map((item: IdName) => (
      <div key={`messages-type-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`messages-type-${item.id}`}
            type="radio"
            name="radio"
            onChange={() => setMessageType(Number(item.id))}
          />
          <label htmlFor={`messages-type-${item.id}`}>{item.name}</label>
        </div>
      </div>
    ));
  }

  function render_superintendences() {
    return messages.superintendencesList.rows.map((item: SuperintendencesUnits) => {
      if (item.id > 0) {
        return (
          <div key={`superintendences-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
            <div className="br-checkbox">
              <input
                id={`superintendences-type-${item.id}`}
                {...register(`superintendences-type`)}
                type="checkbox"
                onChange={() => selectedHandleSup('superintendences-type')}
                value={item.id}
              />
              <label htmlFor={`superintendences-type-${item.id}`}>{item.identification}</label>
            </div>
          </div>
        );
      }
    });
  }

  function render_local_units() {
    return messages.localUnitsList.rows.map((item: SuperintendencesUnits) => {
      if (item.id > 0) {
        return (
          <div key={`local-units-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
            <div className="br-checkbox">
              <input
                id={`local-units-type-${item.id}`}
                name={`local-units-type-${item.id}`}
                type="checkbox"
                onChange={() => selectedHandleLoc('local-units-type')}
                value={item.id}
              />
              <label htmlFor={`local-units-type-${item.id}`}>{item.identification}</label>
            </div>
          </div>
        );
      }
    });
  }

  function render_institutions() {
    return messages.institutionsList.map((item: Institutions) => {
      if (item.id > 0) {
        return (
          <div key={`institutions-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
            <div className="br-checkbox">
              <input
                id={`institutions-type-${item.id}`}
                name={`institutions-type-${item.id}`}
                onChange={() => selectedHandleInst('institutions-type')}
                type="checkbox"
                value={item.id}
              />
              <label htmlFor={`institutions-type-${item.id}`}>{item.name}</label>
            </div>
          </div>
        );
      }
    });
  }

  function render_users() {
    return messages.userList.map((item: IdName) => (
      <div key={`users-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-checkbox">
          <input id={`users-${item.id}`} type="checkbox" value={item.id} />
          <label htmlFor={`users-${item.id}`}>{item.name}</label>
        </div>
      </div>
    ));
  }

  function render_profiles() {
    return messages.profilesList.map((item: IdName) => {
      if (item.id > 0) {
        return (
          <div key={`profiles-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
            <div className="br-checkbox">
              <input
                id={`profiles-${item.id}`}
                name={`profiles-${item.id}`}
                onChange={() => selectedHandleRoles('profiles')}
                type="checkbox" />
              <label htmlFor={`profiles-${item.id}`}>{item.name}</label>
            </div>
          </div>
        );
      }
    });
  }

  return (
    <div className="container-lg contrast-ignore-bg">
      <div className="row contrast-ignore-bg mx-0">
        <div className="img__page col-auto py-3 pl-0">
          <div className="img__page-messages contrast-ignore-bg" style={{ width: 60, height: 60 }} />
        </div>
        <h2 className="text-primary-default">{props.t('pages:Messages.title')}</h2>
      </div>
      <div className="row mx-0 mb-5">
        <div dangerouslySetInnerHTML={{ __html: props.t('pages:Messages.pageDescription') }} />
      </div>

      <Spotlight customClassName="info text-center">
        <strong className="text-​uppercase">{props.t('pages:Messages.compose.title')}</strong>
      </Spotlight>

      <form className="row justify-content-md-center mx-0 mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="row col-md-10">
          <div className="br-input mb-2 w-100">
            <label htmlFor="Title-id1">{props.t('pages:Messages.compose.labels.messagesTypes')}:</label>
            <Select
              ref={(c) => (BrSelectType = c)}
              inputProps={{ ...register('messages-type') }}
              placeholder={props.t('pages:Messages.compose.labels.messagesTypes')}
              id="messages-type"
              CustomclassName={`mw-100 ${messages.messagesTypes.length === 0 ? 'disabled' : ''}`}
            >
              {render_types()}
            </Select>
          </div>
        </div>

        {arrFilter.includes(messageType) ? (
          <div className="row col-md-10">
            <h4 className="mb-1">{props.t('pages:Messages.compose.FromFilterTite')}</h4>
            <div className="br-divider w-100 mb-2" />

            <div className="br-input mb-2 w-100">
              <label htmlFor="Title-id1">{props.t('pages:Messages.compose.labels.superintendences')}:</label>
              <Select
                ref={(c) => (BrSelectSuperitendences = c)}
                inputProps={{ ...register('superintendences') }}
                placeholder={props.t('pages:Messages.compose.labels.superintendences')}
                id="superintendences"
                multiple
                FuncOnClosed={() => setStUpdateSuperintendence(!stUpdateSuperintendence)}
                CustomclassName={`mw-100 ${messages.superintendencesList.count === 0 ? 'disabled' : ''}`}
              >
                <div className="br-item highlighted" data-all="data-all">
                  <div className="br-checkbox">
                    <input id="superintendences-all" type="checkbox" />
                    <label htmlFor="superintendences-all">Selecionar todos</label>
                  </div>
                </div>
                {render_superintendences()}
              </Select>
            </div>

            <div className="br-input mb-2 w-100">
              <label htmlFor="Title-id1">{props.t('pages:Messages.compose.labels.localUnits')}:</label>
              <Select
                ref={(c) => (BrSelectLocalUnits = c)}
                inputProps={{ ...register('localUnits') }}
                placeholder={props.t('pages:Messages.compose.labels.localUnits')}
                id="localUnits"
                multiple
                FuncOnClosed={() => setStUpdateInstitutitions(!stUpdateInstitutitions)}
                CustomclassName={`mw-100 ${messages.localUnitsList.count === 0 ? 'disabled' : ''}`}
              >
                <div className="br-item highlighted" data-all="data-all">
                  <div className="br-checkbox">
                    <input id="localUnits-all" type="checkbox" />
                    <label htmlFor="localUnits-all">Selecionar todos</label>
                  </div>
                </div>
                {render_local_units()}
              </Select>
            </div>

            <div className="br-input mb-2 w-100">
              <label htmlFor="Title-id1">{props.t('pages:Messages.compose.labels.institutions')}:</label>
              <Select
                ref={(c) => (BrSelectInstitutions = c)}
                inputProps={{ ...register('institutions') }}
                placeholder={props.t('pages:Messages.compose.labels.institutions')}
                id="institutions"
                multiple
                CustomclassName={`mw-100 ${messages.institutionsList.length === 0 ? 'disabled' : ''}`}
              >
                <div className="br-item highlighted" data-all="data-all">
                  <div className="br-checkbox">
                    <input id="institutions-all" type="checkbox" />
                    <label htmlFor="institutions-all">Selecionar todos</label>
                  </div>
                </div>
                {render_institutions()}
              </Select>
            </div>

            <div className="br-input mb-2 w-100">
              <label htmlFor="Title-id1">{props.t('pages:Messages.compose.labels.profiles')}:</label>
              <Select
                ref={(c) => (BrSelectProfiles = c)}
                inputProps={{ ...register('profiles') }}
                placeholder={props.t('pages:Messages.compose.labels.profiles')}
                id="profiles"
                multiple
                CustomclassName={`mw-100 ${messages.profilesList.length === 0 ? 'disabled' : ''}`}
              >
                <div className="br-item highlighted" data-all="data-all">
                  <div className="br-checkbox">
                    <input id="profiles-all" type="checkbox" />
                    <label htmlFor="profiles-all">Selecionar todos</label>
                  </div>
                </div>
                {render_profiles()}
              </Select>
            </div>

            <div className="row col-md-12 my-3 mx-0 px-0 justify-content-end">
              <button className="br-button secondary mt-0 ml-1" onClick={searchRecepts} type="button">
                {props.t('pages:Messages.compose.searchUser')}
              </button>
            </div>

            <div className="br-input mb-2 w-100">
              <label htmlFor="Title-id1">{props.t('pages:Messages.compose.labels.recipients')}:</label>
              <Select
                ref={(c) => (BrSelectRecipients = c)}
                inputProps={{ ...register('recipients') }}
                placeholder={props.t('pages:Messages.compose.labels.recipients')}
                id="recipients"
                multiple
                CustomclassName={`mw-100 ${messages.userList.length === 0 ? 'disabled' : ''}`}
              >
                <div className="br-item highlighted" data-all="data-all">
                  <div className="br-checkbox">
                    <input id="recipients-all" type="checkbox" />
                    <label htmlFor="recipients-all">Selecionar todos</label>
                  </div>
                </div>
                {render_users()}
              </Select>
            </div>
          </div>
        ) : (
          ''
        )}


        <div className="row col-md-10">
          <div className="br-input mb-2 w-100">
            <label className="mb-0" htmlFor="subject-id1">
              {props.t('pages:Messages.compose.subject')}:
            </label>
            <input
              {...register('subject_input')}
              style={{ minWidth: '100%', maxWidth: '100%' }}
              id="subject-id1"
            />
          </div>
        </div>
        <div className="row col-md-10">
          <div className="br-textarea mb-2 w-100">
            <label className="mb-0" htmlFor="description-id1">
              {props.t('pages:Messages.compose.description')}:
            </label>
            <SunEditorElem handleChange={handleChange} id="reply" {...register('message_input')} ref={(c) => (SunEditorHandle = c)} />
          </div>
        </div>
        <div className="row col-md-10">
          <div className="mb-2 w-100">
            <Upload
              title={props.t('pages:Messages.compose.addAttachment')}
              multiple
              id="uploadFiles"
              listFiles={setListFiles}
              placeholder={props.t('pages:Messages.compose.maxSize', { max: `${EnvsConfig.apiMaxSize() / 1024 / 1024}MB` })}
              suportedExt={fileTypes}
            />
          </div>
        </div>
        <div className="row col-md-10 justify-content-md-end">
          <Link href="/mensagens">
            <a>
              <button className="br-button secondary" type="button">
                {props.t('pages:Messages.compose.backbtn')}
              </button>
            </a>
          </Link>

          <button className="br-button primary mt-0 ml-1" type="submit">
            {props.t('pages:Messages.compose.submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function MesssagesSend() {
  return (
    <Template>
      <MesssagesSendPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
