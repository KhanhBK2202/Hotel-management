
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faThumbTack, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as request from '~/utils/request';
import Image from '../Image';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles)

function Comment({ img, userComment = null, userId, commentId, loading, createdAt, name, score, content }) {

    const user = useSelector((state) => state.auth.login?.currentUser);
    // const userId = user?._id
    const accessToken = user?.accessToken
    const [evaluation, setEvaluation] = useState()
    const [rating, setRating] = useState(score)
    useEffect(() => {
        // const score = document.querySelector('.' + cx('user-score'))
        // const evaluation = document.querySelectorAll('.' + cx('user-evaluation'))
        // score.forEach((score, index) => {
        if (rating >= 1 && rating < 4) {
            setEvaluation('Poor')
        }
        else if (rating >= 4 && rating < 5) {
            setEvaluation('OK')
        }
        else if (rating >= 5 && rating < 7) {
            setEvaluation('Good')
        }
        else if (rating >= 7 && rating < 8) {
            setEvaluation('Very good')
        }
        else if (rating >= 8 && rating < 9) {
            setEvaluation(' Awesome')
        }
        else if (rating >= 9 && rating <= 10) {
            setEvaluation(' Above awesome')
        }
        // })
    }, [rating])

    const [comment, setComment] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const handleUpdate = () => {
        setIsEdit(true)
    }

    const handleDelete = () => {
        request
            .remove(`/api/v1/comment/delete/${commentId}`, { headers: {token: `Beaer ${accessToken}`}})
            .then(res => loading())
            .catch(err => console.log(err))
    }

    const handleSubmitComment = () => {
        request
            .put(`/api/v1/comment/update/${commentId}`, {comment: comment, rating: rating}, { headers: {token: `Beaer ${accessToken}`}})
            .then(res => {
                setIsEdit(false)
                loading()
            })
            .catch(err => console.log(err))
    }

    const handleDecrease = () => {
        if (rating > 1)
            setRating(state => state - 1)
    }

    const handleIncrease = () => {
        if (rating < 10)
            setRating(state => state + 1)
    }

    return (
        <div className={cx('comment')}>
            <div className={cx('comment-header')}>
                <div className={cx('user')}>
                    <Image className={cx('user-avatar')} src={img} alt=''/>
                    <div className={cx('comment-user')}>
                        {userComment && <span style={{color: '#888', fontSize: '1.2rem'}}><FontAwesomeIcon icon={faThumbTack}/> (Your comment)</span>}
                        <h3 className={cx('comment-name')}>{name}</h3>
                        <div className={cx('date')}>{createdAt}</div>
                    </div>
                </div>
                <h2 className={cx('user-score')}>
                    {isEdit && <div className={cx('user-score-adjust')} onClick={handleDecrease}>-</div>}
                    {/* <span>{rating}</span> */}
                    {rating}
                    {isEdit && <div className={cx('user-score-adjust')} onClick={handleIncrease}>+</div>}
                </h2>
                <h4 className={cx('user-evaluation')}>{evaluation}</h4>
            </div>
            <div className={cx('comment-content')}>
                {isEdit ? 
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <input className={cx('customer-input')} placeholer='Add a comment...' defaultValue={content} onChange={e => setComment(e.target.value)}/>
                        <span className={cx('save-btn')} onClick={handleSubmitComment}>Save</span>
                    </div>
                : <p style={{width: '91%'}}>{content}</p>}
                
                {!isEdit && user?._id === userId && <div>
                    <FontAwesomeIcon className={cx('comment-btn')} icon={faPenToSquare} onClick={handleUpdate}/>
                    <FontAwesomeIcon className={cx('comment-btn')} icon={faTrash} onClick={handleDelete}/>
                </div>}
            </div>
        </div>
    );
}

export default Comment;