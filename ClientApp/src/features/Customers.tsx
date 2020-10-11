import React from "react";
import Collapsible from "react-collapsible";
import { Container } from "semantic-ui-react";
import { DeviceInfo } from "./DeviceInfo";

export const Costumers = (props: { login: boolean }) => {
  return (
    <Container>
      <Collapsible overflowWhenOpen="scroll" trigger="客戶A">
        <DeviceInfo login={props.login} />
        <DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} />
      </Collapsible>
      <Collapsible trigger="客戶B">
        <DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} /><DeviceInfo login={props.login} />
      </Collapsible>
      <Collapsible trigger="客戶C">
        <DeviceInfo login={props.login} /><DeviceInfo login={props.login} />
      </Collapsible>
    </Container>
  );
};
