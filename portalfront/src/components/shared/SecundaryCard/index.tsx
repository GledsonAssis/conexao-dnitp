import React from 'react';
import Link from 'next/link';
import { Card } from '../Card';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  title: string;
  baseUrl: string;
  id: string;
  description: any;
}

type Props = StateProps & DispatchProps & OwnProps;

export const SecundaryCard: React.FC<Props> = ({ children, title, baseUrl, id, description }) => (
  <Link
    href={{
      pathname: `${baseUrl}/[id]`,
      query: { id },
    }}
    as={`${baseUrl}/${id}`}
  >
    <a>
      <Card customClass="br-card-square">
        <div className="p-2 card-content h-100 w-100 p-0 text-left" style={{ position: 'absolute' }}>
          <div className="h-100 w-100">
            <div className="d-flex">
              <div>
                <p className="h5 text-primary-default mb-0 ellipsis-2">{title}</p>
              </div>
              <div className="ml-auto">
                <button className="br-button circle" type="button" aria-label="Ícone ilustrativo">
                  <i className="fas fa-arrow-right" aria-hidden="true" style={{ transform: 'rotate(-45deg)' }} />
                </button>
              </div>
            </div>
            <div className="position-absolute m-0 p-2 contrast-ignore-bg" style={{
              top: '60%',
              left: 0,
              msTransform: 'translateY(-50%)',
              transform: 'translateY(-50%)'
            }} >
              <h6 className="ellipsis-3 mt-0 contrast-ignore-bg text-dark" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>
      </Card>
    </a>
  </Link>
);

export default SecundaryCard;
