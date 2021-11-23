import React, { FC, useEffect, useState } from 'react';
import noImage from '@/assets/images/default-image.svg';
import Zoom from './Zoom';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  images: any[];
}

type Props = StateProps & DispatchProps & OwnProps;

export const Galery: FC<Props> = ({ images = [] }) => {
  // const selectedImage = images.length > 0 ? images[0].uri : noImage;
  const heightClass = images.length > 1 ? 'multi' : 'single';

  const [StGallery, setStGallery] = useState(false);
  const [SelectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(noImage);

  useEffect(() => {
    if (images.length) {
      setSelectedImage(images[0].uri)
    }
  }, [images.length])

  function renderImage(image: any, index: number) {
    const borderSelected = index === SelectedIndex ? 'border-selected' : 'border';
    return (
      <li key={index} className={borderSelected} role="presentation">
        <div className="picture">
          <img alt="" src={image.uri} onClick={() => {
            setSelectedImage(image.uri)
            setSelectedIndex(index)
          }} />
        </div>
      </li>
    );
  }

  return (
    <>
      <div className="square">
        <div className="br-gallery-cstom">
          <div className={`box selected-image ${heightClass}`} role="presentation">
            <div className="zoom-in position-absolute" style={{ top: 5, right: 5 }} role="presentation">
              <i className="fas fa-search text-white" role="presentation" />
            </div>
            <img src={selectedImage} alt="img-galley-1" onClick={() => setStGallery(true)} />
          </div>
          {images.length > 1 && (
            <div className="thumbnails">
              <ul>{images.map(renderImage)}</ul>
            </div>
          )}
        </div>
      </div>
      {images.length && StGallery &&
        <Zoom
          imageZoomSrc={selectedImage}
          onClickImageZoomHide={() => setStGallery(false)}
        />
      }
    </>
  );
};

export default Galery;
