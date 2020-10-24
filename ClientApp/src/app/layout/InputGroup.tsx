import React, { Fragment } from 'react'
import { ConvertDateToString } from '../models/Converter'

interface props {
    hide?: boolean,
    editable?: boolean,
    prepend: string,
    type: string,
    placeholder?: string,
    className?: string,
    multipleInput?: boolean,
    readonly: boolean,
    value1?: any,
    value2?: any,
    ref1: any;
    ref2?: any,
    setValue1(value1?: any): void,
    setValue2?(value2?: any): void
}

const InputGroup = (props: props) => {
    const defaultDate = (value?: any) => {
        if (props.type == "date") {
            return ConvertDateToString(value);
        }
        else {
            return value;
        }
    }

    return (
        <div className={`input-group ${props.className} ${!props.hide ? "d-inline-flex" : "d-none"}`}>
            <div className="input-group-prepend">
                <span className="input-group-text">{props.prepend}</span>
            </div>
            <input
                ref={props.ref1}
                type={props.type}
                className="form-control"
                placeholder={props.placeholder}
                readOnly={props.editable || props.readonly}
                value={defaultDate(props.value1)}
                onChange={(e) => props.setValue1(e.target.value)}
            />
            {
                !props.multipleInput ? null :
                    <Fragment>
                        <div className="input-group-prepend">
                            <span className="input-group-text">至</span>
                        </div>
                        <input
                            ref={props.ref2}
                            type={props.type}
                            className="form-control"
                            placeholder={props.placeholder}
                            readOnly={props.readonly}
                            value={defaultDate(props.value2)}
                            onChange={(e) => {
                                if (props.setValue2) {
                                    props.setValue2(e.target.value)
                                }
                            }}
                        />
                    </Fragment>
            }
        </div>
    )
}

export default InputGroup
