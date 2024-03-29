import classNames from 'classnames/bind'
import * as request from '~/utils/request';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './History.module.scss'
import moment from 'moment'
import bcrypt from 'bcryptjs'

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

    const [isValid, setIsValid] = useState(false)
    const handleValidPassword = async (e) => {
        await bcrypt.compare(e, user?.password, function(err, res) {
            if (res) {
                setIsValid(true)
            }
        });        
    }

    const handleHide = () => {
        setIsValid(false)
    }
    
    return (
        <div className={cx('wrapper')}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                <h1>History bookings</h1>
                <input className={cx('input-item')} type='password' placeholder='Please enter your password' onChange={e => handleValidPassword(e.target.value)}/>
                {isValid && <span className={cx('save-btn')} onClick={handleHide}>Hide</span>}
            </div>
            <div className={cx('title')}>
                <h4 className={cx('title-item')}>ID</h4>
                <h4 className={cx('title-item')}>QR</h4>
                <h4 className={cx('title-item')}>QR URL</h4>
                <h4 className={cx('title-item')}>Arrival date</h4>
                <h4 className={cx('title-item')}>Arrival time</h4>
                <h4 className={cx('title-item')}>Created date</h4>
            </div>
            <hr/>
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
                        {isValid ? 
                            <img className={cx('qr-item')} src={booking?.qr} placeholder='QR'/>
                        : <div className={cx('required-warn')}>Enter password above to see QR Code</div>
                        }
                    </div>
                    <div className={cx('url-item')}>
                        {isValid ? 
                            <Link to={booking?.qrURL}>http://localhost:3000{booking?.qrURL}</Link>
                        : 
                            <div className={cx('required-warn')}>Enter password above to see QR Code</div>
                        } 
                    </div>
                    <div className={cx('booking-item')}>{moment(booking.fromDate).format('LL')}</div>
                    <div className={cx('booking-item')}>{booking.fromTime}</div>
                    <div className={cx('booking-item')}>{moment(booking.createdAt).format('LL')}</div>
                </div>
            ))}
            <hr/>
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
                        {isValid ? 
                            <img className={cx('qr-item')} src={booking?.qr} placeholder='QR'/>
                        : 
                            <div className={cx('required-warn')}>Enter password above to see QR Code</div>
                        }
                    </div>
                    <div className={cx('url-item')}>
                        {isValid ? 
                            <Link to={booking?.qrURL}>http://localhost:3000{booking?.qrURL}</Link>
                        :
                            <div className={cx('required-warn')}>Enter password above to see QR Code</div>
                        }
                    </div>
                    <div className={cx('booking-item')}>{moment(booking.fromDate).format('LL')}</div>
                    <div className={cx('booking-item')}>{booking.fromTime}</div>
                    <div className={cx('booking-item')}>{moment(booking.createdAt).format('LL')}</div>
                </div>
            ))}
            <hr/>
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
                        {isValid ? 
                            <img className={cx('qr-item')} src={booking?.qr} placeholder='QR'/>
                        :  
                            <div className={cx('required-warn')}>Enter password above to see QR Code</div>
                        }
                    </div>
                    <div className={cx('url-item')}>
                        {isValid ? 
                            <Link to={booking?.qrURL || ''}>http://localhost:3000{booking?.qrURL || ''}</Link>
                        : 
                            <div className={cx('required-warn')}>Enter password above to see QR Code</div>
                        }
                    </div>
                    <div className={cx('booking-item')}>{moment(booking.fromDate).format('LL')}</div>
                    <div className={cx('booking-item')}>{booking.fromTime}</div>
                    <div className={cx('booking-item')}>{moment(booking.createdAt).format('LL')}</div>
                </div>
            ))}
        </div>
    );
}

export default History;
