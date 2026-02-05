import { useState } from "react"
import { useCreateUserMutation } from "../../hooks/mutations/use-create-user-mutation"


const CreateUserApiComponent = () => {
  const { mutate, isPending } = useCreateUserMutation()
  const [input, setInput] = useState({
    nickname: "",
    password: "",
    introduction: "",
    category: ""
  })

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleAddClick = () => {
    mutate({ ...input })
    setInput({
      nickname: "",
      password: "",
      introduction: "",
      category: ""
    })
  }
  const inputClass =
    "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-sm font-medium text-slate-700 mb-4">유저 생성</h3>
      <div className="space-y-3">
        <input
          className={inputClass}
          placeholder="nickname"
          name="nickname"
          value={input.nickname}
          onChange={onChange}
        />
        <input
          className={inputClass}
          placeholder="password"
          name="password"
          value={input.password}
          type="password"
          onChange={onChange}
        />
        <input
          className={inputClass}
          placeholder="introduction"
          name="introduction"
          value={input.introduction}
          onChange={onChange}
        />
        <input
          className={inputClass}
          placeholder="category"
          name="category"
          value={input.category}
          onChange={onChange}
        />
        <button
          className="w-full mt-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAddClick}
          disabled={isPending}
        >
          {isPending ? "생성 중..." : "유저 생성"}
        </button>
      </div>
    </div>
  )
}

export default CreateUserApiComponent