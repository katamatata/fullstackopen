import styled from 'styled-components';

const Message = styled.div`
  background: rgb(238, 236, 236);
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const ErrorMessage = styled(Message)`
  color: red;
`;

export const SuccessMessage = styled(Message)`
  color: green;
`;
