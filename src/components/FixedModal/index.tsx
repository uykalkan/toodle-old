import React from 'react';
import {Modal, ModalProps} from "antd";

export interface FixedModalProps extends ModalProps {
    children: React.ReactNode
}

const FixedModal: React.FC<FixedModalProps> = (props) => {
    return <Modal {...props}>{props.children}</Modal>
};

export default FixedModal;