import { faHotel, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HorizontalCard from '~/components/HorizontalCard';
import VerticalCard from '~/components/VerticalCard';
import Banner from '~/layouts/components/Banner';
import Search from '~/layouts/components/Search';
import * as request from '~/utils/request';
import styles from './Home.module.scss'; 
import KommunicateChat from '~/layouts/components/Chatbot/Chatbot';

const cx = classNames.bind(styles)

function Home() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken
    const id = user?._id

    useEffect(() => {
        const line = document.querySelector('.' + cx('line'))
        const activeSection = document?.querySelector('.' + cx('active-section'))

        const tabs = document?.querySelectorAll('.' + cx('section-title'))
        const panes = document.querySelectorAll('.' + cx('popular'))

        line.style.left = activeSection?.offsetLeft + "px";
        line.style.width = activeSection?.offsetWidth + "px";
        
        tabs.forEach((tab, index) => {
            const pane = panes[index];
            tab.onclick = function () {
                const activeSection = document?.querySelector('.' + cx('active-section'))
                activeSection.classList.remove(cx('active-section'));

                const activePaneSection = document.querySelector('.' + cx('active-pane-section'))
                activePaneSection.classList.remove(cx('active-pane-section'));

                line.style.left = this.offsetLeft + "px";
                line.style.width = this.offsetWidth + "px";

                this.classList.add(cx('active-section'));
                pane.classList.add(cx('active-pane-section'));
            };
        });
    })

    const [hotels, setHotels] = useState([])
    // const [popularHotels, setPopularHotels] = useState([])
    const [rooms, setRooms] = useState([])
    const [comment, setComment] = useState([])
    useEffect(() => {
        request
            .get('/api/v1/hotel')
            .then(res => setHotels(res))
            .catch(err => console.log(err))

        // request
        //     .get('/api/v1/hotel/most-popular')
        //     .then(res => setPopularHotels(res))
        //     .catch((err => console.log(err)))

        request 
            .get('/api/v1/roomType/')
            .then(res => setRooms(res))
            .catch(err => console.log(err))

        request
            .get('/api/v1/comment/highestScore')
            .then(res => setComment(res[0]))
            .catch(err => console.log(err))
    },[])

    return (
        <div className={cx('wrapper')}>
            {/* <Search /> */}
            <Banner/>
            <Search/>
            <div className={cx('about')}>
                <div className={cx('about-heading')}>
                    <div className={cx('about-book-now')}>
                        About us
                    </div>
                    <h1 className={cx('about-title')}>
                        The Perfect Travel Place For You & Your Family
                    </h1>
                    <p className={cx('about-description')}>
                        Luxury redefined. Both contemporary and elegant, convenient and surprising, sustainable and luxurious. KQ Hotel is part of a new generation of hotel: inspired to be extraordinary.
                    </p>
                    <div className={cx('about-data')}>
                        <div className={cx('about-data-row')}>
                            <div className={cx('about-data-cell')}>
                                <h2 className={cx('about-cell-num')}>10M+</h2>
                                <span className={cx('about-cell-text')}>Visitors</span>
                            </div>
                            <div className={cx('about-data-cell')}>
                                <h2 className={cx('about-cell-num')}>109</h2>
                                <span className={cx('about-cell-text')}>Hotels</span>
                            </div>
                        </div>
                        <div className={cx('about-data-row')}>
                            <div className={cx('about-data-cell')}>
                                <h2 className={cx('about-cell-num')}>29</h2>
                                <span className={cx('about-cell-text')}>Food Shop</span>
                            </div>
                            <div className={cx('about-data-cell')}>
                                <h2 className={cx('about-cell-num')}>10M+</h2>
                                <span className={cx('about-cell-text')}>Visitors</span>
                            </div>
                        </div>
                    </div>

                    
                </div>
                <div className={cx('about-pics')}>
                    <img className={cx('pic')} src='https://www.kevinandamanda.com/wp-content/uploads/2020/05/saigon-ho-chi-minh-city-34-720x1080.jpg'/>
                    <img className={cx('pic')} src='https://mhotel.vn/wp-content/uploads/2022/12/MHOTEL_SOAIPHAM_240DPI-31-683x1024.jpg'/>
                </div>
            </div>

            <div className={cx('customer-data')}>
                <div className={cx('customer-heading')}>
                    Testimonials
                </div>
                <h1 className={cx('customer-title')}>
                    What Our Customer Say About Us
                </h1>
                <p className={cx('customer-description')}>
                    What customers say about our service and guideline. 
                </p>
                
                <div className={cx('world')}>
                    <img className={cx('map')} src='https://www.pngall.com/wp-content/uploads/2017/05/World-Map-Free-PNG-Image.png'/>
                    <div className={cx('customer-evaluation')}>
                        <FontAwesomeIcon className={cx('quote')} icon={faQuoteRight}/>
                        <p className={cx('evaluation-content')}>{comment.comment}</p>
                        <h3 className={cx('evaluation-author')}>{comment.userId?.username}</h3>
                        <span className={cx('evaluation-author')}>Student</span>
                    </div>
                    <div className={cx('customer-map')}>
                        <img className={cx('customer-ava')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598335/banner/photo-1525357816819-392d2380d821_jnzbn8.jpg'/>
                        <img className={cx('customer-ava')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1535713875002-d1d0cf377fde_jeawcn.jpg'/>
                        <img className={cx('customer-ava')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1586297135537-94bc9ba060aa_gsdi3c.jpg'/>
                        <img className={cx('customer-ava')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1499887142886-791eca5918cd_tficqr.jpg'/>
                        <img className={cx('customer-ava')} src={comment.userId?.avatar}/>
                        <img className={cx('customer-ava')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1535931737580-a99567967ddc_g8ej5m.jpg'/>
                        <img className={cx('customer-ava')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/original_wgwjec.jpg'/>
                        <img className={cx('customer-ava')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/640x530_zdlza7.jpg'/>
                    </div>
                </div>
            </div>

            <div className={cx('available')}>
                <h2>Lodging available</h2>
                <span className={cx('viewAll')}>View All</span>
            </div>
            <div className={cx('suggestion')}>
                {hotels.map((hotel, index) => (
                    <VerticalCard key={index} hotel={hotel}/>
                    // <VerticalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/OTA-01-1.jpg' name='KQ Binh Thanh' address='208 Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, Thành phố Hồ Chí Minh'/>
                ))}
                {/* <VerticalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/74582307_1170004796530230_7926587072205291520_o.jpg' name='KQ Hai Phong' address='10 Võ Nguyên Giáp, Dư Hàng Kênh, Lê Chân, Hải Phòng' />
                <VerticalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/z1782071680201_2056127aeac1f26c47255ad5b90966c1.jpg' name='KQ Dong Khoi' address='45 Lê Thánh Tôn Bến Nghé, Quận 1,Hồ Chí Minh'/>
                <VerticalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/img_condotel.jpg' name='KQ Pham Ngoc Thach' address='02 Phạm Ngọc Thạch, Phường Trung Tự, Quận Đống Đa, Hà Nội'/>
                <VerticalCard img='https://lanrung.com.vn/wp-content/uploads/2020/02/slide.jpg' name='KQ Da Nang' address='461 Trần Hưng Đạo, Quận Sơn Trà, Đà Nẵng'/> */}
            </div>

            <div className={cx('available')}>
                <div className={cx('section')}>
                    <div className={cx('section-title', 'active-section')}>Most popular</div>
                    <div className={cx('section-title')}>Special Offers</div>
                    <div className={cx('section-title')}>Near Me</div>
                    <div className={cx('line')}></div>
                </div>

                <span className={cx('viewAll')}>View All</span>

            </div>
            <div className={cx('popular', 'active-pane-section')}>
                {rooms.map((room, index) => (
                    <HorizontalCard key={index} info={room}/>
                ))}
                {/* <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Suite-Loft.jpg' name='Condo Suite Loft' price='$38' address='1 Đường Số 17A, Bình Trị Đông B, Bình Tân, Thành phố Hồ Chí Minh' />
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44' address='10 Võ Nguyên Giáp, Dư Hàng Kênh, Lê Chân, Hải Phòng' />
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44' address='27 Đường Cổ Linh, Long Biên, Hà Nội' /> */}
            </div>

            <div className={cx('popular')}>
                {rooms.map((room, index) => (
                    <HorizontalCard key={index} info={room}/>
                ))}
                {/* <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/07/Bungalow-double.jpg' name='Bungalow Double' price='$42'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Suite-Loft.jpg' name='Condo Suite Loft' price='$38'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44'/> */}
            </div>

            <div className={cx('popular')}>
                {rooms.map((room, index) => (
                    <HorizontalCard key={index} info={room}/>
                ))}
                {/* <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/07/Bungalow-double.jpg' name='Bungalow Double' price='$42'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Suite-Loft.jpg' name='Condo Suite Loft' price='$38'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44'/> */}
            </div>
            <div>
              <KommunicateChat/>
            </div>
            
        </div>
    )
}

export default Home;