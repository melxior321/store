import React, {useEffect, useState} from "react";
import {Dropdown} from 'react-bootstrap';

import styles from './AutocompleteSelect.module.css';

export const AutocompleteSelect = (props) => {
    const {
        initValue = '',
        debounceCountChar = 1,
        onChange = null,
        placeholder = '',
        options = [],
        classNameContainer
    } = props;
    const [value, setValue] = useState(initValue);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (!!options.length && value.length > debounceCountChar && showDropdown) {
           setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }, [options])

    const inputOnChange = (ev) => {
        const newValue = ev.target.value;
        setValue(newValue);
        if (onChange) {
            onChange({ key: Math.random(), value: newValue, text: newValue })
        }
        setShowDropdown(newValue.length > debounceCountChar)
    }

    const selectDropdownItem = (value) => {
        setValue(value);
        setShowDropdown(false);
        if (onChange) {
            onChange({ key: Math.random(), value: value, text: value })
        }
    }

    const renderDropDownList = () =>
        options.map((option, index) => (
            <Dropdown.Item
                key={index}
                eventKey={option.value}
                onClick={() => selectDropdownItem(option.value)}
            >
                {option.text}
            </Dropdown.Item>
        ));

    return (
        <Dropdown>
            <input
                className="form-control"
                value={value}
                onChange={inputOnChange}
                placeholder={placeholder}
            />
            {!!options.length&& (
                <Dropdown.Menu
                    show={showDropdown}
                    className={showDropdown && styles.dropdownMenuActive}
                >
                    {renderDropDownList()}
                </Dropdown.Menu>
            )}
        </Dropdown>
    );
};
