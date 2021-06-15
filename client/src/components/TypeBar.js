import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";

import {Context} from "../index";

export const TypeBar = observer(() => {
    const {device} = useContext(Context);

    const onCLickType = (type) => {
        if (device.selectedType.id !== type.id) {
            device.setSelectedType(type);
        } else {
            device.setSelectedType({});
        }
    };

    return (
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === device.selectedType.id}
                    onClick={() => onCLickType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});
