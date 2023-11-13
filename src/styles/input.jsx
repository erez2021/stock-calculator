import styled from "styled-components";

const StyledInput = styled.input`
  padding: 5px 2px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  direction: ${(props) => (props.lang === "en" ? "ltr" : "rtl")};
`;

export default StyledInput;
