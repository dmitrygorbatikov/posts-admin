import { ISignInUserBody } from "../mobx/auth/types";
import axios from "axios";
import { IChangePasswordBody, IChangeProfile } from "../mobx/user/types";
import TokenService from "./token.service";

class UserServices {
  private baseUrl = `${process.env.REACT_APP_API_URL}/user`;

  async getProfile() {
    return axios
      .get(this.baseUrl, {
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }

  async changePassword(body: IChangePasswordBody) {
    return axios
      .put(this.baseUrl + "/change-password", body, {
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }

  async changeProfile(body: IChangeProfile) {
    return axios
      .put(this.baseUrl + "/profile", body, {
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }
}

export default new UserServices();
