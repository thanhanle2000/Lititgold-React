import axios from "axios";
import { atom, selector } from "recoil"
import { cart_url, URL } from "../../../utils/constants";
// lấy id address
export const idAddress = atom({
    key: "idAddress",
    default: {
        address: {
            idPro: 0,
            idDis: 0,
            idWard: 0
        }
    }
})
const lstCart = JSON.parse(localStorage.getItem('cart') || "[]");

export const getDataCart = selector({
    key: "getDataCart",
    get: async ({ get }) => {
        const id = get(idAddress);
        const param = {
            "voucherCode": "",
            "provId": id.address.idPro,
            "cityId": id.address.idDis,
            "areaId": id.address.idWard,
            "lstProds": lstCart
        }
        const { data } = await axios.post(URL + cart_url + "/GetDataShopCarts?domainName=litigold.vn", param);
        return data;
    }
})