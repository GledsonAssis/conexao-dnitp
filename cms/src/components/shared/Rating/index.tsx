import React, { useEffect, useState } from 'react';

interface StateProps {}
interface DispatchProps {}
interface OwnProps {
  nElement: number;
  value?: number;
  readonly?: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

interface StarItensProps {
  lValue: any;
  uValue: any;
  defaultValue?: number;
  icon?: any;
  disabled?: boolean;
}

export const StarRatingElement: React.FC<StarItensProps> = ({
  lValue,
  uValue,
  defaultValue,
  icon,
  disabled = false,
}) => {
  function renderIcon() {
    if (!icon) {
      return <i className="rating__icon rating__icon--star fa fa-star" />;
    }
    return icon;
  }

  return (
    <>
      <label aria-label={`${lValue} stars`} className="rating__label rating__label--half" htmlFor={`rating2-${lValue}`}>
        <div style={{ width: '50%' }}>{renderIcon()}</div>
      </label>
      <input className="rating__input" name="rating2" id={`rating2-${lValue}`} value={`${lValue}`} type="radio" />
      <label
        aria-label={`${uValue} stars`}
        className="rating__label rating__label--half--left"
        htmlFor={`rating2-${uValue}`}
      >
        <div style={{ width: '50%' }}>{renderIcon()}</div>
      </label>
      <input className="rating__input" name="rating2" id={`rating2-${uValue}`} value={`${uValue}`} type="radio" />
    </>
  );
};

export const StarRating: React.FC<Props> = ({ nElement, value = 0, readonly }) => {
  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState(value);
  const [defaultIcon, setDefaultIcon] = useState(<i className="fa fa-star" />);

  function render() {
    return [...Array(nElement)].map((star, index) => {
      const lValue = index + 0.5;
      const uValue = index + 1;
      return <StarRatingElement key={`${lValue}_stars`} lValue={lValue} uValue={uValue} />;
    });
  }
  return (
    <div id="half-stars-example">
      <div className="rating-group">
        <label aria-label="0 stars" className="rating__label" htmlFor="rating2-0">
          &nbsp;
        </label>
        <input
          className="rating__input rating__input--none"
          defaultChecked
          name="rating2"
          id="rating2-0"
          value="0"
          type="radio"
        />
        {render()}
      </div>
    </div>
  );
};

export default StarRating;
