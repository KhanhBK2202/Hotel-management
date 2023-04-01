import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HorizontalCard from '~/components/HorizontalCard';
import VerticalCard from '~/components/VerticalCard';
import Search from '~/layouts/components/Search';
import * as request from '~/utils/request';
import styles from './Home.module.scss'; 

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
    },[])

    return (
        <div className={cx('wrapper')}>
            {/* <Search /> */}
            <div className={cx('banner')}>
                <div className={cx('banner-inner')}>
                    <h1 className={cx('banner-heading')}>You can trust us with your choice of accommodation</h1>
                    <ul className={cx('banner-list')}>
                        <li className={cx('banner-item')}>
                            . Modern
                        </li>
                        <li className={cx('banner-item')}>
                            . Convenience
                        </li>
                        <li className={cx('banner-item')}>
                            . Low prices
                        </li>
                    </ul>
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
            
        </div>
    )
}

export default Home;