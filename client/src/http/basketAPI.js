import {$authHost} from "./index";


export const getDevicesFromBasket = async () => {
    const {data} = await $authHost.get('api/basket/');
    return data;
};

export const removeDevicesFromBasket = async (deviceId) => {
    const {data} = await $authHost.delete(`api/basket/device/${deviceId}`);
    return data;
}
