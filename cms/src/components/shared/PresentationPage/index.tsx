import React from 'react';
import { useRouter } from 'next/router';
import SecundaryCard from '../SecundaryCard';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  titulo: string;
  description: string;
  iconCampaign?: any;
  listItens?: any[];
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

const PresentationPage: React.FC<Props> = ({ titulo, description, listItens }) => {
  const router = useRouter();

  function itensHighlights() {
    return listItens.map((item) => (
      <div key={`hilights_courses_${item.id}`} className="col-12 col-md-4">
        <SecundaryCard title={item.title} description={item.summary} baseUrl={`${router.asPath}`} id={`${item.id}`} />
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
        </>
      );
    }
  }

  return (
    <>
      <div className="row mt-3 mb-3 presentation-page contrast-ignore-bg">
        <div className="col-12 col-md-4 img__page my-2">
          <div className={`contrast-ignore-bg img__page-${typeToClass(titulo)}`} />
        </div>
        <div className="col-12 col-md-8 contrast-ignore-bg">
          <div className={"contrast-ignore-bg"}>
            <p className="text-primary-default h2 text-bold contrast-ignore-bg">{titulo}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
      {cardsHighlights()}
    </>
  );
};

export default PresentationPage;
