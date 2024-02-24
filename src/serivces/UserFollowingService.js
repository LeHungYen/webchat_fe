import axios from "axios";

export class UserFollowingService {
  defaultUserFollowing = {
    followingId: null,
    userId: null,
    followingUserId: null,
    followDate: null,
  };

  saveUserFollowing = async (userId, followingUserId) => {
    // create
    const request = {
      followingId: null,
      userId: userId,
      followingUserId: followingUserId,
      followDate: null,
    };

    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.post(
        "http://localhost:8080/userfollowing",
        request
      );
      return { ...request, followingId: response.data };
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // get
  getUserFollowingByUserIdAndFollowingUserId = async (
    userId,
    followingUserId
  ) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.get(
        `http://localhost:8080/userfollowing/findByUserIdAndFollowingUserId?userId=${userId}&followingUserId=${followingUserId}`
      );
      if (response.data !== null) {
        return response.data;
      } else {
        return this.defaultUserFollowing;
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // delete
  deleteUserFollowing = async (followingId) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.delete(
        `http://localhost:8080/userfollowing/${followingId}`
      );

      return this.defaultUserFollowing;
    } catch (error) {}
  };
}
