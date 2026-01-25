import style from "./header.module.css"
import { Outlet, Link } from 'react-router'

const headerData = [
  {
    id: 1,
    title: "홈",
    path: '/'
  },
  {
    id: 2,
    title: "Doc",
    path: '/design-system'
  },
  {
    id: 3,
    title: "피드",
    path: '/feed'
  },
  {
    id: 4,
    title: "고수 목록",
    path: '/users'
  },
  {
    id: 5,
    title: "맛집 목록",
    path: '/restaurants'
  },
  {
    id: 6,
    title: "지도",
    path: '/map'
  }
]

const HeaderLayout = () => {
  return (
    <div>
      <header className={style.header}>
        <div className={`${style.container} ${style.navbarContent}`}>
          <Link to={"/"} className={style.navbarBrand}>Find hiddenMaster</Link>
          <ul className={style.navbarMenu}>
            {headerData.map((item) => <li className={style.navbarItem} key={item.id}><Link to={item.path} className={style.navbarLink}>{item.title}</Link></li>)}

          </ul>
        </div>
      </header >
      <Outlet />
    </div >
  )
}

export default HeaderLayout