import {atom } from 'recoil'

export const itemsincart = atom({
    key:'itemsincart',
    default: []
})

export const noofitemsincart = atom({
    key :'noofitemsincart',
    default:0
})