import { useState } from 'react';

import Image from 'components/MyImage';

type LightBoxType = {
  src: string;
  alt: string;
  zIndex?: number;
  onClose: () => void;
};

const LightBox = ({ src, alt, zIndex = 100, onClose }: LightBoxType) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen = () => {
    if (isOpen) {
      onClose();
    }

    setIsOpen(!isOpen);
  };

  return (
    <div onClick={toggleIsOpen}>
      {isOpen ? (
        <div
          onClick={toggleIsOpen}
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.7)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex,
          }}
        >
          <Image src={src} alt={alt} width={360} height={510} />
        </div>
      ) : null}
    </div>
  );
};

export default LightBox;
