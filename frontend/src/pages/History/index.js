import classNames from 'classnames/bind'
import * as request from '~/utils/request';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './History.module.scss'
import moment from 'moment'

moment().format()
const cx = classNames.bind(styles)

function History() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken
    const id = user?._id
    
    const [presentBookings, setPresentBookings] = useState([])
    const [pastBookings, setPastBookings] = useState([])
    const [upcomingBookings, setUpcomingBookings] = useState([])
    useEffect(() => {
        request 
            .get(`/api/v1/booking/${id}/present`, { headers: {token: `Beaer ${accessToken}`}})
            .then(res => setPresentBookings(res))
            .catch(err => console.log(err))

        request 
            .get(`/api/v1/booking/${id}/upcoming`, { headers: {token: `Beaer ${accessToken}`}})
            .then(res => setUpcomingBookings(res))
            .catch(err => console.log(err))

        request
            .get(`/api/v1/booking/${id}/past`, { headers: {token: `Beaer ${accessToken}`}})
            .then(res => setPastBookings(res))
            .catch(err => console.log(err))
    },[])

    // let dateBooking = []
    // let x
    // upcomingBookings.forEach((booking, index) => {
    //     x = new Date(booking.createdAt)
    //     dateBooking.push(x.toString().slice(4, 15))
    // })
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h4 className={cx('title-item')}>ID</h4>
                <h4 className={cx('title-item')}>QR</h4>
                <h4 className={cx('title-item')}>QR URL</h4>
                <h4 className={cx('title-item')}>Arrival date</h4>
                <h4 className={cx('title-item')}>Arrival time</h4>
                <h4 className={cx('title-item')}>Created date</h4>
            </div>
            <h3>Present</h3>
            {/* <div className={cx('title')}>
                <h4 className={cx('title-item')}>ID</h4>
                <h4 className={cx('title-item')}>QR</h4>
                <h4 className={cx('title-item')}>Date</h4>
            </div> */}
            {presentBookings.map((booking, index) => (
                <div key={index} className={cx('booking')}>
                    <h4 className={cx('bookingCode-item')}>#{booking.bookingCode}</h4>
                    <div className={cx('booking-item')}>
                        <img className={cx('qr-item')} src={booking?.qr} placeholder='QR'/>
                    </div>
                    <Link to={booking?.qrURL} className={cx('url-item')}>http://localhost:3000{booking?.qrURL}</Link>
                    <div className={cx('booking-item')}>{moment(booking.fromDate).format('LL')}</div>
                    <div className={cx('booking-item')}>{booking.fromTime}</div>
                    <div className={cx('booking-item')}>{moment(booking.createdAt).format('LL')}</div>
                </div>
            ))}
            <h3>Upcoming</h3>
            {/* <div className={cx('title')}>
                <h4 className={cx('title-item')}>ID</h4>
                <h4 className={cx('title-item')}>QR</h4>
                <h4 className={cx('title-item')}>QR URL</h4>
                <h4 className={cx('title-item')}>Arrival date</h4>
                <h4 className={cx('title-item')}>Arrival time</h4>
                <h4 className={cx('title-item')}>Created date</h4>
            </div> */}
            {upcomingBookings.map((booking, index) => (
                <div key={index} className={cx('booking')}>
                    <h4 className={cx('bookingCode-item')}>#{booking.bookingCode}</h4>
                    <div className={cx('booking-item')}>
                        <img className={cx('qr-item')} src={booking?.qr} placeholder='QR'/>
                    </div>
                    <Link to={booking?.qrURL} className={cx('url-item')}>http://localhost:3000{booking?.qrURL}</Link>
                    <div className={cx('booking-item')}>{moment(booking.fromDate).format('LL')}</div>
                    <div className={cx('booking-item')}>{booking.fromTime}</div>
                    <div className={cx('booking-item')}>{moment(booking.createdAt).format('LL')}</div>
                </div>
            ))}
            <h3>Past</h3>
            {/* <div className={cx('title')}>
                <h4 className={cx('title-item')}>ID</h4>
                <h4 className={cx('title-item')}>QR</h4>
                <h4 className={cx('title-item')}>Date</h4>
            </div> */}
            {pastBookings.map((booking, index) => (
                <div key={index} className={cx('booking')}>
                    <h4 className={cx('bookingCode-item')}>#{booking.bookingCode}</h4>
                    <div className={cx('booking-item')}>
                        <img className={cx('qr-item')} src={booking?.qr} placeholder='QR'/>
                    </div>
                    {/* <Link to={booking?.qrURL} className={cx('url-item')}>http://localhost:3000{booking?.qrURL}</Link> */}
                    <div className={cx('booking-item')}>{moment(booking.fromDate).format('LL')}</div>
                    <div className={cx('booking-item')}>{booking.fromTime}</div>
                    <div className={cx('booking-item')}>{moment(booking.createdAt).format('LL')}</div>
                </div>
            ))}
        </div>
    );
}

export default History;
