import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useRegister from '@hooks/page/useRegister';
import RegisterAddress from 'api/RegisterAddress';
import axios from 'axios';

interface ButtonProps {
  selected: boolean;
}

const accommodationType = ['전체', '호텔 리조트', '독채', '풀빌라', '펜션'];
const facility = [
  '편의점',
  '공용 수영장',
  '바비큐',
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
  '미끄럼 방지 바닥',
  '펜스 설치 공간',
  '돌봄 서비스',
  '펫 푸드 제공',
  '인근 동물병원',
];
const allowPet = ['소형견', '중형견', '대형견', '고양이'];

const Accommodation = ({
  mode,
  accommodationId,
}: {
  mode: 'create' | 'edit';
  accommodationId?: string;
}) => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [addressObj, setAddressObj] = useState({
    areaAddress: '',
    townAddress: '',
  });
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState<
    string[]
  >([]);

  const {
    selectedRegister: selectedAccommodationType,
    toggleRegister: selectAccommodationType,
  } = useRegister<string>();
  const { selectedRegister: selectedFacility, toggleRegister: selectFacility } =
    useRegister<string>();
  const {
    selectedRegister: selectedPetFacility,
    toggleRegister: selectPetFacility,
  } = useRegister<string>();
  const { selectedRegister: selectedAllowPet, toggleRegister: selectAllowPet } =
    useRegister<string>();

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.value.length <= 2000) {
      setDescription(e.target.value);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
      <OptionSelectorWrapper>
        {options.map((option) => (
          <CheckInput
            key={option}
            selected={selectedOptions.includes(option)}
            onClick={() => onSelect(option)}
          >
            {option}
          </CheckInput>
        ))}
      </OptionSelectorWrapper>
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
    }
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
      } else {
        alert('최대 3개의 이미지만 업로드 가능합니다.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('type', selectedAccommodationType[0]);
    formData.append(
      'address',
      `${addressObj.areaAddress} ${addressObj.townAddress}`,
    );
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
      axios
        .get(`/api/v1/hosts/accommodations/${accommodationId}`)
        .then((response) => {
          const accommodation = response.data;
          setName(accommodation.name);
          setDescription(accommodation.description);
          setAddressObj({
            areaAddress: accommodation.address.area,
            townAddress: accommodation.address.town,
          });
          setLatitude(accommodation.latitude);
          setLongitude(accommodation.longitude);
          setThumbnailPreview(accommodation.thumbnail);
          setAdditionalImagesPreview(accommodation.additionalImages);
        })
        .catch((error) => {
          console.error('Failed to fetch accommodation data:', error);
        });
    }
  }, [mode, accommodationId]);

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset>
        <Label>숙소명</Label>
        <Input
          type="text"
          placeholder="숙소명을 입력해주세요"
          value={name}
          onChange={handleNameChange}
        />

        <Label>설명</Label>
        <DescriptionWrapper>
          <InputExplain
            placeholder="숙소 설명을 작성해주세요"
            value={description}
            onChange={handleDescriptionChange}
            maxLength={2000}
          />
          <CharacterCount>{description.length}/2000</CharacterCount>
        </DescriptionWrapper>

        <Label>주소</Label>
        <RegisterAddress
          setAddressObj={setAddressObj}
          postcodeScriptUrl={POSTCODE_SCRIPT_URL}
        />
        <InputAddress
          type="text"
          value={`${addressObj.areaAddress} ${addressObj.townAddress}`}
          onClick={handleAddressClick}
          readOnly
        />
        <InputAddress
          type="text"
          placeholder="상세주소를 입력해주세요"
          value={detailedAddress}
          onChange={handleDetailAddress}
        />

        <Label>숙소 유형</Label>
        <OptionSelector
          options={accommodationType}
          selectedOptions={selectedAccommodationType}
          onSelect={selectAccommodationType}
        />

        <Label>허용 반려동물</Label>
        <OptionSelector
          options={allowPet}
          selectedOptions={selectedAllowPet}
          onSelect={selectAllowPet}
        />

        <Label>편의시설</Label>
        <OptionSelector
          options={facility}
          selectedOptions={selectedFacility}
          onSelect={selectFacility}
        />

        <Label>반려동물 편의시설</Label>
        <OptionSelector
          options={petFacility}
          selectedOptions={selectedPetFacility}
          onSelect={selectPetFacility}
        />

        <LabelFile>대표이미지</LabelFile>
        <InputFile
          type="file"
          onChange={handleThumbnailChange}
          accept="image/jpeg,image/jpg,image/png"
        />
        {thumbnailPreview && (
          <ImagePreviewWrapper>
            <img src={thumbnailPreview} alt="Thumbnail Preview" />
          </ImagePreviewWrapper>
        )}

        <LabelFile>이미지</LabelFile>
        <InputFile
          type="file"
          multiple
          onChange={handleAdditionalImagesChange}
          accept="image/jpeg,image/jpg,image/png"
        />

        {additionalImagesPreview.length > 0 && (
          <PreviewWrapper>
            {additionalImagesPreview.map((preview, index) => (
              <ImagePreviewWrapper key={index}>
                <img src={preview} alt={`Additional preview ${index}`} />
              </ImagePreviewWrapper>
            ))}
          </PreviewWrapper>
        )}

        <Button type="submit">
          {mode === 'create' ? '등록하기' : '수정하기'}
        </Button>
      </Fieldset>
    </form>
  );
};

export default Accommodation;

const Fieldset = styled.fieldset`
  font-family: 'Noto Sans KR';
  padding: 16px;
  border: none;
  display: flex;
  flex-direction: column;
`;

const OptionSelectorWrapper = styled.div`
  margin-bottom: 8px;
`;

// 선택 버튼
const CheckInput = styled.button<ButtonProps>`
  background-color: #fff;
  border: 1px solid ${(props) => (props.selected ? '#f03e5e' : '#ccc')};
  color: black;
  padding: 7px 10px;
  margin-bottom: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 20px;
`;

const Label = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 1rem;
  margin: 10px 0;
`;

const LabelFile = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 1rem;
  margin-top: 20px;
  padding-bottom: 10px;
`;

const Input = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`;

const DescriptionWrapper = styled.div`
  position: relative;
`;

const InputExplain = styled.textarea`
  font-family: 'Noto Sans KR';
  width: 100%;
  height: 100px;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  overflow-y: auto;
`;

const InputAddress = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  padding: 8px;
  margin-bottom: 7px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`;

const CharacterCount = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 0.875rem;
  color: #6b7280;
`;

const Button = styled.button`
  background-color: var(--sub-color);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: auto;
  &:hover {
    background-color: var(--sub-color);
    border: 1px solid #f03e5e;
  }
`;

const ImagePreviewWrapper = styled.div`
  margin-top: 10px;
  width: 50%;
  height: 150px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 10px;
  justify-content: flex-start;
`;

const InputFile = styled.input`
  border: 1px solid #ccc;
  width: 60%;
  padding: 2px;
`;
