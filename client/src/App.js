import React, {useEffect} from "react";
import {Layout} from "antd";
import 'antd/dist/antd.css';

import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import {useDispatch} from "react-redux";
import {loadUser} from "./redux/actions/auth-actions";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

  return (
      <Layout>
          <Header/>
          <Layout>
              <Content/>
          </Layout>
          <Footer/>
      </Layout>
  )
}

export default App;
