import React from 'react';
import Link from 'next/link';
import noImage from '@/assets/images/default-image.svg';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  titulo?: string;
  srcImage?: any;
  link?: string;
  card: any;
  customClass?: string;
}

type Props = StateProps & DispatchProps & OwnProps;

function typeToClass(type: string) {
  switch (type) {
    case 'Curso':
      return 'courses';
    case 'Atividade':
      return 'activities';
    case 'Projeto':
      return 'projects';
    case 'Link Externo':
      return 'external-link';
    case 'Ação de Projeto':
      return 'project-actions';
    case 'Ação de Ativação':
      return 'actions';
    case 'Prática':
      return 'practice';
    default:
      return '';
  }
}

export const CustomCard: React.FC<Props> = ({
  children,
  titulo,
  srcImage,
  link,
  card,
  customClass = 'br-card-square',
}) => (
  <div className={`br-card ${customClass}`}>
    <Link href={link} as={`${link}`} prefetch>
      <a>
        <div className="card-content p-0 text-left custom-card">
          <div className="p-2 card-custom-header">
            <div className={`contrast-ignore-bg icon__card-${typeToClass(card.type)}`} />
            <span className="title h6">{titulo || 'Título'}</span>
          </div>
          <div className="img-sobreposta-pequena">
            <img src={srcImage || noImage} className="imag" alt={titulo} />
            <div className="nitf-basic-tile tile-content text-white">
              <h5 className="ellipsis-3">{children}</h5>
            </div>
          </div>
        </div>
      </a>
    </Link>
  </div>
);
