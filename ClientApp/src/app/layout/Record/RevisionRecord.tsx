import React, { useEffect, useState } from 'react'
import { Segment } from 'semantic-ui-react'
import { ConvertDateToString } from '../../models/Converter'
import InputGroup from '../InputGroup'

interface IProps {
    readonly: boolean,
    record?: {
        date: Date,
        version: string
    },
    ref1: any,
    ref2: any
}

const RevisionRecord = (props: IProps) => {
    const [date, setDate] = useState(props.record?.date);
    const [version, setVersion] = useState(props.record?.version);

    useEffect(() => {
        if (props.record) {
            if (date && version) {
                props.record.date = date;
                props.record.version = version;
            }
        }
    }, [date, version]);

    return (
        <Segment>
            <div className="row">
                <div className="col">
                    <InputGroup prepend="日期" type="date" readonly={props.readonly} value1={ConvertDateToString(date)} setValue1={setDate} ref1={props.ref1} />
                </div>
                <div className="col">
                    <InputGroup prepend="版本" type="text" placeholder="請輸入版本" readonly={props.readonly} value1={version} setValue1={setVersion} ref1={props.ref2} />
                </div>
            </div>
        </Segment>
    )
}

export default RevisionRecord
