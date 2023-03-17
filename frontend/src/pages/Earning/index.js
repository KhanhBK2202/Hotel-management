import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Chart from 'react-apexcharts';
import * as request from '~/utils/request';
import styles from './Earning.module.scss'; 

const cx = classNames.bind(styles)

function Earning() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken

    // const [price, setPrice] = useState('')
    // const [prices, setPrices] = useState([])
    // const handleSubmit = () => {
    //     setPrices(prev => [...prev, price])
    // }

    const [bookings, setBookings] = useState([])
    useEffect(() => {
        request
            .get('/api/v1/booking', { headers: {token: `Beaer ${accessToken}`}})
            .then(res => setBookings(res))
            .catch(err => console.log(err))
    }, [])

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
        bookings.slice().reverse().forEach((booking, index) => {
            let createdDate = new Date(booking.createdAt)
            if (date.includes(createdDate.toString().slice(4, 15))) {
                sumPrice += booking.price
                if (bookings.length - 1 === index) {
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
                    if (bookings.length - 1 === index) {
                        pricePerDay.push(booking.price)
                    }
                }
                sumPrice = booking.price
            }
        })
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
                width='500'
            />

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