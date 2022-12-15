import { useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import { useTheme } from "../../../hooks/useTheme";

const ScheduleForm = () => {
  const { theme } = useTheme()
  const [dentista, setDentista] = useState([])
  const [paciente, setPaciente] = useState([])

  useEffect(() => {
    fetch('https://dhodonto.ctdprojetos.com.br/dentista')
    .then(
      response => {
        response.json()
        .then(data => {
            setDentista(data)
          }
        )
      }
    )

    fetch('https://dhodonto.ctdprojetos.com.br/paciente')
    .then(
      response => {
        response.json()
        .then(data => {
            setPaciente(data.body)
          }
        )
      }
    )
  }, [])

  //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
  //e pacientes e carregar os dados em 2 estados diferentes
  

  const handleSubmit = (event) => {
    event.preventDefault()
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card ${theme === 'dark' && styles.cardDark}`}></div>
      <div
        className={`text-center container}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist">
                {/*Aqui deve ser feito um map para listar todos os dentistas*/}
                {dentista && dentista.map((dentista) => (
                  <option key={dentista.matricula}>
                    {`${dentista.nome} ${dentista.sobrenome}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select className="form-select" name="patient" id="patient">
                {/*Aqui deve ser feito um map para listar todos os pacientes*/}
                {paciente && paciente.map((paciente) => (
                  <option key={paciente.matricula}>
                    {`${paciente.nome} ${paciente.sobrenome}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-light ${theme === 'dark' && 'btn-dark'}`}
              type="submit"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
