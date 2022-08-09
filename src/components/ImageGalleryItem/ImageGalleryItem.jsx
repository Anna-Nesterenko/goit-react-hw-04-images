import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ tags, webformatURL, largeImageURL, onOpenImg }) => {
  return (
    <PhotoCard>
      <div>
        <Picture
          src={webformatURL}
          alt={tags}
          onClick={() => {
            onOpenImg(largeImageURL);
          }}
          loading="lazy"
        />
      </div>
    </PhotoCard>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onOpenImg: PropTypes.func.isRequired,
};

const PhotoCard = styled.li`
  display: grid;
  cursor: zoom-in;

  & > div {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    :hover {
    }
  }
`;

const Picture = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: opacity(90%);

  &:hover {
    transform: scale(1.05);
    transition: 0.3s ease-out;
    filter: none;
  }
`;
