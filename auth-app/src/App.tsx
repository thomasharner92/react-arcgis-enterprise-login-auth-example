import { useEffect, useState } from "react";
import { Login } from "./helpers/Login";
import { IUser } from "./types/IUser";
import Header from "./components/Header";
import { IAppConfig } from "./types/IAppConfig";
import { Map } from "./components/Map";
import "./App.scss";


interface IProps {
  config: IAppConfig;
}

const App = (props: IProps) => {
  // Runs once on startup to login the user and get their user info
  useEffect(() => {
    Login(props.config.app.appId, props.config.app.portalUrl).then(setUser);
  }, []);

  const [user, setUser] = useState<IUser>({
    username: "",
    fullName: "",
    email: "",
  });

  return (
    <div className="app">
      {/* wait until the username is loaded, then display the map. */}
      {user.username && (
        <>
          <Header config={props.config} user={user} />
          <Map config={props.config} />
        </>
      )}
    </div>
  );
};

export default App;
