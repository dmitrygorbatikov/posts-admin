import { makeAutoObservable } from "mobx";
import {IChangePasswordBody, IChangeProfile, IUser} from "./types";
import UserServices from "../../services/user.services";
import AuthStore from '../auth'
import {IRequestError} from "../../types";

class UserStore {
  user?: IUser;
  loading: boolean = false;
  changePasswordErrors?: IRequestError
  changeProfileErrors?: IRequestError
  constructor() {
    makeAutoObservable(this, {}, {});
  }

  getProfile = async () => {
    try {
      this.loading = true;
      this.user = await UserServices.getProfile();
      this.loading = false;
    }
    catch (e: any) {
      this.loading = false
      AuthStore.logoutUser()
    }
  };

  changePassword = async (body: IChangePasswordBody) => {
    try {
      this.loading = true
      this.user = await UserServices.changePassword(body)
      this.loading = false
    }
    catch (e: any) {
      this.loading = false
      if( e.response.data.user) {
        AuthStore.logoutUser()
        document.location.reload()
      }
      this.changePasswordErrors = e.response.data
    }
  }

  changeProfile = async (body: IChangeProfile, cb: () => void) => {
    try {
      this.loading = true
      this.user = await UserServices.changeProfile(body)
      this.loading = false
      cb()
    }
    catch (e: any) {
      this.loading = false
      if( e.response.data.user) {
        AuthStore.logoutUser()
        document.location.reload()
      }
      this.changeProfileErrors = e.response.data
    }
  }

  clearErrors = ( ) => {
    this.changePasswordErrors = undefined
    this.changeProfileErrors = undefined
  }
}

export default new UserStore();
