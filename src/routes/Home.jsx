import { useState } from "react";
import { useEffect } from "react";
import Card from "../components/Card/Card";
import useAxios from "../hooks/useAxios";

const Home = () => {

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
  }, []);

  const { response } = useAxios({
    method: 'get',
    url: '/dentista',
  });

  const [data, setData] = useState([]);

  useEffect(() => {
      if (response !== null) {
          setData(response);
      }
  }, [response]);

  useEffect(() => {
    console.log(response, data)
  })

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {data.map((item) => (
          <Card key={item.matricula} nome={item.nome} sobrenome={item.sobrenome} />
        ))}
      </div>
    </>
  );
};

export default Home;
