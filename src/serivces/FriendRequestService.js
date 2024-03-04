import axios from "axios";

export class FriendRequestService {
  defaultFriendRequest = {
    requestId: null,
    senderUserId: null,
    receiverUserId: null,
    status: null,
    createAt: null,
  };

  status = {
    WAITING_FOR_THE_RECEIVER_TO_RESPONSE:
      "WAITING_FOR_THE_RECEIVER_TO_RESPONSE",
    WAITING_FOR_THE_SENDER_TO_RESPONSE: "WAITING_FOR_THE_SENDER_TO_RESPONSE",
    THE_RECEIVER_CANCELED: "THE_RECEIVER_CANCELED",
    THE_SENDER_CANCELED: "THE_SENDER_CANCELED",
  };

  // create
  saveFriendRequest = async (senderUserId, receiverUserId) => {
    const request = {
      requestId: null,
      senderUserId: senderUserId,
      receiverUserId: receiverUserId,
      status: this.status.WAITING_FOR_THE_RECEIVER_TO_RESPONSE,
      createAt: null,
    };

    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.post(
        "http://localhost:8080/friendrequest",
        request
      );
      if (response.data !== null) {
        return { ...request, requestId: response.data };
      }
    } catch (error) {
      console.error("Error:", error);
      return this.defaultFriendRequest;
    }
  };

  // update
  updateFriendRequest = async (requestBody) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.put(
        `http://localhost:8080/friendrequest/${requestBody.requestId}`,
        requestBody
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // get
  getBySenderIdAndReceiveId = async (senderUserId, receiverUserId) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.get(
        `http://localhost:8080/friendrequest/findBySenderIdAndReceiverId/?senderId=${senderUserId}&receiverId=${receiverUserId}`
      );

      if (response.data != null) {
        return response.data;
      } else {
        return this.defaultFriendRequest;
      }
    } catch (error) {
      console.log("Error:", error);
      return this.defaultFriendRequest;
    }
  };

  // delete
  deleteFriendRequest = async (requestId) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.delete(
        `http://localhost:8080/friendrequest/${requestId}`
      );

      return this.defaultFriendRequest;
    } catch (error) { }
  };
}
