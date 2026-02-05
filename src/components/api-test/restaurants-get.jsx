import { useRestaurantsData } from "../../hooks/quries/use-restaurants-data"

const GetRestaurantsApiComponent = () => {
  const { data: restaurants, isLoading, error } = useRestaurantsData()

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-medium text-slate-700 mb-4">맛집 목록</h3>
        <div className="py-8 text-center text-red-500 text-sm">
          오류가 발생했습니다.
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-medium text-slate-700 mb-4">맛집 목록</h3>
        <div className="py-8 text-center text-slate-400 text-sm">
          로딩 중입니다...
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-sm font-medium text-slate-700 mb-4">맛집 목록</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {restaurants?.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            등록된 맛집이 없습니다.
          </div>
        ) : (
          restaurants?.map((restaurant) => (
            <div
              key={restaurant.id}
              className="p-4 bg-slate-50 rounded-lg border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-slate-500">
                  #{restaurant.id}
                </span>
                <span className="font-medium text-slate-800">{restaurant.name}</span>
                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                  {restaurant.category}
                </span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <p>{restaurant.address}</p>
                {restaurant.phone_number && (
                  <p className="text-slate-500">{restaurant.phone_number}</p>
                )}
                <p className="text-slate-400 pt-1">
                  {restaurant.created_at &&
                    new Date(restaurant.created_at).toLocaleString("ko-KR")}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GetRestaurantsApiComponent