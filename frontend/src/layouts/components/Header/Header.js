import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import InputSelect from '~/components/InputSelect';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('heading')}>Find hotel to stay</h2>
                <div className={cx('user')}>
                    <Image className={cx('avatar')} src='' alt=''/>
                    <h3 className={cx('user-name')}>khanhmtn</h3>
                </div>
            </div>
            <div className={cx('search')}>
                <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Date</h3>
                    <InputSelect icon='calendar' placeholder='Start date - Finish date'/>
                </div>
                <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Where to</h3>
                    <InputSelect icon='location' placeholder='District 1'/>
                </div>
                <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Adult</h3>
                    <InputSelect icon='location' placeholder='2'/>
                </div>
                <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Children</h3>
                    <InputSelect icon='location' placeholder='0'/>
                </div>
                <div className={cx('search-btn')}>Search</div>
            </div>
            
        </div>
    );
}

export default Header;
