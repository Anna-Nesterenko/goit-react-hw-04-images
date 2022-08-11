import { Hearts } from 'react-loader-spinner';
import styled from 'styled-components';

export const Loader = () => {
  return (
    <HeartsWrapper>
      <Hearts height="120" width="120" radius={15} color="#e06666" />
    </HeartsWrapper>
  );
};

const HeartsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
