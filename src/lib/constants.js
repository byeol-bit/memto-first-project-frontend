import topFir from "../assets/top-five/top-first.png"
import topSec from "../assets/top-five/top-second.png"
import topThird from "../assets/top-five/top-third.png"
import topFourth from "../assets/top-five/top-fourth.png"
import topFifth from "../assets/top-five/top-fifth.png"

export const rankingImgArr = [topFir, topSec, topThird, topFourth, topFifth]

export const QUERY_KEYS = {
  user: {
    all: ["user"],
    list: ["user", "list"],
    random: ["user", "random"],
    detail: (id) => ["user", "detail", id]
  },
  restaurant: {
    all: ["restaurant"],
    list: ["restaurant", "list"],
    topFive: ["restaurant", "top-five"],
    detail: (id) => ["restaurant", "detail", id]
  }
}

export const MAP_LAYOUT_TABS = { USERS: 'users', RESTAURANTS: 'restaurants', FEED: 'feed' }