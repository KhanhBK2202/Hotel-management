
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './HorizontalCard.module.scss';

const cx = classNames.bind(styles)

function HorizontalCard({ img, name, address, price }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('img')} src={img} alt={name}/>
            <div className={cx('name')}>
                <h4 className={cx('type')}>{name}</h4>
                <div className={cx('location')}>
                    <FontAwesomeIcon icon={faLocationDot} className={cx('icon')}/>
                    <span className={cx('address')}>497 Hoà Hảo, quận 10, TPHCM</span>
                </div>
            </div>
            <div className={cx('price')}>
                <strong>{price}</strong>
                <span className={cx('night')}>/night</span>
            </div>
        </div>
    );
}

export default HorizontalCard;