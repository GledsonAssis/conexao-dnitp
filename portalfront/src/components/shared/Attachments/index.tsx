import React from 'react';
import CustomIcons from '@/assets/icons';
import { Spotlight } from '@/components/shared/Spotlight';

interface Item {
  text: string;
  path: string | number;
}

interface ItensComponent {
  title: string;
  itens: Item[];
  handleDownload?: any;
}

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  itensList: ItensComponent[];
  icon?: any;
}

type Props = StateProps & DispatchProps & OwnProps;

export const Attachments: React.FC<Props> = ({ itensList, icon }) => (
  <Spotlight customClassName="secundary w-100 attachmentSpotlight mb-0">
    {icon || <img src={CustomIcons.iconAttachment} style={{ width: 30 }} className="mb-2" alt="AttachmentIcon" />}
    {itensList.map((row: ItensComponent, idx: number) => (
      <div key={`${row.title}_${idx}`} className="mb-2 ellipsis-1">
        <strong>{row.title}:</strong>
        <div className="row mx-0 bg-secundary">
          {row.itens.length > 0 &&
            row.itens.map((item) => (
              <span
                key={item.text}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => row.handleDownload(item.path)}
                className="col-12 clickable-item"
              >
                {item.text}
              </span>
            ))}
        </div>
      </div>
    ))}
  </Spotlight>
);
