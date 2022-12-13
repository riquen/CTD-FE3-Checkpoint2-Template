import { useEffect } from "react";
import Card from "../components/Card/Card";
import useAxios from "../hooks/useAxios";

const Home = () => {
  const { response, fetchData } = useAxios('');

  useEffect(() => {
    fetchData(
    {
      method: 'get',
      url: '/dentista',
    })
  }, [])

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {response && response.map((data) => (
          <Card key={data.matricula} id={data.matricula} nome={data.nome} sobrenome={data.sobrenome} usuario={data.usuario.username} />
        ))}
      </div>
    </>
  );
};

export default Home;
