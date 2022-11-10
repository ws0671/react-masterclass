import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface IHistorical {
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface PriceProps {
  coinId: string | undefined;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      //refetchInterval 옵션을 사용하면 밀리세컨드 단위로 data를 fetch한다.
      refetchInterval: 10000,
    }
  );

  return (
    <>
      <div>open_price: {data?.[0].open}</div>
      <div>high_price: {data?.[0].high}</div>
      <div>low_price: {data?.[0].low}</div>
      <div>close_price: {data?.[0].close}</div>
    </>
  );
}

export default Price;
