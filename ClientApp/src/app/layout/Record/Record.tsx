import React, { Fragment, useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import RevisionRecord from './RevisionRecord';
import MaintenanceRecord from './MaintenanceRecord';
import { RecordType } from './RecordType';
import RepairRecord from './RepairRecord';

const Record = (props: { header: string, type: RecordType, className: string, readonly: boolean, records: any }) => {
    const [open, setOpen] = useState(false);
    const [newRecordOpen, setNewRecordOpen] = useState(false);

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
                                                        <RepairRecord readonly={props.readonly} record={record} />
                                                    )
                                                }
                                            </Fragment>
                                        );

                                    case RecordType.Revision:
                                        return (
                                            <Fragment>
                                                {
                                                    props.records.map((record: { date: Date; version: string; }) =>
                                                        <RevisionRecord readonly={props.readonly} record={record} />
                                                    )

                                                }
                                            </Fragment>
                                        );

                                    case RecordType.Maintenance:
                                        return (
                                            <Fragment>
                                                {
                                                    props.records.map((record: { date: Date; items: [] }) =>
                                                        <MaintenanceRecord readonly={props.readonly} record={record} />
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
                                                    return <RepairRecord readonly={props.readonly} />

                                                case RecordType.Revision:
                                                    return <RevisionRecord readonly={props.readonly} />

                                                case RecordType.Maintenance:
                                                    return <MaintenanceRecord readonly={props.readonly} />

                                                default: return null;
                                            }
                                        }
                                    )()
                                }
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={() => setNewRecordOpen(false)}>取消</Button>
                                <Button primary onClick={() => setNewRecordOpen(false)}>確定</Button>
                            </Modal.Actions>
                        </Modal>
                    </Modal.Actions>
            }
        </Modal>
    )
}

export default Record
