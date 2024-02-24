import style from "./index.module.scss";
import { LuFilter } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { useState, useContext, useEffect } from "react";
import { StoreContext, actions } from "../../../store";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { routes } from "../../../config/routes";

// project
import { UserService } from "../../../serivces/UserService";
export function People() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(StoreContext);
  const [keySearch, setKeySearch] = useState(state.keySearch);
  const [users, setUsers] = useState([]);
  const userService = new UserService();

  const findUserByKey = () => {
    const fetchData = async () => {
      const response = await userService.findUserByKey(keySearch);
      setUsers(response);
    };

    fetchData();
  };

  useEffect(() => {
    findUserByKey();
  }, [keySearch]);

  return (
    <div className={style.content}>
      <div className={style.friend}>
        <div className={style.friendHeader}>
          <div className={style.col1}>
            <p className={style.title}>Friends</p>
          </div>
          <div className={style.col2}>
            <div className={style.search}>
              <input
                value={keySearch}
                onChange={(e) => setKeySearch(e.target.value)}
                placeholder="Find Friends..."
              ></input>
              <FiSearch className={style.icon} />
            </div>
            <button>
              <LuFilter className={style.icon} /> Filter{" "}
            </button>
          </div>
        </div>

        <div className={style.friendResult}>
          {users.map((item, index) => {
            return (
              <div key={index} className={style.item}>
                <div className={style.avatar}>
                  <img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-84.jpg"></img>
                </div>

                <div className={style.infor}>
                  <p className={style.name}>{item.fullName}</p>
                  <p className={style.sub}>{item.email}</p>
                </div>

                <div className={style.counter}>
                  <div className={style.following}>
                    <p className={style.number}>{item.followings}</p>
                    <p className={style.text}>Following</p>
                  </div>
                  <div className={style.likes}>
                    <p className={style.number}>{item.likes}</p>
                    <p className={style.text}>Likes</p>
                  </div>
                  <div className={style.followers}>
                    <p className={style.number}>{item.followers}</p>
                    <p className={style.text}>Followers</p>
                  </div>
                </div>

                <div className={style.viewProfile}>
                  <button>
                    {" "}
                    <Link
                      className="link"
                      to={`${routes.userWall}?id=${item.userId}`}
                    >
                      View Profile
                    </Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
