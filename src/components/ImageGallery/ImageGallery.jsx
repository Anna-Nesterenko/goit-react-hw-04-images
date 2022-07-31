import ImageGalleryItem from 'components/ImageGalleryItem';
import styled from 'styled-components';

const ImageGallery = ({ pictures }) => {
  return (
    <Gallery>
      {pictures.map(({ id, webformatURL }) => (
        <ImageGalleryItem key={id} webformatURL={webformatURL} />
      ))}
    </Gallery>
  );
};

export default ImageGallery;

const Gallery = styled.ul`
  margin: 75px auto 15px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, max-content));
  grid-gap: 20px;
`;
