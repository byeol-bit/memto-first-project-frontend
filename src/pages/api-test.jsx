import { useState } from "react"
import GetUsersApiComponent from "../components/api-test/users-get"
import CreateUserApiComponent from "../components/api-test/user-create"
import GetRestaurantsApiComponent from "../components/api-test/restaurants-get"
import CreateRestaurantApiComponent from "../components/api-test/restaurants-create"

const TABS = {
  user: "user",
  restaurant: "restaurant"
}

const ApiTestPage = () => {
  const [activeTab, setActiveTab] = useState(TABS.user)

  const tabClass = (tab) =>
    `px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab
      ? "bg-white text-slate-800 border border-b-0 border-slate-200 -mb-px"
      : "bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200"
    }`

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">API 테스트</h1>

        <div className="flex gap-1 border-b border-slate-200">
          <button
            className={tabClass(TABS.user)}
            onClick={() => setActiveTab(TABS.user)}
          >
            유저
          </button>
          <button
            className={tabClass(TABS.restaurant)}
            onClick={() => setActiveTab(TABS.restaurant)}
          >
            맛집
          </button>
        </div>

        <div className="pt-2">
          {activeTab === TABS.user && (
            <div className="grid gap-6 sm:grid-cols-2">
              <CreateUserApiComponent />
              <GetUsersApiComponent />
            </div>
          )}
          {activeTab === TABS.restaurant && (
            <div className="grid gap-6 sm:grid-cols-2">
              <CreateRestaurantApiComponent />
              <GetRestaurantsApiComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApiTestPage