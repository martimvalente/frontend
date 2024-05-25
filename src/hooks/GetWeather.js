import React, { useState, useEffect } from "react";

function GetWeather() {
  const [cityName, setCityName] = useState("Coimbra");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=189271b827844bff7388350c44848615&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          setError(false); // Reset error state if successful response
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [cityName]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityName(inputText);
      setInputText("");
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md p-8">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching data</p>
        ) : (
          <>
            <h1 className="text-3xl font-semibold mb-4 text-center">
              {data.name}
            </h1>
            <div className="flex items-center justify-center mb-4">
              <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt=""
                className="mr-2"
                style={{ width: "100px", height: "100px" }}
              />
              <h2 className="text-xl">{data.weather[0].main}</h2>
            </div>

            <h1 className="text-4xl font-bold text-center mb-6">
              {data.main.temp.toFixed()} °C
            </h1>

            <div className="flex justify-between">
              <div className="box">
                <p className="text-gray-600">Humidity</p>
                <h1 className="text-lg font-bold">
                  {data.main.humidity.toFixed()}%
                </h1>
              </div>

              <div className="box">
                <p className="text-gray-600">Wind</p>
                <h1 className="text-lg font-bold">
                  {data.wind.speed.toFixed()} km/h
                </h1>
              </div>

              <div className="box">
                <p className="text-gray-600">Feels Like</p>
                <h1 className="text-lg font-bold">
                  {data.main.feels_like.toFixed()} °C
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default GetWeather;
