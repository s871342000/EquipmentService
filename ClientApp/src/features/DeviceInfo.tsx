import React, { Fragment, useState } from "react";
import { Confirm } from "semantic-ui-react";
import { DeviceDetail } from "./DeviceDetail";

export const DeviceInfo = () => {
  const sn = "123";
  const model = "RL-750s";

  const [state, setState] = useState(false);
  let deviceInfo = `序號: ${sn}\t機型: ${model}`;

  return (
    <Fragment>
      <div className="deviceInfo" onClick={() => setState(true)}>
        {deviceInfo}
      </div>
      <Confirm
        open={state}
        header={deviceInfo}
        content={<DeviceDetail />}
        onCancel={() => setState(false)}
        onConfirm={() => setState(false)}
      />
    </Fragment>
  );
};
