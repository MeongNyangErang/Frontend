import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

interface RegisterAddressProps {
  setAddressObj: (address: {
    areaAddress: string;
    townAddress: string;
  }) => void;
  postcodeScriptUrl: string;
}

const RegisterAddress: React.FC<RegisterAddressProps> = ({
  setAddressObj,
  postcodeScriptUrl,
}) => {
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let localAddress = data.sido + ' ' + data.sigungu;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }

      fullAddress = fullAddress.replace(localAddress, '');

      setAddressObj({
        areaAddress: localAddress,
        townAddress: (fullAddress +=
          extraAddress !== '' ? `(${extraAddress})` : ''),
      });
    }
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button
      type="button"
      id="addressButton"
      style={{ display: 'none' }}
      onClick={handleClick}
    >
      주소찾기
    </button>
  );
};

export default RegisterAddress;
