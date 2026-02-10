import { useUsersData } from "../../hooks/queries/use-users-data";

const GetUsersApiComponent = () => {
  const { data: users, isLoading, error } = useUsersData();

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-medium text-slate-700 mb-4">유저 목록</h3>
        <div className="py-8 text-center text-red-500 text-sm">
          오류가 발생했습니다.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-medium text-slate-700 mb-4">유저 목록</h3>
        <div className="py-8 text-center text-slate-400 text-sm">
          로딩 중입니다...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-sm font-medium text-slate-700 mb-4">유저 목록</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {users?.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            등록된 유저가 없습니다.
          </div>
        ) : (
          users?.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-slate-50 rounded-lg border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-slate-500">
                  #{user.id}
                </span>
                <span className="font-medium text-slate-800">
                  {user.nickname}
                </span>
                <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                  {user.category}
                </span>
              </div>
              {user.introduction && (
                <p className="text-sm text-slate-600 line-clamp-2">
                  {user.introduction}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetUsersApiComponent;
