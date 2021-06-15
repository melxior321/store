import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {observer} from "mobx-react-lite";

import {AutocompleteSelect} from '../AutocompleteSelect/AutocompleteSelect';

import {Context} from "../../index";
import {createDevice, fetchBrands, fetchTypes, updateDevice, fetchInfoByTerm} from "../../http/deviceAPI";
import useDebounce from "../../hooks/useDebounce";

export const CreateDevice = observer((props) => {
    const {show, onHide, deviceData = null} = props;
    const {device} = useContext(Context);

    const [deviceId, setDeviceId] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [infoList, setInfoList] = useState([]);
    const debounceSearch = useDebounce(searchProperties, 500);

    const editModeModal = deviceData?.id ? 'Обновить' : 'Добавить';

    const deviceFormInit = (deviceInfo) => {
        setDeviceId(deviceInfo.id);
        setName(deviceInfo.name);
        setPrice(deviceInfo.price);
        setFile(deviceInfo.img);
        setInfo(deviceInfo.info.map(property => ({ ...property, number: Math.random()})));
        setSelectedType(device.types.find(el => el.id === deviceInfo.typeId));
        setSelectedBrand(device.brands.find(el => el.id === deviceInfo.brandId));
    }

    async function searchProperties(term) {
        const infoList = await fetchInfoByTerm(term);
        const options = infoList.map(info =>
            ({...info, text: info.value, key: Math.random()})
        );
        setInfoList(options || []);
    }

    const autocompleteOnChange = (option, number, fieldName) => {
        changeInfo(fieldName, option.value, number);
        if (option.value.length > 2) {
            debounceSearch(option.value);
        } else {
            setInfoList([])
        }
    }

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        if(deviceData) {
            deviceFormInit(deviceData);
        }
    }, []);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (index) => {
        info.splice(index, 1);
        setInfo([...info])
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', selectedBrand?.id);
        formData.append('typeId', selectedType?.id);
        formData.append('info', JSON.stringify(info));
        (deviceId
            ? updateDevice(formData, deviceId)
            : createDevice(formData)
        ).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {editModeModal} устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedType?.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedBrand?.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map((i, index) =>
                        <Row className="mt-4" key={index}>
                            <Col md={4}>
                                <AutocompleteSelect
                                    initValue={i.title}
                                    debounceCountChar={2}
                                    onChange={(option) =>autocompleteOnChange(option, i.number, 'title')}
                                    placeholder="Введите название свойства"
                                    options={infoList}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(index)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>{editModeModal}</Button>
            </Modal.Footer>
        </Modal>
    );
});
