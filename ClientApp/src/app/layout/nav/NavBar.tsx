import React, { Fragment, useRef, useState } from "react";
import { Menu, Button, Modal } from "semantic-ui-react";
import { DeviceDetail } from "../Device/DeviceDetail";

interface props {
  login: boolean;
  setLogin(login: boolean): void;
  refresh: any;
}

const NavBar = (props: props) => {
  const [open, setOpen] = useState(false);

  const deviceDetailRed = useRef<any>();

  const hanldeClick = async () => {
    const success = await deviceDetailRed.current.doPost("Create");

    if (success) {
      setOpen(false);
      await new Promise(resolve => setTimeout(resolve, 1000))
      props.refresh.current.doRefresh();
    }
  }

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
                  <DeviceDetail ref={deviceDetailRed} login={props.login} />
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setOpen(false)}>取消</Button>
                  <Button primary onClick={hanldeClick}>確定</Button>
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
