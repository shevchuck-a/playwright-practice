import { AccountTitle } from "@entities/accountTitle";

export type AccountInfo = {
    title?: AccountTitle | string,
    name?: string,
    email?: string,
    password?: string,
    birth_date?: number | string,
    birth_month?: string,
    birth_year?: number | string,
    newsletter?: boolean,
    specialOffers?: boolean,
    firstname?: string,
    lastname?: string,
    company?: string,
    address1?: string,
    address2?: string,
    country?: string,
    state?: string,
    city?: string,
    zipcode?: string,
    mobile_number?: string
}