import './App.css';
import {Layout} from "antd";
import HeaderApp from "./components/layots/header";
import MainPage from "./components/pages/main-page";

const Routing =()=> {
  return (
    <div className="App">
      <Layout className="layout">
        <HeaderApp/>
        <MainPage/>
      </Layout>
    </div>
  );
}

export default Routing;
