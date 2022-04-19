import React from 'react';
import {Modal, ModalProps} from "antd";

export interface FixedModalProps extends ModalProps {
    children: any
}

const FixedModal: React.FC<FixedModalProps> = (props) => {
    // @ts-ignore (ANTD TYPE HATASI DÜZELTİLDİ)
    return <Modal {...props}>{props.children}</Modal>
};

export default FixedModal;