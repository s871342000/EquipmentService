import React, { useState } from "react"
import { Segment, TextArea } from "semantic-ui-react"
import { ConvertDateToString } from "../Converter";
import InputGroup from "../InputGroup"

const RepairRecord = (props: { readonly: boolean; record?: { comment: string; date: Date; } }) => {
    const [text, setText] = useState(props.record?.comment);
    return (
        <Segment>
            <InputGroup prepend="日期" type="date" readonly={props.readonly} value1={ConvertDateToString(props.record?.date)} />
            <TextArea
                className="mt-3 w-100"
                rows="5"
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
