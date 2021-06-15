import React, { useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom'
import { Navbar, Nav, Button, Container} from 'react-bootstrap';
import { observer } from "mobx-react-lite";

import { Context } from "../../index";
import { ROUTES } from "../../utils/consts";
import { logout } from "../../http/userAPI";

import styles from './NavBar.module.css';

export const NavBar = observer(() => {
    const {user} = useContext(Context)

    const logOut = async () => {
        await logout();
        user.setUser({})
        user.setIsAuth(false)
    };

    const authPanel = () => (
        <div>
            <NavLink style={{color: 'white'}} to={ROUTES.ADMIN}>Админка</NavLink>
            <Button
                variant={"outline-light"}
                onClick={() => logOut()}
                className="ml-2"
            >
                Выйти
            </Button>
        </div>
    );

    return (
        <Navbar bg="dark" variant="dark" className={styles.navBar}>
            <Container className={styles.navContainer}>
                <div>
                    <NavLink style={{color: 'red'}} to={ROUTES.HOME}>СОФТ СИБ</NavLink>
                    <NavLink style={{color: 'white'}} to={ROUTES.ABOUT}>О нас</NavLink>

                </div>
                {user.isAuth && <NavLink style={{color: 'white'}} to={ROUTES.CATALOG}>Магазин</NavLink>}
                {user.isAuth && <NavLink style={{color: 'white'}} to={ROUTES.BASKET}>Корзина</NavLink>}
                {user.isAuth && authPanel()}
                {!user.isAuth && (
                    <NavLink style={{color: 'white'}} to={ROUTES.LOGIN}>Авторизация</NavLink>
                )}
            </Container>
        </Navbar>
    );
});
