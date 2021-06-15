import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import {Button, Container, Image} from "react-bootstrap";
import {getDevicesFromBasket, removeDevicesFromBasket} from '../../http/basketAPI';
import {ROUTES} from "../../utils/consts";

import styles from './Basket.module.css';

export const Basket = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        getDevicesFromBasket().then(data => setDevices(data));
    }, []);

    const onClickRemoveDevice = async (device) => {
        const status = await removeDevicesFromBasket(device.id);
        getDevicesFromBasket().then(data => setDevices(data));
    };

    const openDevice = (device) => {
        window.location.href = `/device/${device.id}`;
    }

    const getTotalPrice = () => {
        return devices.reduce((acc, device) => acc + device.price, 0);
    }

    return (
        <Container className={styles.devicesList}>
            <div className={styles.deviceHeader}>
                <div>
                    <div></div>
                    <div></div>
                    <div>Наименование</div>
                    <div>Тип</div>
                    <div>Брэнд</div>
                    <div>Рейтинг</div>
                    <div>Цена</div>
                </div>
                <div></div>
            </div>
            {devices.map((device, index) => (
                <div key={index} className={styles.deviceRow}>
                    <div onClick={() => openDevice(device)}>
                        <div>{index + 1}</div>
                        <div>
                            <Image
                                src={process.env.REACT_APP_API_URL + device.img}
                                className={styles.deviceImg}
                            />
                        </div>
                        <div>{device.name}</div>
                        <div>{device.type.name}</div>
                        <div>{device.brand.name}</div>
                        <div>{device.rating}</div>
                        <div>{device.price}</div>
                    </div>
                    <div>
                        <Button onClick={() => onClickRemoveDevice(device)}>X</Button>
                    </div>
                </div>
            ))}
            {!devices.length && (
                <div className={styles.emptyBasket}>
                    В корзине нет товаров. Перейдите в {' '}
                    <NavLink to={ROUTES.CATALOG}>магазин</NavLink> {' '}
                    и добавте товары
                </div>
            )}
            {!!devices.length && (
                <div className={styles.totalRow}>
                    <div></div>
                    <div>Итог: {getTotalPrice()}</div>
                </div>
            )}
        </Container>
    );
};

