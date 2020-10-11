import React, { Fragment, useState } from "react";
import { Menu, Button, Confirm } from "semantic-ui-react";
import { DeviceDetail } from "../DeviceDetail";

const NavBar = (props:{login:boolean, setLogin(login:boolean):void}) => {
  const [state, setState] = useState(false);

  return (
    <Menu fixed="top" inverted>
      <Menu.Item header>裝置保養管理</Menu.Item>
      {props.login ? (
      <Fragment>
      <Menu.Item>
            <Button primary toggle onClick={() => setState(true)}>
              新增
            </Button>
            <Confirm
              open={state}
              header="新增裝置"
              content={<DeviceDetail login={props.login}/>}
              onCancel={() => setState(false)}
              onConfirm={() => setState(false)}
            />
         
      </Menu.Item>

      <Menu.Item position="right">
        <Button positive content="登出" onClick={() => props.setLogin(false)} />
      </Menu.Item>
      </Fragment>
  ): null
}
    </Menu>
  );
};

export default NavBar;
