import React, { MouseEventHandler, PureComponent } from 'react';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  imageZoomSrc: string;
  onClickImageZoomHide: Function
}

type Props = StateProps & DispatchProps & OwnProps;

class Zoom extends PureComponent<Props> {
  render() {
    const {
      imageZoomSrc,
      onClickImageZoomHide,
    } = this.props;

    return (
      <div className="zoom__container">
        <div
          className="overlay"
          onClick={() => onClickImageZoomHide(false)}
          role="presentation"
        />
        <div className="zoom-image">
          <button className="close-button br-button secondary circle mt-3 mt-sm-1 ml-sm-3"
            onClick={() => onClickImageZoomHide(false)} type="button" aria-label="Ícone ilustrativo">
            <i className="fas fa-times" role="presentation" />
          </button>
          <img src={imageZoomSrc} alt="" />
        </div>
      </div>
    );
  }
}

export default Zoom;
