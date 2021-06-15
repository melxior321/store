import { Home, Basket, Auth, DevicePage, Admin, About, Shop } from "./pages";
import { ROUTES } from "./utils/consts";


export const authRoutes = [
    {
        path: ROUTES.ADMIN,
        Component: Admin
    },
    {
        path: ROUTES.BASKET,
        Component: Basket
    },
    {
        path: ROUTES.CATALOG,
        Component: Shop
    },
]

export const publicRoutes = [
    {
        path: ROUTES.HOME,
        Component: Home
    },
    {
        path: ROUTES.LOGIN,
        Component: Auth
    },
    {
        path: ROUTES.REGISTRATION,
        Component: Auth
    },
    {
        path: ROUTES.DEVICE + '/:id',
        Component: DevicePage
    },
    {
        path: ROUTES.ABOUT,
        Component: About
    },
]
