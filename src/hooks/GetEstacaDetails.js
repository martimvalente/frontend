import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";
import { FiSettings } from 'react-icons/fi';

const GetEstaca = ({ apiKey, endpointPath }) => {
  const [data, setData] = useState(null);
  const [selectedEstacaKey, setSelectedEstacaKey] = useState(null);
  const [pumpStatus, setPumpStatus] = useState(false); // State to manage the pump status

  useEffect(() => {
    // Initialize Firebase with the provided API key
    const firebaseConfig = {
      apiKey: apiKey,
      databaseURL: "https://estaca-inteligente-default-rtdb.europe-west1.firebasedatabase.app",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Reference to your Firebase database
    const database = firebase.database();
    const dataRef = database.ref(endpointPath);

    // Set up a listener for changes in the data
    const onDataChange = (snapshot) => {
      const newData = snapshot.val();
      setData(newData);
    };

    dataRef.on("value", onDataChange);

    // Clean up function
    return () => {
      // Remove the listener when the component unmounts
      dataRef.off("value", onDataChange);
    };
  }, [apiKey, endpointPath]); // Re-run effect when apiKey or endpointPath change

  const openModal = (estacaKey) => {
    setSelectedEstacaKey(estacaKey);
    document.getElementById('settings_modal').showModal();
  };

  const togglePump = () => {
    setPumpStatus((prevStatus) => !prevStatus);
    // Add code here to update the pump status in the Firebase database if needed
  };

  return (
    <div>
      {data ? (
        <div>
          {Object.keys(data).map((estacaKey) => (
            <div key={estacaKey} className="w-full max-w-md mx-auto my-8 bg-white rounded-xl overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold">Dispositivo: <b>{estacaKey}</b></h2>
                <FiSettings className="cursor-pointer" size={20} onClick={() => openModal(estacaKey)} />
              </div>
              <section className="p-6 dark:bg-gray-100 dark:text-gray-800">
                <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-2 gap-4">
                  <div className="flex flex-col justify-start m-2 lg:m-6">
                    <p className="text-4xl font-bold text-center mb-6">{data[estacaKey].HumidadeA} %</p>
                    <p className="text-sm sm:text-base">Humidade Ambiente</p>
                  </div>
                  <div className="flex flex-col justify-start m-2 lg:m-6">
                    <p className="text-4xl font-bold text-center mb-6">{data[estacaKey].HumidadeS} %</p>
                    <p className="text-sm sm:text-base">Humidade do Solo</p>
                  </div>
                  <div className="flex flex-col justify-start m-2 lg:m-6">
                    <p className="text-4xl font-bold text-center mb-6">{data[estacaKey].TemperaturaA} ºC</p>
                    <p className="text-sm sm:text-base">Temperatura Ambiente</p>
                  </div>
                  <div className="flex flex-col justify-start m-2 lg:m-6">
                    <p className="text-4xl font-bold text-center mb-6">{data[estacaKey].TemperaturaS} ºC</p>
                    <p className="text-sm sm:text-base">Temperatura do Solo</p>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
      ) : (
        <p>A carregar os dados...</p>
      )}

      <dialog id="settings_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Settings for {selectedEstacaKey}</h3>
          
          <div className="py-4">
            <div className="flex items-center mb-4">
              <span className="label-text mr-2">Status:</span> 
              <div className={`w-3 h-3 rounded-full ${true ? 'bg-green-500' : 'bg-red-500'}`}></div> {/* Assuming the status is always up for this example */}
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Activate Pump</span> 
                <input type="checkbox" className="toggle" checked={pumpStatus} onChange={togglePump} />
              </label>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default GetEstaca;
