import React from "react";

function GetDispositivos() {
  return (
    <>
      <h1>Dispositivos na Rede</h1>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">Estaca 1</div>
        <div className="collapse-content">
          <p>Estado:</p>
          <p>Ultimo Ping:</p>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-error">Error</button>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Estaca 2</div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Estaca 3</div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </>
  );
}

export default GetDispositivos;
