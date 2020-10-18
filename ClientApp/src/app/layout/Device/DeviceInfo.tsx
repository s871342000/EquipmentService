import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "semantic-ui-react";
import { TargetUrl } from "../../models/DirectUrl";
import { DeviceDetail } from "./DeviceDetail";

export const DeviceInfo = (props: { login: boolean, sn: string, model: string }) => {
  let deviceInfo = `機號: ${props.sn}\t機型: ${props.model}`;

  const [open, setOpen] = useState(false);
  const [deviceInfoOpen, setdeviceInfoOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  let QRCode = require('qrcode.react');

  useEffect(() => {
    fetch(TargetUrl("Default", "DeviceDetail"), {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ Uid: "", Pwd: "" })
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(() => {

    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div className="container-fluid m-2">
      <div className="row align-items-center">
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button primary content="QR Code" onClick={() => setOpen(true)} className="m-1" />}
        >
          <QRCode className="d-flex" value={TargetUrl("", props.sn)} />
        </Modal>

        <Modal
          onClose={() => setdeviceInfoOpen(false)}
          onOpen={() => setdeviceInfoOpen(true)}
          open={deviceInfoOpen}
          trigger={<div id="deviceInfo" onClick={() => setdeviceInfoOpen(true)} className="h-100 m-1 pt-1 px-1">{deviceInfo}</div>}
        >
          <Modal.Header>
            {deviceInfo}
          </Modal.Header>
          <Modal.Content>
            {<DeviceDetail login={props.login} sn={props.sn} />}
          </Modal.Content>
          <Modal.Actions>
            <Modal
              onClose={() => setShowDelete(false)}
              onOpen={() => setShowDelete(true)}
              open={showDelete}
              trigger={<Button color="red" onClick={() => setShowDelete(true)}>刪除</Button>}
            >
              <Modal.Header>刪除</Modal.Header>
              <Modal.Content>
                <label>請輸入<strong><span className="text-danger">確定</span></strong>確認刪除</label>
                <Input className="ml-2" />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => setShowDelete(false)}>取消</Button>
                <Button primary onClick={() => setShowDelete(false)}>確定</Button>
              </Modal.Actions>
            </Modal>
            <Button onClick={() => setdeviceInfoOpen(false)}>取消</Button>
            <Button primary onClick={() => setdeviceInfoOpen(false)}>確定</Button>
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  );
};
