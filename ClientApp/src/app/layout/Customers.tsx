import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import { Container } from "semantic-ui-react";
import { TargetUrl } from "../models/DirectUrl";
import { DeviceInfo } from "../layout/Device/DeviceInfo";

export const Costumers = (props: { login: boolean }) => {
  const [customers, setCustomers] = useState([{
    name: "",
    devices: [{
      sn: "",
      model: ""
    }]
  }]);

  useEffect(() => {
    fetch(TargetUrl("Default", "Customers"), {
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then((result) => {
      setCustomers(result);
    }).catch((error) => {
      console.error(error);
    })
  }, []);

  return (
    <Container>
      {
        customers.map(customer => {
          return (
            <Collapsible trigger={customer.name}>
              {
                customer.devices.map(device =>
                  <DeviceInfo login={props.login} sn={device.sn} model={device.model} />
                )
              }
            </Collapsible>
          )
        })
      }
    </Container>
  );
};
