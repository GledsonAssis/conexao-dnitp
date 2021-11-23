import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { SecundaryCard } from '../SecundaryCard';
import { Card } from '../Card';
import Projects from '@/assets/icons/icon_projects.svg';
import Pagination from '../Pagination';
import { useForm } from 'react-hook-form';
import { TFunction } from 'react-i18next';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  titulo: string;
  description: string;
  iconCampaign?: any;
  listItens?: any[];
  translations?: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

function typeToClass(type: string) {
  switch (type) {
    case 'Cursos':
      return 'courses';
    case 'Atividades':
      return 'activities';
    case 'Projetos e Campanhas':
      return 'projects';
    case 'Ações de Ativação':
      return 'actions';
    default:
      return 'projects';
  }
}

const PresentationPage: React.FC<Props> = ({ titulo, description, listItens, translations }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(12);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

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

  function itensHighlights() {
    const listFiltered = changePage(currentPage, numberItensPer, listItens)
    return listFiltered.map((item) => (
      <div key={`highlights_courses_${item.id}`} className="col-12 col-sm-4 col-md-3">
        <Card link={`${router.asPath}/${item.id}`} styleCustom={{ minHeight: 200 }}>
          <div className="card-header" style={{ minHeight: 74 }}>
            <div className="d-flex">
              <div className="ml-0">
                <p className="h5 text-primary-default mb-0 ellipsis-2">{item.title}</p>
              </div>
              <div className="ml-auto">
                <button className="br-button circle" type="button" aria-label="Ícone ilustrativo">
                  <i className="fas fa-arrow-right" aria-hidden="true" style={{ transform: 'rotate(-45deg)' }} />
                </button>
              </div>
            </div>
          </div>
          <div className="card-content" style={{ minHeight: 95, display: 'flex', alignItems: 'center' }}>
            <p className="ellipsis-3 contrast-ignore-bg text-dark" dangerouslySetInnerHTML={{ __html: item.summary }} />
          </div>
        </Card>
      </div>
    ));
  }

  function cardsHighlights() {
    if (listItens) {
      return (
        <>
          <div className="presentation-page row py-2 mx-0">
            <div className="details-titles">
              <span className="px-2 h6">{`${titulo} em Destaque`}</span>
            </div>
          </div>
          <div className="row mt-4 mb-4">{itensHighlights()}</div>
          <Pagination
            id={'listProjects'}
            translations={translations}
            countItensPerPage={numberItensPer}
            countCurrentPage={currentPage}
            setNumberItensPer={setNumberItensPer}
            setCurrentPage={setCurrentPage}
            useFormProps={{
              watch,
              setValue,
              register
            }}
            count={listItens?.length}
          />
        </>
      );
    }
  }

  return (
    <div className={'mb-5'}>
      <div className="row mt-3 mb-3 presentation-page contrast-ignore-bg">
        <div className="col-12 col-sm-2 img__page my-2">
          <div className={`contrast-ignore-bg img__page-${typeToClass(titulo)}`} />
        </div>
        <div className="col-12 col-sm-9 contrast-ignore-bg">
          <div className={"contrast-ignore-bg"}>
            <p className="text-primary-default h2 text-bold contrast-ignore-bg">{titulo}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
      {cardsHighlights()}
    </div>
  );
};

export default PresentationPage;
