import React, { Fragment, useState, useEffect } from "react";
import {
  Divider,
  Form,
  Label,
  Segment,
} from "semantic-ui-react";
import { TargetUrl } from "../../models/DirectUrl";
import { ConvertDateToString } from "../Converter";
import InputGroup from "../InputGroup";
import Record from "../Record/Record";
import { RecordType } from "../Record/RecordType";

export const DeviceDetail = (props: { login?: boolean, sn?: string }) => {
  const _readonly = !props.login;

  const [state, setState] = useState({
    customer: "",
    sn: "",
    model: "",
    version: "",
    purchaseDate: "",
    warrantyStart: "",
    warrantyEnd: "",
    leaseStart: "",
    leaseEnd: "",
    maintenanceStart: "",
    maintenanceEnd: "",
    maintenance: [{ date: Date, items: [] }],
    repair: [{ date: Date, comment: "" }],
    revision: [{ date: Date, version: "" }],
  });

  useEffect(() => {
    props.sn &&
      fetch(TargetUrl("Default", `DeviceDetail/${props.sn}`), {
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

        setState({
          customer: result.customer,
          sn: result.sn,
          model: result.model,
          version: result.version,

          purchaseDate: ConvertDateToString(new Date(result.purchaseDate)),
          warrantyStart: ConvertDateToString(new Date(result.warrantyStartDate)),
          warrantyEnd: ConvertDateToString(new Date(result.warrantyEndDate)),
          leaseStart: ConvertDateToString(new Date(result.leaseStartDate)),
          leaseEnd: ConvertDateToString(new Date(result.leaseEndDate)),
          maintenanceStart: ConvertDateToString(new Date(result.maintenanceStartDate)),
          maintenanceEnd: ConvertDateToString(new Date(result.maintenanceEndDate)),

          maintenance: result.maintenanceRecord,
          repair: result.repairRecord,
          revision: result.revisionRecord
        });
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Segment>
      <Form>
        {
          _readonly ? null :
            <Fragment>
              <Form.Field inline>
                <InputGroup prepend="客戶名稱" type="text" className="w-auto" placeholder="請輸入客戶名稱" readonly={_readonly} value1={state.customer} />
              </Form.Field>
              <Divider />
            </Fragment>
        }

        <Form.Field inline>
          <InputGroup prepend="購買日期" type="date" className="mb-2 mr-2 w-auto" readonly={_readonly} value1={state.purchaseDate} />
        </Form.Field>
        <Form.Field className="d-md-inline-flex">
          <InputGroup prepend="機號" type="text" placeholder="請輸入機號" className="mb-2 mr-2" readonly={_readonly} value1={state.sn} />
          <InputGroup prepend="型號" type="text" placeholder="請輸入型號" className="mb-2 mr-2" readonly={_readonly} value1={state.model} />
          <InputGroup prepend="版本" type="text" placeholder="請輸入版本" className="mb-2 mr-2" readonly={_readonly} value1={state.version} />
        </Form.Field>
        <Divider />

        <Form.Field>
          <Label>維護模式</Label>
        </Form.Field>
        <Form.Field>
          <InputGroup prepend="保固" type="date" className="mb-2" multipleInput readonly={_readonly} value1={state.warrantyStart} value2={state.warrantyEnd} />
          <InputGroup prepend="租賃" type="date" className="mb-2" multipleInput readonly={_readonly} value1={state.leaseStart} value2={state.leaseEnd} />
          <InputGroup prepend="保養" type="date" className="mb-2" multipleInput readonly={_readonly} value1={state.maintenanceStart} value2={state.maintenanceEnd} />
        </Form.Field>
        <Divider />

        <Form.Field>
          <Record header="保養紀錄" type={RecordType.Maintenance} className="m-1 d-block d-md-inline" readonly={_readonly} records={state.maintenance} />
          <Record header="維修紀錄" type={RecordType.Repair} className="m-1 d-block d-md-inline" readonly={_readonly} records={state.repair} />
          <Record header="改版紀錄" type={RecordType.Revision} className="m-1 d-block d-md-inline" readonly={_readonly} records={state.revision} />
        </Form.Field>
      </Form>
    </Segment>
  );
};

export default DeviceDetail;