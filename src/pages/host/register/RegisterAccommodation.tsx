import React, { useState, useEffect } from 'react';
import useHostRegister from '@hooks/page/useHostRegister';
import RegisterAddress from 'api/RegisterAddress';
import axios from 'axios';
import styled from 'styled-components';
import Header from '@components/common/RegisterHeader/index';
import { IoCloudUploadOutline } from 'react-icons/io5';
import {
  SSFieldset,
  SSOptionSelectorWrapper,
  SSButton,
  SSLabel,
  SSInput,
  SSLabelFile,
  SSDescriptionWrapper,
  SSInputExplain,
  SSCharacterCount,
  SSImagePreviewWrapper,
  SSInputFile,
  SSInputAddress,
  SSPreviewWrapper,
  SErrorMessage,
  ButtonContainer,
  SSUploadContainer,
} from './styles';

interface ButtonProps {
  selected: boolean;
}

const facility = [
  '편의점',
  '공용 수영장',
  '공용 바비큐',
  '피트니스',
  '노래방',
  '와이파이',
  '무료 주차',
  '유료 주차',
  '조식',
  '픽업 서비스',
  '족구장',
];
const petFacility = [
  '대형 운동장',
  '전용 마당',
  '놀이터',
  '샤워장',
  '수영장',
  '펜스 설치 공간',
  '돌봄 서비스',
  '펫 푸드 제공',
  '인근 동물병원',
];
const allowPet = ['소형견', '중형견', '대형견', '고양이'];

const RegisterAccommodation = ({
  mode,
  accommodationId,
}: {
  mode: 'create' | 'edit';
  accommodationId?: string;
}) => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [address, setAddress] = useState({
    areaAddress: '',
    townAddress: '',
  });
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [accommodationType, setAccommodationType] = useState<string | null>(
    null,
  );
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState<
    string[]
  >([]);
  const { selectedRegister: selectedFacility, toggleRegister: selectFacility } =
    useHostRegister();
  const {
    selectedRegister: selectedPetFacility,
    toggleRegister: selectPetFacility,
  } = useHostRegister();
  const { selectedRegister: selectedAllowPet, toggleRegister: selectAllowPet } =
    useHostRegister();
  const [errorMessage, setErrorMessage] = useState('');
  const [thumbnailImageUploaded, setThumbnailImageUploaded] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.value.length <= 2000) {
      setDescription(e.target.value);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const regex = /^[a-zA-Z0-9가-힣()]*$/;
    if (regex.test(newName)) {
      setName(newName);
      setErrorMessage('');
    } else {
      setErrorMessage('한글, 알파벳, 숫자만 입력할 수 있습니다.');
    }
  };

  const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailedAddress(e.target.value);
  };

  const POSTCODE_SCRIPT_URL =
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  const handleAddressClick = () => {
    document.getElementById('addressButton')?.click();
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const OptionSelector = ({
    options,
    selectedOptions,
    onSelect,
  }: {
    options: string[];
    selectedOptions: string[];
    onSelect: (option: string) => void;
  }) => {
    return (
      <SSOptionSelectorWrapper>
        {options.map((option) => (
          <CheckInput
            key={option}
            selected={selectedOptions.includes(option)}
            onClick={() => onSelect(option)}
          >
            {option}
          </CheckInput>
        ))}
      </SSOptionSelectorWrapper>
    );
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setThumbnail(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setThumbnailImageUploaded(true);
    }
  };

  const handleClick = (value: string) => {
    setAccommodationType(value);
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (additionalImages.length + files.length <= 3) {
        setAdditionalImages((prevImages) => [...prevImages, ...files]);

        const newPreviews = files.map((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setAdditionalImagesPreview((prev) => [
              ...prev,
              reader.result as string,
            ]);
          };
          reader.readAsDataURL(file);
          return reader.result as string;
        });
        setImageUploaded(true);
      } else {
        alert('최대 3개의 이미지만 업로드 가능합니다.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description) {
      alert('숙소 정보를 입력해주세요.');
      return;
    }
    if (!detailedAddress) {
      alert('상세주소를 입력해주세요.');
      return;
    }

    if (!thumbnail) {
      alert('대표이미지는 필수입니다.');
      return;
    }

    if (
      selectedFacility.length === 0 ||
      selectedPetFacility.length === 0 ||
      selectedAllowPet.length === 0
    ) {
      alert('허용 반려동물, 시설은 최소 1개 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', accommodationType || '');
    formData.append('address', `${address.areaAddress} ${address.townAddress}`);
    formData.append('detailedAddress', detailedAddress);
    formData.append('description', description);
    formData.append('latitude', latitude?.toString() || '');
    formData.append('longitude', longitude?.toString() || '');
    formData.append('facilityTypes', JSON.stringify(selectedFacility));
    formData.append('petFacilityTypes', JSON.stringify(selectedPetFacility));
    formData.append('allowPetTypes', JSON.stringify(selectedAllowPet));

    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    additionalImages.forEach((image, index) => {
      formData.append(`additionalImages[${index}]`, image);
    });

    try {
      let response;
      if (mode === 'create') {
        response = await axios.post('/api/v1/hosts/accommodations', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else if (mode === 'edit' && accommodationId) {
        response = await axios.put(
          `/api/v1/hosts/accommodations/${accommodationId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
      }

      if (response?.status === 200) {
        console.log('API Response:', response.data);
      } else {
        alert('숙소 등록/수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('An error occurred while making the API call:', error);
    }
  };

  // 숙소 수정
  useEffect(() => {
    if (mode === 'edit' && accommodationId) {
      const fetchAccommodationData = async () => {
        try {
          const response = await axios.get(
            `/api/v1/hosts/accommodations/${accommodationId}`,
          );
          const accommodation = response.data;

          setName(accommodation.name);
          setAccommodationType(accommodation.type);
          setDescription(accommodation.description || '');
          setAddress({
            areaAddress: accommodation.address.area,
            townAddress: accommodation.address.town,
          });
          setDetailedAddress(accommodation.detailedAddress || '');
          setLatitude(accommodation.latitude);
          setLongitude(accommodation.longitude);
          setThumbnailPreview(accommodation.thumbnail);
          setAdditionalImagesPreview(accommodation.additionalImages || []);
          selectFacility(accommodation.facilityTypes || []);
          selectPetFacility(accommodation.petFacilityTypes || []);
          selectAllowPet(accommodation.allowPetTypes || []);
          if (accommodation.thumbnail) {
            setThumbnail(accommodation.thumbnail);
          }

          if (accommodation.additionalImages) {
            setAdditionalImages(accommodation.additionalImages);
          }
        } catch (error) {
          console.error('Failed to fetch accommodation data:', error);
          alert('숙소 데이터를 불러오는 데 실패했습니다.');
        }
      };
      fetchAccommodationData();
    }
  }, [
    mode,
    accommodationId,
    selectFacility,
    selectPetFacility,
    selectAllowPet,
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <SSFieldset>
        <Header title="숙소 등록" />
        <SSLabel>숙소명</SSLabel>
        <SSInput
          type="text"
          placeholder="숙소명을 입력해주세요"
          value={name}
          onChange={handleNameChange}
        />
        {errorMessage && <SErrorMessage>{errorMessage}</SErrorMessage>}
        <SSLabel>설명</SSLabel>
        <SSDescriptionWrapper>
          <SSInputExplain
            placeholder="숙소 설명을 작성해주세요"
            value={description}
            onChange={handleDescriptionChange}
            maxLength={2000}
          />
          <SSCharacterCount>{description.length}/2000</SSCharacterCount>
        </SSDescriptionWrapper>
        <SSLabel>주소</SSLabel>
        <RegisterAddress
          setAddress={setAddress}
          postcodeScriptUrl={POSTCODE_SCRIPT_URL}
        />
        <SSInputAddress
          type="text"
          value={`${address.areaAddress} ${address.townAddress}`}
          onClick={handleAddressClick}
          readOnly
        />
        <SSInputAddress
          type="text"
          placeholder="상세주소를 입력해주세요"
          value={detailedAddress}
          onChange={handleDetailAddress}
        />
        <SSLabel>숙소 유형</SSLabel>
        <ButtonContainer>
          <CheckInput
            selected={accommodationType === '호텔 리조트'}
            onClick={() => handleClick('호텔 리조트')}
          >
            호텔 리조트
          </CheckInput>
          <CheckInput
            selected={accommodationType === '독채'}
            onClick={() => handleClick('독채')}
          >
            독채
          </CheckInput>
          <CheckInput
            selected={accommodationType === '풀빌라'}
            onClick={() => handleClick('풀빌라')}
          >
            풀빌라
          </CheckInput>
          <CheckInput
            selected={accommodationType === '펜션'}
            onClick={() => handleClick('펜션')}
          >
            펜션
          </CheckInput>
        </ButtonContainer>
        <SSLabel>허용 반려동물</SSLabel>
        <OptionSelector
          options={allowPet}
          selectedOptions={selectedAllowPet}
          onSelect={selectAllowPet}
        />
        <SSLabel>편의시설</SSLabel>
        <OptionSelector
          options={facility}
          selectedOptions={selectedFacility}
          onSelect={selectFacility}
        />
        <SSLabel>반려동물 편의시설</SSLabel>
        <OptionSelector
          options={petFacility}
          selectedOptions={selectedPetFacility}
          onSelect={selectPetFacility}
        />
        <SSLabelFile>대표이미지</SSLabelFile>
        {!thumbnailImageUploaded && (
          <SSUploadContainer htmlFor="thumbnail-upload">
            <UploadIcon />
            이미지 업로드
          </SSUploadContainer>
        )}
        <SSInputFile
          id="thumbnail-upload"
          type="file"
          onChange={handleThumbnailChange}
          accept="image/jpeg,image/jpg,image/png"
        />
        {thumbnailPreview && (
          <SSImagePreviewWrapper>
            <img src={thumbnailPreview} alt="Thumbnail Preview" />
          </SSImagePreviewWrapper>
        )}

        <SSLabelFile>이미지</SSLabelFile>
        {!imageUploaded && (
          <SSUploadContainer htmlFor="image-upload">
            <UploadIcon />
            이미지 업로드
          </SSUploadContainer>
        )}
        <SSInputFile
          id="image-upload"
          type="file"
          multiple
          onChange={handleAdditionalImagesChange}
          accept="image/jpeg,image/jpg,image/png"
        />
        {additionalImagesPreview.length > 0 && (
          <SSPreviewWrapper>
            {additionalImagesPreview.map((preview, index) => (
              <SSImagePreviewWrapper key={index}>
                <img src={preview} alt={`Additional preview ${index}`} />
              </SSImagePreviewWrapper>
            ))}
          </SSPreviewWrapper>
        )}
        <SSButton type="submit">
          {mode === 'create' ? '등록하기' : '수정하기'}
        </SSButton>
      </SSFieldset>
    </form>
  );
};

export default RegisterAccommodation;

const CheckInput = styled.button<ButtonProps>`
  background-color: #fff;
  border: 1px solid ${(props) => (props.selected ? '#f03e5e' : '#ccc')};
  color: var(--gray-600);
  padding: 7px 10px;
  margin-bottom: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 20px;
`;

const UploadIcon = styled(IoCloudUploadOutline)`
  font-size: 30px;
  color: var(--gray-600);
  margin-bottom: 5px;
`;
