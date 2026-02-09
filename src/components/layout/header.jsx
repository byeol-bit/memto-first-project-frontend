import style from "./header.module.css";
import { Outlet, Link, useNavigate } from "react-router";
import { useLoginState } from "../loginstate";
const headerData = [
  { id: 1, title: "홈", path: "/" },
  { id: 2, title: "Doc", path: "/design-system" },
  { id: 3, title: "피드", path: "/feed" },
  { id: 4, title: "고수 목록", path: "/users" },
  { id: 5, title: "맛집 목록", path: "/restaurants" },
  { id: 6, title: "지도", path: "/map" },
  { id: 7, title: "API", path: "/api-test" },
];

const HeaderLayout = () => {
  const { isLoggedIn, user, logout } = useLoginState();
  const navigate = useNavigate();

  return (
    <div>
      <header className={style.header}>
        <div className={`${style.container} ${style.navbarContent}`}>
          {/* 로고 */}
          <Link to={"/"} className={style.navbarBrand}>
            Find hiddenMaster
          </Link>

          <ul className={style.navbarMenu}>
            {headerData.map((item) => (
              <li className={style.navbarItem} key={item.id}>
                <Link to={item.path} className={style.navbarLink}>
                  {item.title}
                </Link>
              </li>
            ))}

            {/* 로그인 상태에 따른 화면 변화 */}
            {isLoggedIn ? (
              <>
                {/* 로그인 상태 (닉네임) */}
                <li className={style.navbarItem}>
                  <span
                    className={style.navbarLink}
                    style={{
                      color: "#ee5a6f",
                      fontWeight: "bold",
                      cursor: "default",
                    }}
                  >
                    {user?.nickname || "고수"}
                  </span>
                </li>

                {/* 마이페이지 이동 */}
                <li className={style.navbarItem}>
                  <Link to="/users/me" className={style.navbarLink}>
                    마이페이지
                  </Link>
                </li>

                {/* 로그아웃 버튼*/}
                <li className={style.navbarItem}>
                  <button
                    onClick={logout}
                    className={style.navbarLink}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "inherit",
                      fontFamily: "inherit",
                    }}
                  >
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              // 로그인 전
              <>
                <li className={style.navbarItem}>
                  <Link to="/sign-in" className={style.navbarLink}>
                    로그인
                  </Link>
                </li>
                <li className={style.navbarItem}>
                  <Link to="/sign-up" className={style.navbarLink}>
                    회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default HeaderLayout;
