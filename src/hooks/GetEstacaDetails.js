import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

const GetEstaca = ({ apiKey, endpointPath }) => {
  const [data, setData] = useState(null);

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

  return (
    <div>
      {data ? (
        <div>
          {Object.keys(data).map((estacaKey) => (
            <div key={estacaKey} className="w-full max-w-md mx-auto my-8 bg-white rounded-xl overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-gray-200">
                <h2 className="text-lg font-bold">Dispositivo: <b>{estacaKey}</b></h2>
              </div>
              <div className="px-4 py-2 grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <span className="font-semibold text-lg mr-2">Humidade Ambiente:</span>
                  <span className="text-2xl font-medium">{data[estacaKey].HumidadeA}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-lg mr-2">Humidade Solo:</span>
                  <span className="text-sm">{data[estacaKey].HumidadeS}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-lg mr-2">Temperatura Ambiente:</span>
                  <span className="text-sm">{data[estacaKey].TemperaturaA}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-lg mr-2">Temperatura Solo:</span>
                  <span className="text-sm">{data[estacaKey].TemperaturaS}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>A carregar os dados...</p>
      )}
    </div>
  );
};

export default GetEstaca;
