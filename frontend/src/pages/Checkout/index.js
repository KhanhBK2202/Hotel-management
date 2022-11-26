import { faCreditCard, faGlobe, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import styles from './Checkout.module.scss'; 

const cx = classNames.bind(styles)

function Checkout() {

    const user = true
    return (
        <>
            <Link to='/' className={cx('logo-link')}>
                <img src={images.logo} alt="KQ" className={cx('logo-img')}/>
            </Link>
            
            <div className={cx('details')}>
                <div className={cx('detail')}>
                    {user ? 
                        <>
                            <div className={cx('detail__info')}>
                                <h2>Your details</h2>
                                <div className={cx('detail__info-item-name')}>
                                    <div className={cx('detail__info-name')}>
                                        <h3>First name</h3>
                                        Khanh
                                    </div>
                                    <div className={cx('detail__info-name')}>
                                        <h3>Last name</h3>
                                        Mai
                                    </div>
                                </div>

                                <div className={cx('detail__info-item')}>
                                    <h3>Birthdate</h3>
                                    22/02/2000
                                </div>

                                <div className={cx('detail__info-item')}>
                                    <h3>Email</h3>
                                    nhatkhanhbk2202@gmail.com
                                </div>
                            </div>

                            <div className={cx('payment')}>
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
                        </> : 
                        <h2 className={cx('detail__info-auth')}>
                            <Link to='/signin' className={cx('detail__auth')}>Login</Link> or <Link to='/signup' className={cx('detail__auth')}>sign up</Link> to book
                        </h2>
                    }
                    

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
                
                <div className={cx('order')}>
                    <div className={cx('order__heading')}>
                        <h2>Your trip</h2>
                        <div className={cx('order__clear')}>Clear all</div>
                    </div>
                    <div className={cx('line')}></div>
                    {/* <div className="order__empty">
                        <img src="./assets/img/empty-detail.jpeg" className="order__empty-img"/>
                        <div className="order__empty-text">Your detail is empty</div>
                    </div> */}


                    <div className={cx('order__delivery')}>
                        <div className={cx('order__delivery-label')}>KQ Đà Nẵng</div>
                        <h4 className={cx('order__delivery-price')}>$20/night</h4>
                    </div>
                    <div className={cx('order__delivery')}>
                        <div className={cx('order__delivery-label')}>Type</div>
                        <h4 className={cx('order__delivery-price')}>Bungalow Double</h4>
                    </div>
                    <div className={cx('order__delivery')}>
                        <div className={cx('order__delivery-label')}>Dates</div>
                        <h4 className={cx('order__delivery-price')}>Nov 9 - 14</h4>
                    </div>
                    <div className={cx('order__delivery')}>
                        <div className={cx('order__delivery-label')}>Guests</div>
                        <h4 className={cx('order__delivery-price')}>1 guest</h4>
                    </div>
                    <div className={cx('line')}></div>

                    <div className={cx('order__details')}>
                        <div className={cx('order__heading')}>
                            <h3>Price details</h3>
                        </div>
                        <div className={cx('order__delivery')}>
                            <div className={cx('order__delivery-label')}>$20.00 x 5 nights</div>
                            <h4 className={cx('order__delivery-price')}>$100.00</h4>
                        </div>
                    </div>

                    <div className={cx('shape')}>
                        <div className={cx('circle1')}></div>
                        <div className={cx('circle2')}></div>
                        <div className={cx('dot-line')}></div>
                    
                        <div className={cx('order__total')}>
                            <h2 className={cx('order__total-label')}>Total</h2>
                            <h2 className={cx('order__total-price')}>$
                                <span>100</span>
                                .00
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;