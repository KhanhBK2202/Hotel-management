import { SET_STORAGE_DATE, SET_STORAGE_TIME_IN, SET_STORAGE_TIME_OUT, SET_STORAGE_HOTEL, SET_STORAGE_TYPE_TIME, SET_STORAGE_TRAVELLER, SET_STORAGE_PRICE, SET_STORAGE_NUM_DAYS, ADD_EXTRAS, SET_TOGGLE } from './constants'

export const setStorageDate = payload => ({
    type: SET_STORAGE_DATE,
    payload
})

export const setStorageTimeIn = payload => ({
    type: SET_STORAGE_TIME_IN,
    payload
})

export const setStorageTimeOut = payload => ({
    type: SET_STORAGE_TIME_OUT,
    payload
})

export const setStorageHotel = payload => ({
    type: SET_STORAGE_HOTEL,
    payload
})

export const setStorageTypeTime = payload => ({
    type: SET_STORAGE_TYPE_TIME,
    payload
})

export const setStorageTraveller = payload => ({
    type: SET_STORAGE_TRAVELLER,
    payload
})

export const setStoragePrice = payload => ({
    type: SET_STORAGE_PRICE,
    payload
})

export const setStorageNumOfDays = payload => ({
    type: SET_STORAGE_NUM_DAYS,
    payload
})

export const addExtras = payload => ({
    type: ADD_EXTRAS,
    payload
})

export const setToggle = payload => ({
    type: SET_TOGGLE,
    payload
})