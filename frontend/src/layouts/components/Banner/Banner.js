import classNames from 'classnames/bind';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

function Banner() {
    return (
        // <div className={cx('banner')}>
        //     <div className={cx('banner-inner')}>
        //         <h1 className={cx('banner-heading')}>You can trust us with your choice of accommodation</h1>
        //         <ul className={cx('banner-list')}>
        //             <li className={cx('banner-item')}>
        //                 . Modern
        //             </li>
        //             <li className={cx('banner-item')}>
        //                 . Convenience
        //             </li>
        //             <li className={cx('banner-item')}>
        //                 . Low prices
        //             </li>
        //         </ul>
        //     </div>
        // </div>

        <div className={cx('banner')}>
            <div className={cx('banner-pics')}>
                <img className={cx('pic')} src='https://tinypositive.com/wp-content/uploads/2020/04/inspirational-quotes-about-nature-life-and-its-natural-beauty.jpg'/>
                <img className={cx('pic')} src='https://cf.bstatic.com/images/hotel/max1024x768/173/173382106.jpg'/>
            </div>
            <div className={cx('banner-heading')}>
                <div className={cx('banner-book-now')}>
                    Book now
                </div>
                <h1 className={cx('banner-title')}>
                    Let's Enjoy Your Trip With KQ Luxury
                </h1>
                <p className={cx('banner-description')}>
                    Thinking of taking a break from everyday's busy life? Planning to go of your hometown with your loved one to have some fun and quality time in a cost-effective way?
                </p>
                <div className={cx('banner-button')}>
                    Start now
                </div>
            </div>
        </div>
    )
}

export default Banner;
