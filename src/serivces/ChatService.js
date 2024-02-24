import axios from "axios";

export class ChatService {
  defaultChat = {
    chatId: null,
    type: null,
    name: null,
    createdAt: null,
  };

  type = {
    PAIR: "PAIR",
    GROUP: "GROUP",
  };

  // create
  save = async (requestBody) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.post(
        "http://localhost:8080/chat",
        requestBody
      );
      return { ...requestBody, chatId: response.data };
    } catch (error) {
      console.error("Error:", error);
      return this.defaultFriendRequest;
    }
  };

  // // update
  // updateFriendRequest = async (requestBody) => {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
  //     localStorage.getItem("userToken")
  //   )}`;
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8080/friendrequest/${requestBody.requestId}`,
  //       requestBody
  //     );
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // // get
  // getBySenderIdAndReceiveId = async (senderUserId, receiverUserId) => {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
  //     localStorage.getItem("userToken")
  //   )}`;
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/friendrequest/findBySenderIdAndReceiverId/?senderId=${senderUserId}&receiverId=${receiverUserId}`
  //     );

  //     if (response.data != null) {
  //       return response.data;
  //     } else {
  //       return this.defaultFriendRequest;
  //     }
  //   } catch (error) {
  //     console.log("Error:", error);
  //     return this.defaultFriendRequest;
  //   }
  // };

  // // delete
  // deleteFriendRequest = async (requestId) => {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
  //     localStorage.getItem("userToken")
  //   )}`;
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:8080/friendrequest/${requestId}`
  //     );

  //     return this.defaultFriendRequest;
  //   } catch (error) {}
  // };
}
