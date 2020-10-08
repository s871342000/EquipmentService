import React from "react";
import Collapsible from "react-collapsible";
import { Container } from "semantic-ui-react";
import { DeviceInfo } from "./DeviceInfo";

export const Items = () => {
  return (
    <Container>
      <Collapsible overflowWhenOpen="scroll" trigger="客戶A">
        <DeviceInfo />
        <DeviceInfo />
        <DeviceInfo />
        <DeviceInfo />
        <DeviceInfo />
        <DeviceInfo />
      </Collapsible>
      <Collapsible trigger="客戶B">
        <DeviceInfo />
        <DeviceInfo />
      </Collapsible>
    </Container>
  );
};
