import { useEffect } from 'react';
import style from './index.module.scss'
import { useRef } from 'react';


function Notification({ notification, setNotification }) {
    const notificationRef = useRef(null);
    useEffect(() => {
        if (notification.display) {
            notificationRef.current.style.display = "block";
        } else {
            notificationRef.current.style.display = "none";
        }
    }, [notification])

    const closeNotification = () => {
        setNotification(prev => ({ display: false, text: "" }))
    }
    return (
        <div ref={notificationRef} className={style.container}>
            <div className={style.notification}>
                <p className={style.text}>{notification.text}</p>

                <div className={style.button}>
                    <button onClick={closeNotification}>Ok</button>
                </div>
            </div>
        </div >
    );
}

export default Notification;