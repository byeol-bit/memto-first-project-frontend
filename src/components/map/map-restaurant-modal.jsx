import style from "./map-restaurant-modal.module.css"
import { useContext } from "react"
import { DetailStateContext } from "../layout/map-layout"

const MapRestaurantModal = () => {
  const { isModalOpen, setIsModalOpen, selectedRestaurant } = useContext(DetailStateContext)
  const onCloseButtonClick = () => {
    setIsModalOpen(false)
  }
  if (!isModalOpen) {
    return null
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false)
    }
  }

  return (
    <div className={style.modalOverlay} onClick={handleOverlayClick}>
      <div className={style.restaurantModal} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <h3 className={style.modalTitle}>{selectedRestaurant?.name || '맛집 정보'}</h3>
          <button
            className={style.modalClose}
            onClick={onCloseButtonClick}
          >&times;</button>
        </div>
        <div className={style.modalBody}>
          {selectedRestaurant && (
            <>
              <div className={style.modalInfo}>
                <strong>주소:</strong> {selectedRestaurant.address}
              </div>
              <div className={style.modalInfo}>
                <strong>카테고리:</strong> {selectedRestaurant.category}
              </div>
              <div className={style.modalInfo}>
                <strong>평점:</strong> ⭐ {selectedRestaurant.rating} ({selectedRestaurant.reviewCount}개 리뷰)
              </div>
              <div className={style.modalInfo}>
                <strong>가격대:</strong> {selectedRestaurant.priceRange}
              </div>
              {selectedRestaurant.openingHours && (
                <div className={style.modalInfo}>
                  <strong>영업시간:</strong> {selectedRestaurant.openingHours}
                </div>
              )}
              {selectedRestaurant.description && (
                <div className={style.modalInfo}>
                  <strong>설명:</strong> {selectedRestaurant.description}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MapRestaurantModal