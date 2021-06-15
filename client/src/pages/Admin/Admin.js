import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import { CreateBrand, CreateDevice, CreateType } from "../../components";

export const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            {brandVisible && <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>}
            {deviceVisible && <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>}
            {typeVisible && <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>}
        </Container>
    );
};
