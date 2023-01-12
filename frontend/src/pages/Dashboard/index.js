import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { faCloudMoon, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
// import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
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

    const handleSeeDetail = () => {
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
    const [userBookings, setUserBookings] = useState([])
    const [searchResult, setSearchResult] = useState('')
    const [flag, setFlag] = useState(false)
    // const tag = ['A', 'B', 'C', 'D', 'E', 'F'] // danh sách tất cả reservation
    // useEffect(() => {
    //     for (const item of bookings) {
    //         if (item.bookedBy.username.toLowerCase() === searchResult.toLowerCase()) {
    //             setFlag(true)
    //             if (getAll)
    //                 console.log('get các reservation theo tên')
    //             else console.log('get các reservation theo tên và ngày đến trong khoảng của lịch')
    //             break
    //         }
    //         setFlag(false)
    //     }
    // },[searchResult, getAll])

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

    const [x, setX] = useState([])
    const [y, setY] = useState([])
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

    useEffect(() => {
        request
            .get('/api/v1/booking', { headers: {token: `Beaer ${accessToken}`}})
            .then(res => setBookings(res))
            .catch(err => console.log(err))
        // request
        //     .get(`/api/v1/booking/${searchResult}`, { headers: {token: `Beaer ${accessToken}`}})
        //     .then(res => setUserBookings(res))
        //     .catch(err => console.log(err))
    },[])

    if (user.role === 'user') {
        return <Navigate to='/'/>
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('all-bookings')}>
                <div className={cx('all-bookings__heading')}>
                    
                    <h2 className={cx('')}>
                        {getAll ? 'All Bookings' : fullDate }
                    </h2>
                    <div style={{display: 'flex'}}>
                        <div className={cx('get-all-bookings')} onClick={() => setGetAll(true)}>
                            All
                        </div>
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
                    <span className={cx('booking-heading__item')}>Guest</span>
                    <span className={cx('booking-heading__item')}></span>
                </div>

                {searchResult ? (
                    <>
                        {flag ? (
                            // map các reservation của guest đó
                            // {userBookings.map((booking, index) => (
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
                                                Duration: 2 days
                                                <ul className={cx('booking-time-duration-bar')}>
                                                    <li className={cx('booking-time-duration-point')}>Dec 17, 2022</li>
                                                    <li className={cx('booking-time-duration-point')}>Dec 19, 2022</li>
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
                                            Dec 12, 2022
                                        </div>
    
                                        <div className={cx('booking-guest')}>
                                            {/* Xử lý nếu khách hàng này không có trong db thì chỉ hiện tippy tên thôi, vì họ có thể đặt phòng trực tiếp nên không có tài khoản */}
                                            <Link to='/profile'>
                                                <Image className={cx('booking-guest-avatar')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1535713875002-d1d0cf377fde_jeawcn.jpg' alt="avatar"/>
                                            </Link>
                                        </div>
    
                                        <div className={cx('booking-more-detail')} onClick={handleSeeDetail}>
                                            More detail
                                        </div>
                                    </div>
                                </div>
                            // ))}
                        ) : (
                            <h2 className={cx('booking-no-result')}>
                                No result
                            </h2>
                        )}
                    </>
                ) : (
                    <>
                        {/* map các reservation theo lịch */}
                        {bookings.map((booking, index) => (
                            <div key={index} className={cx('booking')}>
                                <div className={cx('line')}></div>
                                <div className={cx('booking-detail')}>
                                    <div className={cx('booking-time')}>
                                        <FontAwesomeIcon icon={faCloudMoon} className={cx('booking-icon')}/>
                                        
                                        <div className={cx('booking-time-detail')}>
                                            <h3>{booking.fromTime}</h3>
                                            <div className={cx('booking-time-place')}>
                                                {booking.hotel.name}
                                            </div>
                                        </div>

                                        <div className={cx('booking-time-duration')}>
                                            Duration: {booking.numOfDays} days
                                            <ul className={cx('booking-time-duration-bar')}>
                                                <li className={cx('booking-time-duration-point')}>{x[index]}</li>
                                                <li className={cx('booking-time-duration-point')}>{y[index]}</li>
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
                                        {booking.createdAt}
                                    </div>

                                    <div className={cx('booking-guest')}>
                                        <Link to={`/profile/${booking.bookedBy._id}`}>
                                            <Image className={cx('booking-guest-avatar')} src='' alt="avatar"/>
                                        </Link>
                                    </div>

                                    <div className={cx('booking-more-detail')} onClick={handleSeeDetail}>
                                        More detail
                                    </div>
                                </div>
                            </div>
                        ))}

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
                    </>
                )}
                
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
                                Maciej Kuropatwa
                            </div>
                        </div>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>CHECK-IN</h5>
                            <div className={cx('reservation-date')}>
                                Sun, 22 May 2022
                            </div>
                            <div className={cx('reservation-time')}>
                                from 16:00
                            </div>
                        </div>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>CHECK-OUT</h5>
                            <div className={cx('reservation-date')}>
                                Wed, 25 May 2022
                            </div>
                            <div className={cx('reservation-time')}>
                                by 11:00
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
                                0888380625
                            </div>
                        </div>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>EMAIL</h5>
                            <div className={cx('reservation-date')}>
                                nhatkhanhbk2202@gmail.com
                            </div>
                        </div>
                    </div>
                    <div className={cx('reservation-check-date')}>
                        <div className={cx('reservation-check-date__item')}>
                            <h5 className={cx('reservation-date__heading')}>BOOKING NUMBER</h5>
                            <div className={cx('reservation-date')}>
                                #54237982
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
        </div>
    )
}

export default Dashboard;