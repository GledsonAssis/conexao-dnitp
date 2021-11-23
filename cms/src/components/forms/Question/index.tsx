import React, { FC } from 'react';
import { TFunction } from 'next-i18next';
import {
  Control, DeepMap, FieldError, UseFormGetValues, UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch
} from 'react-hook-form';
import Select from '@/components/shared/Select';
import { Alternative, Question, Section } from '@/store/ducks/surveies/types';

interface UseFormProps {
  registerForm: UseFormRegister<any>,
  watchForm: UseFormWatch<any>,
  getValuesForm?: UseFormGetValues<any>,
  setValueForm?: UseFormSetValue<any>,
  resetForm?: UseFormReset<any>,
  errorsForm?: DeepMap<any, FieldError>,
  controlForm?: Control<any>
}

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  t: TFunction,
  onlyView?: boolean,
  indexSection: number,
  indexQuestion: number,
  questionData: Question,
  useFormProps: UseFormProps,
}

type Props = StateProps & DispatchProps & OwnProps;

export const QuestionForm: FC<Props> = ({ useFormProps, t, indexSection, indexQuestion, questionData, onlyView = false }) => {
  const typesList = [
    { label: t("components:question.types.text"), id: 1, hasOptions: false, input: null },
    { label: t("components:question.types.oneChoice"), id: 2, hasOptions: true, input: 'radio' },
    { label: t("components:question.types.multiChoice"), id: 3, hasOptions: true, input: 'checkbox' }
  ]

  function renderTypes() {
    return typesList.map((item: { label: string, id: number, hasOptions: boolean }) => (
      <div key={`types_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            {...useFormProps.registerForm(`sections.${indexSection}.questions.${indexQuestion}.type`, { required: true })}
            value={item.id}
            id={`sections.${indexSection}.questions.${indexQuestion}.type.${item.id}`}
            type="radio" />
          <label htmlFor={`sections.${indexSection}.questions.${indexQuestion}.type.${item.id}`}>
            {item.label}
          </label>
        </div>
      </div>
    ));
  }

  function renderAlternatives() {
    const filteredType = typesList.find(type => String(type.id) === useFormProps.watchForm(`sections.${indexSection}.questions.${indexQuestion}.type`));
    if (filteredType?.hasOptions) {
      switch (filteredType.input) {
        case 'checkbox':
          return useFormProps.watchForm(`sections.${indexSection}.questions.${indexQuestion}.alternatives`)?.map((item: Alternative, index: number) => (
            <div key={`radio_select_${indexSection}_questions_${item.QuestionId}_${index}`} className="row mb-0">
              <div className='col-auto pr-0'>
                <div className="br-checkbox mt-2">
                  <input
                    {...useFormProps.registerForm(`sections.${indexSection}.questions.${indexQuestion}.alternatives.${index}`)}
                    id={`sections.${indexSection}.questions.${indexQuestion}.alternatives.${index}`}
                    disabled={true}
                    type="checkbox" />
                  <label htmlFor={`sections.${indexSection}.questions.${indexQuestion}.type.${item.id}`}> </label>
                </div>
              </div>
              <div className='col pl-0'>
                <div className={`br-input medium ${useFormProps.errorsForm?.sections?.indexSection?.questions?.indexQuestion?.alternatives?.index?.type ? 'danger' : ''}`}>
                  <input
                    {...useFormProps.registerForm(`sections.${indexSection}.questions.${indexQuestion}.alternatives.${index}.option`, { required: true })}
                    disabled={onlyView}
                    className={`medium ${useFormProps.errorsForm?.sections?.indexSection?.questions?.indexQuestion?.alternatives?.index?.type ? 'danger' : ''}`}
                    id={`sections.${indexSection}.questions.${indexQuestion}.question`}
                    type="text"
                    placeholder={t('pages:surveys.details.placeholders.question')} />
                  {useFormProps.errorsForm?.sections?.indexSection?.questions?.indexQuestion?.alternatives?.index?.type ?
                    <div className="mt-1">
                      <span className="feedback danger" role="alert">
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                        {t('pages:surveys.details.required.title')}
                      </span>
                    </div>
                    : ''}
                </div>
              </div>
              {onlyView ? '' :
                <div className='col-auto pl-1'>
                  <button
                    className="br-button small circle mb-auto mt-1"
                    type="button"
                    onClick={() => removeAlternativeHandle(index)}
                    aria-label="Ícone ilustrativo">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              }
            </div>
          ))
        case 'radio':
          return useFormProps.watchForm(`sections.${indexSection}.questions.${indexQuestion}.alternatives`)?.map((item: Alternative, index: number) => (
            <div key={`radio_select_${indexSection}_questions_${item.QuestionId}_${index}`} className="row mb-0">
              <div className='col-auto pr-0'>
                <div className="br-radio mt-2">
                  <input
                    {...useFormProps.registerForm(`sections.${indexSection}.questions.${indexQuestion}.alternatives.${index}`)}
                    id={`sections.${indexSection}.questions.${indexQuestion}.alternatives.${index}`}
                    disabled={true}
                    type="radio" />
                  <label htmlFor={`sections.${indexSection}.questions.${indexQuestion}.type.${item.id}`}> </label>
                </div>
              </div>
              <div className='col px-0'>
                <div className={`br-input medium ${useFormProps.errorsForm?.sections?.indexSection?.questions?.indexQuestion?.alternatives?.index?.type ? 'danger' : ''}`}>
                  <input
                    {...useFormProps.registerForm(`sections.${indexSection}.questions.${indexQuestion}.alternatives.${index}.option`, { required: true })}
                    disabled={onlyView}
                    className={`medium ${useFormProps.errorsForm?.sections?.indexSection?.questions?.indexQuestion?.alternatives?.index?.type ? 'danger' : ''}`}
                    id={`sections.${indexSection}.questions.${indexQuestion}.question`}
                    type="text"
                    placeholder={t('pages:surveys.details.placeholders.question')} />
                  {useFormProps.errorsForm?.sections?.indexSection?.questions?.indexQuestion?.alternatives?.index?.type ?
                    <div className="mt-1">
                      <span className="feedback danger" role="alert">
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                        {t('pages:surveys.details.required.title')}
                      </span>
                    </div>
                    : ''}
                </div>
              </div>
              {onlyView ? '' :
                <div className='col-auto pl-1'>
                  <button
                    className="br-button small circle mb-auto mt-1"
                    type="button"
                    onClick={() => removeAlternativeHandle(index)}
                    aria-label="Ícone ilustrativo">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              }
            </div>
          ))
      }
    }
  }

  function addAlternativeHandle() {
    const alternatives = useFormProps.getValuesForm(`sections.${indexSection}.questions.${indexQuestion}.alternatives`) as Alternative[]
    useFormProps.setValueForm(
      `sections.${indexSection}.questions.${indexQuestion}.alternatives.${alternatives.length}`,
      { option: '', is_justify: false }
    )
  }

  function removeAlternativeHandle(idx: number) {
    const alternatives = useFormProps.getValuesForm(`sections.${indexSection}.questions.${indexQuestion}.alternatives`) as Alternative[]
    alternatives.splice(idx, 1)
    useFormProps.setValueForm(
      `sections.${indexSection}.questions.${indexQuestion}.alternatives`, alternatives
    )
  }

  function removeQuestionHandle(idx: number) {
    const questions = useFormProps.getValuesForm(`sections.${indexSection}.questions`) as Alternative[]
    questions.splice(idx, 1)
    useFormProps.setValueForm(`sections.${indexSection}.questions`, questions)
  }

  return (
    <>
      <div className="row">
        <div className='col'>
          <div className="h5 mb-1">{`${t('components:question.title')} ${indexQuestion + 1}`}</div>
        </div>
        {onlyView ? '' :
          <div className='col-auto'>
            <button className="br-button" onClick={() => removeQuestionHandle(indexQuestion)} type="button">
              {t('components:question.remove')}
            </button>
          </div>
        }
      </div>
      <div className={`border-solid-sm p-1 px-sm-3 mb-4`}>
        <div className="row mb-2">
          <div className='col-12'>
            <div className="row mb-2">
              <div className='col-8'>
                <div className={`br-input medium ${useFormProps.errorsForm?.sections?.indexSection?.questions?.indexQuestion?.question?.type ? 'danger' : ''}`}>
                  <label htmlFor={`sections.${indexSection}.questions.${indexQuestion}.question`}>{t('components:question.labels.title')}*:</label>
                  <input
                    {...useFormProps.registerForm(`sections.${indexSection}.questions.${indexQuestion}.question`, { required: true })}
                    disabled={onlyView}
                    className={`medium ${useFormProps.errorsForm?.sections?.indexSection?.questions?.indexQuestion?.question?.type ? 'danger' : ''}`}
                    id={`sections.${indexSection}.questions.${indexQuestion}.question`}
                    type="text"
                    placeholder={t('pages:surveys.details.placeholders.question')} />
                  {useFormProps.errorsForm?.sections?.indexSection?.questions?.indexQuestion?.question?.type ?
                    <div className="mt-1">
                      <span className="feedback danger" role="alert">
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                        {t('pages:surveys.details.required.title')}
                      </span>
                    </div>
                    : ''}
                </div>
              </div>
              <div className='col'>
                <div className={`br-input medium ${useFormProps.errorsForm?.idSchoolYear?.type ? 'danger' : ''}`}>
                  <label htmlFor={`sections.${indexSection}.question.${indexQuestion}.type`}>{t('components:question.labels.type')}*:</label>
                  <Select
                    id={`sections.${indexSection}.question.${indexQuestion}.type`}
                    disabled={onlyView}
                    style={{ maxHeight: 320 }}
                    CustomclassName={`mw-100 ${useFormProps.errorsForm?.idSchoolYear?.type ? 'danger' : ''}`}
                    className="mw-100"
                  >
                    {renderTypes()}
                  </Select>
                  {useFormProps.errorsForm?.idSchoolYear?.type ?
                    <div className="mt-1">
                      <span className="feedback danger" role="alert">
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                        {t('pages:activities.details.required.schoolYear')}
                      </span>
                    </div>
                    : ''}
                </div>
              </div>
              <div className='col-auto'>
                <div className="br-checkbox mt-4">
                  <input
                    {...useFormProps.registerForm(`sections.${indexSection}.questions.${indexQuestion}.required`)}
                    disabled={onlyView}
                    id={`sections.${indexSection}.questions.${indexQuestion}.required`}
                    defaultChecked={questionData.required}
                    type="checkbox" />
                  <label htmlFor={`sections.${indexSection}.questions.${indexQuestion}.required`}>
                    {t('components:question.labels.required')}
                  </label>
                </div>
              </div>
            </div>
          </div>
          {typesList.find(type => String(type.id) === useFormProps.watchForm(`sections.${indexSection}.questions.${indexQuestion}.type`))?.hasOptions &&
            <>
              <div className='col-12 mb-2'>
                {renderAlternatives()}
              </div>
              {onlyView ? '' :
                <div className="d-flex">
                  <div className='col'>
                    <button
                      className="br-button primary"
                      onClick={addAlternativeHandle}
                      type="button">
                      {t('components:alternative.add')}
                    </button>
                  </div>
                </div>
              }
            </>
          }
        </div>
      </div>
    </>
  );
};
