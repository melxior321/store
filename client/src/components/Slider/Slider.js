import React from 'react';
import {Carousel, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './Slider.module.css';

export const Slider = () => {

    return (
        <div>
            <Carousel>
                <Carousel.Item style={{height: '400px'}}>
                    <div className={styles.imgCar}>
                        <div className={styles.overlay} />
                    </div>
                    <Carousel.Caption>
                        <h3 style={{color: 'white'}}>Услуги по обслуживанию</h3>
                        <h4 style={{color: 'white'}}>ЦТО (ЦЕНТР ТЕХОБСЛУЖИВАНИЯ)</h4>
                        <p>Обслуживание</p>
                        <p>Ремонт</p>
                        <p>Постановка на учет и снятие с учета в ИФНС</p>
                        <p>Обучение персонала</p>
                        <p>Консультирование</p>
                        <p>Монтаж</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{height: '400px'}}>
                    <div className={styles.dp}>
                        <div className={styles.overlay} />
                    </div>
                    <Carousel.Caption>
                        <div style={{color: 'white', fontWeight: '900'}}>
                            <h4 style={{color: 'white'}}>ОТДЕЛ КОМПЛЕКСНЫХ ПРОДУКТОВ</h4>
                            <p>Внедрение (настройка торгового оборудования, программного обеспечения, обучение
                                сотрудников) </p>
                            <p>Поддержка (сопровождение торгового оборудования, программного обеспечения, консультации
                                сотрудников)</p>
                            <p>Разовые услуги</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{height: '400px'}}>
                    <div className={styles.ac}>
                        <div className={styles.overlay} />
                    </div>
                    <Carousel.Caption>
                        <div style={{color: 'white', fontWeight: '600'}}>
                            <h4 style={{color: 'white'}}>АНТИКРАЖНЫЕ СИСТЕМЫ</h4>
                            <p>Обслуживание</p>
                            <p>Ремонт </p>
                            <p>Обучение персонала </p>
                            <p>Консультирование</p>
                            <p>Монтаж</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
};

