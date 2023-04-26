import { makeAutoObservable } from "mobx";
import {
  ICreatePostBody,
  IPost,
  IPostFilter,
  IUpdatePostBody,
  SortEnum,
  SortNamesEnum,
} from "./types";
import PostServices from "../../services/post.services";
import { createQuery } from "../../utils";

class PostStore {
  posts: IPost[] = [];
  loading: boolean = false;
  postLoading: boolean = false;
  filters: IPostFilter = {
    page: "0",
    perPage: "10",
    sortBy: SortNamesEnum.pubDate,
    sort: SortEnum.ASC,
    search: "",
    dateFrom: undefined,
    dateTo: undefined,
  };
  selected: string[] = [];
  count: number = 0;
  constructor() {
    makeAutoObservable(this, {}, {});
  }

  getPosts = async (filters: IPostFilter) => {
    this.loading = true;
    const { posts, count } = await PostServices.getPosts(filters);
    this.posts = posts;
    this.count = count;

    this.setFilters(filters);
    this.loading = false;
  };

  setFilters = (filters: IPostFilter) => {
    const newUrl = `${window.location.pathname}${createQuery(filters)}`;
    window.history.pushState(null, "", newUrl);

    this.filters = filters;
  };

  createPost = async (body: ICreatePostBody) => {
    this.postLoading = true;
    await PostServices.createPost(body);
    await this.getPosts({
      ...this.filters,
      sort: SortEnum.DESC,
      sortBy: SortNamesEnum.created_at,
      search: undefined,
      page: "0",
    });
    this.setSelected([]);

    this.postLoading = false;
  };

  updatePost = async (body: IUpdatePostBody, _id: string) => {
    this.postLoading = true;
    await PostServices.updatePost(body, _id);
    await this.getPosts(this.filters);
    this.setSelected([]);
    this.postLoading = false;
  };

  removeList = async (ids: string[]) => {
    this.loading = true;

    await PostServices.removePostList(ids);
    await this.getPosts(this.filters);
    this.setSelected([]);

    this.loading = false;
  };

  setSelected = (selected: string[]) => {
    this.selected = selected;
  };
}

export default new PostStore();
