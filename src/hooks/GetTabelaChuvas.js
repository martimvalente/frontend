import React, { useState, useEffect } from "react";
import axios from "axios";

const TabelaChuvas = ({ apiKey, city }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast`,
          {
            params: {
              q: "Coimbra",
              units: "metric",
              appid: "189271b827844bff7388350c44848615",
            },
          }
        );
        const dailyForecast = processDailyForecast(response.data.list);
        setForecast(dailyForecast);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchForecast();
  }, [apiKey, city]);

  const processDailyForecast = (data) => {
    const dailyData = data.reduce((acc, curr) => {
      const date = new Date(curr.dt_txt).toLocaleDateString("en-GB", {
        weekday: "long",
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});

    return Object.keys(dailyData).map((day) => {
      const rain = dailyData[day].reduce((total, current) => {
        return (
          total + (current.rain && current.rain["3h"] ? current.rain["3h"] : 0)
        );
      }, 0);
      return { day, rain };
    });
  };

  if (loading) return <span className="loading loading-infinity loading-lg"></span>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full max-w-md mx-auto my-8 bg-white rounded-xl overflow-hidden shadow-md">
      <div className="px-4 py-2 bg-gray-200">
        <h2 className="text-lg font-bold">
          Tabela de Precipitação Semanal para: <b>Coimbra</b>
        </h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-t-2 border-neutral">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Dia da Semana</th>
                <th className="py-3 px-6 text-left">Precipitação (mm)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {forecast.map((dayForecast, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-6 text-left">{dayForecast.day}</td>
                  <td className="py-3 px-6 text-left">
                    {dayForecast.rain.toFixed(2)} mm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TabelaChuvas;
