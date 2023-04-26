import React, { FC } from "react";
import { Box } from "@mui/material";
import SearchPost from "./SearchPost";
import EditPost from "./EditPost";
import TableToolbar from "../Table/TableToolbar";
import {
  ICreatePostBody,
  IPost,
  IPostFilter,
  IUpdatePostBody,
} from "../../mobx/post/types";
import PostDialog from "./PostDialog";

interface IPostHeaderProps {
  filters: IPostFilter;
  getPosts: (filters: IPostFilter) => void;
  selected: string[];
  createPost: (post: ICreatePostBody) => void;
  updatePost: (post: IUpdatePostBody, _id: string) => void;
  postLoading: boolean;
  removeList: (ids: string[]) => void;
  posts: IPost[];
}
const PostHeader: FC<IPostHeaderProps> = ({
  getPosts,
  filters,
  createPost,
  postLoading,
  removeList,
  selected,
  updatePost,
  posts,
}) => {
  const editInitialValues = posts.find(
    (item) => item._id === selected[0] ?? ""
  );
  return (
    <Box
      sx={{
        position: "fixed",
        top: 80,
        width: "100%",
        backgroundColor: "#fff",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SearchPost filters={filters} getPosts={getPosts} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {selected.length === 1 && (
            <PostDialog
              openDialogBtnText={"Edit"}
              dialogTitle={"Edit post"}
              submitButtonText={"Save"}
              colorDialogBtn={"inherit"}
              variantDialogBtn={"outlined"}
              loading={postLoading}
              submitChanges={(values) =>
                updatePost(values, editInitialValues?._id || "")
              }
              initialValues={{
                title: editInitialValues?.title || "",
                link: editInitialValues?.link || "",
                description: editInitialValues?.description || "",
              }}
            />
          )}
          <PostDialog
            openDialogBtnText={"New post"}
            dialogTitle={"Create new post"}
            submitButtonText={"Create"}
            colorDialogBtn={"success"}
            variantDialogBtn={"contained"}
            loading={postLoading}
            submitChanges={(values) =>
              createPost({ ...values, pubDate: new Date() })
            }
            initialValues={{
              title: "",
              link: "",
              description: "",
            }}
          />
        </Box>
      </Box>
      <TableToolbar removeList={removeList} selected={selected} />
    </Box>
  );
};
export default PostHeader;
