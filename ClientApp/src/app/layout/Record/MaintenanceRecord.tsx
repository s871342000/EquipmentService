import React, { useEffect, useState } from 'react'
import { Segment, TextArea } from 'semantic-ui-react'
import { ConvertDateToString } from '../../models/Converter'
import InputGroup from '../InputGroup'

interface IProps {
    readonly: boolean,
    record?: {
        date: Date,
        items: string[]
    },
    ref1: any,
    setRecord?(obj: any): void
}

const MaintenanceRecord = (props: IProps) => {
    const [date, setDate] = useState(props.record?.date);

    useEffect(() => {
        if (props.record) {
            if (date) {
                props.record.date = date;
            }
        }
    }, [date]);

    return (
        <Segment>
            <InputGroup prepend="日期" type="date" readonly={props.readonly} value1={ConvertDateToString(date)} setValue1={setDate} ref1={props.ref1} />
            <TextArea
                className="mt-3 w-100"
                rows="5"
                value={["清潔保養", "紅外校正", "機件調整", "功能測試"].join("\n")}
            />
        </Segment>
    )
}

export default MaintenanceRecord
