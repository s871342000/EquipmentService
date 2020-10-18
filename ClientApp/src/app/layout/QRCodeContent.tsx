import React from 'react'
import { Modal } from 'semantic-ui-react'
import DeviceDetail from '../layout/Device/DeviceDetail'

const QRCodeContent = (props: { sn: string }) => {
    return (
        <Modal open>
            <Modal.Content>
                <DeviceDetail sn={props.sn} />
            </Modal.Content>
        </Modal>
    )
}

export default QRCodeContent
