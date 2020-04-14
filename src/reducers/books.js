import { createSelector } from "reselect";
const books = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default books;
export const booksSelector = (state) => state.books;

export const allBooksSelector = createSelector(booksSelector, (bookHash) =>
  Object.values(bookHash)
);
