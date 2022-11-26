import classNames from 'classnames/bind'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HorizontalCard from '~/components/HorizontalCard';
import VerticalCard from '~/components/VerticalCard';
import styles from './Home.module.scss'; 

const cx = classNames.bind(styles)

function Home() {

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('available')}>
                <h2>Lodging available</h2>
                <span className={cx('viewAll')}>View All</span>
            </div>
            <div className={cx('suggestion')}>
                <Link to='/detailBranch'>
                    <VerticalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/OTA-01-1.jpg' name='KQ District 1'/>
                </Link>
                <VerticalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/74582307_1170004796530230_7926587072205291520_o.jpg' name='KQ Binh Duong'/>
                <VerticalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/z1782071680201_2056127aeac1f26c47255ad5b90966c1.jpg' name='KQ Da Nang'/>
                <VerticalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/img_condotel.jpg' name='KQ Ha Noi'/>
                <VerticalCard img='https://lanrung.com.vn/wp-content/uploads/2020/02/slide.jpg' name='KQ Vung Tau'/>
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
                {/* <Link to='/detailType'> */}
                    <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/07/Bungalow-double.jpg' name='Bungalow Double' price='$42'/>
                {/* </Link> */}
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Suite-Loft.jpg' name='Condo Suite Loft' price='$38'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44'/>
            </div>

            <div className={cx('popular')}>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/07/Bungalow-double.jpg' name='Bungalow Double' price='$42'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Suite-Loft.jpg' name='Condo Suite Loft' price='$38'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44'/>
            </div>

            <div className={cx('popular')}>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/07/Bungalow-double.jpg' name='Bungalow Double' price='$42'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Suite-Loft.jpg' name='Condo Suite Loft' price='$38'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44'/>
                <HorizontalCard img='https://lanrung.com.vn/wp-content/uploads/2020/03/Condo-Executive-Suite.jpg' name='Condo Executive Suite' price='$44'/>
            </div>
            
        </div>
    )
}

export default Home;