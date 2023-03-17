import classNames from 'classnames/bind'

import styles from './History.module.scss'
import * as request from '~/utils/request';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    let dateBooking = []
    let x
    upcomingBookings.forEach((booking, index) => {
        x = new Date(booking.createdAt)
        dateBooking.push(x.toString().slice(4, 15))
    })
    
    return (
        <div className={cx('wrapper')}>
            {/* <h3>Present</h3>
            <div className={cx('title')}>
                <h4 className={cx('title-item')}>ID</h4>
                <h4 className={cx('title-item')}>QR</h4>
                <h4 className={cx('title-item')}>Date</h4>
            </div>
            {presentBookings.map((booking, index) => (
                <div key={index} className={cx('booking')}>
                    <h3 className={cx('title-item')}>#{booking.bookingCode}</h3>
                    <img className={cx('title-item')} src={booking?.qr} placeholder='QR'/>
                    <div className={cx('title-item')}>{booking.createdAt}</div>
                </div>
            ))}
            <h3>Upcoming</h3>
            <div className={cx('title')}>
                <h4 className={cx('title-item')}>ID</h4>
                <h4 className={cx('title-item')}>QR</h4>
                <h4 className={cx('title-item')}>Date</h4>
            </div>
            {upcomingBookings.map((booking, index) => (
                <div key={index} className={cx('booking')}>
                    <h3 className={cx('title-item')}>#{booking.bookingCode}</h3>
                    <img className={cx('title-item')} src={booking?.qr} placeholder='QR'/>
                    <div className={cx('title-item')}>{booking.createdAt}</div>
                </div>
            ))} */}
            <h3>Past</h3>
            <div className={cx('title')}>
                <h4 className={cx('title-item')}>ID</h4>
                <h4 className={cx('title-item')}>QR</h4>
                <h4 className={cx('title-item')}>QR URL</h4>
                <h4 className={cx('title-item')}>Booking date</h4>
            </div>
            {upcomingBookings.map((booking, index) => (
                <div key={index} className={cx('booking')}>
                    <h3 className={cx('bookingCode-item')}>#{booking.bookingCode}</h3>
                    <div style={{width: '30%'}}>
                        <img className={cx('qr-item')} src={booking?.qr} placeholder='QR'/>
                    </div>
                    <div className={cx('date-item')}>{booking?.qrURL}</div>
                    <div className={cx('date-item')}>{dateBooking[index]}</div>
                </div>
            ))}
        </div>
    );
}

export default History;
