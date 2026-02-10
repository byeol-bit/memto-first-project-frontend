import { useState } from "react"
import TopRestaurantItem from "./top-restaurant-item"
import { useTopFiveRestaurantsData } from "../../hooks/queries/use-top-five-data"


const TopFiveRestaurants = () => {
	const { data: restaurants, isLoading, error } = useTopFiveRestaurantsData()
	const [isCollapsed, setIsCollapsed] = useState(false)

	return (
		<div
			className="
				flex flex-col rounded-xl overflow-hidden
				bg-[var(--background-color)] border border-[var(--border-light)]
				shadow-md
			"
		>
			{/* 헤더: 클릭 시 접기/펼치기 */}
			<header
				className={`flex items-center justify-between gap-3 px-4 py-3 bg-[var(--background-color)] ${!isCollapsed ? "border-b border-[var(--border-light)]" : ""}`}
			>
				<div className="min-w-0">
					<h3 className="font-semibold text-[var(--text-primary)] [font-size:var(--font-size-base)] tracking-tight">
						상위 Top 5 맛집
					</h3>
					<p className="[color:var(--text-secondary)] [font-size:var(--font-size-xs)] mt-0.5">
						방문기록 리뷰 수 기준
					</p>
				</div>
				<button
					type="button"
					onClick={() => setIsCollapsed((c) => !c)}
					className="
						shrink-0 w-8 h-8 flex items-center justify-center rounded-lg
						text-[var(--text-secondary)] hover:text-[var(--text-primary)]
						hover:bg-[var(--background-dark)] active:bg-[var(--border-color)]
						transition-colors duration-150
						[font-size:var(--font-size-lg)] leading-none
					"
					aria-expanded={!isCollapsed}
					aria-label={isCollapsed ? "리스트 펼치기" : "리스트 접기"}
				>
					{isCollapsed ? "+" : "−"}
				</button>
			</header>

			{/* 리스트: 접혀 있으면 숨김 */}
			{!isCollapsed && (
				<div className="flex flex-col gap-2.5 p-3 pt-0">
					{restaurants?.map((restaurant, idx) => (
						<TopRestaurantItem
							key={restaurant.id ?? idx}
							rank={idx}
							restaurant={restaurant}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default TopFiveRestaurants