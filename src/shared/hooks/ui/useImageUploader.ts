import { useCallback, useMemo, useState } from 'react';
import { InitialImage } from '@typings/textImageForm';

const useImageUploader = (
  maxCount: number,
  initialImageList: (InitialImage | string)[] | undefined = undefined,
) => {
  const [initialImages, setInitialImages] = useState(
    initialImageList ? [...initialImageList] : [],
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [removedImages, setRemovedImages] = useState<number[]>([]);

  const images = useMemo(() => {
    return [...initialImages, ...newImages];
  }, [initialImages, newImages]);

  const onAddImage = useCallback(
    (file: File) => {
      if (images.length >= maxCount) return;
      setNewImages((prev) => [...prev, file]);
    },
    [images],
  );

  const onRemoveImage = useCallback(
    (index: number) => {
      const imageToRemove = images[index];
      if (imageToRemove instanceof File) {
        const realIndex = index - initialImages.length;
        setNewImages((prev) => prev.filter((_, i) => i !== realIndex));
      } else {
        setInitialImages((prev) => prev.filter((_, i) => i !== index));
        if (typeof imageToRemove !== 'string') {
          setRemovedImages((prev) => [...prev, imageToRemove.imageId]);
        }
      }
    },
    [images, initialImages],
  );

  return { images, newImages, removedImages, onAddImage, onRemoveImage };
};

export default useImageUploader;
