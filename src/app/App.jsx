
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a classe dark ou light */}
      <div className={`app light`}>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;