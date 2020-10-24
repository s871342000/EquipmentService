import React, { useState, useEffect, Fragment, useImperativeHandle, forwardRef } from "react";
import Collapsible from "react-collapsible";
import { Button, Container } from "semantic-ui-react";
import { TargetUrl } from "../models/DirectUrl";
import { DeviceInfo } from "../layout/Device/DeviceInfo";
import { ICustomer } from "../interfaces/ICustomer";
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu"
import { hideMenu } from "react-contextmenu/modules/actions";
import { exportData } from "../models/excel";
import Search from "./Search";
import { IOption } from "../interfaces/ISearch";

interface IProps {
  login: boolean
}

export const Costumers = forwardRef((props: IProps, refresh: any) => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [showItems, setShowItems] = useState<ICustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("全部客戶");
  const [selectedSN, setSelectedSN] = useState("全部機號");
  const cusomerSearchOptions: IOption[] = [{ key: 0, value: "全部客戶", text: "全部客戶" }];
  const snSearchOptions: IOption[] = [{ key: 0, value: "全部機號", text: "全部機號" }];

  const getCustomers = () => {
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
      setShowItems(result);
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    if (customers.length == 0) {
      getCustomers();
    }
  }, []);

  useImperativeHandle(refresh, () => ({
    doRefresh() {
      getCustomers();
    }
  }), []);

  const handleExport = (name: string) => {
    // 隱藏匯出按鈕
    hideMenu();

    fetch(TargetUrl("Default", `AllDevices/${name}`), {
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      exportData(data, name);
    }).catch((error) => {
      console.error(error);
    });
  }

  const setOptions = (customers: any[]) => {
    let count = 1;
    customers.map((customer, index) => {
      cusomerSearchOptions.push({
        key: index + 1,
        value: customer.name,
        text: customer.name
      });

      customer.devices.map((device: { sn: any; }, idx: number) => {
        snSearchOptions.push({
          key: idx + count,
          value: device.sn,
          text: device.sn
        });
      });

      count += customer.devices.length;
    });
  }

  // 會重複渲染
  if (customers.length > 0) {
    setOptions(customers);
  }

  const handleCustomerSelect = (e: any, data: any) => {
    if (data.value) {
      setSelectedCustomer(data.value);
      handleSelected(data.value, selectedSN);
    }
  };

  const handleSNSelect = (e: any, data: any) => {
    if (data.value) {
      setSelectedSN(data.value);
      handleSelected(selectedCustomer, data.value);
    }
  };

  const handleSelected = (customer: string, sn: string) => {
    console.log(`Customer: ${customer}, SN: ${sn}`)
    if (customer == "全部客戶" && sn == "全部機號") {
      setShowItems(customers);
    }

    let items = customers;
    if (customer != "全部客戶") {
      items = items.filter(item => item.name == customer);
    }

    if (sn != "全部機號") {
      let temp: ICustomer[] = [];
      items.map(item => item.devices.map(device => {
        if (device.sn == sn) {
          temp = [{
            name: item.name,
            devices: [{
              sn: device.sn,
              model: device.model
            }]
          }]
        }
      }));

      items = temp;
    }

    setShowItems(items);
  }

  return (
    <Container>
      <Search handleChange={handleCustomerSelect} options={cusomerSearchOptions} placeholder="搜尋客戶" />
      <Search handleChange={handleSNSelect} options={snSearchOptions} placeholder="搜尋機號" />
      {
        showItems.map((customer, index) => {
          return (
            <Fragment>
              <ContextMenuTrigger id={index.toString()}>
                <Collapsible trigger={customer.name}>
                  {
                    customer.devices.map(device =>
                      <DeviceInfo refresh={refresh} login={props.login} sn={device.sn} model={device.model} />
                    )
                  }
                </Collapsible>
              </ContextMenuTrigger>
              <ContextMenu id={index.toString()}>
                <Button secondary onClick={() => handleExport(customer.name)} content="匯出" />
              </ContextMenu>
            </Fragment>
          )
        })
      }
    </Container>
  );
});
