import { makeAutoObservable } from 'mobx';
import {
  ICreatePostBody,
  IPost,
  IPostFilter,
  IUpdatePostBody,
  SortEnum,
  SortNamesEnum,
} from './types';
import PostServices from '../../services/post.services';
import { createQuery } from '../../utils';
import AuthStore from '../auth';
import { IRequestError } from '../../types';

class PostStore {
  posts: IPost[] = [];
  loading = false;
  postLoading = false;
  filters: IPostFilter = {
    page: '0',
    perPage: '10',
    sortBy: SortNamesEnum.pubDate,
    sort: SortEnum.ASC,
    search: '',
    dateFrom: undefined,
    dateTo: undefined,
  };
  selected: string[] = [];
  count = 0;
  createPostErrors?: IRequestError;
  updatePostErrors?: IRequestError;
  constructor() {
    makeAutoObservable(this, {}, {});
  }

  getPosts = async (filters: IPostFilter) => {
    try {
      this.loading = true;
      const { posts, count } = await PostServices.getPosts(filters);
      this.posts = posts;
      this.count = count;

      this.setFilters(filters);
      this.loading = false;
    } catch (e) {
      this.posts = [];
    }
  };

  setFilters = (filters: IPostFilter) => {
    const newUrl = `${window.location.pathname}${createQuery(filters)}`;
    window.history.pushState(null, '', newUrl);

    this.filters = filters;
  };

  createPost = async (body: ICreatePostBody, cb: () => void) => {
    try {
      this.postLoading = true;
      await PostServices.createPost(body);
      await this.getPosts({
        ...this.filters,
        sort: SortEnum.DESC,
        sortBy: SortNamesEnum.created_at,
        search: undefined,
        page: '0',
      });
      this.setSelected([]);
      cb();

      this.postLoading = false;
    } catch (e: any) {
      this.postLoading = false;
      if (e.response.data.user) {
        AuthStore.logoutUser();
        document.location.reload();
      } else {
        this.createPostErrors = e.response.data;
      }
    }
  };

  updatePost = async (body: IUpdatePostBody, _id: string, cb: () => void) => {
    try {
      this.postLoading = true;
      await PostServices.updatePost(body, _id);
      await this.getPosts(this.filters);
      this.setSelected([]);
      this.postLoading = false;
      cb();
    } catch (e: any) {
      this.postLoading = false;
      if (e.response.data.user) {
        AuthStore.logoutUser();
        document.location.reload();
      } else {
        this.updatePostErrors = e.response.data;
      }
    }
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

  clearErrors = () => {
    this.createPostErrors = undefined;
    this.updatePostErrors = undefined;
  };
}

export default new PostStore();
