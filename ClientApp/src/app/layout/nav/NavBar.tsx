import React, { Fragment, useState } from "react";
import { Menu, Button, Modal } from "semantic-ui-react";
import { DeviceDetail } from "../Device/DeviceDetail";

const NavBar = (props: { login: boolean, setLogin(login: boolean): void }) => {
  const [open, setOpen] = useState(false);

  return (
    <Menu fixed="top" inverted>
      <Menu.Item header>裝置保養管理</Menu.Item>
      {
        props.login ? (
          <Fragment>
            <Menu.Item>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button primary toggle onClick={() => setOpen(true)}>新增</Button>}>
                <Modal.Header>新增裝置</Modal.Header>
                <Modal.Content>
                  <DeviceDetail login={props.login} />
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setOpen(false)}>取消</Button>
                  <Button primary onClick={() => setOpen(false)}>確定</Button>
                </Modal.Actions>
              </Modal>
            </Menu.Item>

            <Menu.Item position="right">
              <Button positive content="登出" onClick={() => props.setLogin(false)} />
            </Menu.Item>
          </Fragment>
        ) : null
      }
    </Menu>
  );
};

export default NavBar;
