import ImageGalleryItem from 'components/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export default function ImageGallery({
  fetchedImage,
  togleModal,
  takeLargeImgUrl,
}) {
  return (
    <Gallery>
      {fetchedImage.map(({ id, webformatURL, largeImageURL }, index) => (
        <ImageGalleryItem
          takeLargeImgUrl={takeLargeImgUrl}
          togleModal={togleModal}
          key={id + index}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
        />
      ))}
    </Gallery>
  );
}
