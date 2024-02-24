import axios from "axios";

export class ChatParticipantService {
  defaultChatParticipant = {
    chatParticipantId: null,
    chatId: null,
    userId: null,
    joinedAt: null,
  };

  // create
  save = async (requestBody) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.post(
        "http://localhost:8080/chatParticipant",
        requestBody
      );
      if (response.data !== null) {
        return { ...requestBody, chatParticipantId: response.data };
      }
    } catch (error) {
      console.error("Error:", error);
      return this.defaultChatParticipant;
    }
  };

  // // update
  // updateFriendRequest = async (requestBody) => {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
  //     localStorage.getItem("userToken")
  //   )}`;
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8080/friendrequest/${requestBody.chatParticipantId}`,
  //       requestBody
  //     );
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  //   // get
  //   getBySenderIdAndReceiveId = async (id) => {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
  //       localStorage.getItem("userToken")
  //     )}`;
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/chatParticipant/${id}`
  //       );

  //       if (response.data != null) {
  //         return response.data;
  //       } else {
  //         return this.defaultFriendRequest;
  //       }
  //     } catch (error) {
  //       console.log("Error:", error);
  //       return this.defaultFriendRequest;
  //     }
  //   };

  //   // delete
  //   deleteFriendRequest = async (requestId) => {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
  //       localStorage.getItem("userToken")
  //     )}`;
  //     try {
  //       const response = await axios.delete(
  //         `http://localhost:8080/friendrequest/${requestId}`
  //       );

  //       return this.defaultFriendRequest;
  //     } catch (error) {}
  //   };
}
