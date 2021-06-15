import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Card, Col, Image} from "react-bootstrap";
import jwt_decode from "jwt-decode";

import {Context} from "../../index";
import {deleteDevice, fetchDevices, fetchOneDevice} from "../../http/deviceAPI";
import {ROUTES, USER_ROLES} from "../../utils/consts";
import {CreateDevice} from "../modals/CreateDevice";

import styles from './DeviceList.module.css';
import star from "../../assets/star.png";
import TrashIcon from '../../assets/icons/trash.png';
import PencilIcon from '../../assets/icons/pencil.png';


const checkAdmin = () => {
    const token = localStorage.getItem('token');
    const { role } = jwt_decode(token);
    return role === USER_ROLES.ADMIN;
}

const DeviceItem = ({device, updateListCallback}) => {
    const history = useHistory();
    const [editDeviceData, setEditDeviceData] = useState(null);

    const isAdmin = checkAdmin();

    const removeDevice = async (device) => {
        await deleteDevice(device);
        updateListCallback();
    };

    const editDevice = async ({id}) => {
        const device = await fetchOneDevice(id);
        setEditDeviceData(device);
    }

    return (
        <Col md={3} className="mt-3" >
            <Card
                className={styles.deviceCard}
                border="light"
                onClick={() => history.push(ROUTES.DEVICE + '/' + device.id)}
            >
                <Image
                    className={styles.deviceCardImg}
                    src={process.env.REACT_APP_API_URL + device.img}
                />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{device.brand.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image className={styles.deviceCardStar} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
            {isAdmin && (
                <div className={styles.servicePanel}>
                    <Image
                        className={styles.serviceIcon}
                        src={PencilIcon}
                        onClick={() => editDevice(device)}
                    />
                    <Image
                        className={styles.serviceIcon}
                        src={TrashIcon}
                        onClick={() => removeDevice(device)}
                    />
                </div>
            )}
            {!!editDeviceData && (
                <CreateDevice
                    show={!!editDeviceData}
                    onHide={() => setEditDeviceData(null)}
                    deviceData={editDeviceData}
                />
            )}
        </Col>
    );
};

export const DeviceList = observer(() => {
    const {device} = useContext(Context);

    const updateDevicesList = () => {
        fetchDevices(null, null, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        });
    }

    return (
        <div className={styles.deviceContainer}>
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device} updateListCallback={updateDevicesList}/>
            )}
        </div>
    );
});

