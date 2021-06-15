import React, {useContext, useEffect} from 'react';
import {Container, DropdownButton, Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";
import { TypeBar, BrandBar, DeviceList, Paginator } from "../../components";
import {Context} from "../../index";

import styles from './Shop.module.css';

export const Shop = observer(() => {
    const {device} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.limit, device.selectedType, device.selectedBrand,])

    return (
        <Container className={styles.shopContainer}>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Paginator/>
                </Col>
            </Row>
        </Container>
    );
});

