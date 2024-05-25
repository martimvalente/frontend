import React, { useState, useEffect } from "react";
import axios from "axios";

const NextRain = ({ apiKey, city }) => {
  const [nextRain, setNextRain] = useState(null);
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
        const nextRainTime = findNextRain(response.data.list);
        setNextRain(nextRainTime);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchForecast();
  }, [apiKey, city]);

  const findNextRain = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].rain && data[i].rain["3h"] > 0) {
        return data[i].dt_txt;
      }
    }
    return "Nenhuma precipitação esperada durante os próximos 5 dias";
  };

  if (loading)
    return <div className="text-center text-gray-500"><span className="loading loading-infinity loading-lg"></span></div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full max-w-md mx-auto my-8 bg-white rounded-xl overflow-hidden shadow-md">
      <div className="px-4 py-2 bg-gray-200">
        <h2 className="text-lg font-bold">Previsão de Próxima Chuva</h2>
      </div>
      <div className="flex items-center px-4 py-2">
        <p className="text-lg">{nextRain}</p>
      </div>
    </div>
  );
};

export default NextRain;
