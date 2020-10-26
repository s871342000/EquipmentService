import React, { Fragment, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import {
  Divider,
  Form,
  Label,
  Segment,
} from "semantic-ui-react";
import { TargetUrl } from "../../models/DirectUrl";
import InputGroup from "../InputGroup";
import Record from "../Record/Record";
import { RecordType } from "../../models/RecordType";
import { useSelector } from 'react-redux';
import { IMaintenance, IRepair, IRevision } from "../../interfaces/IDevice";
import { IUserInfo } from "../../redux/reducer";

interface IProps {
  editable?: boolean,
  login?: boolean,
  sn?: string
}

export const DeviceDetail = forwardRef((props: IProps, ref: any) => {
  const _readonly = !props.login;

  const [customer, setCustomer] = useState("");
  const [sn, setSN] = useState("");
  const [model, setModel] = useState("");
  const [version, setVersion] = useState("");
  const [price, setPrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [warrantyStart, setWarrantyStart] = useState(new Date());
  const [warrantyEnd, setWarrantyEnd] = useState(new Date());
  const [leaseStart, setLeaseStart] = useState(new Date());
  const [leaseEnd, setLeaseEnd] = useState(new Date());
  const [maintenanceStart, setMaintenanceStart] = useState(new Date());
  const [maintenanceEnd, setMaintenanceEnd] = useState(new Date());
  const [maintenance, setMaintenance] = useState<IMaintenance[]>([]);
  const [repair, setRepair] = useState<IRepair[]>([]);
  const [revision, setRevision] = useState<IRevision[]>([]);

  const customerRef = useRef<any>();
  const snRef = useRef<any>();
  const modelRef = useRef<any>();
  const versionRef = useRef<any>();
  const priceRef = useRef<any>();
  const purchaseDateRef = useRef<any>();
  const warrantyStartRef = useRef<any>();
  const warrantyEndRef = useRef<any>();
  const leaseStartRef = useRef<any>();
  const leaseEndRef = useRef<any>();
  const maintenanceStartRef = useRef<any>();
  const maintenanceEndRef = useRef<any>();
  const maintenanceRef = useRef<any>();
  const repairDateRef = useRef<any>();
  const repairCommentRef = useRef<any>();
  const revisionDateRef = useRef<any>();
  const revisionVersionRef = useRef<any>();

  const putMaintenance = (obj: any) => setMaintenance(maintenance => [...maintenance, obj])
  const putRepair = (obj: any) => setRepair(repair => [...repair, obj]);
  const putRevision = (obj: any) => setRevision(revision => [...revision, obj]);

  useEffect(() => {
    if (props.sn) {
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
        setCustomer(result.customer);
        setSN(result.sn);
        setModel(result.model);
        setVersion(result.version);
        setPrice(result.price);
        setPurchaseDate(new Date(result.purchaseDate));
        setWarrantyStart(new Date(result.warrantyStartDate));
        setWarrantyEnd(new Date(result.warrantyEndDate));
        setLeaseStart(new Date(result.leaseStartDate));
        setLeaseEnd(new Date(result.leaseEndDate));
        setMaintenanceStart(new Date(result.maintenanceStartDate));
        setMaintenanceEnd(new Date(result.maintenanceEndDate));
        setMaintenance(result.maintenanceRecord);
        setRepair(result.repairRecord);
        setRevision(result.revisionRecord);
      }).catch((error) => {
        console.error(error);
      })
    }
  }, []);

  const userInfo = useSelector(s => s) as IUserInfo;

  useImperativeHandle(ref, () => ({
    doPost(method: string) {
      if (!snRef.current.value) {
        alert("請填寫機號");
        return false;
      }

      const fetchData = async () => {
        const uid = localStorage.getItem("uid");
        const pwd = localStorage.getItem("pwd");
        const response = await fetch(TargetUrl("Default", `${method}/${uid}/${pwd}`), {
          method: "POST",
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            customer: customerRef.current.value,
            sn: snRef.current.value,
            model: modelRef.current.value,
            version: versionRef.current.value,
            price: priceRef.current.value,
            purchaseDate: purchaseDateRef.current.value,
            warrantyStartDate: warrantyStartRef.current.value,
            warrantyEndDate: warrantyEndRef.current.value,
            leaseStartDate: leaseStartRef.current.value,
            leaseEndDate: leaseEndRef.current.value,
            maintenanceStartDate: maintenanceStartRef.current.value,
            maintenanceEndDate: maintenanceEndRef.current.value,
            maintenanceRecord: maintenance,
            repairRecord: repair,
            revisionRecord: revision
          })
        })

        const result = await (!response.ok) ? console.error(response.statusText) : response.json();
        return result;
      }

      return fetchData().then(result => {
        console.log(result);
        if (result && result.success == false) {
          alert(result.message);
        }

        return result.success;
      }).catch(error => {
        console.error(error);
        return false;
      });
    }
  }));

  return (
    <Segment>
      <Form>
        {
          _readonly ? null :
            <Fragment>
              <Form.Field inline>
                <InputGroup prepend="客戶名稱" type="text" className="w-auto" placeholder="請輸入客戶名稱" readonly={_readonly} value1={customer} setValue1={setCustomer} ref1={customerRef} />
              </Form.Field>
              <Divider />
            </Fragment>
        }

        <Form.Field inline>
          <InputGroup prepend="購買日期" type="date" className="mb-2 mr-2 w-auto" readonly={_readonly} value1={purchaseDate} setValue1={setPurchaseDate} ref1={purchaseDateRef} />
          <InputGroup prepend="售價" type="number" className="mb-2 mr-2 w-auto" readonly={_readonly} value1={price} setValue1={setPrice} ref1={priceRef} hide={_readonly} />
        </Form.Field>
        <Form.Field className="d-md-inline-flex">
          <InputGroup prepend="機號" type="text" placeholder="請輸入機號" className="mb-2 mr-2" readonly={_readonly} value1={sn} setValue1={setSN} ref1={snRef} editable={props.editable} />
          <InputGroup prepend="型號" type="text" placeholder="請輸入型號" className="mb-2 mr-2" readonly={_readonly} value1={model} setValue1={setModel} ref1={modelRef} />
          <InputGroup prepend="版本" type="text" placeholder="請輸入版本" className="mb-2 mr-2" readonly={_readonly} value1={version} setValue1={setVersion} ref1={versionRef} />
        </Form.Field>
        <Divider />

        <Form.Field>
          <Label>維護模式</Label>
        </Form.Field>
        <Form.Field>
          <InputGroup prepend="保固" type="date" className="mb-2 d-block" multipleInput readonly={_readonly} value1={warrantyStart} setValue1={setWarrantyStart} value2={warrantyEnd} setValue2={setWarrantyEnd} ref1={warrantyStartRef} ref2={warrantyEndRef} />
          <InputGroup prepend="租賃" type="date" className="mb-2" multipleInput readonly={_readonly} value1={leaseStart} setValue1={setLeaseStart} value2={leaseEnd} setValue2={setLeaseEnd} ref1={leaseStartRef} ref2={leaseEndRef} />
          <InputGroup prepend="保養" type="date" className="mb-2" multipleInput readonly={_readonly} value1={maintenanceStart} setValue1={setMaintenanceStart} value2={maintenanceEnd} setValue2={setMaintenanceEnd} ref1={maintenanceStartRef} ref2={maintenanceEndRef} />
        </Form.Field>
        <Divider />

        <Form.Field>
          <Record header="保養紀錄" type={RecordType.Maintenance} className="m-1 d-block d-md-inline" readonly={_readonly} records={maintenance} handleRecores={putMaintenance} setRecord={setMaintenance} ref1={maintenanceRef} />
          <Record header="維修紀錄" type={RecordType.Repair} className="m-1 d-block d-md-inline" readonly={_readonly} records={repair} handleRecores={putRepair} setRecord={setRepair} ref1={repairDateRef} ref2={repairCommentRef} />
          <Record header="改版紀錄" type={RecordType.Revision} className="m-1 d-block d-md-inline" readonly={_readonly} records={revision} handleRecores={putRevision} setRecord={setRevision} ref1={revisionDateRef} ref2={revisionVersionRef} />
        </Form.Field>
      </Form>
    </Segment>
  );
});

export default DeviceDetail;