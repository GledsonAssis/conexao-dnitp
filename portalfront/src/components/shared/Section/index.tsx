import React from 'react';

interface StateProps {}
interface DispatchProps {}
interface OwnProps {
  title: string;
  className?: string;
  options: any;
}

type Props = StateProps & DispatchProps & OwnProps;

export const Section: React.FC<Props> = ({ children, title, className, options }) => (
  <>
    <div className="presentation-page row py-2 mx-0">
      <div className="details-titles">
        <span className="px-2 h6">{title}</span>
      </div>
    </div>
    <div className={`section ${className}`}>
      <div className="section__header pb-1 row mx-0">{options}</div>
      <div className="section__content">{children}</div>
    </div>
  </>
);

export default Section;
