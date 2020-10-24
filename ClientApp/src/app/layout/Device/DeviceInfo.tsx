import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import { TargetUrl } from "../../models/DirectUrl";
import { IUserInfo } from "../../redux/reducer";
import { DeviceDetail } from "./DeviceDetail";

export const DeviceInfo = (props: { refresh: any; login: boolean, sn: string, model: string }) => {
  let deviceInfo = `機號: ${props.sn}\t型號: ${props.model}`;

  const [open, setOpen] = useState(false);
  const [deviceInfoOpen, setdeviceInfoOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const deviceDetailRed = useRef<any>();

  let QRCode = require('qrcode.react');

  const hanldeClick = async () => {
    const success = await deviceDetailRed.current.doPost("Update");

    if (success) {
      setdeviceInfoOpen(false);
      props.refresh.current.doRefresh();
    }
  }

  const deleteRef = useRef<any>();
  const userInfo = useSelector(s => s) as IUserInfo;

  const deleteDevice = () => {
    fetch(TargetUrl("Default", `Delete/${userInfo.uid}/${userInfo.pwd}/${props.sn}`), {
      method: "DELETE",
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(() => {

    }).catch((error) => {
      console.error(error);
    });
  }

  const handleDelete = async () => {
    if (deleteRef.current.value == "確定") {
      await deleteDevice();
    }

    setShowDelete(false);
    setdeviceInfoOpen(false);
    props.refresh.current.doRefresh();
  }

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
            {<DeviceDetail ref={deviceDetailRed} login={props.login} sn={props.sn} editable={true} />}
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
                <input ref={deleteRef} className="ml-2" />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => setShowDelete(false)}>取消</Button>
                <Button primary onClick={handleDelete}>確定</Button>
              </Modal.Actions>
            </Modal>
            <Button onClick={() => setdeviceInfoOpen(false)}>取消</Button>
            <Button primary onClick={hanldeClick}>確定</Button>
          </Modal.Actions>
        </Modal>
      </div>
    </div >
  );
};
