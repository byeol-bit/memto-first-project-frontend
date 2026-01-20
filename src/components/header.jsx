import "./header.css"
import { Outlet } from 'react-router'

const HeaderLayout = () => {
  return (
    <div>
      <header class="header">
        <div className="container">

        </div>
      </header>
      <Outlet />
    </div>
  )
}

export default HeaderLayout