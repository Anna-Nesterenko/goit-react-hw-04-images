import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Button = ({ onClickNextPage }) => {

  return (
    <BtnWrapper>
      <LoadMore onClick={onClickNextPage}>Load more</LoadMore>
    </BtnWrapper>
  );
};

const BtnWrapper = styled.div`
  text-align: center;
  padding-bottom: 15px;
`;

const LoadMore = styled.button`
  font-size: 16;
  width: 120px;
  height: 40px;
  border: none;
  background: #e06666;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 1px 3px #0003, 0 1px 1px #00000024, 0 2px 1px -1px #0000001f;

  &:hover {
    background-color: #cc0000;
    box-shadow: 0 0 10px #e06666, 0 0 20px #cc0000, 0 0 40px #e06666;
  }
`;

Button.propTypes = {
  onClickNextPage: PropTypes.func.isRequired,
};
