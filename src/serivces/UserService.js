import axios from "axios";

export class UserService {
  defaultUser = {
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
    website: null,
  };

  status = {
    ONLINE: "ONLINE",
    OFFLINE: "OFFLINE"
  }

  // get user
  getUserById = async (userId) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.get("http://localhost:8080/user/" + userId);
      if (response.status === 200) {
        if (response.data !== null) {
          return response.data;
        }
        return this.defaultUser;
      }
    } catch (error) {
      console.error("Error:", error);
      return this.defaultUser;
    }
  };

  // get current user infor
  getCurrentUser = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.get(
        "http://localhost:8080/user/getUserInfor"
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  // get user by key
  findUserByKey = async (keySearch) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.get(
        "http://localhost:8080/user/searchUserByKey/?keySearch=" + keySearch
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error); // Log error
    }
  };
}
