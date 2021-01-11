/*
 * Filename: \client\src\components\Table\UserTableRow\UserTableRow.js
 * Created Date: Saturday, January 9th 2021
 * Author: Kenny Gosai
 */

import React from "react";
import style from "./style.module.css";
import PropTypes from "prop-types";

/**
 * Component for showing details/row of the user.
 *
 * @component
 * @example
 * const [pageOfItems, setPageOfItems] = useState([]);
 * const [expanded, setExpanded] = useState(false);
 * return (
 *   pageOfItems.map((user, index) =>
 *    <UserTableRow key={index} index={user.index + 1} user={user} expanded={expanded} setExpanded={(val) => setExpanded(val)}/>
 *   )
 * )
 */
const UserTableRow = ({ user, expanded, setExpanded }) => {
  return (
    <React.Fragment>
      <tr
        key="main"
        className={style.rowClick}
        onClick={() =>
          setExpanded(expanded === user["_id"] ? false : user["_id"])
        }
      >
        <td>
          <img
            className="uk-preserve-width uk-border-circle"
            src={user.picture.replace(/^http:\/\//i, "https://")}
            width={48}
            alt="avatar"
          />
        </td>
        <td style={{ textAlign: "left" }}>{user.name}</td>
        <td
          className={user.isActive ? style.loggedIn : style.loggedOut}
          style={{ textAlign: "center" }}
        >
          ●
        </td>
      </tr>
      {expanded === user["_id"] && (
        <tr className={style.expandable} key="tr-expander">
          <td className="uk-background-muted" colSpan={3}>
            <div className={`${style.inner} uk-grid`}>
              <div className="uk-width-1-4 uk-text-center">
                <img
                  className="uk-preserve-width uk-border-circle"
                  src={user.picture.replace(/^http:\/\//i, "https://")}
                  alt="avatar"
                  style={{ width: "60px" }}
                />
              </div>
              <div className="uk-width-3-4">
                <h3>{user.name}</h3>
                <p>
                  <span className={style.subTitle}>Tags: </span>
                  {user.tags.map((value, index) => {
                    return `${value}${
                      index !== user.tags.length - 1 ? ", " : " "
                    }`;
                  })}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

UserTableRow.propTypes = {
  user: PropTypes.object,
  expanded: PropTypes.string,
  setExpanded: PropTypes.func,
};
export default UserTableRow;
