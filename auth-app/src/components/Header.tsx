import React, { useState } from "react";
import "./Header.scss";
import { IUser } from "../types/IUser";
import { IAppConfig } from "../types/IAppConfig";

interface IProps {
  config: IAppConfig;
  user: IUser;
}

const Header = (props: IProps) => {
  return (
    <div className="header">
      <div className="info">
        <div className="title">Sample React/Typescript ArcGIS Enterprise Login Authentication Example</div>
      </div>
      <div className="user-info">
        <div>{props.user.fullName}</div>
        <div>{props.user.username}</div>
      </div>
    </div>
  );
};

export default Header;
