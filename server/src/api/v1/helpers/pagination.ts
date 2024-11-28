interface ObjectPagination {
  currentPage: number;
  limitItems: number;
  skip?: number;
  totalPage?: number;
}
const paginationHelper = (
  objectPagination: ObjectPagination,
  query: Record<string, any>,
  countRecords: number
): ObjectPagination => {
  if (query?.page) {
    objectPagination.currentPage = parseInt(query.page, 10); // Thêm cơ số 10 cho parseInt
  }
  if (query?.limit) {
    objectPagination.limitItems = parseInt(query.limit, 10); // Sửa tên biến thành limitItems cho nhất quán
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;
  objectPagination.totalPage = Math.ceil(
    countRecords / objectPagination.limitItems
  );

  return objectPagination;
};

export default paginationHelper;
