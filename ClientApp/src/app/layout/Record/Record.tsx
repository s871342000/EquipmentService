import React, { Fragment, useRef, useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import RevisionRecord from './RevisionRecord';
import MaintenanceRecord from './MaintenanceRecord';
import { RecordType } from '../../models/RecordType';
import RepairRecord from './RepairRecord';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';
import { IMaintenance, IRepair, IRevision } from '../../interfaces/IDevice';

interface IProps {
    header: string,
    type: RecordType,
    className: string,
    readonly: boolean,
    records: any,
    handleRecores: any,
    ref1?: any,
    ref2?: any,
    setRecord(obj: any): void
}

const Record = (props: IProps) => {
    const [open, setOpen] = useState(false);
    const [newRecordOpen, setNewRecordOpen] = useState(false);

    const getObj = () => {
        let obj;
        switch (props.type) {
            case RecordType.Maintenance:
                obj = { date: props.ref1.current.value, items: ["清潔保養", "紅外校正", "機件調整", "功能測試"] }
                break;
            case RecordType.Repair:
                obj = { date: props.ref1.current.value, comment: props.ref2.current.value }
                break;
            case RecordType.Revision:
                obj = { date: props.ref1.current.value, version: props.ref2.current.value }
                break;
        }
        console.log(obj.date);
        return obj;
    }

    const handleClick = () => {
        setNewRecordOpen(false);
        props.handleRecores(getObj());
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button secondary onClick={() => { setOpen(true) }} className={`${props.className}`}>{props.header}</Button>}
        >
            <Modal.Header>{props.header}</Modal.Header>
            <Modal.Content>
                {
                    !props.records ? null :
                        (
                            () => {
                                switch (props.type) {
                                    case RecordType.Repair:
                                        return (
                                            <Fragment>
                                                {
                                                    props.records.map((record: { comment: string; date: Date; }) =>
                                                        <RepairRecord readonly={props.readonly} record={record} ref1={props.ref1} ref2={props.ref2} />
                                                    )
                                                }
                                            </Fragment>
                                        );

                                    case RecordType.Revision:
                                        return (
                                            <Fragment>
                                                {
                                                    props.records.map((record: { date: Date; version: string; }) =>
                                                        <RevisionRecord readonly={props.readonly} record={record} ref1={props.ref1} ref2={props.ref2} />
                                                    )

                                                }
                                            </Fragment>
                                        );

                                    case RecordType.Maintenance:
                                        return (
                                            <Fragment>
                                                {
                                                    props.records.map((record: { date: Date; items: [] }) =>
                                                        <MaintenanceRecord readonly={props.readonly} record={record} setRecord={props.setRecord} ref1={props.ref1} />
                                                    )
                                                }
                                            </Fragment>
                                        );

                                    default: return null;
                                }
                            }
                        )()
                }
            </Modal.Content>
            {
                props.readonly ? null :
                    <Modal.Actions>
                        <Modal
                            onClose={() => setNewRecordOpen(false)}
                            onOpen={() => setNewRecordOpen(true)}
                            open={newRecordOpen}
                            trigger={<Button onClick={() => setNewRecordOpen(true)}>新增</Button>}
                        >
                            <Modal.Header>新增{props.header}</Modal.Header>
                            <Modal.Content>
                                {
                                    (
                                        () => {
                                            switch (props.type) {
                                                case RecordType.Repair:
                                                    const repair: IRepair = { date: new Date(), comment: "" };
                                                    return <RepairRecord record={repair} readonly={props.readonly} ref1={props.ref1} ref2={props.ref2} />

                                                case RecordType.Revision:
                                                    const revision: IRevision = { date: new Date(), version: "" };
                                                    return <RevisionRecord record={revision} readonly={props.readonly} ref1={props.ref1} ref2={props.ref2} />

                                                case RecordType.Maintenance:
                                                    const maintenance: IMaintenance = { date: new Date(), items: ["清潔保養", "紅外校正", "機件調整", "功能測試"] };
                                                    return <MaintenanceRecord record={maintenance} readonly={props.readonly} ref1={props.ref1} />

                                                default: return null;
                                            }
                                        }
                                    )()
                                }
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={() => setNewRecordOpen(false)}>取消</Button>
                                <Button primary onClick={handleClick}>確定</Button>
                            </Modal.Actions>
                        </Modal>
                    </Modal.Actions>
            }
        </Modal>
    )
}

export default Record
