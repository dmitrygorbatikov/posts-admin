import { FC, useCallback, useEffect, useState } from "react";
import CustomInput from "../Input/CustomInput";
import { debounce } from "lodash";
import { IPostFilter } from "../../mobx/post/types";

interface ISearchPostProps {
  filters: IPostFilter;
  getPosts: (filters: IPostFilter) => void;
}

const SearchPost: FC<ISearchPostProps> = ({ getPosts, filters }) => {
  const [search, setSearch] = useState<string>(filters.search || "");
  const handleInput = useCallback(
    debounce((value: string) => {
      const newFilters = {
        ...filters,
        search: value || undefined,
      };
      console.log(newFilters);
      getPosts(newFilters);
    }, 1000),
    []
  );

  useEffect(() => {
    setSearch(filters.search || "");
  }, []);

  return (
    <CustomInput
      value={search}
      label={"Search"}
      changeHandler={(e) => {
        setSearch(e.target.value);
        handleInput(e.target.value);
      }}
    />
  );
};

export default SearchPost;
