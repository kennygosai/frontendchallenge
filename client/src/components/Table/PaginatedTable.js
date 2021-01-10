/*
 * Filename: \client\src\components\Table\PaginatedTable.js
 * Created Date: Saturday, January 9th 2021, 1:34:49 am
 * Author: Kenny Gosai
 */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userValues,
  usersLoading,
  usersReceived,
  loadingValues,
} from "../../features/usersSlice";
import UserTableRow from "./UserTableRow/UserTableRow";
import style from "./style.module.css";
import Pagination from "../Pagination/Pagination";

/**
 * Component for showing Table of users.
 *
 * @component
 * @example
 * return (
 *   <PaginatedTable></PaginatedTable>
 * )
 */
const PaginatedTable = () => {
  const userReduxData = useSelector(userValues);
  const isLoading = useSelector(loadingValues);
  const [userData, setUserData] = useState();
  const [expanded, setExpanded] = useState("");
  const [pager, setPager] = useState({});
  const [pageOfItems, setPageOfItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userReduxData || !userReduxData.length) {
      dispatch(usersLoading());
      fetch("/userData")
        .then((response) => response.json())
        .then((result) => {
          dispatch(usersReceived(result));
          setUserData(result);
        })
        .catch((error) => {
          //ADD ERROR RESPONSE
          console.log(error);
        });
    } else {
      setUserData(userReduxData);
    }
  }, [dispatch,userReduxData]);

  /**
   * Handles Table Sort
   * @param {string} key - Sorting on key
   */
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const sortedArray = [...userData];
    sortedArray.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setUserData(sortedArray);
    setPageOfItems(sortedArray.slice(pager.startIndex, pager.endIndex + 1));
  };
  const onChangePage = (pageOfItem) => {
    setPageOfItems(pageOfItem);
  }
  return (
    <main>
      <div className={style.container}>
        <div className={style.tableContainer}>
          <div>
            <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
              <thead>
                <tr>
                  <th className="uk-table-shrink">Avatar</th>
                  <th>
                    <button
                      className={style.headerButton}
                      onClick={() => {
                        requestSort("name");
                      }}
                    >
                      Name
                    </button>
                  </th>
                  <th>
                    <button
                      className={style.headerButton}
                      onClick={() => {
                        requestSort("isActive");
                      }}
                    >
                      Active
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading !== "idle" ? (
                  <tr>
                    <td colSpan={3} className="uk-text-center">
                      <em className="uk-text-muted">Loading...</em>
                    </td>
                  </tr>
                ) : (
                  pageOfItems.map((user, index) => (
                    <UserTableRow
                      key={index}
                      index={user.index + 1}
                      user={user}
                      expanded={expanded}
                      setExpanded={(val) => setExpanded(val)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {userData ? (
          <Pagination
            pager={pager}
            setPager={(val) => setPager(val)}
            items={userData}
            onChangePage={
               (val) => onChangePage(val)
            }
            initialPage={1}
            pageSize={20}
          />
        ) : null}
      </div>
    </main>
  );
};
export default PaginatedTable;
