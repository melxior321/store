import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";

import {check} from "./http/userAPI";
import { AppRouter, NavBar, Footer } from "./components";
import {Context} from "./index";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(data.user)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <NavBar />
            <div>
                <AppRouter />
            </div>
            <Footer />
        </BrowserRouter>
    );
});

export default App;
