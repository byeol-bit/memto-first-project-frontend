import style from './map-page.module.css'
import Map from "../components/map"

const MapPage = () => {

  return (
    <div className={style.map}>
      <Map />
    </div>
  )
}

export default MapPage