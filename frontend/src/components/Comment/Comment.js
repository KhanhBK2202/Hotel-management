
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import Image from '../Image';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles)

function Comment({ img, createdAt, name, score, content }) {

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
        <div className={cx('comment')}>
            <div className={cx('comment-header')}>
                <div className={cx('user')}>
                    <Image className={cx('user-avatar')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1658854518/avatar/mjg7ffwnx3c2vhwpgmbv.webp' alt=''/>
                    <div className={cx('comment-user')}>
                        <h3 className={cx('comment-name')}>{name}</h3>
                        <div className={cx('date')}>{createdAt}</div>
                    </div>
                </div>
                <h2 className={cx('user-score')}>{score}</h2>
                <h4 className={cx('user-evaluation')}></h4>
            </div>
            <div className={cx('comment-content')}>
                {content}
            </div>
        </div>
    );
}

export default Comment;