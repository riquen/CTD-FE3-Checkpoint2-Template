import { useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import { useTheme } from "../../../hooks/useTheme";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const ScheduleForm = () => {
  const { theme } = useTheme()
  const { response: dentista, fetchData: fetchDentista } = useAxios('');
  const { response: paciente, fetchData: fetchPaciente } = useAxios('');
  const { response: consulta, error, fetchData: fetchConsulta } = useAxios('');
  const [date, setDate] = useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchDentista({
      method: 'get',
      url: '/dentista'
    })
    fetchPaciente({
      method: 'get',
      url: '/paciente'
    })
  }, [fetchDentista, fetchPaciente])

  //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
  //e pacientes e carregar os dados em 2 estados diferentes
  

  const handleSubmit = (event) => {
    event.preventDefault()
    const dentistaData = event.target.dentist.value
    const pacienteData = event.target.patient.value

    const token = localStorage.getItem('token')

    fetchConsulta({
      method: 'post',
      url: '/consulta',
      headers: {
        // verificar se o accept foi aceito
        accept: '*/*',
        'Content-Type': 'application/json',
        // pode ser que o "a" seja maiúsculo 
        authorization: `Bearer ${token}`
        // talvez tenha que colocar content-type
      },
      data: {
        dataHoraAgendamento: date,
        paciente: {
          matricula: pacienteData},
        dentista: {
          matricula: dentistaData}, 
      }
    })
    error ? alert('Erro ao agendar consulta!') : alert('Consulta agendada com sucesso!')
    !error && navigate('/')
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
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
                Dentista
              </label>
              <select className="form-select" name="dentist" id="dentist">
                {/*Aqui deve ser feito um map para listar todos os dentistas*/}
                {dentista && dentista.map((dentista) => (
                  <option key={dentista.matricula} value={dentista.matricula}>
                    {`${dentista.nome} ${dentista.sobrenome}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Paciente
              </label>
              <select className="form-select" name="patient" id="patient">
                {/*Aqui deve ser feito um map para listar todos os pacientes*/}
                {paciente.body && paciente.body.map((paciente) => (
                  <option key={paciente.matricula} value={paciente.matricula}>
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
                onChange={(e) => setDate(e.target.value)}
                value={date}
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
              Agendar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
