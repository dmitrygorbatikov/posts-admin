import { makeAutoObservable } from "mobx";
import { IUser } from "./types";
import UserServices from "../../services/user.services";

class UserStore {
  user?: IUser;
  loading: boolean = false;
  constructor() {
    makeAutoObservable(this, {}, {});
  }

  getProfile = async () => {
    this.loading = true;
    this.user = await UserServices.getProfile();
    this.loading = false;
  };
}

export default new UserStore();
