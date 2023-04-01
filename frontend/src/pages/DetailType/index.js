import { faCalendar, faCircleCheck, faHeart, faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBed, faCar, faCommentsDollar, faFan, faFaucet, faFireFlameCurved, faLocation, faLocationDot, faLocationPin, faMattressPillow, faMinus, faMoneyBill, faPlus, faShareNodes, faSoap, faTv, faUsers, faVault, faVectorSquare, faWater, faWaterLadder, faWifi, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { add, addDays, sub } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Calendar from '~/components/Calendar';
import Clock from '~/components/Clock';
import Comment from '~/components/Comment/Comment';
import DatePicker from '~/components/DatePicker';
import Image from '~/components/Image';
import InputSelect from '~/components/InputSelect';
import { actions, useStore } from '~/store';
import * as request from '~/utils/request';
import styles from './DetailType.module.scss'; 

const cx = classNames.bind(styles)

function DetailType() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken
    const id = user?._id

    const { roomId, hotelId } = useParams()
    const [room, setRoom] = useState()
    // useEffect(() => {
    //     const checkboxes = document.querySelectorAll('.' + cx('checkbox'))[5].childNodes[0]
    //     // console.log(checkboxes)
    //     if (checkboxes.checked === true) {
    //         console.log('hello')
    //     }
    // },[])
    const [option, setOption] = useState()
    // const [order, setOrder] = useState()
    // var options = []
    
    // useEffect(() => {
    //     if (option && order) {
    //         options[order] = option
    //     }
    // }, [options, option, order]);

    // const [option1, setOption1] = useState()
    useEffect(() => {
        const modal = document.querySelectorAll('.' + cx('modal'))
        let l = modal.length
        if (option === 'Hourly') {
            modal[l-2].classList.remove(cx('disappear'))
            modal[l-2].classList.add(cx('appear'))
        }
        else if (option === 'Overnight') {
            modal[l-1].classList.remove(cx('disappear'))
            modal[l-1].classList.add(cx('appear'))
        }
    },[option]);

    // Choose time for hourly
    // var timeInterval = []
    const d = new Date();
    
    // if (minute < 30) {
    //     let switchFlag = true
    //     if (hour >= 22 && minute > 0) {
    //         console.log('Cannot book for hourly. Please booking for overnight')
    //     }
    //     else {
    //         while (hour <= 22) {
    //             let minuteFlag = switchFlag ? '30' : '00'
    //             timeInterval.push(hour + ':' + minuteFlag)
    //             switchFlag = !switchFlag
    //             hour = switchFlag ? hour : hour + 1
    //             if (switchFlag === true && hour === 22) break
    //         }
    //     }
    // }
    // else {
    //     let switchFlag = true
    //     if (hour > 22 && minute > 0) {
    //         console.log('Cannot book for hourly. Please booking for overnight')
    //     }
    //     else {
    //         while (hour <= 21) {
    //             let minuteFlag = switchFlag ? '00' : '30'
    //             timeInterval.push(hour + 1 + ':' + minuteFlag)
    //             switchFlag = !switchFlag
    //             hour = switchFlag ? hour + 1 : hour
    //             if (switchFlag === false && hour + 1 === 22) break
    //         }
    //     }
    // }

    const [timeHourly, setTimeHourly] = useState(1)
    const handleTimeIntervalHourly = (e) => {
        setTimeHourly(e.target.value)
    }

    const handleOption = (op, order) => {
        if (d.getHours() >= 23 && op === 'Hourly') {
            const warn = document.querySelector('.' + cx('warn-text'))
            warn.style.display = 'block'
            return
        }
        setOption(op)
        dispatch(actions.setStorageTypeTime(op))
        // setOrder(order)
    }

    const handleClose = () => {
        const modal = document.querySelectorAll('.' + cx('modal'))
        for (const item of modal) {
            if (item.classList.value.includes(cx('appear')))
            {
                item.classList.remove(cx('appear'))
                item.classList.add(cx('disappear'))
            }
        }
    }

    const [state, dispatch] = useStore()

    const [hours, setHour] = useState(d.getHours())
    const [min, setMin] = useState(d.getMinutes())
    const addZero = (i) => {
        if (i < 10) {i = "0" + i}
        return i;
    }
    const [order, setOrder] = useState()
    const getTime = (h, m, o) => {
        setHour(h)
        setMin(m)
        setOrder(o)
        // let timeCheckIn, timeCheckOut
        // if (h || m || o) {
        //     if (option === 'Hourly') {
        //         timeCheckIn = h + ':' + m
        //         // timeCheckIn = timeArrive
        //         let hourLeave = addZero(parseInt(h) + parseInt(timeHourly))
        //         if (hourLeave > 23)
        //             hourLeave = hourLeave - 24
        //         timeCheckOut = hourLeave + ':' + m
        //         // timeCheckOut = timeLeave
        //     }
        //     else {
        //         if (o === 2)
        //             timeCheckIn = h + ':' + m
        //         else if (o === 3)
        //             timeCheckOut = h + ':' + m
        //     }
        //     console.log(timeCheckIn, timeCheckOut)
        //     // console.log(timeCheckIn, timeCheckOut)
        //     dispatch(actions.setStorageTime([timeCheckIn, timeCheckOut]))
        // }
    }

    const [dateArrive, setDateArrive] = useState(state.dateCheckIn)
    // const [dateLeave, setDateLeave] = useState(state.dateCheckOut)
    // let dateForHourly = new Date()
    const getDate = (date) => {
        // console.log(typeof date)
        let dateCustom = date.toString().slice(4, 10) + ', ' + date.toString().slice(11, 15)
        setDateArrive(dateCustom)
        dispatch(actions.setStorageDate([date, date]))
    }
    
    // const [timeCheckIn, setTimeCheckIn] = useState()
    // const [timeCheckOut, setTimeCheckOut] = useState()
    useEffect(() => {
        let timeCheckIn, timeCheckOut
        if (option === 'Hourly') {
            if (hours || min) {
                timeCheckIn = hours + ':' + min
                let hourLeave = addZero(parseInt(hours) + parseInt(timeHourly))
                if (hourLeave > 23)
                    hourLeave = hourLeave - 24
                timeCheckOut = hourLeave + ':' + min
                // console.log(timeCheckIn, timeCheckOut)
                dispatch(actions.setStorageTimeIn(timeCheckIn))
                dispatch(actions.setStorageTimeOut(timeCheckOut))
            }
        }
        else {
            if (order === '2') {
                if (hours || min) {
                    timeCheckIn = hours + ':' + min
                    // console.log(timeCheckIn)
                    dispatch(actions.setStorageTimeIn(timeCheckIn))
                }
            }
            else if (order === '3') {
                if (hours || min) {
                    timeCheckOut = hours + ':' + min
                    // console.log(timeCheckOut)
                    dispatch(actions.setStorageTimeOut(timeCheckOut))
                }
            }
        }
        
    },[dispatch, hours, min, timeHourly, option, order]);

    // const handleChange = (e) => {
    //     if (e.target.checked === true) {
    //         const modal = document.querySelectorAll('.' + cx('modal'))
    //         modal[2].classList.add(cx('appear'))
    //     }
    // }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const tomorrowFns = addDays(new Date(), 1)
    const tomorrow = '23:59 on ' + months[tomorrowFns.getMonth()] + ' ' + tomorrowFns.getDate() + ', ' + tomorrowFns.getFullYear()

    const [services, setServices] = useState([])
    const [servicesPrice, setServicesPrice] = useState([])
    const [getServices, setGetServices] = useState([])
    // const [price, setPrice] = useState()
    // price = số ngày * giá 1 ngày + các services
    // useEffect(() => {
    //     setPrice(state.numOfDays*42)
    //     dispatch(actions.setStoragePrice(price))
    // },[state.numOfDays, dispatch, price])

    const handleCheck = (e, i) => {
        if (e.target.checked){
            // console.log(services)
            // const newServicesArray = [...services]
            setServices([...services, e.target.value])
            setServicesPrice([...servicesPrice, getServices[i].price])
            // services.push(e.target.id)
        }
        else {
            const index = services.indexOf(e.target.value);
            // const newServicesArray = [...services]
            setServices(services.splice(index, 1))
            setServicesPrice(servicesPrice.splice(index, 1))
            // services.splice(index, 1);
        }
    }

    const [adultsValue, setAdultsValue] = useState(state.traveller)

    const handleIncreaseAdults = () => {
        const minus = document.querySelectorAll('.' + cx('minus-adults'))
        minus[0].classList.remove(cx('inactive'))
        setAdultsValue(prev => prev + 1)
    }
    const handleDecreaseAdults = () => {
        const minus = document.querySelectorAll('.' + cx('minus-adults'))
        if (adultsValue === 1)
            minus[0].classList.add(cx('inactive'))
        else setAdultsValue(prev => prev - 1)
    }

    const [roomValue, setRoomValue] = useState(1)
    const handleIncreaseRooms = () => {
        const minus = document.querySelectorAll('.' + cx('minus-adults'))
        minus[1].classList.remove(cx('inactive'))
        setRoomValue(prev => prev + 1)
    }
    const handleDecreaseRooms = () => {
        const minus = document.querySelectorAll('.' + cx('minus-adults'))
        if (roomValue === 1)
            minus[1].classList.add(cx('inactive'))
        else setRoomValue(prev => prev - 1)
    }

    useEffect(() => {
        request 
            .get(`/api/v1/roomType/${roomId}/${hotelId}`)
            .then(res => {
                setRoom(res)
                setHotelName(res.hotel.name)
            })
            .catch(err => console.log(err))
    },[roomId, hotelId])

    const [hotelName, setHotelName] = useState()
    useEffect(() => {
        request
            .get('/api/v1/hotel/all-services')
            .then(res => setGetServices(res))
            .catch(err => console.log(err))
    },[])

    let timeInterval = parseInt(state.timeCheckOut.slice(0,2)) - parseInt(state.timeCheckIn.slice(0,2))
    // const [breakfastPrice, setBreakfastPrice] = useState(0)
    const [roomPrice, setRoomPrice] = useState(0)
    const [servicePrice, setServicePrice] = useState(0)
    // const [taxPrice, setTaxPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    // const [room, setRoom] = useState([])
    useEffect(() => {
        // if (cart.length !== 0) {
            if (option === 'Hourly') {
                // timeInterval = parseInt(cart[0].timeCheckOut.slice(0,2)) - parseInt(cart[0].timeCheckIn.slice(0,2))
                setRoomPrice((parseInt(room?.priceHour) + parseInt(room?.priceNextHour)*(timeInterval - 1))*parseInt(roomValue))
            }
            else {
                setRoomPrice(parseInt(room?.priceOverNight)*parseInt(state.numOfDays)*parseInt(roomValue))
            }
    
            // Calc service price
            for (let i = 0; i < services.length; i++) {
                if (services[i].includes('Breakfast')) {
                    // setBreakfastPrice(adultsValue*servicesPrice[i])
                    setServicePrice(prevServicesPrice => parseInt(prevServicesPrice) + parseInt(adultsValue)*parseInt(servicesPrice[i]))
                }
                else {
                    // console.log(servicesPrice + cart[0]?.servicePrice[i])
                    setServicePrice(prevServicesPrice => parseInt(prevServicesPrice) + parseInt(servicesPrice[i]))
                }
            } 
        // }
    },[room, adultsValue, roomValue, option, servicesPrice])

    useEffect(() => {
        setTotalPrice(roomPrice + servicePrice)
    },[roomPrice, servicePrice])

    useEffect(() => {
        dispatch(actions.setStorageHotel(hotelName))
        dispatch(actions.setStorageTraveller(adultsValue))
        dispatch(actions.addExtras(services))
    },[dispatch, adultsValue, hotelName, services]);

    const handleBooking = () => {
        // console.log(state.hotel, state.typeOfTime, state.dateCheckIn, state.dateCheckOut, state.timeCheckIn, state.timeCheckOut)
        // dispatch(actions.setStorageTraveller(adultsValue))
        if (JSON.parse(localStorage.getItem('cart')))
        {
            const prevState = JSON.parse(localStorage.getItem('cart'))
            let copyState = {...state}
            delete copyState.toggle
            copyState.roomId = room._id
            copyState.hotelId = room.hotel._id
            copyState.numRooms = roomValue
            copyState.servicePrice = servicesPrice
            prevState.push(copyState)
            localStorage.setItem('cart', JSON.stringify(prevState))
        }
        else {
            let copyState = {...state}
            delete copyState.toggle
            copyState.roomId = room._id
            copyState.hotelId = room.hotel._id
            copyState.numRooms = roomValue
            copyState.servicePrice = servicesPrice
            const arrayState = [copyState]
            localStorage.setItem('cart', JSON.stringify(arrayState))
        }
    }

    // const [total, setTotal] = useState(0)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('name')}>{room?.type}</h1>
                <div className={cx('header-utility')}>
                    {/* <div className={cx('header-utility-item')}>
                        <FontAwesomeIcon className={cx('')} icon={faShareNodes}/>
                    </div> */}
                    <div className={cx('header-utility-item')}>
                        <FontAwesomeIcon className={cx('')} icon={faHeart}/>
                    </div>
                </div>
            </div>
            <div className={cx('imgs')}>
                <div className={cx('imgs-left')}>
                    <img className={cx('img-left')} src={room?.thumbnail} alt=''/>
                </div>
                <div className={cx('imgs-right')}>
                    {room?.images.map((image, index) => (
                        <img key={index} className={cx('img-right')} src={image} alt=''/>
                    ))}
                    {/* <img className={cx('img-right')} src='https://pix8.agoda.net/hotelImages/4410268/-1/c4c59d66f5e8f391bb1f2eeabd150406.jpg?ca=12&ce=1&s=1024x768' alt=''/>
                    <img className={cx('img-right')} src='https://pix8.agoda.net/hotelImages/4410268/-1/1119bb55b12ff57f9b5c742c4f0cf3d6.jpg?ca=12&ce=1&s=1024x768' alt=''/> */}
                    {/* <img className={cx('img-right')} src='https://pix8.agoda.net/hotelImages/4410268/-1/1119bb55b12ff57f9b5c742c4f0cf3d6.jpg?ca=12&ce=1&s=1024x768' alt=''/> */}
                    {/* <div className={cx('img-right-more')}>
                        <div className={cx('img-right-more-title')}>+15 Photos &gt;</div>
                    </div> */}
                </div>
            </div>

            <div className={cx('container')}>
                <div className={cx('left')}>
                
                    <h2 className={cx('heading')}>Details</h2>
                    <div className={cx('detail')}>
                        {/* <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faUser} />
                            <div className={cx('accordion__')}>2 Adults</div>
                        </div>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faVectorSquare} />
                            <div className={cx('accordion__')}>49 m2</div>
                        </div>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faBed} />
                            <div className={cx('accordion__')}>1 Bedroom</div>
                        </div>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faStar} />
                            <div className={cx('content')}>4</div>
                        </div> */}

                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faUser} />
                            <div className={cx('content')}>{room?.numOfPeople} Adults</div>
                        </div>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faVectorSquare} />
                            <div className={cx('content')}>{room?.size} m<sup>2</sup></div>
                        </div>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faBed} />
                            <div className={cx('content')}>1 Bedroom</div>
                        </div>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faStar} />
                            <div className={cx('content')}>4</div>
                        </div>
                    </div>
                    <p className={cx('description')} dangerouslySetInnerHTML={{__html: room?.description}}/>
                    <h4 className={cx('room-utilities')}>
                        <FontAwesomeIcon style={{marginRight: '10px'}} icon={faLocationDot}/>
                        {room?.hotel.name} ({room?.hotel.address})
                    </h4>
                    <h4 className={cx('room-utilities')}>
                        <FontAwesomeIcon style={{marginRight: '10px'}} icon={faCalendar}/>
                        Free cancellation until {tomorrow}
                    </h4>

                    <h2 className={cx('heading')}>Hotel Amenities</h2>
                    <div className={cx('amenities')}>
                        <div className={cx('feature')}>
                            <img className={cx('feature-img')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1671381535/Miscellaneous%20pics/27dfba7a1b4130542f5dafc347a1a5cd_smgmlm.jpg' alt='feature1'/>
                            <div className={cx('feature-body')}>
                                <span className={cx('feature-title')}>Feature #1</span>
                                <h4 className={cx('feature-content')}>Electronic Check-in and check-out</h4>
                            </div>
                        </div>
                        <div className={cx('feature')}>
                            <img className={cx('feature-img')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1671381565/Miscellaneous%20pics/eca413aeec3a93c40bd53d293b421a60_eqtmq9.jpg' alt='feature2'/>
                            <div className={cx('feature-body')}>
                                <span className={cx('feature-title')}>Feature #2</span>
                                <h4 className={cx('feature-content')}>Free Housekeeping Services</h4>
                            </div>
                        </div>
                        <div className={cx('feature')}>
                            <img className={cx('feature-img')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1671381586/Miscellaneous%20pics/workspace-clean-cartoon-with-computers-flower-pots-books-chairs-and-desk-vector_xwyues.jpg' alt='feature3'/>
                            <div className={cx('feature-body')}>
                                <span className={cx('feature-title')}>Feature #3</span>
                                <h4 className={cx('feature-content')}>Workspace Ready</h4>
                            </div>
                        </div>
                        <div className={cx('feature')}>
                            <img className={cx('feature-img')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1671381611/Miscellaneous%20pics/depositphotos_13392871-stock-illustration-customer-service-representative-at-computer_kxxygh.webp' alt='feature4'/>
                            <div className={cx('feature-body')}>
                                <span className={cx('feature-title')}>Feature #4</span>
                                <h4 className={cx('feature-content')}>24/7 Contact Support</h4>
                            </div>
                        </div>

                        <div className={cx('feature-time')}>
                            <div className={cx('check-time')}>
                                <span className={cx('feature-title')}>Check-in Time</span>
                                <h4 className={cx('feature-content')}>2PM</h4>
                                <div className={cx('feature-title')}>Early Check-in Upon Request</div>
                            </div>
                            <div className={cx('check-time')}>
                                <span className={cx('feature-title')}>Check-out Time</span>
                                <h4 className={cx('feature-content')}>12PM</h4>
                                <div className={cx('feature-title')}>Late Check-out Upon Request</div>
                            </div>
                        </div>
                    </div>
                    <h2 className={cx('heading')}>What this room offers</h2>

                    <div className={cx('room-offer')}>
                        {/* <div className={cx('room-offer__left')}>
                            <div className={cx('room-offer__item')}>
                                <FontAwesomeIcon style={{marginRight: '10px', width: '50px'}} icon={faWifi}/>
                                Wifi
                            </div>
                            <div className={cx('room-offer__item')}>
                                <FontAwesomeIcon style={{marginRight: '10px', width: '50px'}} icon={faFan}/>
                                Air conditioning
                            </div>
                            <div className={cx('room-offer__item')}>
                                <FontAwesomeIcon style={{marginRight: '10px', width: '50px'}} icon={faWater}/>
                                Sea view
                            </div>
                            <div className={cx('room-offer__item')}>
                                <FontAwesomeIcon style={{marginRight: '10px', width: '50px'}} icon={faWaterLadder}/>
                                Shared pool
                            </div>
                            <div className={cx('room-offer__item')}>
                                <FontAwesomeIcon style={{marginRight: '10px', width: '50px'}} icon={faFireFlameCurved}/>
                                Smoke alarm
                            </div>
                        </div>
                        <div className={cx('room-offer__right')}>
                            <div className={cx('room-offer__item')}>
                                <FontAwesomeIcon style={{marginRight: '10px', width: '50px'}} icon={faVault}/>
                                Safe
                            </div>
                            <div className={cx('room-offer__item')}>
                                <FontAwesomeIcon style={{marginRight: '10px', width: '50px'}} icon={faTv}/>
                                TV
                            </div>
                            <div className={cx('room-offer__item')}>
                                <FontAwesomeIcon style={{marginRight: '10px', width: '50px'}} icon={faFaucet}/>
                                Hot water
                            </div>
                            <div className={cx('room-offer__item')}>
                                <FontAwesomeIcon style={{marginRight: '10px', width: '50px'}} icon={faSoap}/>
                                Essentials
                            </div>
                            <div className={cx('room-offer__item')}>
                                <FontAwesomeIcon style={{marginRight: '10px', width: '50px'}} icon={faMattressPillow}/>
                                Bed linens
                            </div>
                        </div> */}
                        {room?.features.map((feature, index) => (
                            <div key={index} className={cx('room-offer__item')}>
                                <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                                {feature}
                            </div>
                        ))}
                        {/* <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            IOT Drapes
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            Mini-Bar
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            A/C
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            ADA Room
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            IOT TV
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            Large Closet
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            Black-out Curtains
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            Small Room
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            IOT Lights
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            Bath Tub
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            Private Pool
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            Living Room
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            Door Locks On-Line
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            Free Wi-Fi
                        </div>
                        <div className={cx('room-offer__item')}>
                            <FontAwesomeIcon className={cx('room-offer__icon')} icon={faCircleCheck}/>
                            Security Safe
                        </div> */}
                    </div>
                </div>
                <div className={cx('right')}>
                    <h2 className={cx('heading-right')}>${room?.priceOverNight}/night</h2>
                    <div className={cx('line')}></div>

                    <div className={cx('booking')}>
                        <InputSelect className={cx('date-select')} data={['Hourly', 'Overnight']} order='0' placeholder={state.typeOfTime} option={handleOption}/>
                        <div className={cx('warn-text')}>Cannot book for hourly. Please booking for overnight</div>
                        {/* <div className={cx('calendar')}>
                            <Calendar/>
                        </div> */}
                        {/* <div className={cx('total-night')}>
                            <span className={cx('')}>2 nights</span>
                            <div className={cx('')}>$84</div>
                        </div> */}
                        <div className={cx('line')} style={{ margin: '25px 0 20px 0'}}></div>
                        {/* <div className={cx('search-input')}> */}
                            <h3 className={cx('search-input-title')}>Travelers</h3>
                            {/* <InputSelect data={input3} order='3' icon='location' placeholder='2' option={handleOption}/> */}
                            <div className={cx('counter')}>
                                <FontAwesomeIcon icon={faMinus} className={cx('counter-button', 'minus-adults')} onClick={handleDecreaseAdults}/>
                                <div className={cx('counter-value')}>{adultsValue}</div>
                                <FontAwesomeIcon icon={faPlus} className={cx('counter-button')} onClick={handleIncreaseAdults}/>
                            </div>
                            <h3 className={cx('search-input-title')}>Number of rooms</h3>
                            {/* <InputSelect data={input3} order='3' icon='location' placeholder='2' option={handleOption}/> */}
                            <div className={cx('counter')}>
                                <FontAwesomeIcon icon={faMinus} className={cx('counter-button', 'minus-adults')} onClick={handleDecreaseRooms}/>
                                <div className={cx('counter-value')}>{roomValue}</div>
                                <FontAwesomeIcon icon={faPlus} className={cx('counter-button')} onClick={handleIncreaseRooms}/>
                            </div>
                        {/* </div> */}

                        <h3 style={{ margin: '20px 0'}}>Add Extras</h3>
                        <div className={cx('extras-checkbox')}>
                            {getServices.map((serviceItem, index) => (
                                <div key={index} className={cx('checkbox-item')}>
                                    <div className={cx('checkbox')}>
                                        <input type="checkbox" id={serviceItem._id} name={serviceItem.name} value={serviceItem.name} onChange={(e) => handleCheck(e, index)}/>
                                        <label className={cx('label')} htmlFor={serviceItem.name}> {serviceItem.name}</label>
                                    </div>
                                    <span className={cx('')}>{serviceItem.price !== 0 ? '$' + serviceItem.price : 'Free'}</span> 
                                </div>
                            ))}
                            {/* <div className={cx('checkbox-item')}>
                                <div className={cx('checkbox')}>
                                    <input type="checkbox" id="extra2" name="extra2" value="Parking" onChange={handleCheck}/>
                                    <label className={cx('label')} htmlFor="extra2"> Parking a day</label>
                                </div>
                                <span className={cx('')}>$6</span> 
                            </div>
                            <div className={cx('checkbox-item')}>
                                <div className={cx('checkbox')}>
                                    <input type="checkbox" id="extra3" name="extra3" value="Pet" onChange={handleCheck}/>
                                    <label className={cx('label')} htmlFor="extra3"> Pet a day</label>
                                </div>
                                <span className={cx('')}>$1</span> 
                            </div>
                            <div className={cx('checkbox-item')}>
                                <div className={cx('checkbox')}>
                                    <input type="checkbox" id="extra4" name="extra4" value="Iron" onChange={handleCheck}/>
                                    <label className={cx('label')} htmlFor="extra4"> Iron &amp; Ironing Board</label>
                                </div>
                                <span className={cx('')}>Free</span> 
                            </div>
                            <div className={cx('checkbox-item')}>
                                <div className={cx('checkbox')}>
                                    <input type="checkbox" id="extra5" name="extra5" value="baby" onChange={handleCheck}/>
                                    <label className={cx('label')} htmlFor="extra5"> Baby Crib</label>
                                </div>
                                <span className={cx('')}>Free</span> 
                            </div>
                            <div className={cx('checkbox-item')}>
                                <div className={cx('checkbox')}>
                                    <input type="checkbox" id="extra6" name="extra6" value="car" onChange={handleChange}/>
                                    <label className={cx('label')} htmlFor="extra6"> Car service</label>
                                </div>
                                <span className={cx('')}></span> 
                            </div> */}
                        </div>

                        <div className={cx('modal')}>
                            <div className={cx('modal__overlay')}></div>
                            <div className={cx('modal__body')}>
                                <div className={cx('modal-heading')}>
                                    <h1>Car Service <FontAwesomeIcon icon={faCar}/> </h1>
                                    <div className={cx('close-btn')} onClick={handleClose}>
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </div>
                                </div>
                                <p className={cx('service-desc')}>
                                    You can customize your choice of transportation and vehicle type, and easily add a child seat. Meet and be greeted by a professional driver with a personal nameplate upon arrival from your flight, with detailed instructions on pick up, drop off and use of a private hire car. You will be accompanied by a professional driver who will help you avoid adverse traffic situations, navigate safely and let you have moments of relaxation after the flight. Whether you're a solo traveler, a couple, or traveling with family or a group of friends, you can find the right service with a choice of standard sedans, shared vans, limousine buses and other diverse options.
                                </p>
                                <h2 style={{color: '#ccc'}}>Car types</h2>
                                    {/* <div className={cx('payment__method')}>
                                        <div className={cx('payment__method-item')}>
                                            <input id="card" name="method" type="radio" value="CARD" />
                                            <label className={cx('label')} htmlFor="card"> 4-seats</label>
                                        </div>
                                        <div className={cx('payment__method-item')}>
                                            <input id="banking" name="method" type="radio" value="BANKING"/>
                                            <label className={cx('label')} htmlFor="banking"> 7-seats</label>
                                        </div>
                                        <div className={cx('payment__method-item')}>
                                            <input id="wallet" name="method" type="radio" value="WALLET"/>
                                            <label className={cx('label')} htmlFor="wallet"> 16-seats</label>
                                        </div>
                                        <div className={cx('payment__method-item')}>
                                            <input id="banking" name="method" type="radio" value="BANKING"/>
                                            <label className={cx('label')} htmlFor="banking"> Van</label>
                                        </div>
                                        <div className={cx('payment__method-item')}>
                                            <input id="wallet" name="method" type="radio" value="WALLET"/>
                                            <label className={cx('label')} htmlFor="wallet"> Limousine</label>
                                        </div>
                                        <span className={cx('form-message')}></span>
                                    </div> */}
                                    <ul className={cx('accordion')}>
                                        <li>
                                            <input className={cx('accordion-input')} type="radio" name="accordion" id="first"/>
                                            <label htmlFor="first">Van</label>
                                            <div className={cx('accordion__content')}>
                                                <img className={cx('accordion__item-img')} src='https://res.klook.com/image/upload/v1572237232/airport-transfer/airport-transfers-dlp-ctype-van.png' alt='van'/>
                                                <div className={cx('service__item')}>
                                                    <div className={cx('service__item-desc')}>Travel with friends on a private van for the same price</div>
                                                    {/* <div className={cx('service__item-feature')}>Feature</div> */}
                                                    <div className={cx('service__item-feature-detail')}>
                                                        <FontAwesomeIcon icon={faUsers} style={{marginRight: '10px'}}/>
                                                        12 guests
                                                    </div>
                                                    <div className={cx('service__item-feature-detail')}>
                                                        <FontAwesomeIcon icon={faMoneyBill} style={{marginRight: '10px'}}/>
                                                        $80/day
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <input className={cx('accordion-input')} type="radio" name="accordion" id="second"/>
                                            <label htmlFor="second">Standard</label>
                                            <div className={cx('accordion__content')}>
                                                <img className={cx('accordion__item-img')} src='https://res.klook.com/image/upload/v1572237191/airport-transfer/airport-transfers-dlp-ctype-standard.png' alt='standard'/>
                                            </div>
                                        </li>
                                        <li>
                                            <input className={cx('accordion-input')} type="radio" name="accordion" id="third"/>
                                            <label htmlFor="third">SUV</label>
                                            <div className={cx('accordion__content')}>
                                                <img className={cx('accordion__item-img')} src='https://res.klook.com/image/upload/v1572237057/airport-transfer/airport-transfers-dlp-ctype-suv.png' alt='suv'/>

                                            </div>
                                        </li>
                                        <li>
                                            <input className={cx('accordion-input')} type="radio" name="accordion" id="fourth"/>
                                            <label htmlFor="fourth">Luxury</label>
                                            <div className={cx('accordion__content')}>
                                                <img className={cx('accordion__item-img')} src='https://res.klook.com/image/upload/v1572237157/airport-transfer/airport-transfers-dlp-ctype-luxury.png' alt='luxury'/>
                                            </div>
                                        </li>
                                        <li>
                                            <input className={cx('accordion-input')} type="radio" name="accordion" id="fifth"/>
                                            <label htmlFor="fifth">Bus</label>
                                            <div className={cx('accordion__content')}>
                                                <img className={cx('accordion__item-img')} src='https://res.klook.com/image/upload/v1572236958/airport-transfer/airport-transfers-dlp-ctype-bus.png' alt='bus'/>
                                            </div>
                                        </li>
                                    </ul>
                                {/* </div> */}

                            </div>
                        </div>

                        <div className={cx('total')}>
                            <div className={cx('total-title')}>
                                <h3>Total</h3>
                                <span className={cx('heading-extra')}>Not included taxes</span>
                            </div>
                            <span className={cx('')}>${totalPrice}</span>
                        </div>

                        <Link to='/checkout'>
                            <div className={cx('booking-btn')} onClick={handleBooking}>
                                Book now
                            </div>
                        </Link>

                        <div className={cx('extra-sentence')}>You will not get charged yet</div>
                    </div>
                </div>
            </div>

            <div className={cx('comments')}>
                <div className={cx('available')}>
                    <h2 >From our guests</h2>
                    <span className={cx('viewAll')}>View All</span>
                </div>
                <h3 >Overall Rating</h3>
                <div className={cx('star-rating')}>
                    <h2 className={cx('overall-score')}>8.2</h2>
                    (65 reviews)
                </div>
                
                <Comment img='' name='Phillip Martin' createdAt='6 days ago' score='9' content='Great people, friendly, you can ask for anything you want and they will help you, great view and great place.' />
                <Comment img='' name='Phillip Martin' createdAt='6 days ago' score='9' content='Great people, friendly, you can ask for anything you want and they will help you, great view and great place.' />
            </div>

            <div className={cx('modal')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body')}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h2 className={cx('')}>Choose date arrive</h2>
                        <div className={cx('close-btn')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                    </div>
                    {/* <div className={cx('close-btn')} onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                    <div className={cx('wrapper-inner')}> */}
                        {/* <select className={cx('form-select')} defaultValue='default' onChange={handleChangeTime}>
                            <option value='default' disabled>
                                Start at
                            </option>

                            {timeInterval.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>

                        <select className={cx('form-select')} defaultValue='default' onChange={handleTimeIntervalHourly}>
                            <option value='default' disabled>
                                Hours
                            </option>
                            
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                        </select> */}

                    {/* </div> */}
                    {/* <h3 style={{textAlign: 'center', marginTop: '10px'}}>{dateArrive}</h3> */}
                    <DatePicker getDate={getDate}/>
                    {/* {dateForHourly} */}
                    <h2 className={cx('')}>Choose time arrive</h2>
                    <Clock getTime={getTime} order='1'/>
                    <h2 className={cx('')}>Choose the length of stay (hour)</h2>
                    <div className={cx('')} style={{fontSize: '1.2rem', color: '#ccc'}}>If you want to stay over 6 hours, we will count it for overnight</div>
                    <div className={cx('form-wrapper')}>
                        <select className={cx('form-select')} defaultValue='default' onChange={handleTimeIntervalHourly}>
                            <option value='default' disabled>
                                1
                            </option>
                            
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                        </select>
                    </div>
                    <div className={cx('confirm-button')} onClick={handleClose}>
                        Confirm
                    </div>

                </div>
            </div>

            <div className={cx('modal')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body')}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h2 className={cx('')}>Check in &amp; Check out</h2>
                        <div className={cx('close-btn')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    </div>
                    {/* <div className={cx('wrapper-inner')}> */}
                        {/* <div className={cx('calendar-check-in')}> */}
                            
                            <Calendar className={cx('')}/>
                            <h2 className={cx('')}>Choose time arrive</h2>
                            <Clock getTime={getTime} order='2'/>
                            <h2 className={cx('')}>Choose time leave</h2>
                            <Clock getTime={getTime} order='3'/>
                        {/* </div> */}
                        {/* <div className={cx('calendar-check-out')}>
                            <h2 className={cx('')}>Check out</h2>
                            <Calendar className={cx('calendar')} getDate={getDateCheckOut} diff={1}/>
                        </div> */}

                        {/* <select className={cx('form-select')} defaultValue='default' onChange={handleTotalDays}>
                            <option value='default' disabled>
                                Days
                            </option>
                            
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                        </select> */}

                    {/* </div> */}
                    <div className={cx('confirm-button')} onClick={handleClose}>
                        Confirm
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DetailType;