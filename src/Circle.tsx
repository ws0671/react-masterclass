import styled from "styled-components";
import { useState } from "react";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  // 이름뒤에?를 붙여서 optional로 만들어줌.(선택적인. 즉, 있어도되고 없어도 되는 값으로 만듦. 필수요소가 아니게됨.)
  borderColor?: string;
  text?: string;
}
// 밑에줄에 text='default text'는 js ES6문법으로, 기본값을 설정할때 사용한다.
function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
