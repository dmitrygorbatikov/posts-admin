import { makeAutoObservable } from "mobx";
import { ISignInUserBody } from "./types";
import AuthServices from "../../services/auth.services";

class AuthStore {
  accessToken: string | null = localStorage.getItem("accessToken");
  loading: boolean = false;
  constructor() {
    makeAutoObservable(this, {}, {});
  }

  signInUser = async (body: ISignInUserBody) => {
    this.loading = true;
    const { accessToken } = await AuthServices.signInUser(body);
    this.accessToken = accessToken;
    localStorage.setItem("accessToken", accessToken);
    this.loading = false;
  };

  logoutUser = () => {
    this.accessToken = null;
    localStorage.removeItem("accessToken");
  };
}

export default new AuthStore();
