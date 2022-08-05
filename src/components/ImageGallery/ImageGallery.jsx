import ImageGalleryItem from 'components/ImageGalleryItem';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImageGallery = ({ pictures, onImgClick }) => {
  //   console.log('onImgClick :>> ', onImgClick);
  return (
    <Gallery>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onOpenImg={onImgClick}
          tags={tags}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  onImgClick: PropTypes.func.isRequired,
};

const Gallery = styled.ul`
  margin: 75px auto 15px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, max-content));
  grid-gap: 20px;
`;
