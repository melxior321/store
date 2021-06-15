import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Dropdown, DropdownButton, Pagination as BootstrapPaginator} from "react-bootstrap";

import {Context} from "../../index";

import styles from './Pages.module.css';


const getPageCount = (totalCount, limit) => Math.ceil(totalCount / limit);

export const Paginator = observer(() => {
    const {device} = useContext(Context);
    const [ pageCount, setPageCount] = useState(0);


    useEffect(() => {
        setPageCount(getPageCount(device.totalCount, device.limit));
    }, [device.totalCount, device.limit]);

    const onSelectSizePage = (sizePage) => {
        const newPageCount = getPageCount(device.totalCount, sizePage);
        device.setLimit(sizePage);
        setPageCount(newPageCount);
        device.setPage(device.page > newPageCount ? newPageCount : device.page);
    }


    const getPaginatorItems = () => {
        const items = [];
        for (let index = 0; index < pageCount; index++) {
            items.push(
                <BootstrapPaginator.Item
                    key={index + 1}
                    active={device.page === index + 1}
                    onClick={() => device.setPage(index + 1)}
                >
                    {index + 1}
                </BootstrapPaginator.Item>
            )
        }
        return items;
    }

    return (
        <div className={styles.paginatorPanel}>
            <div className={styles.pageSizeContainer}>
                <span className={styles.pageSizeLabel}>отображать по: </span>
                <DropdownButton title={device.limit} onSelect={value => onSelectSizePage(value)}>
                        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
                        <Dropdown.Item eventKey={5}>5</Dropdown.Item>
                        <Dropdown.Item eventKey={10}>10</Dropdown.Item>
                        <Dropdown.Item eventKey={15}>15</Dropdown.Item>
                        <Dropdown.Item eventKey={30}>30</Dropdown.Item>
                        <Dropdown.Item eventKey={50}>50</Dropdown.Item>
                </DropdownButton>
            </div>
            <BootstrapPaginator className="mt-3">
                {getPaginatorItems()}
            </BootstrapPaginator>
        </div>
    );
});
