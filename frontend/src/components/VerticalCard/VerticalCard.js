
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './VerticalCard.module.scss';

const cx = classNames.bind(styles)

function VerticalCard({ img, name, address }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('img')} src={img} alt='lodging'/>
            <h4 className={cx('name')}>{name}</h4>
            <div className={cx('location')}>
                <FontAwesomeIcon icon={faLocationDot} className={cx('icon')}/>
                <span className={cx('address')}>497 Hoà Hảo, quận 10, TPHCM</span>
            </div>
        </div>
    );
}

export default VerticalCard;