import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./App.css";
import del from "./icons/clear.svg";
import print from "./icons/print.svg";

function App() {
  const [alumnos, setAlumnos] = useState([
    {
      id: 1,
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
  });

  let addAlumno = () => {
    setAlumnos([
      ...alumnos,
      {
        id: Date.now(),
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
    let alumnosCopia = alumnos.filter((alumno) => alumno.id !== idx);
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

    if ((parseInt(data.injustificadas) / parseInt(dias)) * 100 >= 25) {
      color = "rgba(255, 0, 0, 0.201)";
    } else if ((parseInt(data.injustificadas) / parseInt(dias)) * 100 >= 15) {
      color = "rgba(255, 115, 0, 0.185)";
    } else if (i === "background") {
      color = "white";
    } else if (i === "border") {
      color = "#e9e9e9";
    }

    return color;
  };

  return (
    <div className="App">
      <div className="container-div">
        <div ref={componentRef}>
          <div style={{ marginBottom: "15px" }}>
            <div className="title-div">
              <input style={{ fontStyle: "italic", width: "40%" }} />
              <span>
                <span
                  style={{
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
                />
              </span>
            </div>
            <div className="col-div">
              <div style={{ width: "6%", display: "flex" }}>
                <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                  Clase
                </div>
              </div>
              <div style={{ width: "34%", display: "flex" }}>
                <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                  Alumno
                </div>
              </div>
              <span
                style={{
                  width: "5%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 0,
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              >
                Faltas
                <br />
                Injustificadas
              </span>
              <span
                style={{
                  width: "6%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 0,
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              >
                % Faltas
                <br />
                Injustificadas
              </span>
              <span
                style={{
                  width: "5%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 0,
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              >
                Faltas
                <br />
                Justificadas
              </span>
              <span
                style={{
                  width: "6%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 0,
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              >
                % Faltas
                <br />
                Justificadas
              </span>
              <span
                style={{
                  width: "6%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 0,
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              >
                % Faltas
                <br />
                Totales
              </span>
              <span style={{ width: "13px", margin: 0 }}></span>
            </div>
            <div className="border-div" />
            {alumnos.map((data, idx) => (
              <div className="alumno-row" key={data.id}>
                <input
                  style={{ width: "6%" }}
                  defaultValue={data.clase}
                  onChange={(e) => changeClass(e, idx)}
                />
                <input
                  style={{ width: "34%" }}
                  defaultValue={data.nombre}
                  onChange={(e) => changeName(e, idx)}
                />
                <input
                  style={{ width: "5%" }}
                  defaultValue={data.injustificadas}
                  onChange={(e) => changeInjustif(e, idx)}
                />
                <input
                  type="number"
                  readOnly
                  value={(
                    (parseInt(data.injustificadas) / parseInt(dias)) *
                    100
                  ).toFixed(2)}
                  style={{
                    width: "6%",
                    backgroundColor: getColor(data, "background"),
                    borderColor: getColor(data, "border"),
                  }}
                />
                <input
                  style={{ width: "5%" }}
                  defaultValue={data.justificadas}
                  onChange={(e) => changeJustif(e, idx)}
                />
                <input
                  style={{ width: "6%" }}
                  type="number"
                  readOnly
                  value={(
                    (parseInt(data.justificadas) / parseInt(dias)) *
                    100
                  ).toFixed(2)}
                />
                <input
                  style={{ width: "6%" }}
                  type="number"
                  readOnly
                  value={(
                    ((parseInt(data.justificadas) +
                      parseInt(data.injustificadas)) /
                      parseInt(dias)) *
                    100
                  ).toFixed(2)}
                />
                <button
                  className="delete-button"
                  onClick={() => deleteAlumno(data.id)}
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
