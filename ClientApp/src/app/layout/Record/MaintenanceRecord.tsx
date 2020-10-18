import React, { useState } from 'react'
import { Segment, TextArea } from 'semantic-ui-react'
import { ConvertDateToString } from '../Converter'
import InputGroup from '../InputGroup'

const MaintenanceRecord = (props: { readonly: boolean, record?: { date: Date; items: [] } }) => {
    const [text, setText] = useState("");

    return (
        <Segment>
            <InputGroup prepend="日期" type="date" readonly={props.readonly} value1={ConvertDateToString(props.record?.date)} />
            <TextArea
                className="mt-3 w-100"
                rows="5"
                value={props.record?.items.join("\n")}
                onChange={(e) => {
                    if (props.readonly == false) {
                        setText(e.target.value);
                    }
                }}
            />
        </Segment>
    )
}

export default MaintenanceRecord
