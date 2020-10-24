import React, { useEffect, useState } from "react"
import { Segment } from "semantic-ui-react"
import { ConvertDateToString } from "../../models/Converter";
import InputGroup from "../InputGroup"

interface IProps {
    readonly: boolean,
    record?: {
        comment: string,
        date: Date
    },
    ref1: any,
    ref2: any
}

const RepairRecord = (props: IProps) => {
    const [date, setDate] = useState(props.record?.date);
    const [text, setText] = useState(props.record?.comment);

    useEffect(() => {
        if (props.record) {
            if (date && text) {
                props.record.date = date;
                props.record.comment = text;
            }
        }
    }, [date, text]);

    return (
        <Segment>
            <InputGroup prepend="日期" type="date" readonly={props.readonly} value1={ConvertDateToString(date)} setValue1={setDate} ref1={props.ref1} />
            <textarea
                ref={props.ref2}
                className="mt-3 w-100"
                rows={5}
                value={text}
                onChange={(e) => {
                    if (props.readonly == false) {
                        setText(e.target.value);
                    }
                }}
            />
        </Segment>
    )
}

export default RepairRecord
