import { Route, Routes } from "react-router";
import "./App.css";
import { LoginStateProvider } from "./components/loginstate";

// pages
import HeaderLayout from "./components/layout/header";
import IndexPage from "./pages/index-page";
import DesignSystemPage from "./pages/design-system";
import NotFoundPage from "./pages/not-found-page";
import UserListPage from "./pages/user-list-page";
import UserDetailPage from "./pages/user-detail-page";
import RestaurantListPage from "./pages/restaurant-list-page";
import RestaurantDetailPage from "./pages/restaurant-detail-page";
import MapPage from "./pages/map-page";
import ApiTestPage from "./pages/api-test";
import FeedPage from "./pages/feed-page";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import MapLayout from "./components/layout/map-layout";
import FollowPage from "./pages/follow-page";
import MyPage from "./pages/my-page";
import KakaoCallback from "./pages/KakaoCallback";

function App() {
  return (
    <LoginStateProvider>
      <div className="app-container">
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
            <Route path="/users/:id/:type" element={<FollowPage />} />
            <Route path="/restaurants" element={<RestaurantListPage />} />
            <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
            <Route element={<MapLayout />}>
              <Route path="/map" element={<MapPage />} />
            </Route>
            <Route path="/api-test" element={<ApiTestPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </LoginStateProvider>
  );
}

export default App;
