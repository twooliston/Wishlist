import { BrowserRouter } from "react-router-dom";
import { useStateContext } from "./context/StateContext";

import AnimatedRoutes from "./components/animations/AnimatedRoutes";

import "./App.css";
import "./styles/website.scss";

function App() {
  const { menu } = useStateContext();

  return (
    <div className={menu ? "App menu open" : "App menu"}>
      <BrowserRouter>
        <AnimatedRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
