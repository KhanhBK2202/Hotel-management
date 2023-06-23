import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faCheck, faCloudMoon, faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
// import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rating } from '@mui/material';
import classNames from 'classnames/bind'
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Calendar from '~/components/Calendar';
import Clock from '~/components/Clock';
import HorizontalCard from '~/components/HorizontalCard';
import Image from '~/components/Image';
import InputSelect from '~/components/InputSelect';
import VerticalCard from '~/components/VerticalCard';
import { useStore } from '~/store';
import * as request from '~/utils/request';
import styles from './Dashboard.module.scss'; 

moment().format()
const cx = classNames.bind(styles)

function Dashboard() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken
    
    const [fullDate, setFullDate] = useState()
    const [state, dispatch] = useStore()
    const { dateCheckIn, dateCheckOut } = state
    const [getAll, setGetAll] = useState(false)

    useEffect(() => {
        setGetAll(false)
        if (JSON.stringify(dateCheckIn) === JSON.stringify(dateCheckOut))
            setFullDate(dateCheckIn.toString().slice(0, 3) + ', ' + dateCheckIn.toString().slice(4, 15))
        else setFullDate(dateCheckIn.toString().slice(0, 3) + ', ' + dateCheckIn.toString().slice(4, 15) + ' - ' + dateCheckOut.toString().slice(0, 3) + ', ' + dateCheckOut.toString().slice(4, 15))
    }, [dateCheckIn, dateCheckOut])

    const [index, setIndex] = useState()
    const handleSeeDetail = (i) => {
        setIndex(i)
        const modal = document.querySelectorAll('.' + cx('modal'))
        modal[0].classList.remove(cx('disappear'))
        modal[0].classList.add(cx('appear'))
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

    const [bookings, setBookings] = useState([])
    // const [userBookings, setUserBookings] = useState([])
    const [searchResult, setSearchResult] = useState('')
    const [flag, setFlag] = useState(false)
    const fetchBooking = (id) => {

        // for (const item of bookings) {
        //     // console.log(getAll)
        //     if (item.bookedBy.username.toLowerCase() === searchResult.toLowerCase()) {
        //         console.log(searchResult)
        //         setFlag(true)
        //         if (getAll) {
        //             console.log('get các reservation theo tên')
        //             request 
        //                 .get(`/api/v1/booking/@${searchResult}`, { headers: {token: `Beaer ${accessToken}`} })
        //                 .then(res => setBookings(res))
        //                 .catch(err => console.log(err))
        //         }
        //         else console.log('get các reservation theo tên và ngày đến trong khoảng của lịch')
        //         break
        //     }
        //     setFlag(false)
        // }
        if (getAll && searchResult) {
            // console.log('get các reservation theo tên')
            request 
                .get(`/api/v1/booking/@${searchResult}/${id}`, { headers: {token: `Beaer ${accessToken}`} })
                .then(res => {
                    setBookings(res)
                    if (res.length === 0) {
                        setFlag(false)
                    }
                    else {
                        setFlag(true)
                    }
                })
                .catch(err => console.log(err))
        }
        else if (getAll && !searchResult)  {
            request
                .get(`/api/v1/booking/hotel/${id}`, { headers: {token: `Beaer ${accessToken}`}})
                .then(res => {
                    setBookings(res)
                    setFlag(true)
                })
                .catch(err => console.log(err))
        }
        else if (!getAll && searchResult) {
            // console.log('get các reservation theo tên và ngày đến trong khoảng của lịch')
            const checkIn = dateCheckIn.toISOString()
            const checkOut = dateCheckOut.toISOString()
            request
                .get(`/api/v1/booking/byDate/@${searchResult}/${checkIn}/${checkOut}/${id}`, { headers: {token: `Beaer ${accessToken}`}})
                .then(res => {
                    setBookings(res)
                    if (res.length === 0) {
                        setFlag(false)
                    }
                    else {
                        setFlag(true)
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            // Không lấy tất cả booking, chỉ lấy các booking trong khoàng được chọn
            // const checkIn = moment(dateCheckIn).format()
            // const checkOut = moment(dateCheckOut).format()
            const checkIn = dateCheckIn.toISOString()
            const checkOut = dateCheckOut.toISOString()
            // console.log(checkIn, checkOut)
            request
                .get(`/api/v1/booking/byDate/${checkIn}/${checkOut}/${id}`, { headers: {token: `Beaer ${accessToken}`}})
                .then(res => {
                    // console.log(res)
                    setBookings(res)
                    if (res.length === 0) {
                        setFlag(false)
                    }
                    else {
                        setFlag(true)
                    }
                })
                .catch(err => console.log(err))
        }
    }
    const [selectedHotel, setSelectedHotel] = useState('All')
    const [selectedHotelId, setSelectedHotelId] = useState(user?.hotelId || 'ad')
    useEffect(() => {
        if (user.hotelId)
            setSelectedHotelId(user?.hotelId)
        if (user?.role === 'admin' && selectedHotel === 'All') 
            setSelectedHotelId('ad')
        fetchBooking(selectedHotelId)
    },[searchResult, getAll, dateCheckIn, dateCheckOut, selectedHotelId])

    const handleCreateReservation = () => {
        const modal = document.querySelectorAll('.' + cx('modal')) 
        modal[1].classList.remove(cx('disappear'))
        modal[1].classList.add(cx('appear'))
    }

    const d = new Date()
    const [type, setType] = useState()
    useEffect(() => {
        const chooseBtn = document.querySelectorAll('.' + cx('choose-btn'))
        for (const item of chooseBtn) {
            if (item.innerText === 'Hourly' && d.getHours() >= 22) {
                const warn = document.querySelector('.' + cx('warn-text'))
                warn.style.display = 'block'
                item.style.pointerEvents = 'none'
                item.style.backgroundColor = '#F9F9F9'
                item.style.color = '#ccc'
            }
            item.onclick = () => {
                if (item.classList.value.includes(cx('choosen')))
                    item.classList.remove(cx('choosen'))
                else 
                {
                    for (const innerItem of chooseBtn) {
                        if (innerItem.classList.value.includes(cx('choosen')))
                            innerItem.classList.remove(cx('choosen'))
                    }
                    item.classList.add(cx('choosen'))
                    setType(item.innerText)
                }
            }
        }
    })

    const [hours, setHour] = useState(d.getHours())
    const [min, setMin] = useState(d.getMinutes())
    // const addZero = (i) => {
    //     if (i < 10) {i = "0" + i}
    //     return i;
    // }
    const getTime = (h, m) => {
        setHour(h)
        setMin(m)
    }

    // useEffect(() => {
    //     if (d.getHours() >= 11) {
    //         const warn = document.querySelector('.' + cx('warn'))
    //         console.log(warn)
    //         // warn.style.display = 'block'
    //     }
    // })

    const [toggleType, setToggleType] = useState(false)
    useEffect(() => {
        if (type === 'Hourly')
            setToggleType(true)
        else setToggleType(false)
    },[type])

    const getTimeStart = () => {

    }

    // const [x, setX] = useState([])
    // const [y, setY] = useState([])
    // useEffect(() => {
    //     if (userBookings && userBookings.length !== 0) {
    //         for (const booking of userBookings) {
    //             console.log(booking)
    //             let z, w
    //             z = new Date(booking.fromTime)
    //             w = new Date(booking.toTime)
    //             setX([...x, z.toString().slice(4, 15)])
    //             setY([...y, w.toString().slice(4, 15)])
    //         }
    //     }
    // },[x, y, userBookings])
    

    // useEffect(() => {
    //     request
    //         .get('/api/v1/booking', { headers: {token: `Beaer ${accessToken}`}})
    //         .then(res => setBookings(res))
    //         .catch(err => console.log(err))
    //     // request
    //     //     .get(`/api/v1/booking/${searchResult}`, { headers: {token: `Beaer ${accessToken}`}})
    //     //     .then(res => setUserBookings(res))
    //     //     .catch(err => console.log(err))
    // },[])

    let fromDate = []
    let toDate = []
    let dateBooking = []
    let x, y, z
    // useEffect(() => {
    // }, [bookings])
    if (bookings.length !== 0) {
        // console.log(bookings)
        // const text = document.querySelector('.' + cx('booking-no-reservation'))
        // text.style.display = 'none'
        bookings.forEach((booking, index) => {
            x = new Date(booking.fromDate)
            y = new Date(booking.toDate)
            z = new Date(booking.createdAt)
            fromDate.push(x.toString().slice(4, 15))
            toDate.push(y.toString().slice(4, 15))
            dateBooking.push(z.toString().slice(4, 15))
        })
    }
    else if (bookings.length === 0) {
        // console.log(bookings.length)
        // const text = document.querySelector('.' + cx('booking-no-reservation'))
        // text.style.display = 'flex'
    }

    const [comments, setComments] = useState([])
    const [allHotels, setAllHotels] = useState([])
    useEffect(() => {
        let listHotelId = []
        listHotelId.push(user?.hotelId)
        const fetchData = async () => {
            if (user?.role === 'admin') {
                await request 
                    .get('/api/v1/hotel')
                    .then(res => {
                        setAllHotels(res)
                        listHotelId.pop()
                        res.forEach((item, index) => {
                            listHotelId.push(item._id)
                        })
                    })
                    .catch(err => console.log(err))
            }
            listHotelId.forEach((id, index) => {
                request
                    .get(`/api/v1/comment/hotel/${id}`)
                    .then(res => setComments(prev => [...prev, ...res]))
                    .catch(err => console.log(err))
            })
        }
        fetchData()
    },[])

    const handleSubmitHotel = (id) => {
        if (id === 'all') {
            setSelectedHotel('All')
            // setSelectedHotelId(id)
            fetchBooking('ad')
        }
        else {
            const r = allHotels.find((hotel) => {
                return hotel._id === id
            })
            setSelectedHotel(r.name)
            setSelectedHotelId(id)
            fetchBooking(id)
        }
    }

    if (user?.role === 'user' || !user) {
        return <Navigate to='/'/>
    }

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('all-bookings')}>
                    <div className={cx('all-bookings__heading')}>
                        
                        <h2 className={cx('')}>
                            {getAll ? 'All Bookings' : fullDate}
                        </h2>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div className={cx('get-all-bookings')} onClick={() => setGetAll(true)}>
                                All
                            </div>

                            {user.role === 'admin' && 
                                <div className={cx('header__search-select')}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', lineHeight: '20px'}}>
                                        <span className={cx('header__search-select-label')}>{selectedHotel}</span>
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('header__search-select-icon')}/>
                                    </div>

                                    {/* <li className={cx('header__search-option-item', 'header__search-option-item--active')}></li> */}
                                    <ul className={cx('header__search-option')}>    
                                        <li className={cx('header__search-option-item')} onClick={() => handleSubmitHotel('all')}>
                                            <span>All</span>
                                            <FontAwesomeIcon className={cx('icon')} icon={faCheck}/>
                                        </li>
                                        {allHotels.map((hotel, index) => (
                                            <li key={index} className={cx('header__search-option-item')} onClick={() => handleSubmitHotel(hotel._id)}>
                                                <span>{hotel.name}</span>
                                                <FontAwesomeIcon className={cx('icon')} icon={faCheck}/>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }   
                            <div className={cx('all-bookings__heading-select')}>
                                {/* <select className={cx('form-select')} defaultValue='Month' >
                                    <option value='Month' disabled>
                                        Month
                                    </option>
                                    
                                    {months.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select> */}
                                {/* <div className={cx('form-select')}>Search guest name</div> */}
                                <input className={cx('traveller-input')} placeholder='Search guest name' onChange={(e) => setSearchResult(e.target.value)}/>
                            </div>                            
                        </div>
                    </div>

                    <div className={cx('booking-heading')}>
                        <span className={cx('booking-heading__item')}>Time</span>
                        <span className={cx('booking-heading__item')}>Date</span>
                        <span className={cx('booking-heading__item')}>Checkin</span>
                        <span className={cx('booking-heading__item')}>Guest</span>
                        <span className={cx('booking-heading__item')}></span>
                    </div>

                    {/* <h2 className={cx('booking-no-reservation')}>
                        No reservation today
                    </h2> */}
                    <div className={cx('guest-bookings')}>
                        {flag ? <>
                            {/* map các reservation của guest đó */}
                            {bookings.map((booking, index) => (
                                <div key={index} className={cx('booking')}>
                                    <div className={cx('line')}></div>
                                    <div className={cx('booking-detail')}>
                                        <div className={cx('booking-time')}>
                                            {booking.isOverNight ? 
                                                <FontAwesomeIcon icon={faCloudMoon} className={cx('booking-icon')}/>
                                            : 
                                                <FontAwesomeIcon icon={faClock} className={cx('booking-icon')}/>
                                            }
                                            
                                            <div className={cx('booking-time-detail')}>
                                                <h3>{booking.fromTime}</h3>
                                                <div className={cx('booking-time-place')}>
                                                    {booking.hotel.name}
                                                </div>
                                            </div>

                                            <div className={cx('booking-time-duration')}>
                                                Duration: {booking.numOfHours > 0 ? (booking.numOfHours > 1 ? booking.numOfHours + ' hours' : booking.numOfHours + ' hour') :  (booking.numOfDays > 1 ? booking.numOfDays + ' days' : booking.numOfDays + ' day')}
                                                <ul className={cx('booking-time-duration-bar')}>
                                                    <li className={cx('booking-time-duration-point')}>{fromDate[index]}</li>
                                                    <li className={cx('booking-time-duration-point')}>{toDate[index]}</li>
                                                </ul>
                                            </div>

                                            <div className={cx('booking-time-detail')}>
                                                <h3>{booking.toTime}</h3>
                                                <div className={cx('booking-time-place')}>
                                                    {booking.hotel.name}
                                                </div>
                                            </div>

                                        </div>

                                        <div className={cx('booking-date')}>
                                            {dateBooking[index]}
                                        </div>

                                        <div className={cx('booking-checkin')}>
                                            {booking.isCheckin ? <FontAwesomeIcon icon={faCheck} style={{color: 'green'}}/> : <FontAwesomeIcon icon={faXmark} style={{color: 'red'}}/>}
                                        </div>

                                        <div className={cx('booking-guest')}>
                                            {/* Xử lý nếu khách hàng này không có trong db thì chỉ hiện tippy tên thôi, vì họ có thể đặt phòng trực tiếp nên không có tài khoản */}
                                            <Link to={`/profile/${booking.bookedBy._id}`}>
                                                <Image className={cx('booking-guest-avatar')} src={booking.bookedBy.avatar} alt="avatar"/>
                                            </Link>
                                        </div>

                                        <div className={cx('booking-more-detail')} onClick={() => handleSeeDetail(index)}>
                                            More detail
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </> : (
                            <h2 className={cx('booking-no-result')}>
                                No result
                            </h2>
                        )}
                    </div>
                        

                            {/* <div className={cx('booking')}>
                                <div className={cx('line')}></div>
                                <div className={cx('booking-detail')}>
                                    <div className={cx('booking-time')}>
                                        <FontAwesomeIcon icon={faClock} className={cx('booking-icon')}/>
                                        
                                        <div className={cx('booking-time-detail')}>
                                            <h3>10:00</h3>
                                            <div className={cx('booking-time-place')}>
                                                KQ Vung Tau
                                            </div>
                                        </div>

                                        <div className={cx('booking-time-duration')}>
                                            Duration: 3h
                                            <ul className={cx('booking-time-duration-bar')}>
                                                <li className={cx('booking-time-duration-point')}>Nov 19, 2022</li>
                                                <li className={cx('booking-time-duration-point')}>Nov 19, 2022</li>
                                            </ul>
                                        </div>

                                        <div className={cx('booking-time-detail')}>
                                            <h3>13:00</h3>
                                            <div className={cx('booking-time-place')}>
                                                KQ Vung Tau
                                            </div>
                                        </div>

                                    </div>

                                    <div className={cx('booking-date')}>
                                        Nov 08, 2022
                                    </div>

                                    <div className={cx('booking-guest')}>
                                        <Link to='/profile'>
                                            <Image className={cx('booking-guest-avatar')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1633332755192-727a05c4013d_e4tnou.jpg' alt="avatar"/>
                                        </Link>
                                    </div>

                                    <div className={cx('booking-more-detail')} onClick={handleSeeDetail}>
                                        More detail
                                    </div>
                                </div>
                            </div>

                            <div className={cx('booking')}>
                                <div className={cx('line')}></div>
                                <div className={cx('booking-detail')}>
                                    <div className={cx('booking-time')}>
                                        <FontAwesomeIcon icon={faClock} className={cx('booking-icon')}/>
                                        
                                        <div className={cx('booking-time-detail')}>
                                            <h3>14:00</h3>
                                            <div className={cx('booking-time-place')}>
                                                KQ Vung Tau
                                            </div>
                                        </div>

                                        <div className={cx('booking-time-duration')}>
                                            Duration: 4h
                                            <ul className={cx('booking-time-duration-bar')}>
                                                <li className={cx('booking-time-duration-point')}>Nov 11, 2022</li>
                                                <li className={cx('booking-time-duration-point')}>Nov 11, 2022</li>
                                            </ul>
                                        </div>

                                        <div className={cx('booking-time-detail')}>
                                            <h3>18:00</h3>
                                            <div className={cx('booking-time-place')}>
                                                KQ Vung Tau
                                            </div>
                                        </div>

                                    </div>

                                    <div className={cx('booking-date')}>
                                        Nov 05, 2022
                                    </div>

                                    <div className={cx('booking-guest')}>
                                        <Link to='/profile'>
                                            <Image className={cx('booking-guest-avatar')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/640x530_zdlza7.jpg' alt="avatar"/>
                                        </Link>
                                    </div>

                                    <div className={cx('booking-more-detail')} onClick={handleSeeDetail}>
                                        More detail
                                    </div>
                                </div>
                            </div>

                            <div className={cx('booking')}>
                                <div className={cx('line')}></div>
                                <div className={cx('booking-detail')}>
                                    <div className={cx('booking-time')}>
                                        <FontAwesomeIcon icon={faCloudMoon} className={cx('booking-icon')}/>
                                        
                                        <div className={cx('booking-time-detail')}>
                                            <h3>14:00</h3>
                                            <div className={cx('booking-time-place')}>
                                                KQ Vung Tau
                                            </div>
                                        </div>

                                        <div className={cx('booking-time-duration')}>
                                            Duration: 4 days
                                            <ul className={cx('booking-time-duration-bar')}>
                                                <li className={cx('booking-time-duration-point')}>Nov 06, 2022</li>
                                                <li className={cx('booking-time-duration-point')}>Nov 10, 2022</li>
                                            </ul>
                                        </div>

                                        <div className={cx('booking-time-detail')}>
                                            <h3>12:00</h3>
                                            <div className={cx('booking-time-place')}>
                                                KQ Vung Tau
                                            </div>
                                        </div>

                                    </div>

                                    <div className={cx('booking-date')}>
                                        Nov 01, 2022
                                    </div>

                                    <div className={cx('booking-guest')}>
                                        <Link to='/profile'>
                                            <Image className={cx('booking-guest-avatar')} src='' alt="avatar"/>
                                        </Link>
                                    </div>

                                    <div className={cx('booking-more-detail')} onClick={handleSeeDetail}>
                                        More detail
                                    </div>
                                </div>
                            </div> */}
                        
                    
                    
                    {/* <h4 className={cx('booking-see-more')}>See more</h4> */}
                    
                </div>
                
                <div className={cx('booking-utilities')}>
                    {/* <div className={cx('booking-calendar')}> */}
                    <Calendar />
                    {/* </div> */}

                    <div className={cx('booking-create')} onClick={handleCreateReservation}>
                        <h3>Create reservation</h3>
                        <div className={cx('booking-create-desc')}>Create a new reservation for guests</div>
                        <FontAwesomeIcon icon={faPlus} className={cx('create-icon')}/>
                    </div>
                </div>
            </div>



            <div className={cx('modal')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body')}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h2 className={cx('')}>Reservation detail</h2>
                        <div className={cx('close-btn')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                    </div>
                    
                    <div className={cx('reservation-check-date')}>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>GUEST</h5>
                            <div className={cx('reservation-date')}>
                                {bookings[index]?.bookedBy.username}
                            </div>
                        </div>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>CHECK-IN</h5>
                            <div className={cx('reservation-date')}>
                                {/* Sun, 22 May 2022 */}
                                {moment([bookings[index]?.fromDate], "YYYY-MM-DDTHH:mm:ss Z").format('LL')}
                            </div>
                            <div className={cx('reservation-time')}>
                                from {bookings[index]?.fromTime}
                            </div>
                        </div>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>CHECK-OUT</h5>
                            <div className={cx('reservation-date')}>
                                {/* Wed, 25 May 2022 */}
                                {moment([bookings[index]?.toDate], "YYYY-MM-DDTHH:mm:ss Z").format('LL')}
                            </div>
                            <div className={cx('reservation-time')}>
                                by {bookings[index]?.toTime}
                            </div>
                        </div>
                    </div>
                    <div className={cx('reservation-check-date')}>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>RESERVATION</h5>
                            <div className={cx('reservation-date')}>
                                3 Nights, 1 Apartment
                            </div>
                        </div>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>PHONE</h5>
                            <div className={cx('reservation-date')}>
                                {bookings[index]?.bookedBy.phone}
                            </div>
                        </div>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>EMAIL</h5>
                            <div className={cx('reservation-date')}>
                                {bookings[index]?.bookedBy.email}
                            </div>
                        </div>
                    </div>
                    <div className={cx('reservation-check-date')}>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>BOOKING NUMBER</h5>
                            <div className={cx('reservation-date')}>
                                #{bookings[index]?.bookingCode}
                            </div>
                        </div>
                    </div>
                    <div className={cx('reservation-check-date')}>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>SELECTED</h5>
                            <div className={cx('reservation-date')}>
                                King bed stylish Apartment with Loft style family room
                            </div>
                        </div>
                    </div>
                    <div className={cx('reservation-check-date')}>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>Identity card/passport</h5>
                            <img className={cx('reservation-card')} src={bookings[index]?.imageCheckin} placeholder='identity'/>
                            {/* <div className={cx('')}>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('modal')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body')}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h2 className={cx('')}>Make a Reservation</h2>
                        <div className={cx('close-btn')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                    </div>
                    
                    <div className={cx('form-wrapper')}>
                        <div className={cx('form')}>
                            <input type="text" id="firstName" className={cx('form__input')} autoComplete="off" placeholder=" "/>
                            <label htmlFor="firstName" className={cx('form__label')}>First name</label>
                        </div>
                        <div className={cx('form')}>
                            <input type="text" id="lastName" className={cx('form__input')} autoComplete="off" placeholder=" "/>
                            <label htmlFor="lastName" className={cx('form__label')}>Last name</label>
                        </div>
                    </div>
                    
                    <div className={cx('form')}>
                        <input type="text" id="phone" className={cx('form__input')} autoComplete="off" placeholder=" "/>
                        <label htmlFor="phone" className={cx('form__label')}>Phone number</label>
                    </div>

                    <h2 className={cx('')} style={{marginTop: '20px'}}>Hourly or Overnight?</h2>
                    <div className={cx('type-stay')}>
                        <div className={cx('choose-btn')}>
                            Hourly
                        </div>
                        <div className={cx('choose-btn')}>
                            Overnight
                        </div>
                    </div>
                    <div className={cx('warn-text')}>Cannot book for hourly. Please booking for overnight</div>
                    <h2 className={cx('')} style={{marginTop: '20px'}}>Choose date</h2>
                    <Calendar />    
                    <h2 className={cx('')} style={{marginTop: '20px'}}>Choose time arrive</h2>
                    <Clock getTime={getTime}/>
                    {toggleType ? (
                        <>
                            <h2 className={cx('')} style={{marginTop: '20px'}}>Choose the length of stay (hour)</h2>
                            <div className={cx('')} style={{fontSize: '1.2rem', color: '#ccc'}}>If you want to stay over 6 hours, we will count it for overnight</div>
                            <div className={cx('')} style={{borderRadius: '20px', width: '50%', margin: '10px auto', border: '1px solid #ccc', padding: '10px 15px'}}>
                                <select className={cx('form-select')} defaultValue='default' onChange={getTimeStart}>
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
                        </>
                    ) : (
                        <>
                            <h2 className={cx('')} style={{marginTop: '20px'}}>Choose time leave</h2>
                            <Clock getTime={getTime}/>
                        </>
                    )}
                    <div className={cx('hourly-button')} onClick={handleClose}>
                        Confirm
                    </div>
                    
                </div>
            </div>
            <h2>Comments</h2>
            <div className={cx('comments')}>
                <div className={cx('comment-heading')}>
                    <div className={cx('comment-heading-item')}>Review</div>
                    <div className={cx('comment-heading-item')}>Hotel</div>
                    <div className={cx('comment-heading-item')}>Rating</div>
                    <div className={cx('comment-heading-item')}>Details</div>
                    <div className={cx('comment-heading-item')}>Action</div>
                </div>
                {comments.map((comment, index) => (
                    <div key={index} className={cx('comment-row')}>
                        <div className={cx('comment-item')}>
                            <img className={cx('comment-ava')} src={comment.userId.avatar}/>
                            <div className={cx('comment-content-wrapper')}>
                                <div className={cx('comment-name-time')}>
                                    <h4 className={cx('comment-name')}>{comment.userId.username}</h4>
                                    <div className={cx('comment-time')}>{moment(comment.createdAt, "YYYY-MM-DDTHH:mm:ss Z").format('LLL')}</div>
                                </div>
                                <p className={cx('comment-content')}>{comment.comment}</p>
                            </div>
                        </div>
                        <div className={cx('comment-item')}>{comment.hotelId.name}</div>
                        <div className={cx('comment-item')}>
                            <h2 className={cx('comment-score')}>{comment.rating}</h2>
                            <Rating name="customized-10" defaultValue={comment.rating} max={10} readOnly/>
                            {/* <div className={cx('comment-star')}></div> */}
                        </div>
                        <div className={cx('comment-item')}>
                            <div className={cx('comment-detail')}>
                                View details
                            </div>
                        </div>
                        <div className={cx('comment-item')}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;