import React, { Fragment, useState } from "react";
import { Menu, Button, Confirm, Modal } from "semantic-ui-react";
import { DeviceDetail } from "../DeviceDetail";
import { Login } from "../Login";

const NavBar = () => {
  const [login, setLogin] = useState(false);
  const [open, setOpen] = useState(false)
  const [state, setState] = useState(false);

  return (
    <Menu fixed="top" inverted>
      <Menu.Item header>裝置保養管理</Menu.Item>
      <Menu.Item>
        {login ? (
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
        <Modal className="login"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button positive content="登入" />}
        >
          <Modal.Content>
            <Login setLogin={login=>setLogin(login)} setOpen={open=>setOpen(open)}/>
          </Modal.Content>
        </Modal>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
