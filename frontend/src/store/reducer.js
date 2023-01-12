import { addDays } from "date-fns";
import { SET_STORAGE_DATE, SET_STORAGE_TIME_IN, SET_STORAGE_TIME_OUT, SET_STORAGE_HOTEL, SET_STORAGE_TYPE_TIME, SET_STORAGE_TRAVELLER, SET_STORAGE_PRICE, SET_STORAGE_NUM_DAYS, ADD_EXTRAS, SET_TOGGLE } from "./constants"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let currDate = new Date()
let nextDate = addDays(new Date(), 1)
currDate = months[currDate.getMonth()] + ' ' + currDate.getDate() + ', ' + currDate.getFullYear()
nextDate = months[nextDate.getMonth()] + ' ' + nextDate.getDate() + ', ' + nextDate.getFullYear()

const initState = {
    hotel: 'Thành phố Hồ Chí Minh',
    typeOfTime: 'Overnight',
    traveller: 2,
    dateCheckIn: currDate,
    dateCheckOut: nextDate,
    timeCheckIn: '',
    timeCheckOut: '',
    price: 0,
    numOfDays: 0,
    extras: [],
    toggle: ''
}

function reducer( state, action ) {
    switch ( action.type ) {
        case SET_STORAGE_DATE:
            return {
                ...state,
                dateCheckIn: action.payload[0],
                dateCheckOut: action.payload[1]
            }
        case SET_STORAGE_TIME_IN:
            return {
                ...state,
                timeCheckIn: action.payload,
            }
        case SET_STORAGE_TIME_OUT:
            return {
                ...state,
                timeCheckOut: action.payload,
            }
        case SET_STORAGE_HOTEL:
            return {
                ...state,
                hotel: action.payload
            }
        case SET_STORAGE_TYPE_TIME:
            return {
                ...state,
                typeOfTime: action.payload
            }
        case SET_STORAGE_TRAVELLER:
            return {
                ...state,
                traveller: action.payload
            }
        case SET_STORAGE_PRICE:
            return {
                ...state,
                price: action.payload
            }
        case SET_STORAGE_NUM_DAYS:
            return {
                ...state,
                numOfDays: action.payload
            }
        case ADD_EXTRAS:
            return {
                ...state,
                extras: action.payload
            }
        case SET_TOGGLE:
            return {
                ...state,
                toggle: action.payload
            }
        default:
            throw new Error('Invalid action')
    }
}

export { initState }
export default reducer