import axios from "axios";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

export class NotificationService {
  notificationType = {
    SEND_FRIEND_REQUEST: "SEND_FRIEND_REQUEST",
  };

  defaultNotification = {
    notificationId: null,
    senderId: null,
    receiverId: null,
    type: null,
    link: null,
    read: null,
    createAt: null,
  };

  // send notifications to websocket
  sendNotification = (stompClient, data) => {
    stompClient.send("/app/notification", {}, JSON.stringify(data));
    return this.defaultNotification;
  };

  //get
  getNotifications = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.get(
        "http://localhost:8080/notification/getNotifications"
      );

      return response.data;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // update
  updateNotification = async (requestBody) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.put(
        `http://localhost:8080/notification/${requestBody.notificationId}`,
        requestBody
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // delete
  deleteNotification = async (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.delete(
        `http://localhost:8080/notification/${id}`
      );
    } catch (error) {
      console.log("Error:", error);
    }
  };
}
