import React, { Fragment } from 'react';
import Image from 'next/image';

// IMAGES
import staticImg from '@/assets/images';

const AppBar = () => {
  return (
    <Fragment>
      <div className="app-bar">
        <div className="app-bar__brand">
          <Image
            src={staticImg.BRAND_LOGO_LIGHT}
            alt="Jarvis Beacon Logo"
            layout={'fill'}
            objectFit={'contain'}
            className="app-bar__brand-logo"
            priority={true}
          />
        </div>

        <div className="app-bar__title fw-bold mgl-10">Beacon</div>
      </div>
    </Fragment>
  );
}

export { AppBar as default };