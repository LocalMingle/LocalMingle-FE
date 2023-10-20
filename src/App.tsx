import "./App.css";
import Router from "../src/router/Router";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <>
      <Toaster reverseOrder={false} />
      <Router />
    </>
  );
};

export default App;
