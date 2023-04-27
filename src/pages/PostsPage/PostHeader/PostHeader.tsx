import React, { FC } from "react";
import { Box } from "@mui/material";
import SearchPost from "./SearchPost/SearchPost";
import EditPost from "../EditPost/EditPost";
import TableToolbar from "../../../components/Table/TableToolbar/TableToolbar";
import {
  ICreatePostBody,
  IPost,
  IPostFilter,
  IUpdatePostBody,
} from "../../../mobx/post/types";
import PostDialog from "./PostDialog/PostDialog";
import { IRequestError } from "../../../types";
import styles from "./PostHeader.module.scss";
import { useTranslation } from "react-i18next";

interface IPostHeaderProps {
  filters: IPostFilter;
  getPosts: (filters: IPostFilter) => void;
  selected: string[];
  createPost: (post: ICreatePostBody, cb: () => void) => void;
  updatePost: (post: IUpdatePostBody, _id: string, cb: () => void) => void;
  postLoading: boolean;
  removeList: (ids: string[]) => void;
  posts: IPost[];
  clearErrors: () => void;
  createPostErrors?: IRequestError;
  updatePostErrors?: IRequestError;
  setSelected: (selected: string[]) => void;
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
  clearErrors,
  createPostErrors,
  updatePostErrors,
  setSelected,
}) => {
  const { t } = useTranslation();
  const editInitialValues = posts.find(
    (item) => item._id === selected[0] ?? ""
  );
  return (
    <Box className={styles.container}>
      <Box className={styles.container__flex}>
        <SearchPost
          filters={filters}
          getPosts={getPosts}
          setSelected={setSelected}
        />
        <Box className={styles.container__flex}>
          {selected.length === 1 && (
            <PostDialog
              errors={updatePostErrors}
              clearErrors={clearErrors}
              openDialogBtnText={t("Posts.EditButton")}
              dialogTitle={t("Posts.EditPost")}
              submitButtonText={t("Posts.Save")}
              colorDialogBtn={"inherit"}
              variantDialogBtn={"outlined"}
              loading={postLoading}
              submitChanges={(values, cb) =>
                updatePost(values, editInitialValues?._id || "", cb)
              }
              initialValues={{
                title: editInitialValues?.title || "",
                link: editInitialValues?.link || "",
                description: editInitialValues?.description || "",
              }}
            />
          )}
          <PostDialog
            errors={createPostErrors}
            clearErrors={clearErrors}
            openDialogBtnText={t("Posts.NewPost")}
            dialogTitle={t("Posts.CreateNewPost")}
            submitButtonText={t("Posts.Create")}
            colorDialogBtn={"success"}
            variantDialogBtn={"contained"}
            loading={postLoading}
            submitChanges={(values, cb: () => void) =>
              createPost({ ...values, pubDate: new Date() }, cb)
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
