
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faDollarSign, faMoneyBill, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TextEditor from '~/components/TextEditor';
import * as request from '~/utils/request';
import styles from './Services.module.scss'; 

const cx = classNames.bind(styles)

function Services() {

    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken
    const id = user?._id

    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState([])
    useEffect(() => {
        request
            .get('/api/v1/hotel/all-services')
            .then(res => setServices(res))
            .catch(err => console.log(err))
    },[loading])

    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()

    const handleShow = () => {
        const addService = document.querySelector('.' + cx('add-service'))
        addService.style.display = 'block'
    }

    const handleCancel = () => {
        const addService = document.querySelector('.' + cx('add-service'))
        addService.style.display = 'none'
    }

    const handleSave = async () => {
        setLoading(true)
        if (!filesCover[0])
            return
        const data = new FormData();
        
        data.append('upload_preset', 'cover image')
        data.append('file', filesCover[0])
        const res = await fetch('https://api.cloudinary.com/v1_1/des13gsgi/image/upload',{
            method: 'POST',
            body: data,
        })
        const file = await res.json()
        request
            .post('/api/v1/hotel/post-services', { name, price, description, image: file.secure_url }, {
                headers: {token: `Bearer ${accessToken}`}
            })
            .then(data => console.log(data))
            .catch(e => console.log(e))
        const addService = document.querySelector('.' + cx('add-service'))
        addService.style.display = 'none'
        setLoading(false)
    }

    // Upload picture
    const [cover, setCover] = useState()
    const [filesCover, setFilesCover] = useState([])
    const uploadCover = (e) => {
        setFilesCover(e.target.files)
        // const image = document.getElementById('output-cover');
        const uploadIcon = document.querySelector('.' + cx('upload-icon'))
        const uploadLabel = document.querySelector('.' + cx('upload-label'))
        const uploadCriteria = document.querySelector('.' + cx('upload-criteria'))
        uploadIcon.classList.add(cx('display-none'))
        uploadLabel.classList.add(cx('display-none'))
        uploadCriteria.classList.add(cx('display-none'))
        // image.style.display = 'flex'

        var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                setCover(img.src);
		    };
        }
    }

    const handleRemoveCover = () => {
        setFilesCover([])
        setCover()
        const uploadIcon = document.querySelector('.' + cx('upload-icon'))
        const uploadLabel = document.querySelector('.' + cx('upload-label'))
        const uploadCriteria = document.querySelector('.' + cx('upload-criteria'))
        uploadIcon.classList.remove(cx('display-none'))
        uploadLabel.classList.remove(cx('display-none'))
        uploadCriteria.classList.remove(cx('display-none'))
    }

    const getContent = (content) => {
        setDescription(content)
    }

    const features = ['Balcony', 'IOT Drapes', 'Mini-Bar', 'A/C', 'ADA Room', 'IOT TV', 'Large Closet', 'Black-out Curtains']
    // Sửa lại phần này
    const [getAmenities, setGetAmenities] = useState([])
    useEffect(() => {
        const tags = document.querySelectorAll('.' + cx('tag-name'))
        for (const tag of tags) {
            tag.onclick = () => {
                if (tag.classList.value.includes(cx('choosen'))) {
                    tag.classList.remove(cx('choosen'))
                    let newArrayAmenities = [...getAmenities]
                    newArrayAmenities.splice(0, 1)
                    setGetAmenities(newArrayAmenities)
                }
                else
                {
                    tag.classList.add(cx('choosen'))
                    setGetAmenities([...getAmenities, tag.innerText])
                }
            }
        }
    })

    return (
        <div className={cx('wrapper')}>
            <h2>All Services</h2>
            <ul className={cx('accordion')}>
                {services.map((service, index) => (
                    <li key={index}>
                        <input className={cx('accordion-input')} type="radio" name="accordion" id="first"/>
                        <label htmlFor="first">{service.name}</label>
                        <div className={cx('accordion__content')}>
                            <img className={cx('accordion__item-img')} src={service.image} alt='van'/>
                            <div className={cx('service__item')}>
                                <div className={cx('service__item-desc')}>{service.description}</div>
                                {/* <div className={cx('service__item-feature')}>Feature</div> */}
                                <div className={cx('service__item-feature-detail')}>
                                    <FontAwesomeIcon icon={faUsers} style={{marginRight: '10px'}}/>
                                    12 guests
                                </div>
                                <div className={cx('service__item-feature-detail')}>
                                    <FontAwesomeIcon icon={faMoneyBill} style={{marginRight: '10px'}}/>
                                    ${service.price}/day
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
                {/* <li>
                    <input className={cx('accordion-input')} type="radio" name="accordion" id="second"/>
                    <label htmlFor="second">Standard</label>
                    <div className={cx('accordion__content')}>
                        <img className={cx('accordion__item-img')} src='https://res.klook.com/image/upload/v1572237191/airport-transfer/airport-transfers-dlp-ctype-standard.png' alt='standard'/>
                    </div>
                </li>
                <li>
                    <input className={cx('accordion-input')} type="radio" name="accordion" id="third"/>
                    <label htmlFor="third">SUV</label>
                    <div className={cx('accordion__content')}>
                        <img className={cx('accordion__item-img')} src='https://res.klook.com/image/upload/v1572237057/airport-transfer/airport-transfers-dlp-ctype-suv.png' alt='suv'/>

                    </div>
                </li>
                <li>
                    <input className={cx('accordion-input')} type="radio" name="accordion" id="fourth"/>
                    <label htmlFor="fourth">Luxury</label>
                    <div className={cx('accordion__content')}>
                        <img className={cx('accordion__item-img')} src='https://res.klook.com/image/upload/v1572237157/airport-transfer/airport-transfers-dlp-ctype-luxury.png' alt='luxury'/>
                    </div>
                </li>
                <li>
                    <input className={cx('accordion-input')} type="radio" name="accordion" id="fifth"/>
                    <label htmlFor="fifth">Bus</label>
                    <div className={cx('accordion__content')}>
                        <img className={cx('accordion__item-img')} src='https://res.klook.com/image/upload/v1572236958/airport-transfer/airport-transfers-dlp-ctype-bus.png' alt='bus'/>
                    </div>
                </li> */}
            </ul>

            <h2 onClick={handleShow} className={cx('edit')}>Add Service</h2>
            <div className={cx('add-service')}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className={cx('name-and-price')}>
                        <div className={cx('title')}>Service Name</div>
                        <div className={cx('form-input')}>
                            <input className={cx('input-inner')} placeholder='' onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className={cx('name-and-price')}>
                        <div className={cx('title')}>Service Price</div>
                        <div className={cx('form-input')}>
                            <FontAwesomeIcon icon={faDollarSign}/>
                            <input className={cx('input-inner')} placeholder='' onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                    </div>
                </div>

                {/* Service picture */}
                <div className={cx('title')}>Service Picture</div>
                <form className={cx('upload-form')}>
                    <div style={{position: 'relative'}}>
                        {cover && 
                            <>
                                <img id='output-cover' alt='' src={cover} className={cx('cover')}></img>
                                <span className={cx('badge-remove-cover')} onClick={handleRemoveCover}>X</span>
                            </>
                        }
                        <label htmlFor='fileCoverInput' className={cx('label-upload-cover')}>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center'}}>
                                <div>
                                    <FontAwesomeIcon icon={faImage} className={cx('upload-icon')}/>
                                    <div className={cx('upload-label')}>Select a JPG file to upload</div>
                                    <div className={cx('upload-criteria')}>
                                        <span className={cx('upload-criteria-item')}>
                                            . Aspect ratio 16:9
                                        </span>
                                        <span className={cx('upload-criteria-item')}>
                                            . Recommended size 1024x576
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </label> 
                    </div>
                    <input id="fileCoverInput"
                        type="file"
                        name="fileCover"
                        onChange={uploadCover}
                    />
                </form>

                <div className={cx('title')}>Service Description</div>
                <TextEditor getContent={getContent} />

                <div className={cx('btn')}>
                    <div className={cx('cancel-btn')} onClick={handleCancel}>Cancel</div>
                    <div className={cx('save-btn')} onClick={handleSave}>Save</div>
                </div>

            </div>
            <h2>Features</h2>
            <ul className={cx('tag')}>
                {features.map((item, index) => (
                    <li key={index} className={cx('tag-name')}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Services;