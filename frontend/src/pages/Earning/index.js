import classNames from 'classnames/bind'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Chart from 'react-apexcharts';
import * as request from '~/utils/request';
import styles from './Earning.module.scss'; 
// import simpleSalesForecasting from 'simple-sales-forecasting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faAngleDown, faBellConcierge, faBullseye, faCheck, faEarthAsia, faM, faQ, faSackDollar, faUsers, faW } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion, faKeyboard } from '@fortawesome/free-regular-svg-icons';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles)
const DATE_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faA} />,
        type: 'all',
        code: 'all',
        title: 'All',
    },
    {
        icon: <FontAwesomeIcon icon={faW} />,
        title: 'Week',
        children: {
            title: 'Week',
            data: [
                {
                    type: 'week',
                    code: 'prev-week',
                    title: 'Previous week',
                },
                {
                    type: 'week',
                    code: 'this-week',
                    title: 'This week',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faM} />,
        title: 'Month',
        children: {
            title: 'Month',
            data: [
                {
                    type: 'month',
                    code: 'this-month',
                    title: 'This month',
                },
                {
                    type: 'month',
                    code: 'jan',
                    title: 'January',
                },
                {
                    type: 'month',
                    code: 'feb',
                    title: 'February',
                },
                {
                    type: 'month',
                    code: 'mar',
                    title: 'March',
                },
                {
                    type: 'month',
                    code: 'apr',
                    title: 'April',
                },
                {
                    type: 'month',
                    code: 'may',
                    title: 'May',
                },
                {
                    type: 'month',
                    code: 'jun',
                    title: 'June',
                },
                {
                    type: 'month',
                    code: 'jul',
                    title: 'July',
                },
                {
                    type: 'month',
                    code: 'aug',
                    title: 'August',
                },
                {
                    type: 'month',
                    code: 'sep',
                    title: 'September',
                },
                {
                    type: 'month',
                    code: 'oct',
                    title: 'October',
                },
                {
                    type: 'month',
                    code: 'nov',
                    title: 'November',
                },
                {
                    type: 'month',
                    code: 'dec',
                    title: 'December',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faQ} />,
        title: 'Quarter',
        children: {
            title: 'Quarter',
            data: [
                {
                    type: 'quarter',
                    code: 'this-quarter',
                    title: 'This quarter',
                },
                {
                    type: 'quarter',
                    code: '1',
                    title: 'Q1',
                },
                {
                    type: 'quarter',
                    code: '2',
                    title: 'Q2',
                },
                {
                    type: 'quarter',
                    code: '3',
                    title: 'Q3',
                },
                {
                    type: 'quarter',
                    code: '4',
                    title: 'Q4',
                },
            ],
        },
    },
];

const YEAR_ITEMS = [
    {
        // icon: <FontAwesomeIcon icon={faA} />,
        type: 'year',
        code: 'year',
        title: 2022,
    },
    {
        // icon: <FontAwesomeIcon icon={faA} />,
        type: 'year',
        code: 'year',
        title: 2023,
    },
];
function Earning() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken

    // const [price, setPrice] = useState('')
    // const [prices, setPrices] = useState([])
    // const handleSubmit = () => {
    //     setPrices(prev => [...prev, price])
    // }
    const [hotelRevenue, setHotelRevenue] = useState({
        revenue: 0,
        totalBookings: 0,
        totalCustomers: 0
    })
    const [selectedDate, setSelectedDate] = useState('All')
    const [selectedType, setSelectedType] = useState('all')
    const [selectedCode, setSelectedCode] = useState('all')
    const [selectedYear, setSelectedYear] = useState(2023)
    const handleDateMenuChange = (menuItem) => {
        setSelectedDate(menuItem.title)
        setSelectedType(menuItem.type)
        setSelectedCode(menuItem.code)
        request
            .get(`/api/v1/booking/hotel/${selectedHotelId}/${menuItem.type}/${menuItem.code}/${selectedYear}/revenue`, { headers: {token: `Beaer ${accessToken}`} })
            .then(res => {
                setBookings(res.data.bookingArray)
                const count = res.data.bookingArray.reduce((result, booking) => {
                    return result + booking.count
                }, 0)
                const totalRevenue = res.data.bookingArray.reduce((result, booking) => {
                    return result + booking.totalPrice
                }, 0)
                const totalCustomers = res.data.customerArray.reduce((result, customer) => {
                    return result + customer.count
                }, 0)
                setHotelRevenue({ totalBookings: count, revenue: totalRevenue, totalCustomers: totalCustomers })
            })
            .catch(err => console.log(err))
    };

    const handleYearMenuChange = (menuItem) => {
        setSelectedYear(menuItem.title)
        request
            .get(`/api/v1/booking/hotel/${selectedHotelId}/${selectedType}/${selectedCode}/${menuItem.title}/revenue`, { headers: {token: `Beaer ${accessToken}`} })
            .then(res => {
                setBookings(res.data.bookingArray)
                const count = res.data.bookingArray.reduce((result, booking) => {
                    return result + booking.count
                }, 0)
                const totalRevenue = res.data.bookingArray.reduce((result, booking) => {
                    return result + booking.totalPrice
                }, 0)
                const totalCustomers = res.data.customerArray.reduce((result, customer) => {
                    return result + customer.count
                }, 0)
                setHotelRevenue({ totalBookings: count, revenue: totalRevenue, totalCustomers: totalCustomers })
            })
            .catch(err => console.log(err))
    };

    const [loading, setLoading] = useState(true)
    const [bookings, setBookings] = useState([])
    const [allHotels, setAllHotels] = useState([])
    const [selectedHotel, setSelectedHotel] = useState()
    
    const [selectedHotelId, setSelectedHotelId] = useState(user?.hotelId || '')
    
    useEffect(() => {
        if (user?.role === 'admin') {
            request 
                .get('/api/v1/hotel')
                .then(res => {
                    setAllHotels(res)
                    // setSelectedHotel(res[0].name)
                    // setSelectedHotelId(res[0]._id)
                })
                .catch(err => console.log(err))
        }
        request
            .get(`/api/v1/booking/hotel/${selectedHotelId}/all/all/${selectedYear}/revenue`, { headers: {token: `Beaer ${accessToken}`}})
            .then(res => {
                setBookings(res.data.bookingArray)
                const count = res.data.bookingArray.reduce((result, booking) => {
                    return result + booking.count
                }, 0)
                const totalRevenue = res.data.bookingArray.reduce((result, booking) => {
                    return result + booking.totalPrice
                }, 0)
                const totalCustomers = res.data.customerArray.reduce((result, customer) => {
                    return result + customer.count
                }, 0)
                setHotelRevenue({ totalBookings: count, revenue: totalRevenue, totalCustomers: totalCustomers })
            })
            .catch(err => console.log(err))

        // request
            
    }, [])

    const fecthData = async () => {
        const res = await fetch('/predict',  {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({datetime: ["2023-07-01", "2023-08-01"]}) })
        // .then(res => res.json())
        // .then(data => console.log(data))
        console.log(res)
    }
    useEffect(() => {
        // fecthData()
    })

    // let date = []
    // let sumPrice = 0
    // let data = []
    // bookings.slice().reverse().forEach((booking, index) => {
    //     let createdDate = new Date(booking.createdAt)
    //     let obj = {name: '', price: 0}
    //     if (date.includes(createdDate.toString().slice(4, 15))) {
    //         sumPrice = sumPrice + booking.price
    //         if (bookings.length - 1 === index) {
    //             obj.name = date.slice(-1)
    //             obj.price = sumPrice
    //             data.push(obj)
    //         }
    //     }
    //     else {
    //         if (sumPrice !== 0) //ngày đầu tiên sum = 0 phải xử lý riêng
    //         {
    //             obj.name = date.slice(-1)
    //             obj.price = sumPrice
    //             data.push(obj)
    //         }
    //         if (!date.includes(createdDate.toString().slice(4, 15))) {
    //             date.push(createdDate.toString().slice(4, 15))
    //         }
    //         sumPrice = booking.price
    //     }
    // })

    // const [date, setDate] = useState([])
    // const [pricePerDay, setPricePerDay] = useState([])
    

    const [dateChart, setDateChart] = useState([])
    const [priceChart, setPriceChart] = useState([])
    useEffect(() => {
        const date = []
        const pricePerDay = []
        let sumPrice = 0
        // bookings?.slice().reverse().forEach((booking, index) => {
        //     let createdDate = new Date(booking.createdAt)
        //     if (date.includes(createdDate.toString().slice(4, 15))) {
        //         sumPrice += booking.price
        //         if (bookings.length - 1 === index) {
        //             pricePerDay.push(sumPrice)
        //         }
        //     }
        //     else {
        //         if (!date.includes(createdDate.toString().slice(4, 15))) {
        //             // setDate(prev => [...prev, createdDate.toString().slice(4, 15)])
        //             date.push(createdDate.toString().slice(4, 15))
        //         }
        //         // setDate(prev => [...prev, createdDate.toString().slice(4, 15)])
        //         if (sumPrice !== 0) {
        //             // setPricePerDay(prev => [...prev, sumPrice])
        //             pricePerDay.push(sumPrice)
        //             if (bookings.length - 1 === index) {
        //                 pricePerDay.push(booking.price)
        //             }
        //         }
        //         sumPrice = booking.price
        //     }
        // })
        // let bookingLength = bookings?.count
        // console.log(bookingLength)
        bookings?.forEach((item, index) => { 
            for (let i = 0; i < item?.count; i++) {
                let createdDate = new Date(item.createdAt[i])
                if (date.includes(createdDate.toString().slice(4, 15))) {
                    sumPrice += item.price[i]
                    if (item.count - 1 === i) {
                        pricePerDay.push(sumPrice)
                    }
                }
                else {
                    if (!date.includes(createdDate.toString().slice(4, 15))) {
                        // setDate(prev => [...prev, createdDate.toString().slice(4, 15)])
                        date.push(createdDate.toString().slice(4, 15))
                    }
                    // setDate(prev => [...prev, createdDate.toString().slice(4, 15)])
                    if (sumPrice !== 0) {
                        // setPricePerDay(prev => [...prev, sumPrice])
                        pricePerDay.push(sumPrice)
                        sumPrice = item.price[i]
                        if (item.count - 1 === i) {
                            pricePerDay.push(item.price[i])
                        }
                    }
                    else {
                        sumPrice = item.price[i]
                        if (item.count - 1 === i) {
                            pricePerDay.push(item.price[i])
                        }
                    }
                    // pricePerDay.push(sumPrice)
                }
            }
            sumPrice = 0
        })
        // console.log(date.length)
        // console.log(pricePerDay.length)
        setDateChart(date)
        setPriceChart(pricePerDay)
    }, [bookings])
    // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 500, pv: 3000, amt: 1600}];
    // const [state, setState] = useState({
    //     options: {
    //         colors: ['#01565B'],
    //         chart: {
    //             id: 'basic-bar',
    //             toolbar: {
    //                 show: true,
    //                 tools: {
    //                     selection: false,
    //                     zoom: false,
    //                     zoomin: false,
    //                     zoomout: false,
    //                     pan: false,
    //                     reset: true,
    //                 }
    //             },
    //         },

    //         xaxis: {
    //             // categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    //             categories: dateChart
    //         }
    //     },
    //     series: [
    //         {
    //             name: 'Updates',
    //             data: priceChart
    //         },
    //         // {
    //         //     name: 'New taks',
    //         //     data: [70, 47, 72, 45, 12, 59, 38]
    //         // }
    //     ]
    // })
    // useEffect(() => {
    //     const forecastedValuesObject = simpleSalesForecasting(
    //         [13409, 29389, 128940, 490059, 290394, 1928904, 3892019, 2903945],
    //         2,
    //         4
    //     );
    //     // console.log(forecastedValuesObject)
        
    // },[])
    // const total = useMemo(() => {
    //     if (bookings)
    //     {
    //         const result = bookings.reduce((result, booking) => {
    //             return result + booking.price
    //         }, 0)
            
    //         return result
    //     }
    //     return 0
    // }, [bookings])

    
    // const [totalCustomers, setTotalCustomers] = useState([])
    // useEffect(() => {
    //     if (user?.role === 'manager') {
    //         request
    //             .get(`/api/v1/booking/hotel/${selectedHotelId}/distinct`, { headers: {token: `Beaer ${accessToken}`} })
    //             .then(res => setTotalCustomers(res))
    //             .catch(err => console.log(err))
    
    //         request
    //             .get('/api/v1/revenue', { headers: {token: `Beaer ${accessToken}`} })
    //             .then(res => {
    //                 const r = res.find((hotel) => {
    //                     return hotel.hotelId === user?.hotelId
    //                 })
    //                 if (!r && bookings.length !== 0) {
    //                     request
    //                         .post(`/api/v1/revenue/${selectedHotelId}`, { hotelId: user?.hotelId, totalBookings: bookings.price, totalCustomers: totalCustomers.length }, { headers: {token: `Beaer ${accessToken}`}})
    //                         .then(res => console.log('Upload revenue successfull'))
    //                         .catch(err => console.log(err))
    //                 }
    //                 else if (r && bookings.length !== 0) {
    //                     request
    //                         .put(`/api/v1/revenue/${user?.hotelId}`, { totalBookings: bookings.price, totalCustomers: totalCustomers.length }, { headers: {token: `Beaer ${accessToken}`}})
    //                         .then(res => console.log('Update revenue successfull'))
    //                         .catch(err => console.log(err))
    //                 }
    //             })
    //     }
    // },[])

    const [goal, setGoal] = useState('')
    const [revenueGoal, setRevenueGoal] = useState('')
    useEffect(() => {
        request
            .get(`/api/v1/revenue/${selectedHotelId}`, { headers: {token: `Beaer ${accessToken}`} })
            .then(res => setRevenueGoal(res))
            .catch(err => console.log(err))
    }, [loading, selectedHotelId])

    const handleSubmitHotel = (id) => {
        const r = allHotels.find((hotel) => {
            return hotel._id === id
        })
        // console.log(id)
        setSelectedHotel(r.name)
        setSelectedHotelId(id)
        request
            .get(`/api/v1/booking/hotel/${id}/${selectedType}/${selectedCode}/${selectedYear}/revenue`, { headers: {token: `Beaer ${accessToken}`} })
            .then(res => {
                setBookings(res.data.bookingArray)
                const count = res.data.bookingArray.reduce((result, booking) => {
                    return result + booking.count
                }, 0)
                const totalRevenue = res.data.bookingArray.reduce((result, booking) => {
                    return result + booking.totalPrice
                }, 0)
                const totalCustomers = res.data.customerArray.reduce((result, customer) => {
                    return result + customer.count
                }, 0)
                setHotelRevenue({ totalBookings: count, revenue: totalRevenue, totalCustomers: totalCustomers })
            })
            .catch(err => console.log(err))
    }

    // const handleSubmitDate = (type) => {
    //     setSelectedDate('This ' + type)
    //     const now = new Date()
    //     request
    //         .get(`/api/v1/booking/hotel/${user?.hotelId}/${type}/${now.toISOString()}/revenue`, { headers: {token: `Beaer ${accessToken}`} })
    //         .then(res => setBookings(res))
    //         .catch(err => console.log(err))
    // }

    const inputRef = useRef()
    const handleSaveGoal = () => {
        request
            .put(`/api/v1/revenue/${user?.hotelId}`, {goal: parseInt(goal)}, { headers: {token: `Beaer ${accessToken}`}})
            .then(res => {
                setGoal('')
                inputRef.current.focus()
                setLoading(!loading)
            })
            .catch(err => console.log(err))
    }

    if (user.role === 'user') {
        return <Navigate to='/'/>
    }
    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('input-spending')}>
                <input className={cx('input')} placeholder='Enter money' value={price} onChange={e => setPrice(e.target.value)}/>
                <div className={cx('btn')} onClick={handleSubmit}>Enter</div>
            </div> */}

            {/* <ul className={cx('spending-price')}>
                {prices.map((price, index) => (
                    <li key={index}>{price}</li>
                ))}
            </ul> */}
            <div className={cx('log')}>

            </div>
            {/* <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart> */}

            <div className={cx('chart')}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h2 style={{marginRight: '20px'}}>Revenue Analytics</h2>

                    {user?.role === 'admin' ? 
                        <>
                            <div className={cx('header__search-select')}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', lineHeight: '20px'}}>
                                    <span className={cx('header__search-select-label')}>{selectedHotel}</span>
                                    <FontAwesomeIcon icon={faAngleDown} className={cx('header__search-select-icon')}/>
                                </div>

                                <ul className={cx('header__search-option')}>
                                    {allHotels.map((hotel, index) => (
                                        <li key={index} className={cx('header__search-option-item')} onClick={() => handleSubmitHotel(hotel._id)}>
                                            <span>{hotel.name}</span>
                                            <FontAwesomeIcon className={cx('icon')} icon={faCheck}/>
                                        </li>
                                    ))}
                                    {/* <li className={cx('header__search-option-item', 'header__search-option-item--active')}>
                                        <span>Q1</span>
                                        <FontAwesomeIcon className={cx('icon')} icon={faCheck}/>
                                    </li> */}
                                </ul>
                                
                            </div>
                            <Menu items={DATE_ITEMS} onChange={handleDateMenuChange}>
                                <div className={cx('header__search-select')}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', lineHeight: '20px'}}>
                                        <span className={cx('header__search-select-label')}>{selectedDate}</span>
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('header__search-select-icon')}/>
                                    </div>
                                </div>
                                {/* {currentUser ? (
                                    <Image
                                        className={cx('user-avatar')}
                                        src="https://files.fullstack.edu.vn/f8-prod/user_photos/192415/625545b1a3e80.jpg"
                                        alt=""
                                        fallback="https://files.fullstack.edu.vn/f8-prod/user_photos/192415/625545b1a3e80.jpg" // dùng để để ảnh mình muốn, nếu ko có thì nó sẽ lấy ảnh no-image
                                    />
                                ) : (
                                    <button className={cx('more-btn')}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </button>
                                )} */}
                            </Menu>
                            <Menu items={YEAR_ITEMS} onChange={handleYearMenuChange}>
                                <div className={cx('header__search-select')}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', lineHeight: '20px'}}>
                                        <span className={cx('header__search-select-label')}>{selectedYear}</span>
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('header__search-select-icon')}/>
                                    </div>
                                </div>
                                {/* {currentUser ? (
                                    <Image
                                        className={cx('user-avatar')}
                                        src="https://files.fullstack.edu.vn/f8-prod/user_photos/192415/625545b1a3e80.jpg"
                                        alt=""
                                        fallback="https://files.fullstack.edu.vn/f8-prod/user_photos/192415/625545b1a3e80.jpg" // dùng để để ảnh mình muốn, nếu ko có thì nó sẽ lấy ảnh no-image
                                    />
                                ) : (
                                    <button className={cx('more-btn')}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </button>
                                )} */}
                            </Menu>
                        </>
                    :
                        <>
                            {/* <div className={cx('header__search-select')}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', lineHeight: '20px'}}>
                                    <span className={cx('header__search-select-label')}>{selectedDate}</span>
                                    <FontAwesomeIcon icon={faAngleDown} className={cx('header__search-select-icon')}/>
                                </div>

                                <ul className={cx('header__search-option')}>
                                    
                                    <li className={cx('header__search-option-item')} onClick={() => handleSubmitDate('week')}>
                                        <span>This week</span>
                                        <FontAwesomeIcon className={cx('icon')} icon={faCheck}/>
                                    </li>
                                    <li className={cx('header__search-option-item')} onClick={() => handleSubmitDate('month')}>
                                        <span>This month</span>
                                        <FontAwesomeIcon className={cx('icon')} icon={faCheck}/>
                                    </li>
                                    <li className={cx('header__search-option-item')} onClick={() => handleSubmitDate('quarter')}>
                                        <span>This quarter</span>
                                        <FontAwesomeIcon className={cx('icon')} icon={faCheck}/>
                                    </li>
                                    
                                </ul>
                            </div> */}
                            <Menu items={DATE_ITEMS} onChange={handleDateMenuChange}>
                                <div className={cx('header__search-select')}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', lineHeight: '20px'}}>
                                        <span className={cx('header__search-select-label')}>{selectedDate}</span>
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('header__search-select-icon')}/>
                                    </div>
                                </div>
                                {/* {currentUser ? (
                                    <Image
                                        className={cx('user-avatar')}
                                        src="https://files.fullstack.edu.vn/f8-prod/user_photos/192415/625545b1a3e80.jpg"
                                        alt=""
                                        fallback="https://files.fullstack.edu.vn/f8-prod/user_photos/192415/625545b1a3e80.jpg" // dùng để để ảnh mình muốn, nếu ko có thì nó sẽ lấy ảnh no-image
                                    />
                                ) : (
                                    <button className={cx('more-btn')}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </button>
                                )} */}
                            </Menu>
                            <Menu items={YEAR_ITEMS} onChange={handleYearMenuChange}>
                                <div className={cx('header__search-select')}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', lineHeight: '20px'}}>
                                        <span className={cx('header__search-select-label')}>{selectedYear}</span>
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('header__search-select-icon')}/>
                                    </div>
                                </div>
                                {/* {currentUser ? (
                                    <Image
                                        className={cx('user-avatar')}
                                        src="https://files.fullstack.edu.vn/f8-prod/user_photos/192415/625545b1a3e80.jpg"
                                        alt=""
                                        fallback="https://files.fullstack.edu.vn/f8-prod/user_photos/192415/625545b1a3e80.jpg" // dùng để để ảnh mình muốn, nếu ko có thì nó sẽ lấy ảnh no-image
                                    />
                                ) : (
                                    <button className={cx('more-btn')}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </button>
                                )} */}
                            </Menu>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <input ref={inputRef} value={goal} className={cx('goal-input')} placeholder='Enter goal' onChange={(e) => setGoal(e.target.value)}/>
                                {goal && <span className={cx('save-btn')} onClick={handleSaveGoal}>Save</span>}
                            </div>
                        </>
                    }
                </div>
                <Chart 
                    options={{
                        colors: ['#01565B'],
                        chart: {
                            id: 'basic-bar',
                            toolbar: {
                                show: true,
                                tools: {
                                    selection: false,
                                    zoom: false,
                                    // zoomin: false,
                                    // zoomout: false,
                                    pan: false,
                                    reset: true,
                                }
                            },
                        },

                        xaxis: {
                            // categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                            categories: dateChart
                        }
                    }}
                    series={[
                        {
                            name: 'Updates',
                            data: priceChart
                        }
                    ]}
                    type='area'
                    width='700'
                />
            </div>

            <div className={cx('analytic')}>
                <div className={cx('analytic-row')}>
                    <div className={cx('analytic-card')}>
                        <div className={cx('card-icon')} style={{backgroundColor: '#ff9f57'}}>
                            <FontAwesomeIcon icon={faBullseye} className={cx('icon')}/>
                        </div>
                        <div className={cx('card-text')}>Goals</div>
                        <h1 className={cx('card-data')}>${revenueGoal?.goal}</h1>
                    </div>
                    <div className={cx('analytic-card')}>
                        <div className={cx('card-icon')} style={{backgroundColor: '#65d6f9'}}>
                            <FontAwesomeIcon icon={faSackDollar} className={cx('icon')}/>
                        </div>
                        <div className={cx('card-text')}>Revenue</div>
                        <h1 className={cx('card-data')}>${hotelRevenue?.revenue}</h1>
                    </div>
                </div>

                <div className={cx('analytic-row')}>
                    <div className={cx('analytic-card')}>
                        <div className={cx('card-icon')} style={{backgroundColor: '#ae7cec'}}>
                            <FontAwesomeIcon icon={faBellConcierge} className={cx('icon')}/>
                        </div>
                        <div className={cx('card-text')}>Bookings</div>
                        <h1 className={cx('card-data')}>{hotelRevenue?.totalBookings}</h1>
                    </div>
                    <div className={cx('analytic-card')}>
                        <div className={cx('card-icon')} style={{backgroundColor: '#779fda'}}>
                            <FontAwesomeIcon icon={faUsers} className={cx('icon')}/>
                        </div>
                        <div className={cx('card-text')}>Customers</div>
                        <h1 className={cx('card-data')}>{hotelRevenue?.totalCustomers}</h1>
                    </div>
                </div>
            </div>

            {/* {bookings.map((item, index) => (
                <h4 key={index}>{item.createdAt}</h4>
            ))} */}

            {/* {priceChart.map((item, index) => (
                <h4 key={index}>{item}</h4>
            ))} */}
        </div>
    )
}

export default Earning;