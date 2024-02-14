import axios from 'axios'
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

function Test() {

    const userId = 34;
    // notification
    const notificationType = {
        sendFriendRequest: "SEND_FRIEND_REQUEST"
    };

    const defaultNotification = {
        notificationId: null,
        userId: null,
        type: null,
        link: null,
        isRead: null,
        createAt: null
    };

    const [notification, setNotification] = useState(defaultNotification);

    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = Stomp.over(socket);

        const token = JSON.parse(localStorage.getItem("userToken"));
        const headers = {
            Authorization: `Bearer ${token}`
        };

        client.connect(headers, () => {
            client.subscribe('/topic/notification', (response) => {
                const receivedNotification = JSON.parse(response.body);
                setNotification(receivedNotification);
            });
        });

        setStompClient(client);

        return () => {
            client.disconnect();
        };

    }, []);

    const sendNotification = () => {
        stompClient.send("/app/notification", {}, JSON.stringify(notification));
        setNotification(defaultNotification)
    }

    //get user
    const [user, setUser] = useState({
        bio: null,
        birthdate: null,
        coverPhoto: null,
        email: null,
        fullName: null,
        gender: null,
        lastLogin: null,
        password: null,
        phoneNumber: null,
        profilePicture: null,
        registrationDate: null,
        role: null,
        status: null,
        userId: null,
        username: null,
        website: null
    });

    const getUserById = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
        try {
            const response = await axios.get("http://localhost:8080/user/" + userId);
            if (response.status === 200) {
                setUser(response.data)
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        getUserById();
    }, [])


    return (<div>
        Test page
    </div>);
}

export default Test;