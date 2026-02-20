import { useState } from "react"
import style from "./map-layout.module.css"

const DetailPanel = ({ children, onClose }) => {
  const [headerScrolled, setHeaderScrolled] = useState(false)

  return (
    <div className={style.leftSidebarDoubleDetail}>
      <div
        className={style.leftSidebarDoubleDetailInner}
        onScroll={(e) => setHeaderScrolled(e.target.scrollTop > 0)}
      >
        <header
          className={`${style.detailPanelHeader} ${headerScrolled ? style.detailPanelHeaderScrolled : ""}`}
        >
          <button
            type="button"
            className={style.detailPanelHeaderClose}
            onClick={onClose}
            aria-label="닫기"
          >
            ✕
          </button>
        </header>
        <div className={style.detailPanelContent}>{children}</div>
      </div>
    </div>
  )
}

export default DetailPanel
