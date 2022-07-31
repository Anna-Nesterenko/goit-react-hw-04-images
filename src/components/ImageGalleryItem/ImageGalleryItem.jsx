import styled from 'styled-components';

const ImageGalleryItem = ({ webformatURL }) => {
  return (
    <PhotoCard>
      <div>
        <Picture src={webformatURL} alt={webformatURL} />
      </div>
    </PhotoCard>
  );
};
export default ImageGalleryItem;

const PhotoCard = styled.li`
  display: grid;

  & > div {
    width: 100%;
    display: inline-block;
    overflow: hidden;
  }
`;

const Picture = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
