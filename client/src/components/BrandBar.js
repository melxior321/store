import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Row} from "react-bootstrap";

import {Context} from "../index";

export const BrandBar = observer(() => {
    const {device} = useContext(Context);

    const onClickBrand = (brand) => {
        if (device.selectedBrand.id !== brand.id) {
            device.setSelectedBrand(brand);
        } else {
            device.setSelectedBrand({});
        }
    };

    return (
        <Row className="d-flex">
            {device.brands.map(brand =>
                <Card
                    style={{cursor:'pointer'}}
                    key={brand.id}
                    className="p-3"
                    onClick={() => onClickBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

