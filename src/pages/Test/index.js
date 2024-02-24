import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

function Test() {
  // const userId = 34;
  // // notification
  // const notificationType = {
  //     sendFriendRequest: "SEND_FRIEND_REQUEST"
  // };

  // const defaultNotification = {
  //     notificationId: null,
  //     userId: null,
  //     type: null,
  //     link: null,
  //     isRead: null,
  //     createAt: null
  // };

  // const [notification, setNotification] = useState(defaultNotification);

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
      const socket = new SockJS("http://localhost:8080/ws");
      const client = Stomp.over(socket);

      const token = JSON.parse(localStorage.getItem("userToken"));
      const headers = {
          Authorization: `Bearer ${token}`
      };

      client.connect(headers, () => {
          client.subscribe('/topic/checkOnlineStatus', (response) => {
              const receivedNotification = JSON.parse(response.body);
              setNotification(receivedNotification);
          });
      });

      setStompClient(client);

      return () => {
          client.disconnect();
      };

  }, []);

  // const sendNotification = () => {
  //     stompClient.send("/app/notification", {}, JSON.stringify(notification));
  //     setNotification(defaultNotification)
  // }

  // //get user
  // const [user, setUser] = useState({
  //     bio: null,
  //     birthdate: null,
  //     coverPhoto: null,
  //     email: null,
  //     fullName: null,
  //     gender: null,
  //     lastLogin: null,
  //     password: null,
  //     phoneNumber: null,
  //     profilePicture: null,
  //     registrationDate: null,
  //     role: null,
  //     status: null,
  //     userId: null,
  //     username: null,
  //     website: null
  // });

  // const getUserById = async () => {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
  //     try {
  //         const response = await axios.get("http://localhost:8080/user/" + userId);
  //         if (response.status === 200) {
  //             setUser(response.data)
  //         }
  //     } catch (error) {

  //     }
  // };

  // useEffect(() => {
  //     getUserById();
  // }, [])

  /// img
  const [img, setImg] = useState("");
  const [allImages , setAllImages] = useState([])

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
      if(data.success){
        alert(data.message);
        setImg('');
        fetchImages();
      }
    }
  };

  const  fetchImages = async() => {
    const res = await fetch("http://localhost:8081");
    const data = await res.json();
    setAllImages(data.data)
}

  // useEffect(() => {
  //   fetchImages();
  // }, [])

  ///
  //   const sendSticker = async (mediaURL) => {
//     let imageUrl = mediaURL;
    
//     // Kiểm tra xem mediaURL có phải là base64 không
//     if (mediaURL.startsWith('data:image')) {
//         // Decode base64 string to binary data
//         const binaryData = atob(mediaURL.split(',')[1]);
        
//         // Convert binary string to Uint8Array
//         const uint8Array = new Uint8Array(binaryData.length);
//         for (let i = 0; i < binaryData.length; i++) {
//             uint8Array[i] = binaryData.charCodeAt(i);
//         }
        
//         // Create Blob from Uint8Array
//         const blob = new Blob([uint8Array], { type: 'image/png' }); // Change the MIME type accordingly
        
//         // Create object URL from Blob
//         imageUrl = URL.createObjectURL(blob);
//     }
    
//     const requestBody = {
//         ...messageInput,
//         chatId: chatPage.chatId,
//         chatParticipantId: chatPage.chatParticipantOfCurrentUser.chatParticipantId,
//         mediaType: chatMessageService.mediaType.STICKER,
//         mediaURL: imageUrl, 
//         status: chatMessageService.status.SENDED,
//     };
    
//     await chatMessageService.save(requestBody);
//     setMessageInput(chatMessageService.defaultChatMessage);
// };

  return (
    <div>
      <input type="file" onChange={handleUploadImage} />
      <button onClick={handleSubmit}>Submit</button>
      {img ? <img src={img}></img> : <div />}

    <img src={require("../../assets/stickers/bluefogs/stayweird.png")}/>
    <div className="all-img">
        {allImages.map((item , index) => {
            return (
                <img src={item.image} width={"200px"}></img>
            )
        })}
    </div>

    </div>
  );
}

export default Test;
