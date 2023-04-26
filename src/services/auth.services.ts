import { ISignInUserBody } from "../mobx/auth/types";
import axios from "axios";

class AuthServices {
  private baseUrl = `${"http://localhost:6001"}/auth`;

  async signInUser(body: ISignInUserBody) {
    return axios
      .post(`${this.baseUrl}/sign-in`, body)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e.message));
  }
}

export default new AuthServices();
