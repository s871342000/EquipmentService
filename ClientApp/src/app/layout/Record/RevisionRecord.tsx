import React from 'react'
import { Segment } from 'semantic-ui-react'
import { ConvertDateToString } from '../Converter'
import InputGroup from '../InputGroup'

const RevisionRecord = (props: { readonly: boolean, record?: { date: Date; version: string } }) => {
    return (
        <Segment>
            <div className="row">
                <div className="col">
                    <InputGroup prepend="日期" type="date" readonly={props.readonly} value1={ConvertDateToString(props.record?.date)} />
                </div>
                <div className="col">
                    <InputGroup prepend="版本" type="text" placeholder="請輸入版本" readonly={props.readonly} value1={props.record?.version} />
                </div>
            </div>
        </Segment>
    )
}

export default RevisionRecord
