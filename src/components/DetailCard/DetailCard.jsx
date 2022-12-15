import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useTheme } from "../../hooks/useTheme";
import ScheduleFormModal from "../ScheduleFormModal/ScheduleFormModal";
import styles from "./DetailCard.module.css";

const DetailCard = () => {
  const { theme } = useTheme()
  const { response, fetchData } = useAxios('');
  const { id } = useParams();

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o 
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
    fetchData(
      {
        method: 'get',
        url: `/dentista?matricula=${id}`,
      })
    }, []);
    
  return (
    //As instruções que estão com {''} precisam ser 
    //substituídas com as informações que vem da api
    response && (
      <>
        <h1>Detail about Dentist {response.nome} </h1>
        <section className="card col-sm-12 col-lg-6 container">
          {/* //Na linha seguinte deverá ser feito um teste se a aplicação
          // está em dark mode e deverá utilizar o css correto */}
          <div
            className={`card-body row ${theme === 'dark' && styles.cardDark}`}
          >
            <div className="col-sm-12 col-lg-6">
              <img
                className="card-img-top"
                src="/images/doctor.jpg"
                alt="doctor placeholder"
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <ul className="list-group">
                <li className="list-group-item">Nome: {response.nome}</li>
                <li className="list-group-item">
                  Sobrenome: {response.sobrenome}
                </li>
                <li className="list-group-item">
                  {`Usuário: ${response.usuario.username} (${response.matricula})`}
                </li>
              </ul>
              <div className="text-center">
                {/* //Na linha seguinte deverá ser feito um teste se a aplicação
                // está em dark mode e deverá utilizado o css correto */}
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'} ${styles.button}`}
                >
                  Marcar consulta
                </button>
              </div>
            </div>
          </div>
        </section>
        <ScheduleFormModal />
      </>
    )
  );
};

export default DetailCard;
