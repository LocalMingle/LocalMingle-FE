import "./App.css";
import Router from "../src/router/Router";
import { Toaster } from "react-hot-toast";
// import { useTranslation } from "react-i18next"; // 번역을 어떻게 적용할지 적을 곳

const App: React.FC = () => {
  // const { t } = useTranslation();

  return (
    <>
      <Toaster reverseOrder={false} />
      <Router />
    </>
  );
};

export default App;
