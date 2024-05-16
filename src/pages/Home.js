// Home.js
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import GetWeather from "../hooks/GetWeather";
import GetEstaca from "../hooks/GetEstacaDetails";
import GetDispositivos from "../hooks/GetDispositivos.js";

function Home() {
  return (
    <>
      <Navbar />

      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-2 gap-2">
          <div class="p-4 max-w-xl">
            <div class="my-4">
              <h2 className="text-xl">Estacas na Rede</h2>
              <hr />
            </div>
            <GetEstaca />
          </div>
          <div class="p-4 max-w-xl">
            <div class="my-4">
              <h2 className="text-xl">Condições Climatéricas Globais</h2>
              <hr />
            </div>
            <GetWeather />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
