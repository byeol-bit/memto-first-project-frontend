import { useState, useRef, useEffect } from "react";
import style from "./header.module.css";
import { Outlet, Link } from "react-router";
import { useLoginState } from "../loginstate";
import { getUserImageUrl } from "../../api/auth";

const headerData = [
  { id: 1, title: "홈", path: "/" },
  { id: 2, title: "지도", path: "/map" },
];

const Header = () => {
  const { isLoggedIn, user, logout } = useLoginState();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const modalRef = useRef(null);

  const [imgCacheKey] = useState(new Date().getTime());


  const profileSrc =
    isLoggedIn && user?.id
      ? `${getUserImageUrl(user.id)}?t=${imgCacheKey}`
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const handleLogoutClick = async () => {
    await logout();
    setIsProfileOpen(false);
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

  return (
    <div>
      <header className="sticky top-0 z-[100] border-b border-[var(--border-color)] bg-[var(--background-color)] py-4 shadow-[var(--shadow-sm)]">
        <div className="flex w-full items-center justify-between px-4">
          <Link
            to="/"
            className="text-xl font-bold text-[var(--primary-color)] no-underline"
          >
            Find hiddenMaster
          </Link>

          <ul className="ml-auto flex gap-6 list-none">
            {headerData.map((item) => (
              <li className="flex items-center" key={item.id}>
                <Link
                  to={item.path}
                  className="px-4 py-2 text-gray-600 no-underline rounded-md transition hover:text-[var(--primary-color)] hover:bg-[var(--background-light)]"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-6 flex items-center relative" ref={modalRef}>
            {isLoggedIn ? (
              <div className="relative">
                <img
                  src={profileSrc}
                  alt="프로필"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer border border-gray-200 hover:scale-105 transition-transform bg-white"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  onError={(e) => {
                    e.target.src =
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                  }}
                />

                {isProfileOpen && (
                  <div className="absolute top-12 right-0 w-[300px] bg-white border border-gray-200 rounded-xl shadow-xl p-5 flex items-center gap-4 z-50 animate-fade-in-down">
                    <img
                      src={profileSrc}
                      className="w-12 h-12 rounded-full object-cover border border-gray-100 bg-white"
                      alt="프로필"
                      onError={(e) => {
                        e.target.src =
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-base">
                        {user?.nickname}
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

export default Header;
