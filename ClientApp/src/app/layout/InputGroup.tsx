import React, { Fragment } from 'react'

const InputGroup = (props: { prepend: string, type: string, placeholder?: string, className?: string, multipleInput?: boolean, readonly: boolean, value1?: any, value2?: string }) => {
    return (
        <div className={`input-group d-inline-flex ${props.className}`}>
            <div className="input-group-prepend">
                <span className="input-group-text">{props.prepend}</span>
            </div>
            <input
                type={props.type}
                className="form-control"
                placeholder={props.placeholder}
                readOnly={props.readonly}
                defaultValue={props.value1}
            />
            {
                !props.multipleInput ? null :
                    <Fragment>
                        <div className="input-group-prepend">
                            <span className="input-group-text">至</span>
                        </div>
                        <input
                            type={props.type}
                            className="form-control"
                            placeholder={props.placeholder}
                            readOnly={props.readonly}
                            defaultValue={props.value2}
                        />
                    </Fragment>
            }
        </div>
    )
}

export default InputGroup
