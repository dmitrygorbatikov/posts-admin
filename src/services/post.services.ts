import axios from "axios";
import {
  ICreatePostBody,
  IPost,
  IPostFilter,
  IUpdatePostBody,
} from "../mobx/post/types";
import { createQuery } from "../utils";

class PostServices {
  private baseUrl = `${"http://localhost:6001"}/post`;

  async getPosts(
    filters: IPostFilter
  ): Promise<{ posts: IPost[]; count: number }> {
    return axios
      .get(this.baseUrl + createQuery(filters), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e.message));
  }

  async createPost(body: ICreatePostBody) {
    return axios
      .post(this.baseUrl, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e.message));
  }
  async updatePost(body: IUpdatePostBody, _id: string) {
    return axios
      .put(`${this.baseUrl}/${_id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e.message));
  }

  async removePostList(ids: string[]) {
    return axios
      .delete(this.baseUrl + "/list", {
        params: { ids: ids.join(",") },
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

export default new PostServices();
