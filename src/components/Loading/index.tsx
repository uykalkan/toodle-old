import React from 'react';
import {Spin} from "antd";

const Loading: React.FC = () => {

    return (
        <div style={{
            display: "flex",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: 'rgba(255,255,255,0.7)',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
        }}>
            <Spin spinning/>
        </div>
    );
};

export default Loading;