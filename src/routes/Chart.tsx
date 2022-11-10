import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

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

interface ChartProps {
  coinId: string | undefined;
}

interface ICandleChartItem {
  x: Date;
  y: number[];
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      //refetchInterval 옵션을 사용하면 밀리세컨드 단위로 data를 fetch한다.
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        // <ApexChart
        //   type="line"
        //   series={[
        //     {
        //       name: "Price",
        //       data: data?.map((price) => price.close) ?? [],
        //     },
        //   ]}
        //   options={{
        //     theme: {
        //       mode: "dark",
        //     },
        //     chart: {
        //       height: 300,
        //       width: 500,
        //       toolbar: {
        //         show: false,
        //       },
        //       background: "transparent",
        //     },
        //     grid: { show: false },
        //     stroke: {
        //       curve: "smooth",
        //       width: 4,
        //     },
        //     yaxis: {
        //       show: false,
        //     },
        //     xaxis: {
        //       axisBorder: { show: false },
        //       axisTicks: { show: false },
        //       labels: { show: false },
        //       type: "datetime",
        //       categories: data?.map((price) =>
        //         new Date(price.time_close * 1000).toUTCString()
        //       ),
        //     },
        //     fill: {
        //       type: "gradient",
        //       gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
        //     },
        //     colors: ["#0fbcf9"],
        //     tooltip: {
        //       y: {
        //         //to.Fixed함수는 원하는 자리까지 소수점을 잘라주고 반올림 해준다.
        //         formatter: (value) => `$${value.toFixed(2)}`,
        //       },
        //     },
        //   }}
        // />
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => {
                return {
                  x: new Date(price.time_close * 1000),
                  y: [price.open, price.high, price.low, price.close],
                };
              }) as ICandleChartItem[],
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#ff009d",
                  downward: "#0be881",
                },
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
