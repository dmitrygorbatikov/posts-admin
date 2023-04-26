import { ISignInUserBody } from "../mobx/auth/types";
import axios from "axios";

class UserServices {
  private baseUrl = `${"http://localhost:6001"}/user`;

  async getProfile() {
    return axios
      .get(this.baseUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e.message));
  }
}

export default new UserServices();
