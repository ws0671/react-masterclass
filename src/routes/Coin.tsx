import { useParams, useLocation } from "react-router";
import { useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<"coinId">();
  // Link 컴포넌트에서 전송한 state를 받으려면 useLocation훅을 사용한다.
  const { state } = useLocation();

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}
export default Coin;
