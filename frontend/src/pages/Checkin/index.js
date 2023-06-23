import { faCircleCheck, faCircleXmark, faImage, faImages, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCreditCard, faGlobe, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind'
import { id } from 'date-fns/locale';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AES, enc } from "crypto-js";

import images from '~/assets/images';
import config from '~/config';
import * as request from '~/utils/request';
import styles from './Checkin.module.scss'; 
import moment from 'moment';

const cx = classNames.bind(styles)
moment().format()

function Checkin() {

    const user = useSelector((state) => state.auth.login?.currentUser);
    
    const id = user?._id
    const accessToken = user?.accessToken
    const navigate = useNavigate()

    const { bookingCode } = useParams()
    const [filesPhoto, setFilesPhoto] = useState([])
    const [photo, setPhoto] = useState()
    const uploadPhoto = (e) => {
        setFilesPhoto(e.target.files)
        // const image = document.getElementById('output-cover');
        const uploadIcon = document.querySelector('.' + cx('upload-photo-icon'))
        const uploadLabel = document.querySelector('.' + cx('upload-photo-label'))
        // const uploadCriteria = document.querySelector('.' + cx('upload-criteria'))
        uploadIcon.classList.add(cx('display-none'))
        uploadLabel.classList.add(cx('display-none'))
        // uploadCriteria.classList.add(cx('display-none'))
        // image.style.display = 'flex'

        var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                setPhoto(img.src);
		    };
        }
    }

    const handleRemovePhoto = (i) => {
        setFilesPhoto([])
        setPhoto()
        const uploadIcon = document.querySelector('.' + cx('upload-photo-icon'))
        const uploadLabel = document.querySelector('.' + cx('upload-photo-label'))
        // const uploadCriteria = document.querySelector('.' + cx('upload-criteria'))
        uploadIcon.classList.remove(cx('display-none'))
        uploadLabel.classList.remove(cx('display-none'))
    }

    const [code, setCode] = useState()
    const [decrData, setDecrData] = useState()
    const [isCheckin, setIsCheckIn] = useState(false)
    const [room, setRoom] = useState()
    useEffect(() => {
        const oriData = bookingCode.replace(/p1L2u3S/g, '+' ).replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=')
        const bytes = AES.decrypt(oriData, process.env.REACT_APP_SECRET_PASS)
        const realData = bytes.toString(enc.Utf8)
        setDecrData(realData)

        request
            .get(`/api/v1/booking/${realData}`)
            .then(res => {
                const now = new Date()
                const date = moment(res.fromDate).format('L')
                const time = res.fromTime
                const dateTime = moment(`${date} ${time}`, 'MM/DD/YYYY HH:mm').format()
                if ((moment(dateTime).add(-2, 'hours')).diff(moment(now)) < 0 && moment(now).diff(dateTime) < 0) {
                    console.log('được phép checkin')
                    setIsCheckIn(true)
                    setRoom(res)
                }
                else {
                    console.log('chưa được checkin')
                    setIsCheckIn(false)
                }
            })
    },[])
    const handleSave = async () => {
        // setLoading(true)
        if (!filesPhoto[0])
            return
        const data = new FormData();
        data.append('upload_preset', 'checkin')
        data.append('file', filesPhoto[0])
        const res = await fetch('https://api.cloudinary.com/v1_1/des13gsgi/image/upload',{
            method: 'POST',
            body: data,
        })
        const file = await res.json()
        
        // let photoArray = []
        // for (const item of filesPhotos) {
        //     data.append('file', item[0])
        //         const res = await fetch('https://api.cloudinary.com/v1_1/des13gsgi/image/upload',{
        //         method: 'POST',
        //         body: data,
        //     })
        //     const photo = await res.json()
        //     photoArray.push(photo.secure_url)
        // }

        // let roomNumbers = []
        // for (let i = 0; i < numRooms; i++) {
        //     roomNumbers.push(i + 1)
        // }

        
        // console.log(decrData)
        // setDecrptedData(data);
        // Check có đúng mã booking hay ko
        // if (decrData !== code) {
        //     const modal = document.querySelectorAll('.' + cx('modal'))
        //     modal[0].style.display = 'flex'
        //     return
        // }
        // else {
        //     const modal = document.querySelectorAll('.' + cx('modal'))
        //     modal[1].style.display = 'flex'
        // }
        const result = await request
            .put(`/api/v1/booking/image/${decrData}`, { imageCheckin: file.secure_url, isCheckin: true }, {
                headers: {token: `Bearer ${accessToken}`}
            })
        const modal = document.querySelectorAll('.' + cx('modal'))
        modal[1].style.display = 'flex'
        // setLoading(false)
        // navigate('/dashboard')
    }

    const handleCheckFail = () => {
        const modal = document.querySelectorAll('.' + cx('modal'))
        modal[0].style.display = 'none'
    }

    const handleCheckSuccess = () => {
        navigate('/')
    }

    // if (!user) {
    //     console.log('ko được truy cập')
    //     return
    // }
    
    return (
        <div className={cx('wrapper')}>
            {isCheckin ? 
                <div>
                    <Link to={user?.role === 'manager' || user?.role === 'admin' ? config.routes.dashboard : config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="KQ" className={cx('logo-img')}/>
                    </Link>
                    <h2 className={cx('heading')}>Check-in room {room.room.name}</h2>
                    {/* <div className={cx('sub-heading')}>Please enter booking code that KQ has send to you</div>
                    <input className={cx('input')} placeholder='Booking Code' onChange={e => setCode(e.target.value)}/> */}
                    <div>
                        <div className={cx('sub-heading2')}>Paper pictures (Identity card/Passport)</div>
                        {/* <div className={cx('upload-photo-form')}> */}
                            <form >
                                <div style={{position: 'relative'}}>
                                    {photo && 
                                        <>
                                            <img id='output-cover' alt='' src={photo} className={cx('photo')}></img>
                                            <span className={cx('badge-remove')} onClick={handleRemovePhoto}>X</span>
                                        </>
                                    }
                                    {/* <label htmlFor='filePhotoInput' className={cx('label-upload-photo')}>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center'}}>
                                            <div>
                                                <FontAwesomeIcon icon={faImages} className={cx('upload-photo-icon')}/>
                                                <div className={cx('upload-photo-label')}>+ Add atleast 2 photos</div>
                                            </div>
                                        </div>
                                    </label>  */}
                                    <label htmlFor='filePhotoInput' className={cx('label-upload-photo')}>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center'}}>
                                            <div >
                                                <FontAwesomeIcon icon={faImage} className={cx('upload-photo-icon')}/>
                                                <div className={cx('upload-photo-label')}>Select a JPG file to upload</div>
                                                {/* <div className={cx('upload-criteria')}>
                                                    <span className={cx('upload-criteria-item')}>
                                                        . Aspect ratio 16:9
                                                    </span>
                                                    <span className={cx('upload-criteria-item')}>
                                                        . Recommended size 1024x576
                                                    </span>
                                                </div> */}
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <input id="filePhotoInput"
                                    type="file"
                                    name="filePhoto"
                                    onChange={uploadPhoto}
                                />
                            </form>
                            {/* {photos.length !== 0 && photos.map((item, index) => (
                                <div key={index} style={{position: 'relative'}}>
                                    <img id='output-photo' alt='' src={photo} className={cx('photo')}></img>
                                    <span className={cx('badge-remove')} onClick={() => handleRemovePhoto(index)}>X</span>
                                </div>
                            ))} */}
                        {/* </div> */}
                    </div>
                    <div className={cx('btn')}>
                        <div className={cx('submit-btn')} onClick={handleSave}>Save</div>
                    </div>

                    <div className={cx('modal')}>
                        <div className={cx('modal__overlay')}></div>
                        <div className={cx('modal__body')}>
                            <div className={cx('modal-heading')} style={{color: 'red'}}>
                                <FontAwesomeIcon icon={faCircleXmark} style={{fontSize: '4rem'}}/>
                                <h1>Checkin failed</h1>
                            </div>
                            <h2>Please entering the right booking code</h2>
                            <div className={cx('btn')}>
                                <div className={cx('submit-btn')} onClick={handleCheckFail}>OK</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('modal')}>
                        <div className={cx('modal__overlay')}></div>
                        <div className={cx('modal__body')}>
                            <div className={cx('modal-heading')} style={{color: 'green'}}>
                                <FontAwesomeIcon icon={faCircleCheck} style={{fontSize: '4rem'}}/>
                                <h1>Checkin successfully</h1>
                            </div>
                            <h2>Please go to the front desk to receive the room key</h2>
                            <div className={cx('btn')}>
                                <div className={cx('submit-btn')} onClick={handleCheckSuccess}>OK</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            : 
                <h2>It is not time to check-in, please check-in within 2 hours before booking schedule</h2>
            }
        </div>  
    )
}

export default Checkin;