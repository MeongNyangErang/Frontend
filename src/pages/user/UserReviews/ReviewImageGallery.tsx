import { useState } from 'react';
import { UserReveiwImage } from '@typings/review';
import useToggleModal from '@hooks/ui/useToggleModal';
import { Dialog, Box } from '@mui/material';
import { SImagesBox } from './styles';

interface ReviewImageGalleryProps {
  images: UserReveiwImage[];
}

const ReviewImageGallery = ({ images }: ReviewImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState('');
  const { isModalOpen, closeModal, openModal } = useToggleModal();

  const handleClickImage = (url: string) => {
    setSelectedImage(url);
    openModal();
  };

  return (
    <>
      <SImagesBox>
        {images.map(({ imageUrl }, index) => (
          <div key={imageUrl} onClick={() => handleClickImage(imageUrl)}>
            <img src={imageUrl} alt={`리뷰이미지${index}`} />
          </div>
        ))}
      </SImagesBox>
      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="md">
        <Box
          component="img"
          src={selectedImage}
          alt="확대 이미지"
          sx={{ width: '100%', height: 'auto' }}
        />
      </Dialog>
    </>
  );
};

export default ReviewImageGallery;
