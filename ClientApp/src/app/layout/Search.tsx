import React, { Fragment } from 'react'
import { Select } from 'semantic-ui-react'
import { IOption } from '../interfaces/ISearch'

interface IProps {
    options: IOption[],
    placeholder: string
    handleChange(e: any, data: any): void
}

const Search = (props: IProps) => {
    return (
        <Fragment>
            <Select onChange={props.handleChange} className="mb-2 mr-2 w-auto" placeholder={props.placeholder} options={props.options} />
        </Fragment>
    )
}

export default Search
