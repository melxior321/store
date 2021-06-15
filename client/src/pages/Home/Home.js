import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { Slider } from '../../components';
import {ROUTES} from "../../utils/consts";

import Atol from './img/atol.jpg';
import Viki from './img/viki.jpeg';
import StrokeM from './img/stroke_m.jpg';

export const Home = () => (
    <>
        <Slider />
        <Container style={{paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Row>
                <Col>
                    <Card style={{width: '18rem', height: '33rem'}}>
                        <Card.Img variant="top" src={Atol} />
                        <Card.Body>
                            <Card.Title>Кассы АТОЛ</Card.Title>
                            <Card.Text>
                                Компания АТОЛ - IT-лидер в области автоматизации ритейла, торговли и сферы услуг.
                            </Card.Text>
                            <Button variant="danger"><a style={{color : 'white'}} href={ROUTES.CATALOG}>Каталог</a></Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{width: '17rem'}}>
                        <Card.Img variant="top" src={Viki} />
                        <Card.Body>
                            <Card.Title>Кассы Дримкасс</Card.Title>
                            <Card.Text>
                                Компания Дриммкасс - производит онлайн-кассы и разрабатываем сервисы для приемки и учета товаров, анализа бизнеса.
                            </Card.Text>
                            <Button variant="success"><a style={{color : 'white'}} href={ROUTES.CATALOG}>Каталог</a></Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{width: '17rem'}}>
                        <Card.Img variant="top" src={StrokeM} />
                        <Card.Body>
                            <Card.Title>Кассы штрих-м</Card.Title>
                            <Card.Text>
                                Компания «ШТРИХ-М» — ведущий российский разработчик и производитель высокотехнологичных систем автоматизации бизнеса
                            </Card.Text>
                            <Button variant="dark"><a style={{color : 'white'}} href={ROUTES.CATALOG}>Каталог</a></Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
);
