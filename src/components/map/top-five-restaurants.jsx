import TopRestaurantItem from "./top-restaurant-item"
import { useTopFiveRestaurantsData } from "../../hooks/queries/use-top-five-data"

const TopFiveRestaurants = ({ onClose }) => {
	const { data: restaurants } = useTopFiveRestaurantsData()

	return (
		<div
			className="
				flex flex-col rounded-lg overflow-hidden
				bg-[var(--background-color)] border border-[var(--border-light)]
				shadow-md
			"
		>
			<header className="flex items-center justify-between gap-2 px-2.5 py-2 bg-[var(--background-color)] border-b border-[var(--border-light)]">
				<div className="min-w-0">
					<h3 className="font-semibold text-[var(--text-primary)] text-sm tracking-tight">
						상위 Top 5 맛집
					</h3>
					<p className="[color:var(--text-secondary)] text-[10px] mt-0.5">
						방문기록 리뷰 수 기준
					</p>
				</div>
				{onClose && (
					<button
						type="button"
						onClick={onClose}
						className="
							shrink-0 w-6 h-6 flex items-center justify-center rounded-md
							text-[var(--text-secondary)] hover:text-[var(--text-primary)]
							hover:bg-[var(--background-dark)] active:bg-[var(--border-color)]
							transition-colors duration-150 text-base leading-none
						"
						aria-label="닫기"
					>
						×
					</button>
				)}
			</header>

			<div className="flex flex-col gap-1.5 p-2 pt-0">
				{restaurants?.map((restaurant, idx) => (
					<TopRestaurantItem
						key={idx}
						rank={idx}
						restaurant={restaurant}
					/>
				))}
			</div>
		</div>
	)
}

export default TopFiveRestaurants