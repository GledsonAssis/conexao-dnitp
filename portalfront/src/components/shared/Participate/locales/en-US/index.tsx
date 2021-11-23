/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import participateInfoImage from '@/assets/images/participate-info.svg';

class Participate extends PureComponent {

  render() {
    return (
      <>
        <div className="row contrast-ignore-bg mx-0">
          <div className="img__page col-auto py-3 pl-0">
            <div className="img__page-participate contrast-ignore-bg" style={{ width: 60, height: 60 }} />
          </div>
          <h2 className="text-primary-default">How to participate</h2>
        </div>
        <div className="mb-5">To join the educational network from NDTI, follow these steps:</div>
        <div className="row justify-content-md-center">
          <img src={participateInfoImage} />
        </div>
      </>
    );
  }
}

export default Participate;
