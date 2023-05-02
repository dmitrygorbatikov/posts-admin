import React, { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import PostStore from '../../mobx/post';
import TableComponent from '../../components/Table/TableComponent/TableComponent';
import Spinner from '../../components/Spinner/Spinner';
import { IPostFilter } from '../../mobx/post/types';
import PostHeader from './PostHeader/PostHeader';
import { ITableHeaderProps } from '../../types';
import { useTranslation } from 'react-i18next';
const PostsPage: FC = () => {
  const {
    count,
    posts,
    loading,
    filters,
    selected,
    postLoading,
    createPostErrors,
    updatePostErrors,
    getPosts,
    createPost,
    updatePost,
    removeList,
    setFilters,
    setSelected,
    clearErrors,
  } = PostStore;

  const { t } = useTranslation();

  const headers: ITableHeaderProps = {
    title: { name: t('Posts.Title'), sort: true },
    link: { name: t('Posts.Link') },
    description: { name: t('Posts.Description'), sort: true },
    pubDate: { name: t('Posts.PubDate'), sort: true, isDate: true },
    created_at: { name: t('Posts.CreatedAt'), sort: true, isDate: true },
  };

  useEffect(() => {
    let queryList = window.location.href.split('?');
    const result: IPostFilter = {};

    if (queryList.length > 1) {
      queryList = queryList[1].split('&');

      queryList.forEach((item) => {
        const key = item.split('=')[0];
        // @ts-ignore
        result[key] = item.split('=')[1];
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
        setSelected={setSelected}
        createPostErrors={createPostErrors}
        updatePostErrors={updatePostErrors}
        clearErrors={clearErrors}
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
