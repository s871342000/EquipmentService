import React, { Fragment, useRef, useState } from "react";
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";
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
    const uid = localStorage.getItem("uid");
    const pwd = localStorage.getItem("pwd");
    fetch(TargetUrl("Default", `Delete/${uid}/${pwd}/${props.sn}`), {
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

  const downloadQR = (id: string) => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  return (
    <div className="container-fluid m-2">
      <div className="row align-items-center">
        <Modal
          className="text-center"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button primary content="QR Code" onClick={() => setOpen(true)} className="m-1" />}
        >

          <QRCode id={props.sn} className="d-flex" value={TargetUrl("", props.sn)} />
          <a href="#" onClick={() => downloadQR(props.sn)}> 下載 </a>
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
