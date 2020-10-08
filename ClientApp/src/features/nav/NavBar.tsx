import React, { Fragment, useState } from "react";
import { Menu, Button, Confirm } from "semantic-ui-react";
import { DeviceDetail } from "../DeviceDetail";

const NavBar = () => {
  const isLogin = true;

  const [state, setState] = useState(false);

  return (
    <Menu fixed="top" inverted>
      <Menu.Item header>裝置保養管理</Menu.Item>
      <Menu.Item>
        {isLogin ? (
          <Fragment>
            <Button primary toggle onClick={() => setState(true)}>
              新增
            </Button>
            <Confirm
              open={state}
              header="新增裝置"
              content={<DeviceDetail />}
              onCancel={() => setState(false)}
              onConfirm={() => setState(false)}
            />
          </Fragment>
        ) : null}
      </Menu.Item>
      <Menu.Item position="right">
        <Button positive content="登入" />
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
