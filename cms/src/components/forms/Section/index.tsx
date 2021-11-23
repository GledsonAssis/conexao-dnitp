import React, { FC } from 'react';
import { TFunction } from 'next-i18next';
import {
  Control, DeepMap, FieldError, UseFormGetValues, UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch
} from 'react-hook-form';
import { Question, Section } from '@/store/ducks/surveies/types';
import { QuestionForm } from '../Question';

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
  indexSection: number,
  onlyView?: boolean
  sectionData: Section,
  useFormProps: UseFormProps,
}

type Props = StateProps & DispatchProps & OwnProps;

export const SectionForm: FC<Props> = ({ useFormProps, t, indexSection, sectionData, onlyView = false }) => {
  function addQuestionHandle() {
    const questions = useFormProps.getValuesForm(`sections.${indexSection}.questions`) as Section[]
    useFormProps.setValueForm(
      `sections.${indexSection}.questions.${questions.length}`,
      {
        type: "1",
        question: "",
        required: false,
        alternatives: []
      }
    )
  }

  function removeSectionHandle(idx: number) {
    const questions = useFormProps.getValuesForm(`sections`) as Section[]
    questions.splice(idx, 1)
    useFormProps.setValueForm(`sections`, questions)
  }

  return (
    <>
      <div className="row">
        <div className='col'>
          <div className="h3 mb-1">{`${t('components:section.title')} ${indexSection + 1}`}</div>
        </div>
        {onlyView ? '' :
          <div className='col-auto'>
            <button className="br-button" onClick={() => removeSectionHandle(indexSection)} type="button">
              {t('components:section.delete')}
            </button>
          </div>
        }
      </div>
      <div className={`border-solid-sm p-1 px-sm-3 mb-4`}>
        <div className="row mb-2">
          <div className='col-12'>
            <div className="row mb-2">
              <div className='col-12'>
                <div className={`br-input medium ${useFormProps.errorsForm?.sections?.indexSection?.title?.type ? 'danger' : ''}`}>
                  <label htmlFor={`sections.${indexSection}.title`}>{t('components:section.FormTitle')}*:</label>
                  <input
                    {...useFormProps.registerForm(`sections.${indexSection}.titulo`, { required: true })}
                    disabled={onlyView}
                    className={`medium ${useFormProps.errorsForm?.sections?.indexSection?.title?.type ? 'danger' : ''}`}
                    id={`sections.${indexSection}.title`}
                    placeholder={t('pages:surveys.details.placeholders.title')} />
                  {useFormProps.errorsForm?.sections?.indexSection?.title?.type ?
                    <div className="mt-1">
                      <span className="feedback danger" role="alert">
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                        {t('pages:surveys.details.required.title')}
                      </span>
                    </div>
                    : ''}
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className='col-12'>
                <div className={`br-textarea`}>
                  <label htmlFor={`sections.${indexSection}.description`}>{t('components:section.FormDescription')}:</label>
                  <textarea
                    {...useFormProps.registerForm(`sections.${indexSection}.description`)}
                    className={`w-100`}
                    disabled={onlyView}
                    id={`sections.${indexSection}.description`}
                    placeholder={t('pages:surveys.details.placeholders.description')} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className='col-12'>
                {useFormProps.watchForm(`sections.${indexSection}.questions`)?.map((item: Question, index: number) =>
                  <QuestionForm
                    useFormProps={useFormProps}
                    onlyView={onlyView}
                    key={`section_${sectionData.id}_question_${item.id}_${index}`}
                    t={t}
                    indexSection={indexSection}
                    indexQuestion={index}
                    questionData={item}
                  />
                )}
              </div>
            </div>
            {onlyView ? '' :
              <div className="row mb-2">
                <div className='col-12'>
                  <button className="br-button primary" onClick={addQuestionHandle} type="button">
                    {t('components:question.add')}
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};
