import React, { MouseEventHandler, PureComponent } from 'react';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  imageZoomSrc: string;
  onClickImageZoomHide: MouseEventHandler<HTMLDivElement>
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
          onClick={onClickImageZoomHide}
          role="presentation"
        />
        <div className="zoom-image">
          <i className="close-button fas fa-times" onClick={onClickImageZoomHide} role="presentation" />
          <img src={imageZoomSrc} alt="" />
        </div>
      </div>
    );
  }
}

export default Zoom;
