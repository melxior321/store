import {$authHost, $host} from "./index";

export const addToBasket = async (device) => {
    const {data} = await $authHost.put('api/basket/', {device})
    return data;
};

export const removeFromBasket = async (device) => {
    const {data} = await $authHost.delete('api/basket/device', {device})
    return data;
};
