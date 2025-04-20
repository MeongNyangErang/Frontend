import { fetchCall } from 'services/api';
import React, { useState, useEffect } from 'react';
import useHostRegister from '@hooks/page/useHostRegister';
import RegisterAddress from '@pages/host/HostRegister/RegisterAddress';
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
} from '@pages/host/HostRegister/styles';

interface ButtonProps {
  selected: boolean;
}

interface AccommodationResponse {
  accommodationId: string;
  name: string;
  type: string;
  description: string | null;
  address: string;
  detailedAddress: string | null;
  latitude: number | null;
  longitude: number | null;
  thumbnailUrl: string | null;
  additionalImageUrls: string[];
  facilityTypes: string[];
  petFacilityTypes: string[];
  allowPetTypes: string[];
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
  '놀이터',
  '샤워장',
  '드라이룸',
  '수영장',
  '펜스 설치 공간',
  '돌봄 서비스',
  '펫 푸드 제공',
  '인근 동물병원',
];
const allowPet = ['소형견', '중형견', '대형견', '고양이'];

const ACCOMMODATION_MAP = {
  '호텔 리조트': 'HOTEL_RESORT',
  풀빌라: 'FULL_VILLA',
  펜션: 'PENSION',
  독채: 'DETACHED_HOUSE',
};

type AccommodationType = keyof typeof ACCOMMODATION_MAP;

const RegisterAccommodation = () => {
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
  const [accommodationType, setAccommodationType] =
    useState<AccommodationType | null>(null);

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
  const [nameError, setNameError] = useState('');
  const [thumbnailImageUploaded, setThumbnailImageUploaded] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [accommodationId, setAccommodationId] = useState<string | null>(null);
  const [addressError, setAddressError] = useState('');
  const [infoError, setInfoError] = useState('');
  const [imageError, setImageError] = useState('');
  const [facilityError, setFacilityError] = useState('');

  const POSTCODE_SCRIPT_URL =
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const VITE_GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
  const geocodeAddress = async (address: string, apiKey: string) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
      const response = await axios.get(url);

      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        console.error('Geocoding failed:', response.data.status);
        return { lat: null, lng: null };
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      return { lat: null, lng: null };
    }
  };

  const handleAddressChange = async (newAddress: {
    areaAddress: string;
    townAddress: string;
  }) => {
    setAddress(newAddress);
    const fullAddress = `${newAddress.areaAddress} ${newAddress.townAddress}`;

    const { lat, lng } = await geocodeAddress(fullAddress, VITE_GEO_API_KEY);
    setLatitude(lat);
    setLongitude(lng);
    console.log(lat, lng);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.value.length <= 2000) {
      setDescription(e.target.value);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
  };

  const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailedAddress(e.target.value);
  };

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

  const handleClick = (value: AccommodationType) => {
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

    if (!name || !/^[가-힣a-zA-Z0-9\s]+$/.test(name)) {
      setNameError('한글, 알파벳, 숫자만 입력할 수 있습니다.');
    }

    if (!description) {
      setInfoError('숙소 설명을 입력해주세요.');
    } else {
      setInfoError('');
    }

    if (!detailedAddress) {
      setAddressError('주소를 입력해주세요.');
    } else {
      setAddressError('');

      if (
        selectedFacility.length === 0 ||
        selectedPetFacility.length === 0 ||
        selectedAllowPet.length === 0
      ) {
        setFacilityError('허용 반려동물, 시설은 최소 1개 선택해주세요.');
        return;
      }

      if (!thumbnail) {
        setImageError('대표이미지는 필수입니다.');
        return;
      }

      const FACILITY_TYPES = {
        '무료 주차': 'FREE_PARKING',
        노래방: 'KARAOKE_ROOM',
        피트니스: 'FITNESS',
        족구장: 'FOOT_VOLLEYBALL_COURT',
        주차장: 'PARKING_LOT',
        조식: 'BREAKFAST',
        '픽업 서비스': 'PICKUP',
        바베큐: 'BARBECUE',
        유료주차: 'PAID_PARKING',
        '공용 수영장': 'PUBLIC_SWIMMING_POOL',
        편의점: 'CONVENIENCE_STORE',
        와이파이: 'WIFI',
      };
      const PETFACILITY_TYPE = {
        샤워장: 'SHOWER_ROOM',
        '대형 운동장': 'EXERCISE_AREA',
        '돌봄 서비스': 'CARE_SERVICE',
        '인근 동물병원': 'NEARBY_HOSPITAL',
        '펜스 설치 공간': 'FENCE_AREA',
        '펫 푸드 제공': 'PET_FOOD',
        드라이룸: 'DRY_ROOM',
        놀이터: 'PLAYGROUND',
        수영장: 'SWIMMING_POOL',
      };

      const ALLOWPET_TYPES = {
        대형견: 'LARGE_DOG',
        중형견: 'MEDIUM_DOG',
        소형견: 'SMALL_DOG',
        고양이: 'CAT',
      };

      const data = {
        name,
        type: ACCOMMODATION_MAP[accommodationType!],
        address: `${address.areaAddress} ${address.townAddress}`,
        detailedAddress,
        description,
        latitude: latitude?.toString() || '',
        longitude: longitude?.toString() || '',
        facilityTypes: selectedFacility.map(
          (f) => FACILITY_TYPES[f as keyof typeof FACILITY_TYPES],
        ),
        petFacilityTypes: selectedPetFacility.map(
          (f) => PETFACILITY_TYPE[f as keyof typeof PETFACILITY_TYPE],
        ),
        allowPetTypes: selectedAllowPet.map(
          (p) => ALLOWPET_TYPES[p as keyof typeof ALLOWPET_TYPES],
        ),
      } as any;

      const formData = new FormData();

      if (accommodationId) {
        formData.append('newThumbnail', thumbnail);
        data['deletedImageUrls'] = [thumbnailPreview];
        if (additionalImages.length > 0) {
          additionalImages.forEach((image) => {
            formData.append('newAdditionalImages', image);
          });
        }
      } else {
        formData.append('thumbnail', thumbnail);
        if (additionalImages.length > 0) {
          additionalImages.forEach((image) => {
            formData.append('additionalImages', image);
          });
        }
      }

      const blob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });
      formData.append('request', blob);

      try {
        let response: AccommodationResponse;
        if (accommodationId) {
          response = await fetchCall(`/hosts/accommodations`, 'put', formData);
          alert('숙소 정보가 수정되었습니다.');
        } else {
          response = await fetchCall(`/hosts/accommodations`, 'post', formData);
          alert('숙소 정보가 등록되었습니다.');
          setAccommodationId(response.accommodationId);
        }
      } catch (error) {
        console.error('API를 불러오는데 오류가 발생했습니다:', error);
      }
    }
  };

  useEffect(() => {
    const fetchAccommodationData = async () => {
      try {
        const response: AccommodationResponse = await fetchCall(
          `/hosts/accommodations`,
          'get',
        );
        if (response) {
          const accommodation = response;
          setAccommodationId(accommodation.accommodationId);
          setName(accommodation.name);
          setAccommodationType(accommodation.type as AccommodationType);
          setDescription(accommodation.description || '');

          setAddress({
            areaAddress: accommodation.address,
            townAddress: '',
          });
          setDetailedAddress(accommodation.detailedAddress || '');
          setLatitude(accommodation.latitude);
          setLongitude(accommodation.longitude);
          setThumbnailPreview(accommodation.thumbnailUrl);
          setAdditionalImagesPreview(accommodation.additionalImageUrls || []);
          (accommodation.facilityTypes || []).forEach(selectFacility);
          (accommodation.petFacilityTypes || []).forEach(selectPetFacility);
          (accommodation.allowPetTypes || []).forEach(selectAllowPet);
          setRegistered(true);
        }
      } catch (error) {
        console.error('Failed to fetch accommodation data:', error);
        alert('숙소 데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchAccommodationData();
  }, []);

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
        {nameError && <SErrorMessage>{nameError}</SErrorMessage>}

        <SSLabel>설명</SSLabel>
        <SSDescriptionWrapper>
          <SSInputExplain
            placeholder="숙소 설명을 작성해주세요"
            value={description}
            onChange={handleDescriptionChange}
            maxLength={2000}
          />
          <SSCharacterCount>{description.length}/2000</SSCharacterCount>
          {infoError && <SErrorMessage>{infoError}</SErrorMessage>}
        </SSDescriptionWrapper>
        <SSLabel>주소</SSLabel>
        <RegisterAddress
          setAddress={handleAddressChange}
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
        {addressError && <SErrorMessage>{addressError}</SErrorMessage>}

        <SSLabel>숙소 유형</SSLabel>
        <ButtonContainer>
          <CheckInput
            selected={
              accommodationType === ('호텔 리조트' as AccommodationType)
            }
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
        {facilityError && <SErrorMessage>{facilityError}</SErrorMessage>}

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
        {imageError && <SErrorMessage>{imageError}</SErrorMessage>}

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
          {registered ? '수정하기' : '등록하기'}
        </SSButton>
      </SSFieldset>
    </form>
  );
};

export default RegisterAccommodation;

const CheckInput = styled.button<ButtonProps>`
  background-color: #fff;
  border: 1px solid ${(props) => (props.selected ? '#f03e5e' : '#ccc')};
  color: ${(props) => (props.selected ? '#f03e5e' : '#757575')};
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
