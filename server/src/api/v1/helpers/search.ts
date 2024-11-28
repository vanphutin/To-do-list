interface ObjectSearch {
  keyword: string;
  regex?: RegExp;
}
const searchHelper = (query: Record<string, any>): ObjectSearch => {
  let objectSearch: ObjectSearch = {
    keyword: "",
  };

  if (query && query.search) {
    objectSearch.keyword = query.search;
    const regex = new RegExp(objectSearch.keyword, "i");
    objectSearch.regex = regex;
  }

  return objectSearch;
};
export default searchHelper;
