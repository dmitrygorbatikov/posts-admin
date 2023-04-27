import axios from "axios";
import {
  ICreatePostBody,
  IPost,
  IPostFilter,
  IUpdatePostBody,
} from "../mobx/post/types";
import { createQuery } from "../utils";
import TokenService from "./token.service";

class PostServices {
  private baseUrl = `${process.env.REACT_APP_API_URL}/post`;

  async getPosts(
    filters: IPostFilter
  ): Promise<{ posts: IPost[]; count: number }> {
    return axios
      .get(this.baseUrl + createQuery(filters), {
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }

  async createPost(body: ICreatePostBody) {
    return axios
      .post(this.baseUrl, body, {
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }
  async updatePost(body: IUpdatePostBody, _id: string) {
    return axios
      .put(`${this.baseUrl}/${_id}`, body, {
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }

  async removePostList(ids: string[]) {
    return axios
      .delete(this.baseUrl + "/list", {
        params: { ids: ids.join(",") },
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }
}

export default new PostServices();
