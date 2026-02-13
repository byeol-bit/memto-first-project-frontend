import { useState, useRef, useEffect } from "react";
import style from "./header.module.css";
import { Outlet, Link, useNavigate } from "react-router";
import { useLoginState } from "../loginstate";
import { logoutUser, getUserProfile } from "../../api/auth";

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
  const { isLoggedIn, user, login, logout } = useLoginState();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const modalRef = useRef(null);

  const filteredNav = headerData.filter((item) => {
    const role = localStorage.getItem("userRole");

    if (role === "admin") return true;

    return item.title === "홈" || item.title === "지도";
  });

  useEffect(() => {
    const fetchLatestUserInfo = async () => {
      const token = localStorage.getItem("accessToken");
      if (token === "mock-token-test-1234") return;

      if (isLoggedIn) {
        try {
          const response = await getUserProfile();
          if (token) login(token, response.data);
        } catch (error) {
          console.error("헤더 프로필 갱신 실패:", error);
        }
      }
    };
    fetchLatestUserInfo();
  }, [isLoggedIn]);

  const handleLogoutClick = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      localStorage.removeItem("userRole"); // ⭐ 로그아웃 시 권한 삭제
      logout();
      setIsProfileOpen(false);
      alert("로그아웃 되었습니다.");
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const defaultProfileImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div>
      <header className={style.header}>
        <div className={`${style.container} ${style.navbarContent}`}>
          <Link to={"/"} className={style.navbarBrand}>
            Find hiddenMaster
          </Link>

          <ul className={`${style.navbarMenu} ml-auto`}>
            {filteredNav.map((item) => (
              <li className={style.navbarItem} key={item.id}>
                <Link to={item.path} className={style.navbarLink}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-6 flex items-center relative" ref={modalRef}>
            {isLoggedIn ? (
              <div className="relative">
                <img
                  src={user?.profileImage || defaultProfileImg}
                  alt="프로필"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer border border-gray-200 hover:scale-105 transition-transform bg-white"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                />

                {isProfileOpen && (
                  <div className="absolute top-12 right-0 w-[300px] bg-white border border-gray-200 rounded-xl shadow-xl p-5 flex items-center gap-4 z-50 animate-fade-in-down">
                    <img
                      src={user?.profileImage || defaultProfileImg}
                      className="w-12 h-12 rounded-full object-cover border border-gray-100 bg-white"
                      alt="프로필"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-base">
                        {user?.nickname || "고수"}
                      </span>
                      <Link
                        to="/my-page"
                        className="text-sm text-gray-500 hover:text-[#ee5a6f] hover:underline cursor-pointer"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        마이페이지
                      </Link>
                    </div>
                    <button
                      onClick={handleLogoutClick}
                      className="ml-auto text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 hover:text-gray-800 transition-colors whitespace-nowrap"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/sign-in"
                className="font-bold text-gray-600 text-sm px-4 py-2 border border-gray-200 rounded bg-white hover:bg-gray-50 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default HeaderLayout;
