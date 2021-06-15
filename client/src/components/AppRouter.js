import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {observer} from "mobx-react-lite";

import {authRoutes, publicRoutes} from "../routes";
import {ROUTES} from "../utils/consts";
import {Context} from "../index";

export const AppRouter = observer(() => {
    const {user} = useContext(Context)

    const renderRoutesByGroup = (groupRoutes) =>
        groupRoutes.map(({path, Component}) =>
            <Route key={path} path={path} component={Component} exact />
        );

    return (
        <Switch>
            {user.isAuth && renderRoutesByGroup(authRoutes)}
            {renderRoutesByGroup(publicRoutes)}
            <Redirect to={ROUTES.HOME}/>
        </Switch>
    );
});
