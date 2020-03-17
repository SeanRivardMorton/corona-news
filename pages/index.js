import React from "react";
import Head from "next/head";
import stylesheet from "antd/dist/antd.min.css";
import { Template } from "../components/layout/template.tsx";
import { Login } from "../components/login/login.tsx";
import * as firebase from "firebase";
import { firebaseConfig } from "../config.ts";
import { api } from "../api/api.ts";
import { useCorona } from "../components/corona/Corona.tsx";

const Home = () => {
  const [app, setApp] = React.useState();
  const {
    CoronaGreeting,
    CoronaCounter,
    CoronaTable,
    CoronaUpdateButton,
    UserLocation
  } = useCorona();

  React.useEffect(() => {
    if (process.browser && !app) {
      setApp(new api());
    }
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Template>
        {/* {app && <Login app={app}></Login>} */}
        <CoronaGreeting />
        <CoronaUpdateButton></CoronaUpdateButton>
        <CoronaCounter />
        <CoronaTable />
        <UserLocation />
      </Template>
    </>
  );
};

export default Home;
