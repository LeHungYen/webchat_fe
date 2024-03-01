import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import EmojiPopup from "../Messasge/EmojiPopup";
function Test() {
  // const userId = 34;
  // // notification
  // const notificationType = {
  //   sendFriendRequest: "SEND_FRIEND_REQUEST"
  // };

  // const defaultNotification = {
  //   notificationId: null,
  //   userId: null,
  //   type: null,
  //   link: null,
  //   isRead: null,
  //   createAt: null
  // };

  // const [notification, setNotification] = useState(defaultNotification);

  // const [stompClient, setStompClient] = useState(null);

  // useEffect(() => {
  //   const socket = new SockJS("http://localhost:8080/ws");
  //   const client = Stomp.over(socket);

  //   const token = JSON.parse(localStorage.getItem("userToken"));
  //   const headers = {
  //     Authorization: `Bearer ${token}`
  //   };

  //   client.connect(headers, () => {
  //     client.subscribe('/topic/checkOnlineStatus', (response) => {
  //       const receivedNotification = JSON.parse(response.body);
  //       setNotification(receivedNotification);
  //     });
  //   });

  //   setStompClient(client);

  //   return () => {
  //     client.disconnect();
  //   };

  // }, []);

  // const sendNotification = () => {
  //   stompClient.send("/app/notification", {}, JSON.stringify(notification));
  //   setNotification(defaultNotification)
  // }


  /// img
  const [img, setImg] = useState("");
  const [allImages, setAllImages] = useState([])

  const imagebase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
    return data;
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const image = await imagebase64(file);
    setImg(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (img) {
      const res = await fetch("http://localhost:8081/upload", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ img: img }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        alert(data.message);
        setImg('');
        fetchImages();
      }
    }
  };

  const fetchImages = async () => {
    const res = await fetch("http://localhost:8081");
    const data = await res.json();
    setAllImages(data.data)
  }


  return (
    <div>
      <EmojiPopup></EmojiPopup>
    </div>
  );
}

export default Test;
