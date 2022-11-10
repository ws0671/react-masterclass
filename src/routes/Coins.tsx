import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { useRecoilState } from "recoil";
import { themeAtom } from "../recoil_state";

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
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  /* color: ${(props) => props.theme.textColor}; */
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Toggle = styled.button`
  padding: 10px 20px;
  position: fixed;
  right: 40px;
  bottom: 25px;
  font-size: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 0 5px 10px 3px rgba(0, 0, 0, 0.3);
  border: 0;
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const Loader = styled.span`
  text-align: center;
  display: block;
`;

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const [mode, setMode] = useRecoilState(themeAtom);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              {/* Link컴포넌트는 state 속성에 정보를 담아 보낼 수 있다. */}
              <Link to={`/${coin.id}`} state={coin}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
      <Toggle
        onClick={() => {
          setMode(!mode);
        }}
      >
        {mode ? "🌝" : "🌚"}
      </Toggle>
    </Container>
  );
}
export default Coins;
