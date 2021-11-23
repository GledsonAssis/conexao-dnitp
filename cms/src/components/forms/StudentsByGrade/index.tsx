import React, { FC, useEffect, useRef, useState } from 'react';
import { TFunction } from 'next-i18next';
import {
  Control, Controller, DeepMap, FieldError, useForm, UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch
} from 'react-hook-form';
import InputMask from 'react-input-mask';
import NumberFormat from "react-number-format";
import Select from '@/components/shared/Select';
import { useDispatch, useSelector } from 'react-redux';
import * as actionsSchoolYears from '@/store/ducks/schoolYear/actions';
import { SchoolYears } from '@/store/ducks/schoolYear/types';
import { ApplicationState } from '@/store';
import { Spotlight } from '@/components/shared/Spotlight';

interface UseFormProps {
  registerForm: UseFormRegister<any>,
  watchForm: UseFormWatch<any>,
  setValueForm: UseFormSetValue<any>,
  resetForm?: UseFormReset<any>,
  errorsForm?: DeepMap<any, FieldError>,
  controlForm?: Control<any>
}

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  useFormProps: UseFormProps,
  t: TFunction,
  defaultList?: { idSchoolYear: number, amountStudents: number, idEducationalInstitution?: number }[]
}

type Props = StateProps & DispatchProps & OwnProps;

export const StudentsByGradeForm: FC<Props> = ({ useFormProps, t, defaultList = [] }) => {
  const dispatch = useDispatch();
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);
  const [listStudents, setListStudents] = useState<{ idSchoolYear: number, amountStudents: number }[]>([]);
  const [showErros, setShowErros] = useState<boolean>(false);
  const [stLoading, setStLoading] = useState<boolean>(false);

  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsSchoolYears.loadListRequest());
    watch('idSchoolYear')
    watch('amountStudents')
  }, []);

  useEffect(() => {
    if (defaultList.length && !stLoading) {
      setListStudents(defaultList)
      setStLoading(true)
    }
  }, [defaultList]);

  function nth(n: number) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }

  function renderSchoolYars() {
    if (schoolYears?.data?.length > 0) {
      return schoolYears.data.map((item: SchoolYears) => {
        if (!listStudents.some(row => row.idSchoolYear === item.id)) {
          return <div key={`ano_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
            <div className="br-radio">
              <input
                {...register('idSchoolYear')}
                value={item.id}
                id={`anos${item.ordinal}${item.id}`}
                type="radio" />
              <label htmlFor={`anos${item.ordinal}${item.id}`}>
                {t('components:listStudentsPerCycle.selectYear', { year: item.ordinal, ordinal: nth(item.ordinal) })}
              </label>
            </div>
          </div>
        } else {
          return null
        }
      });
    }
  }

  function deleteHandle(id: number | string) {
    setListStudents(listStudents.filter(item => item.idSchoolYear !== id))
  }

  function renderList() {
    return listStudents.map((item, index) =>
      <div key={`${index}_${item.idSchoolYear}_${item.amountStudents}`}
        className="align-items-center br-item pt-1 pb-0" role="listitem">
        <Spotlight customClassName={`mb-0`}>
          <div className="row align-items-center">
            <div className="col-auto" >
              <li
                value={item.idSchoolYear}
                style={{ listStyleType: 'none' }}
                {...useFormProps.registerForm(`studentsPerCycle[${index}].idSchoolYear`)}>
                <div className="br-tag icon secondary text-white">
                  {schoolYears.data.find(row => row.id === item.idSchoolYear)?.ordinal}
                </div>
              </li>
            </div>
            <div className="col" >
              <li
                value={item.amountStudents}
                style={{ listStyleType: 'none' }}
                {...useFormProps.registerForm(`studentsPerCycle[${index}].amountStudents`)}>
                {t('components:listStudentsPerCycle.students', { students: item.amountStudents })}
              </li>
            </div>
            <div className="col-auto" >
              <button
                className="br-button small secondary circle mt-3 mt-sm-0"
                type="button"
                onClick={() => deleteHandle(item.idSchoolYear)}
                aria-label="Ícone ilustrativo">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </Spotlight>
      </div>
    )
  }

  function addStudentsByCicle() {
    if (!watch('idSchoolYear') || !watch('amountStudents')) {
      setShowErros(true)
    } else {
      setShowErros(false)
      setListStudents([...listStudents, {
        idSchoolYear: +watch('idSchoolYear'),
        amountStudents: +watch('amountStudents')
      }])
      setValue('idSchoolYear', '')
      setValue('amountStudents', '')
    }
  }

  return (
    <>
      <div className="h3 mb-1">{t('components:listStudentsPerCycle.title')}</div>
      <div className={`border-solid-sm p-1 px-sm-3 mb-4`}>
        <div className="row">
          <div className='col-12 col-md-4'>
            <div className={`br-input medium`}>
              <label htmlFor="cycle">{t('components:listStudentsPerCycle.cycle')}:</label>
              <Select
                placeholder={t('components:listStudentsPerCycle.cycle')}
                id="regionalSuperintendence"
                CustomclassName={`mw-100  ${useFormProps.errorsForm?.regionalSuperintendence?.type ? 'danger' : ''}`}
                className="mw-100"
                currentValue={watch('idSchoolYear')}
              >
                {renderSchoolYars()}
              </Select>
              {!watch('idSchoolYear') && showErros ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('components:listStudentsPerCycle.errors.cycle')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className={`br-input medium`}>
              <label htmlFor="amountStudents">{t('components:listStudentsPerCycle.studentsAmount')}:</label>
              <Controller
                render={({ field }) =>
                  <NumberFormat
                    control={control}
                    customInput={InputMask}
                    placeholder={t('components:listStudentsPerCycle.studentsAmount')}
                    allowEmptyFormatting={false}
                    allowNegative={true}
                    decimalScale={8}
                    {...field}
                    decimalSeparator={','}
                    onValueChange={(c) => {
                      field.onChange(c.value);
                    }}
                  />
                }
                name="amountStudents"
                control={control}
              />
              {!watch('amountStudents') && showErros ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('components:listStudentsPerCycle.errors.amountStudents')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-4 mt-4'>
            <button className="br-button secondary" type="button" onClick={addStudentsByCicle}>
              <i className="fas fa-plus mr-1" aria-hidden="true" />
              {t('components:listStudentsPerCycle.add')}
            </button>
          </div>
        </div>
        {listStudents.length ?
          <div className="row mb-2">
            <div className="br-list w-100">
              <div className="header">
                <div className="title">Lista de Alunos</div>
              </div><span className="br-divider mx-3"></span>
              {renderList()}
            </div>
          </div>
          : ''}
      </div>
    </>
  );
};
