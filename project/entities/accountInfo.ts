import { AccountTitle } from "@entities/accountTitle";

export type AccountInfo = {
    title: AccountTitle,
    username: string,
    email: string,
    password: string,
    dayOfBirth: number,
    monthOfBirth: string,
    yearOfBirth: number,
    newsletter: boolean,
    specialOffers: boolean,
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobileNumber: string
}
