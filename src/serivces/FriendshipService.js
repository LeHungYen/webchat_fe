import axios from "axios";

export class FriendshipService {
  defaultFriendShip = {
    friendshipId: null,
    userId1: null,
    userId2: null,
    status: null,
    createAt: null,
    updatedAt: null,
  };

  // create
  saveFriendShip = async (userId1, userId2) => {
    const request = {
      friendshipId: null,
      userId1: userId1,
      userId2: userId2,
      status: null,
      createAt: null,
      updatedAt: null,
    };

    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.post(
        "http://localhost:8080/friendship",
        request
      );
      return { ...request, friendshipId: response.data };
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // get
  getFriendShipByUserId1AndUserId2 = async (userId1, userId2) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.get(
        `http://localhost:8080/friendship/findByUserId1AndUserId2?userId1=${userId1}&userId2=${userId2}`
      );
      if (response.data === null) {
        return this.defaultFriendShip;
      } else {
        return response.data;
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // delete
  deleteFriendShip = async (friendshipId, userId1, userId2) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.delete(
        `http://localhost:8080/friendship?friendshipId=${friendshipId}&userId1=${userId1}&userId2=${userId2}`
      );
      return this.defaultFriendShip;
    } catch (error) {
      console.log("Error:", error);
    }
  };
}
