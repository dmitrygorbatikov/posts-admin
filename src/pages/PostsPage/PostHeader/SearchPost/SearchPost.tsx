import React, { FC, useCallback, useEffect, useState } from 'react';
import CustomInput from '../../../../components/Input/CustomInput/CustomInput';
import { debounce } from 'lodash';
import { IPostFilter } from '../../../../mobx/post/types';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

interface ISearchPostProps {
  filters: IPostFilter;
  getPosts: (filters: IPostFilter) => void;
  setSelected: (selected: string[]) => void;
}

const SearchPost: FC<ISearchPostProps> = ({
  getPosts,
  filters,
  setSelected,
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>(filters.search || '');
  const handleInput = useCallback(
    debounce((value: string) => {
      const newFilters = {
        ...filters,
        search: value || undefined,
      };
      getPosts(newFilters);
    }, 500),
    []
  );

  useEffect(() => {
    setSearch(filters.search || '');
  }, [filters.search]);

  return (
    <CustomInput
      endAdornment={
        <InputAdornment position='end'>
          <SearchIcon />
        </InputAdornment>
      }
      value={search}
      label={t('Posts.Search')}
      changeHandler={(e) => {
        setSelected([]);
        setSearch(e.target.value);
        handleInput(e.target.value);
      }}
    />
  );
};

export default SearchPost;
