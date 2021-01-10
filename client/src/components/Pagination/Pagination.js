/*
 * Filename: \client\src\components\Pagination\Pagination.js
 * Created Date: Saturday, January 9th 2021, 7:59:45 pm
 * Author: Kenny Gosai
 */

import React, { useEffect } from "react";
import style from "./style.module.css";
import PropTypes from "prop-types";

/**
 * Component for handling Pagination.
 *
 * @component
 * @example
 * const [pager, setPager] = useState({});
 * const [userD, setUserD] = useState();
 * const [pageOfItems, setPageOfItems] = useState([]);
 * const onChangePage = (pageOfItem) => {
 *  setPageOfItems(pageOfItem);
 * }
 * return (
 *   <Pagination pager={pager} setPager={(val) => setPager(val)} items={userD} onChangePage={onChangePage}  initialPage={1} pageSize={20}/>
 * )
 */
const Pagination = ({
  items,
  pageSize,
  onChangePage,
  initialPage,
  pager,
  setPager,
}) => {
  /**
   * Sets Pagination
   * @param {Number} page - Current page
   */
  const setPage = (page) => {
    let pagerTemp = pager;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    // get new pager object for specified page
    pagerTemp = getPager(items.length, page, pageSize);

    // get new page of items from items array
    var pageOfItems = items.slice(pagerTemp.startIndex, pagerTemp.endIndex + 1);

    // update state
    setPager(pagerTemp);

    // call change page function in parent component
    onChangePage(pageOfItems);
  };

  useEffect(() => {
    setPage(initialPage);
    // eslint-disable-next-line
  }, []);

  /**
   * Sets Pager object
   * @param {Number} totalItems - Total items in list.
   * @param {Number} currentPage - Current page
   * @param {Number} pageSize - Total number of items per page
   * @returns {JSON}
   */
  const getPager = (totalItems, currentPage, pageSize) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  };

  return !pager.pages || pager.pages.length <= 1 ? null : (
    <div className={style.pagination}>
      <button
        className={pager.currentPage === 1 ? style.disabled : ""}
        onClick={() => setPage(1)}
      >
        First
      </button>
      <button
        className={pager.currentPage === 1 ? style.disabled : ""}
        onClick={() => setPage(pager.currentPage - 1)}
      >
        Previous
      </button>
      {pager.pages.map((page, index) => (
        <button
          onClick={() => setPage(page)}
          key={index}
          className={pager.currentPage === page ? style.active : ""}
        >
          {page}
        </button>
      ))}
      <button
        className={pager.currentPage === pager.totalPages ? style.disabled : ""}
        onClick={() => setPage(pager.currentPage + 1)}
      >
        Next
      </button>
      <button
        className={pager.currentPage === pager.totalPages ? style.disabled : ""}
        onClick={() => setPage(pager.totalPages)}
      >
        Last
      </button>
    </div>
  );
};

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number.isRequired,
  pager: PropTypes.object,
  setPager: PropTypes.func,
}

export default Pagination;
