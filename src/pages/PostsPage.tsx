import React, { FC, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { observer } from "mobx-react";
import PostStore from "../mobx/post";
import TableComponent from "../components/Table/TableComponent";
import Spinner from "../components/Spinner";
import { IPostFilter } from "../mobx/post/types";
import PostHeader from "../components/Post/PostHeader";
const PostsPage: FC = () => {
  const {
    posts,
    getPosts,
    filters,
    setFilters,
    loading,
    count,
    createPost,
    updatePost,
    removeList,
    setSelected,
    selected,
    postLoading,
  } = PostStore;
  const headers = {
    title: { name: "Title", sort: true },
    link: { name: "Link" },
    description: { name: "Description", sort: true },
    pubDate: { name: "Pub date", sort: true },
    created_at: { name: "Created at", sort: true },
  };

  useEffect(() => {
    let queryList = window.location.href.split("?");
    const result: IPostFilter = {};

    if (queryList.length > 1) {
      queryList = queryList[1].split("&");

      queryList.forEach((item) => {
        const key = item.split("=")[0];
        // @ts-ignore
        result[key] = item.split("=")[1];
      });

      setFilters(result);
      getPosts(result).then();
    } else {
      getPosts(filters).then();
    }
  }, []);

  return (
    <Box>
      {loading && <Spinner />}

      <PostHeader
        posts={posts}
        createPost={createPost}
        getPosts={getPosts}
        selected={selected}
        postLoading={postLoading}
        filters={filters}
        updatePost={updatePost}
        removeList={removeList}
      />

      <TableComponent
        rows={posts}
        count={count}
        header={headers}
        filters={filters}
        selected={selected}
        fetchData={getPosts}
        removeList={removeList}
        setSelected={setSelected}
      />
    </Box>
  );
};

export default observer(PostsPage);
