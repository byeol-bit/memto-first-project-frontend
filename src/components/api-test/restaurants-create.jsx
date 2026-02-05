import { useCreateRestaurantMutation } from "../../hooks/mutations/use-create-restaurant-mutation"
import { useState } from "react"

const CreateRestaurantApiComponent = () => {
  const { mutate, isPending } = useCreateRestaurantMutation()
  const [input, setInput] = useState({
    name: "",
    address: "",
    phone_number: "",
    category: "",
    longitude: 0,
    latitude: 0,
    kakao_place_id: ""
  })

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleButtonClick = () => {
    mutate({ ...input })
    setInput({
      name: "",
      address: "",
      phone_number: "",
      category: "",
      longitude: 0,
      latitude: 0,
      kakao_place_id: ""
    })
  }


  const inputClass =
    "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-sm font-medium text-slate-700 mb-4">맛집 생성</h3>
      <div className="space-y-3 pr-1">
        <input
          className={inputClass}
          placeholder="name"
          name="name"
          value={input.name}
          onChange={onChange}
        />
        <input
          className={inputClass}
          placeholder="address"
          name="address"
          value={input.address}
          onChange={onChange}
        />
        <input
          className={inputClass}
          placeholder="phone number"
          name="phone_number"
          value={input.phone_number}
          onChange={onChange}
        />
        <input
          className={inputClass}
          placeholder="category"
          name="category"
          value={input.category}
          onChange={onChange}
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            className={inputClass}
            placeholder="longitude"
            name="longitude"
            value={input.longitude}
            onChange={onChange}
          />
          <input
            className={inputClass}
            placeholder="latitude"
            name="latitude"
            value={input.latitude}
            onChange={onChange}
          />
        </div>
        <input
          className={inputClass}
          placeholder="kakao place id"
          name="kakao_place_id"
          value={input.kakao_place_id}
          onChange={onChange}
        />
      </div>
      <button
        className="w-full mt-4 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleButtonClick}
        disabled={isPending}
      >
        {isPending ? "생성 중..." : "맛집 생성"}
      </button>
    </div>
  )
}

export default CreateRestaurantApiComponent