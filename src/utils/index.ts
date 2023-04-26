export const createQuery = (data: any) => {
  let result = "";
  if (!data || !Object.keys(data).length) {
    return "";
  } else {
    Object.keys(data).map((key) => {
      if (result === "" && data[key] !== undefined && data[key] !== "") {
        result += `?${key}=${data[key]}`;
      } else if (result !== "" && data[key] !== undefined && data[key] !== "") {
        result += `&${key}=${data[key]}`;
      }
    });
  }

  return result;
};
