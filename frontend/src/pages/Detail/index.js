import { faHeart, faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBed, faShareNodes, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect } from 'react';
import Image from '~/components/Image';
import InputSelect from '~/components/InputSelect';
import styles from './Detail.module.scss'; 

const cx = classNames.bind(styles)

function Detail() {

    useEffect(() => {
        const scores = document.querySelectorAll('.' + cx('user-score'))
        const evaluation = document.querySelectorAll('.' + cx('user-evaluation'))
        scores.forEach((score, index) => {
            if (score.innerText >= 7 && score.innerText < 8) {
                evaluation[index].innerText = 'Very good'
            }
            else if (score.innerText >= 8 && score.innerText < 9) {
                evaluation[index].innerText = ' Awesome'
            }
            else if (score.innerText >= 9 && score.innerText < 10) {
                evaluation[index].innerText = ' Above awesome'
            }
        })
    })

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('name')}>Bungalow Double</h1>
                <div className={cx('header-utility')}>
                    <div className={cx('header-utility-item')}>
                        <FontAwesomeIcon className={cx('')} icon={faShareNodes}/>
                    </div>
                    <div className={cx('header-utility-item')}>
                        <FontAwesomeIcon className={cx('')} icon={faHeart}/>
                    </div>
                </div>
            </div>
            <div className={cx('imgs')}>
                <div className={cx('imgs-left')}>
                    <img className={cx('img-left')} src='https://pix8.agoda.net/hotelImages/4410268/-1/bff02d02a18c745d5de65c55c9025d4e.jpg?ca=12&ce=1&s=1024x768' alt=''/>
                </div>
                <div className={cx('imgs-right')}>
                    <img className={cx('img-right')} src='https://pix8.agoda.net/hotelImages/4410268/-1/9b73dfdc922c0ac9b84c0789a5a96993.jpg?ca=12&ce=1&s=1024x768' alt=''/>
                    <img className={cx('img-right')} src='https://pix8.agoda.net/hotelImages/4410268/-1/c4c59d66f5e8f391bb1f2eeabd150406.jpg?ca=12&ce=1&s=1024x768' alt=''/>
                    <img className={cx('img-right')} src='https://pix8.agoda.net/hotelImages/4410268/-1/1119bb55b12ff57f9b5c742c4f0cf3d6.jpg?ca=12&ce=1&s=1024x768' alt=''/>
                    {/* <img className={cx('img-right')} src='https://pix8.agoda.net/hotelImages/4410268/-1/1119bb55b12ff57f9b5c742c4f0cf3d6.jpg?ca=12&ce=1&s=1024x768' alt=''/> */}
                    <div className={cx('img-right-more')}>
                        <div className={cx('img-right-more-title')}>+15 Photos &gt;</div>
                    </div>
                </div>
            </div>

            <div className={cx('container')}>
                <div className={cx('left')}>
                
                    <h2 className={cx('heading')}>Details</h2>
                    <div className={cx('detail')}>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faUser} />
                            <div className={cx('content')}>2 Adults</div>
                        </div>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faVectorSquare} />
                            <div className={cx('content')}>49 m2</div>
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
                    <p className={cx('description')}>Nằm ở trung tâm của KQ Resort với sự pha trộn độc đáo giữa di sản lịch sử và sự thanh lịch đương đại, phòng nghỉ sang trọng, tiện nghi tuyệt vời, lòng hiếu khách chân thật và dịch vụ tận tâm cho trải nghiệm cao cấp tại bãi biển Phước Hải.</p>
                    
                    <h2 className={cx('heading')}>Room Amenities</h2>
                    <div className={cx('amenities')}>
                        <div className={cx('feature')}>
                            <img className={cx('feature-img')} src='https://i.pinimg.com/originals/27/df/ba/27dfba7a1b4130542f5dafc347a1a5cd.jpg' alt='feature1'/>
                            <div className={cx('feature-body')}>
                                <span className={cx('feature-title')}>Feature #1</span>
                                <h4 className={cx('feature-content')}>Electronic Check-in and check-out</h4>
                            </div>
                        </div>
                        <div className={cx('feature')}>
                            <img className={cx('feature-img')} src='https://i.pinimg.com/736x/ec/a4/13/eca413aeec3a93c40bd53d293b421a60.jpg' alt='feature2'/>
                            <div className={cx('feature-body')}>
                                <span className={cx('feature-title')}>Feature #2</span>
                                <h4 className={cx('feature-content')}>Free Housekeeping Services</h4>
                            </div>
                        </div>
                        <div className={cx('feature')}>
                            <img className={cx('feature-img')} src='https://static.vecteezy.com/system/resources/previews/004/991/535/original/workspace-clean-cartoon-with-computers-flower-pots-books-chairs-and-desk-vector.jpg' alt='feature3'/>
                            <div className={cx('feature-body')}>
                                <span className={cx('feature-title')}>Feature #3</span>
                                <h4 className={cx('feature-content')}>Workspace Ready</h4>
                            </div>
                        </div>
                        <div className={cx('feature')}>
                            <img className={cx('feature-img')} src='https://st.depositphotos.com/1758000/1339/v/600/depositphotos_13392871-stock-illustration-customer-service-representative-at-computer.jpg' alt='feature4'/>
                            <div className={cx('feature-body')}>
                                <span className={cx('feature-title')}>Feature #4</span>
                                <h4 className={cx('feature-content')}>24/7 Contact Support</h4>
                            </div>
                        </div>

                        <div className={cx('feature-time')}>
                            <div className={cx('check-time')}>
                                <span className={cx('feature-title')}>Check-in Time</span>
                                <h4 className={cx('feature-content')}>3PM</h4>
                                <div className={cx('feature-title')}>Early Check-in Upon Request</div>
                            </div>
                            <div className={cx('check-time')}>
                                <span className={cx('feature-title')}>Check-out Time</span>
                                <h4 className={cx('feature-content')}>11AM</h4>
                                <div className={cx('feature-title')}>Late Check-out Upon Request</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <h2 className={cx('heading-right')}>$42/night</h2>
                    <div className={cx('line')}></div>

                    <div className={cx('booking')}>
                        <InputSelect className={cx('date-select')} placeholder={'Date'}/>
                        <div className={cx('total-night')}>
                            <span className={cx('')}>2 nights</span>
                            <div className={cx('')}>$84</div>
                        </div>

                        <h3 style={{ marginBottom: '20px'}}>Add Extras</h3>
                        <div className={cx('extras-checkbox')}>
                            <div className={cx('checkbox-item')}>
                                <div className={cx('checkbox')}>
                                    <input type="checkbox" id="extra1" name="extra1" value="Breakfast"/>
                                    <label className={cx('label')} htmlFor="extra1"> Breakfast a day per person</label>
                                </div>
                                <span className={cx('')}>$10</span> 
                            </div>
                            <div className={cx('checkbox-item')}>
                                <div className={cx('checkbox')}>
                                    <input type="checkbox" id="extra2" name="extra2" value="Parking"/>
                                    <label className={cx('label')} htmlFor="extra2"> Parking a day</label>
                                </div>
                                <span className={cx('')}>$6</span> 
                            </div>
                            <div className={cx('checkbox-item')}>
                                <div className={cx('checkbox')}>
                                    <input type="checkbox" id="extra3" name="extra3" value="Pet"/>
                                    <label className={cx('label')} htmlFor="extra3"> Pet a day</label>
                                </div>
                                <span className={cx('')}>$1</span> 
                            </div>
                            <div className={cx('checkbox-item')}>
                                <div className={cx('checkbox')}>
                                    <input type="checkbox" id="extra4" name="extra4" value="Iron"/>
                                    <label className={cx('label')} htmlFor="extra4"> Iron &amp; Ironing Board</label>
                                </div>
                                <span className={cx('')}>Free</span> 
                            </div>
                            <div className={cx('checkbox-item')}>
                                <div className={cx('checkbox')}>
                                    <input type="checkbox" id="extra5" name="extra5" value="baby"/>
                                    <label className={cx('label')} htmlFor="extra5"> Baby Crib</label>
                                </div>
                                <span className={cx('')}>Free</span> 
                            </div>
                        </div>

                        <div className={cx('total')}>
                            <div className={cx('total-title')}>
                                <h3>Total</h3>
                                <span className={cx('heading-extra')}>Taxes and charges included</span>
                            </div>
                            <span className={cx('')}>$84</span>
                        </div>

                        <div className={cx('booking-btn')}>
                            Book now
                        </div>

                        <div className={cx('extra-sentence')}>You will not get charged yet</div>
                    </div>
                </div>
            </div>

            <div className={cx('comments')}>
                <div className={cx('available')}>
                    <h1 >From our guests</h1>
                    <span className={cx('viewAll')}>View All</span>
                </div>
                <h3 >Overall Rating</h3>
                <div className={cx('star-rating')}>
                    <h2 className={cx('overall-score')}>8.2</h2>
                    (65 reviews)
                </div>
                <div className={cx('comment')}>
                    <div className={cx('comment-header')}>
                        <div className={cx('user')}>
                            <Image className={cx('user-avatar')} src='' alt=''/>
                            <div className={cx('comment-user')}>
                                <h3 className={cx('comment-name')}>Phillip Martin</h3>
                                <div className={cx('date')}>6 days ago</div>
                            </div>
                        </div>
                        <h2 className={cx('user-score')}>9</h2>
                        <h4 className={cx('user-evaluation')}></h4>
                    </div>
                    <div className={cx('comment-content')}>
                        Great people, friendly, you can ask for anything you want and they will help you, great view and great place.
                    </div>
                </div>
                <div className={cx('comment')}>
                    <div className={cx('comment-header')}>
                        <div className={cx('user')}>
                            <Image className={cx('user-avatar')} src='' alt=''/>
                            <div className={cx('comment-user')}>
                                <h3 className={cx('comment-name')}>Phillip Martin</h3>
                                <div className={cx('date')}>6 days ago</div>
                            </div>
                        </div>
                        <h2 className={cx('user-score')}>8</h2>
                        <h4 className={cx('user-evaluation')}></h4>
                    </div>
                    <div className={cx('comment-content')}>
                        Great people, friendly, you can ask for anything you want and they will help you, great view and great place.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;