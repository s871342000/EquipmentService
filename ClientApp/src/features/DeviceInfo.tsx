import React, { Fragment, useState } from "react";
import { Button, Confirm, Modal } from "semantic-ui-react";
import { DeviceDetail } from "./DeviceDetail";

export const DeviceInfo = (props: { login: boolean }) => {
  const sn = "1SHDHIDHFOWEHOh";
  const model = "RL-750s";

  const [state, setState] = useState(false);
  let deviceInfo = `序號: ${sn}\t機型: ${model}`;

  const [open, setOpen] = useState(false);

  let QRCode = require('qrcode.react');

  let qrcodeUrl = "";
  let getHost = () => {
    if (typeof window !== 'undefined') {
      qrcodeUrl = window.location.protocol + '//' + window.location.host;
      qrcodeUrl += "//EquipmentService//DeviceDetail";
    }
  }

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button primary content="QR Code" onClick={() => setOpen(true)} />}
      >
        <Modal.Content className="qrcode">
          {getHost()}
          {qrcodeUrl == "" ? null :
            <QRCode value={qrcodeUrl} size="300" />
          }
        </Modal.Content>
      </Modal>

      <div className="deviceInfo" onClick={() => setState(true)}>
        {deviceInfo}
      </div>
      <Confirm
        open={state}
        header={deviceInfo}
        content={<DeviceDetail login={props.login} />}
        onCancel={() => setState(false)}
        onConfirm={() => setState(false)}
      />
    </div>
  );
};
