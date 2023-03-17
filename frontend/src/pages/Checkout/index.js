import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCreditCard, faGlobe, faMoneyBill, faWallet, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind'
import { id } from 'date-fns/locale';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import QRCode from "qrcode";
import { AES } from "crypto-js";

import images from '~/assets/images';
import { useStore } from '~/store';
import * as request from '~/utils/request';
import styles from './Checkout.module.scss'; 

const cx = classNames.bind(styles)

function Checkout() {

    const user = useSelector((state) => state.auth.login?.currentUser);
    const id = user?._id
    const accessToken = user?.accessToken
    const navigate = useNavigate()

    // const [state, dispatch] = useStore()
    // const { hotel, typeOfTime, traveller, dateCheckIn, dateCheckOut, timeCheckIn, timeCheckOut, extras } = state
    // console.log(hotel, typeOfTime, traveller, dateCheckIn, dateCheckOut, timeCheckIn, timeCheckOut, extras)

    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')))
    },[loading])

    const total = useMemo(() => {
        if (cart)
        {
            const result = cart.reduce((result, booking) => {
                return result + booking.price
            }, 0)
            
            return result
        }
        return 0
    }, [cart])

    // const handleClearAll = () => {
    //     localStorage.removeItem('cart')
    //     const bookButton = document.querySelector('.' + cx('book-button'))
    //     bookButton.classList.add(cx('payment__confirm-disabled'));
    // }

    useEffect(() => {
        const bookButton = document.querySelector('.' + cx('book-button'))
        if (!cart || cart.length === 0){
            bookButton.classList.add(cx('payment__confirm-disabled'));
            // localStorage.removeItem('cart')
        }
        else bookButton.classList.remove(cx('payment__confirm-disabled'));
    })

    const handleRemoveItem = (i) => {
        cart.splice(i, 1)
        localStorage.setItem('cart', JSON.stringify(cart))
        setLoading(!loading)
    }

    let timeInterval = cart ? parseInt(cart[0]?.timeCheckOut.slice(0,2)) - parseInt(cart[0]?.timeCheckIn.slice(0,2)) : 0
    const [breakfastPrice, setBreakfastPrice] = useState(0)
    const [roomPrice, setRoomPrice] = useState(0)
    const [servicesPrice, setServicesPrice] = useState(0)
    const [taxPrice, setTaxPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [room, setRoom] = useState([])
    useEffect(() => {
        if (cart && cart.length !== 0) {
            if (cart[0]?.typeOfTime === 'Hourly') {
                // timeInterval = parseInt(cart[0].timeCheckOut.slice(0,2)) - parseInt(cart[0].timeCheckIn.slice(0,2))
                setRoomPrice((room.priceHour + room.priceNextHour*(timeInterval - 1))*cart[0]?.numRooms)
            }
            else {
                setRoomPrice(room.priceOverNight*cart[0]?.numOfDays*cart[0]?.numRooms)
            }
    
            // Calc service price
            for (let i = 0; i < cart[0]?.extras.length; i++) {
                if (cart[0]?.extras[i].includes('Breakfast')) {
                    setBreakfastPrice(cart[0]?.traveller*cart[0]?.servicePrice[i])
                    setServicesPrice(prevServicesPrice => prevServicesPrice + cart[0]?.traveller*cart[0]?.servicePrice[i])
                }
                else {
                    // console.log(servicesPrice + cart[0]?.servicePrice[i])
                    setServicesPrice(prevServicesPrice => prevServicesPrice + cart[0]?.servicePrice[i])
                }
            } 
        }
    },[room, loading])

    useEffect(() => {
        // tax price
        setTaxPrice(Math.floor((roomPrice + servicesPrice)*0.1))
        setTotalPrice(taxPrice + roomPrice + servicesPrice)
    },[roomPrice, servicesPrice, taxPrice, loading])

    useEffect(() => {
        cart?.forEach((i) => {
            request
                .get(`/api/v1/room/${i.roomId}/${i.hotelId}`)
                .then(res => setRoom(res))
                .catch(err => console.error(err))
        })
    },[cart])

    const [dateIn, setDateIn] = useState()
    const [dateOut, setDateOut] = useState()
    const [xDate, setXDate] = useState()
    const [yDate, setYDate] = useState()
    useEffect(() => {
        let x,y
        if (cart && cart.length !== 0) {
            x = new Date(cart[0].dateCheckIn)
            y = new Date(cart[0].dateCheckOut)
            setXDate(x.toString())
            setYDate(y.toString())
            // console.log(x.toString().slice(4, 15))
            setDateIn(x.toString().slice(4, 15))
            setDateOut(y.toString().slice(4, 15))
        }
    },[cart])

    const [ip, setIP] = useState('');
    
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
    }
    
    useEffect(()=>{
        //passing getData method to the lifecycle method
        getData()
    },[])

    // const [encrptedData, setEncrptedData] = useState("");
    // const [decrptedData, setDecrptedData] = useState("");

    const [url, setUrl] = useState('')
	const [qr, setQr] = useState('')
    // const [filesCover, setFilesCover] = useState([])
    const handleBook = async () => {
        const modal = document.querySelector('.' + cx('modal'))
        modal.classList.add(cx('appear')) 
        modal.classList.remove(cx('disappear'))

        const text = '' + user.userId + Date.now()
        const data = AES.encrypt(
            text,
            process.env.REACT_APP_SECRET_PASS
        ).toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l')

        let qrCode = ''
		QRCode.toDataURL(`http://192.168.0.10:3000/checkin/${data}`, {
			width: 400,
			margin: 2,
			color: {
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, url) => {
			if (err) return console.error(err)
            qrCode = url
			// console.log(url)
			setQr(url)
		})

        // setFilesCover(qr)
        
        // var reader = new FileReader();
		// reader.readAsDataURL(e.target.files[0]);
		// reader.onload = function (e) {
        //     var img = new Image();
        //     img.src = e.target.result;
        //     img.onload = function () {
        //         setCover(img.src);
		//     };
        // }
        
        // if (!filesCover[0])
        //     return
        // const data = new FormData();
        // data.append('upload_preset', 'qr image')
        // data.append('file', filesCover[0])
        // const res = await fetch('https://api.cloudinary.com/v1_1/des13gsgi/image/upload',{
        //     method: 'POST',
        //     body: data,
        // })
        // const file = await res.json()

        const result = request
            .post('/api/v1/booking/post', 
            {   
                bookedBy: id, 
                room: cart[0]?.roomId, 
                bookingCode: text,
                qr: qrCode,
                qrURL: `http://192.168.0.10:3000/checkin/${data}`,
                roomNumbers: ['01'], 
                numberOfGuest: cart[0]?.traveller, 
                hotel: cart[0]?.hotelId, 
                price: totalPrice,
                servicePrice: servicesPrice, 
                isOverNight: cart[0]?.typeOfTime === 'Overnight' ? true : false,  
                fromDate: cart[0]?.dateCheckIn,
                toDate: cart[0]?.dateCheckOut,
                fromTime: cart[0]?.timeCheckIn,
                toTime: cart[0]?.timeCheckOut,
                numOfHours: timeInterval,
                numOfDays: cart[0]?.numOfDays
            }, {
                headers: {token: `Bearer ${accessToken}`}
            })
            .then(localStorage.removeItem('cart'))
            .catch(err => console.log(err))
        // if (result) {
        //     console.log(result)
        //     localStorage.removeItem('cart')
        // }
        const radios = document.querySelector('input[name="method"]:checked')
        if (radios?.value === 'VNPAY-WALLET') {
            const payment = request
                .post('/api/v1/booking/create_payment_url', { amount: totalPrice*25000, orderInfo: 'Thanh toán đặt phòng', orderId: result._id }, {
                    headers: {'x-forwarded-for': ip}
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))
    
            window.location.replace(payment.data)
        } 
    }

    const handleClose = () => {
        const modal = document.querySelector('.' + cx('modal'))
        modal.classList.remove(cx('appear'))
        modal.classList.add(cx('disappear'))
        // for (const item of modal) {
        //     if (item.classList.value.includes(cx('appear')))
        //     {
        //         item.classList.remove(cx('appear'))
        //         item.classList.add(cx('disappear'))
        //     }
        // }
    }

    return (
        <>
            <Link to='/' className={cx('logo-link')}>
                <img src={images.logo} alt="KQ" className={cx('logo-img')}/>
            </Link>
            
            <div className={cx('details')}>
                <div className={cx('reservation')}>
                    {cart && cart.length !== 0 ? cart.map((item, index) => (
                        <div key={index} className={cx('order')}>
                            <div className={cx('order__heading')}>
                                <h2>Your reservation</h2>
                                {/* <div className={cx('order__clear')} onClick={handleClearAll}>Clear all</div> */}
                                <FontAwesomeIcon style={{cursor:'pointer'}} icon={faTrashCan} onClick={() => handleRemoveItem(index)}/>
                            </div>
                            <div className={cx('line')}></div>
                            
                            {/* <div className="order__empty">
                                <img src="./assets/img/empty-detail.jpeg" className="order__empty-img"/>
                                <div className="order__empty-text">Your detail is empty</div>
                            </div> */}

                            <div className={cx('order__delivery')}>
                                <div className={cx('order__delivery-label')}>{item.hotel}</div>
                                <h4 className={cx('order__delivery-price')}>${item.typeOfTime === 'Hourly' ? room?.priceHour + '/hour' : room?.priceOverNight + '/night'}</h4>
                            </div>
                            <div className={cx('order__delivery')}>
                                <div className={cx('order__delivery-label')}>Type</div>
                                <h4 className={cx('order__delivery-price')}>{room.type}</h4>
                            </div>
                            <div className={cx('order__delivery')}>
                                <div className={cx('order__delivery-label')}>Dates</div>
                                <h4 className={cx('order__delivery-price')}>{dateIn} - {dateOut}</h4>
                            </div>
                            <div className={cx('order__delivery')}>
                                <div className={cx('order__delivery-label')}>Time</div>
                                <h4 className={cx('order__delivery-price')}>from {item.timeCheckIn} - by {item.timeCheckOut}</h4>
                            </div>
                            <div className={cx('order__delivery')}>
                                <div className={cx('order__delivery-label')}>Guests</div>
                                <h4 className={cx('order__delivery-price')}>{item.traveller} {item.traveller > 1 ? 'guests' : 'guest'}</h4>
                            </div>
                            <div className={cx('line')}></div>

                            <div className={cx('order__details')}>
                                <div className={cx('order__heading')}>
                                    <h3>Price details</h3>
                                </div>
                                <div className={cx('order__delivery')}>
                                    <div className={cx('order__delivery-label')}>${item.typeOfTime === 'Hourly' ? room?.priceHour + ' x ' + timeInterval + ' hours' : room?.priceOverNight + ' x ' + item.numOfDays + ' nights'} x {item.numRooms} {item.numRooms > 1 ? 'rooms' : 'room'} </div>
                                    <h4 className={cx('order__delivery-price')}>${roomPrice}</h4>
                                </div>
                                {cart[0]?.servicePrice.map((service, index) => (
                                    <div key={index} className={cx('order__delivery')}>
                                        <div className={cx('order__delivery-label')}>${service} {cart[0]?.extras[index].includes('Breakfast') ? ' x ' + item.traveller + ' breakfasts' : '(' + cart[0]?.extras[index] + ')'}</div>
                                        <h4 className={cx('order__delivery-price')}>${cart[0]?.extras[index].includes('Breakfast') ? breakfastPrice : service}</h4>
                                    </div>
                                ))}
                                {/* <div className={cx('order__delivery')}>
                                    <div className={cx('order__delivery-label')}>Tax (10%)</div>
                                    <h4 className={cx('order__delivery-price')}>$16.80</h4>
                                </div> */}
                            </div>
                            {/* <div className={cx('line')}></div> */}

                            <div className={cx('shape')}>
                                <div className={cx('circle1')}></div>
                                <div className={cx('circle2')}></div>
                                <div className={cx('dot-line')}></div>
                            
                                <div className={cx('order__total')}>
                                    <h2 className={cx('order__total-label')}>Total</h2>
                                    <h2 className={cx('order__total-price')}>$
                                        <span>{roomPrice + servicesPrice}</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className={cx('order__empty')}>
                            <div>
                                <img src="https://res.cloudinary.com/des13gsgi/image/upload/v1672858468/Miscellaneous%20pics/empty-cart_pktdqt.jpg" alt='' className={cx('order__empty-img')}/>
                                <div className={cx('order__empty-text')}>Your cart is empty</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={cx('detail')}>
                    {user ? 
                        <>
                            <div className={cx('detail__info')}>
                                <h2>Your details</h2>
                                <div className={cx('detail__info-item-name')}>
                                    <div className={cx('detail__info-name')}>
                                        <h3>First name</h3>
                                        {user.username}
                                    </div>
                                    {/* <div className={cx('detail__info-name')}>
                                        <h3>Last name</h3>
                                        Mai
                                    </div> */}
                                    <div className={cx('detail__info-name')}>
                                        <h3>Birthdate</h3>
                                        22/02/2000
                                    </div>
                                </div>

                                <div className={cx('detail__info-item')}>
                                    <h3>Email</h3>
                                    {user.email}
                                </div>
                            </div>

                            <h2 style={{margin: '10px 0'}}>Your price summary</h2>
                            <div className={cx('title-summary')}>
                                <span>Rooms and Services</span>
                                <h4>${roomPrice + servicesPrice}</h4>
                            </div>
                            <div className={cx('title-summary')}>
                                <span>10% Tax</span>
                                <h4>${taxPrice}</h4>
                            </div>
                            <div className={cx('title-summary')}>
                                <h2 className={cx('summary-color')}>Total price</h2>
                                <h2 className={cx('summary-color')}>${totalPrice}</h2>
                            </div>
                            <div className={cx('payment')}>
                                <div className={cx('payment__label')}>
                                    <h2 className={cx('payment__heading')}>PAYMENT METHOD</h2>
                                </div>
                                <div className={cx('payment__method')}>
                                    <div className={cx('payment__method-item')}>
                                        <input id="card" name="method" type="radio" value="CARD"/>
                                        <FontAwesomeIcon className={cx('label')} icon={faMoneyBill}/>
                                        <label className={cx('label')} htmlFor="card"> Cash</label>
                                    </div>
                                    <div className={cx('payment__method-item')}>
                                        <input id="card" name="method" type="radio" value="CARD"/>
                                        <FontAwesomeIcon className={cx('label')} icon={faCreditCard}/>
                                        <label className={cx('label')} htmlFor="card"> Debit/Credit Card</label>
                                    </div>
                                    <div className={cx('payment__method-item')}>
                                        <input id="banking" name="method" type="radio" value="BANKING"/>
                                        <FontAwesomeIcon className={cx('label')} icon={faGlobe}/>
                                        <label className={cx('label')} htmlFor="banking"> Net Banking</label>
                                    </div>
                                    {/* <div className={cx('payment__method-item')}>
                                        <input id="wallet" name="method" type="radio" value="WALLET"/>
                                        <FontAwesomeIcon className={cx('label')} icon={faWallet}/>
                                        <label className={cx('label')} htmlFor="wallet"> Google/Apple Wallet</label>
                                    </div> */}
                                    <div className={cx('payment__method-item')}>
                                        <input id="momo-wallet" name="method" type="radio" value="MOMO-WALLET"/>
                                        <img src='https://res.cloudinary.com/des13gsgi/image/upload/v1670957887/Miscellaneous%20pics/momo_icon_square_pinkbg_RGB_rpfd0c.png' alt='momo' className={cx('label')} style={{width: '1.4rem'}} />
                                        {/* <FontAwesomeIcon className={cx('label')} icon={faWallet}/> */}
                                        <label className={cx('label')} htmlFor="momo-wallet"> Momo Wallet</label>
                                    </div>
                                    <div className={cx('payment__method-item')}>
                                        <input id="vnpay-wallet" name="method" type="radio" value="VNPAY-WALLET"/>
                                        <img src='data:image/png;base64,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' alt='vnpay' className={cx('label')} style={{width: '1.4rem'}} />
                                        {/* <FontAwesomeIcon className={cx('label')} icon={faWallet}/> */}
                                        <label className={cx('label')} htmlFor="vnpay-wallet"> VNPay Wallet</label>
                                    </div>
                                    <span className={cx('form-message')}></span>
                                </div>
                            </div>
                        </> : 
                        <h2 className={cx('detail__info-auth')}>
                            <Link to='/signin' className={cx('detail__auth')}>Login</Link> or <Link to='/signup' className={cx('detail__auth')}>sign up</Link> to book
                        </h2>
                    }

                    {/* <div className={cx('policy')}>
                        <h3 className={cx('policy-heading')}>Cancellation policy</h3>
                        <div className={cx('policy-content')}>Free cancellation before 2:00 PM on Dec 14. Cancel before check-in on Dec 15 for a partial refund. Learn more</div>
                    </div> */}

                    <div className={cx('rules')}>
                        <div className={cx('rules-content')}>
                            By selecting the button below, I agree to the KQ Luxury Rules and Refund Policy that KQ Luxury can charge my payment method if I’m responsible for damage. I agree to pay the total amount shown if the hotel accepts my booking request.
                        </div>
                        <h3 className={cx('book-button')} onClick={handleBook}>Request to book</h3>
                    </div>
                    
                    {/* <button onClick={GenerateQRCode}>Generate</button> */}
                    <div className={cx('modal')}>
                        <div className={cx('modal__overlay')}></div>
                        <div className={cx('modal__body')}>
                            {/* <div className={cx('close-btn')} onClick={handleClose}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </div> */}
                            {qr && <>
                                <img src={qr} />
                                <br/>
                                <a href={qr} download="qrcode.png" style={{display: 'flex', justifyContent: 'center'}}>Download</a>
                            </>}
                            <h3 className={cx('book-button')} onClick={handleClose}>OK</h3>
                        </div>
                    </div>
                    {/* <div className={cx('detail__login')}>
                        LOGIN
                        <div className={cx('detail__login-input')}>
                            <input type="text" placeholder="Name"/>
                            <input type="text" placeholder="Phone"/>
                        </div>
                    </div>

                    <div className={cx('detail__address')}>
                        SHIPPING ADDRESS
                        <div className={cx('detail__address-input')}>
                            <input type="text" placeholder="Address"/>
                        </div>
                    </div> */}

                    {/* <div className={cx('payment')}>
                        <div className={cx('payment__label')}>
                            <h2 className={cx('payment__heading')}>PAYMENT METHOD</h2>
                        </div>
                        <div className={cx('payment__method')}>
                            <div className={cx('payment__method-item')}>
                                <input id="card" name="method" type="radio" value="CARD" />
                                <FontAwesomeIcon className={cx('label')} icon={faCreditCard}/>
                                <label className={cx('label')} htmlFor="card"> Debit/Credit Card</label>
                            </div>
                            <div className={cx('payment__method-item')}>
                                <input id="banking" name="method" type="radio" value="BANKING"/>
                                <FontAwesomeIcon className={cx('label')} icon={faGlobe}/>
                                <label className={cx('label')} htmlFor="banking"> Net Banking</label>
                            </div>
                            <div className={cx('payment__method-item')}>
                                <input id="wallet" name="method" type="radio" value="WALLET"/>
                                <FontAwesomeIcon className={cx('label')} icon={faWallet}/>
                                <label className={cx('label')} htmlFor="wallet"> Google/Apple Wallet</label>
                            </div>
                            <span className={cx('form-message')}></span>
                        </div>
                    </div>
                    <h2 className={cx('payment__confirm')}>PAYMENT</h2> */}
                </div>
                
            </div>
        </>
    )
}

export default Checkout;