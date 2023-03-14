import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./App.css";
import del from "./icons/clear.svg";
import print from "./icons/print.svg";

function App() {
  const [alumnos, setAlumnos] = useState([
    {
      clase: "",
      nombre: "",
      injustificadas: "",
      justificadas: "",
      porcentaje: "",
    },
  ]);

  const [dias, setDias] = useState(null);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
    // pageStyle: "@page { size: 13in 16.5in }",
  });

  let addAlumno = () => {
    setAlumnos([
      ...alumnos,
      {
        clase: "",
        nombre: "",
        injustificadas: "",
        justificadas: "",
        border: "",
        background: "",
      },
    ]);
  };

  let deleteAlumno = (idx) => {
    let alumnosCopia = [...alumnos];
    alumnosCopia.splice(idx, 1);
    setAlumnos(alumnosCopia);
  };

  let changeName = (e, idx) => {
    const inputdata = [...alumnos];
    inputdata[idx].nombre = e.target.value;
    setAlumnos(inputdata);
  };

  let changeClass = (e, idx) => {
    const inputdata = [...alumnos];
    inputdata[idx].clase = e.target.value;
    setAlumnos(inputdata);
  };

  let changeInjustif = (e, idx) => {
    const inputdata = [...alumnos];
    inputdata[idx].injustificadas = e.target.value;
    setAlumnos(inputdata);
  };

  let changeJustif = (e, idx) => {
    const inputdata = [...alumnos];
    inputdata[idx].justificadas = e.target.value;
    setAlumnos(inputdata);
  };

  let changeDias = (e) => {
    setDias(e.target.value);
  };

  let getColor = (data, i) => {
    let color;

    if (
      ((parseInt(data.injustificadas) + parseInt(data.justificadas)) /
        parseInt(dias)) *
        100 >=
      25
    ) {
      color = "rgba(255, 0, 0, 0.201)";
    } else if (
      ((parseInt(data.injustificadas) + parseInt(data.justificadas)) /
        parseInt(dias)) *
        100 >=
      15
    ) {
      color = "rgba(255, 115, 0, 0.185)";
    } else if (i === "background") {
      color = "white";
    } else if (i === "border") {
      color = "#f1f1f1";
    }

    return color;
  };

  return (
    <div className="App">
      <div className="container-div">
        <div ref={componentRef}>
          <div style={{ marginBottom: "15px" }}>
            <div className="title-div">
              <input
                className="long-input"
                style={{ fontStyle: "italic" }}
              ></input>
              <span
                style={{
                  paddingLeft: "40%",
                  paddingRight: "17px",
                  fontStyle: "italic",
                }}
              >
                Días Lectivos
              </span>
              <input
                style={{
                  width: "50px",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
                onChange={(e) => changeDias(e)}
              ></input>
            </div>
            <div className="col-div">
              <span style={{ width: "100px" }}>Clase</span>
              <span style={{ width: "36%" }}>Alumno</span>
              <span
                style={{
                  width: "55px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                Faltas
                <br />
                Justificadas
              </span>
              <span
                style={{
                  width: "57px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                Faltas
                <br />
                Injustificadas
              </span>
              <span
                style={{
                  width: "57px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                Faltas
                <br />
                Totales
              </span>
              <span style={{ width: "57px" }}>%</span>
              <span style={{ width: "23.6px" }}></span>
            </div>
            <div className="border-div" />
            {alumnos.map((data, idx) => (
              <div className="alumno-row" key={idx}>
                <input
                  style={{ width: "100px" }}
                  defaultValue={data.clase}
                  onChange={(e) => changeClass(e, idx)}
                ></input>

                <input
                  className="long-input"
                  defaultValue={data.nombre}
                  onChange={(e) => changeName(e, idx)}
                ></input>

                <input
                  style={{ width: "50px" }}
                  defaultValue={data.injustificadas}
                  onChange={(e) => changeInjustif(e, idx)}
                ></input>

                <input
                  style={{ width: "50px" }}
                  defaultValue={data.justificadas}
                  onChange={(e) => changeJustif(e, idx)}
                ></input>
                <input
                  style={{ width: "50px" }}
                  type="number"
                  readOnly
                  value={
                    parseInt(data.injustificadas) + parseInt(data.justificadas)
                  }
                ></input>
                <input
                  type="number"
                  readOnly
                  value={(
                    ((parseInt(data.injustificadas) +
                      parseInt(data.justificadas)) /
                      parseInt(dias)) *
                    100
                  ).toFixed(2)}
                  style={{
                    width: "55px",
                    backgroundColor: getColor(data, "background"),
                    borderColor: getColor(data, "border"),
                  }}
                ></input>

                <button
                  className="delete-button"
                  onClick={() => deleteAlumno(idx)}
                >
                  <img src={del} alt="" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button className="add-button" onClick={() => addAlumno()}>
            +
          </button>
        </div>
      </div>
      <button className="print-button" onClick={handlePrint}>
        <img src={print} alt="" />
      </button>
    </div>
  );
}

export default App;
