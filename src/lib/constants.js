export const QUERY_KEYS = {
  user: {
    all: ["user"],
    list: ["user", "list"],
    detail: (id) => ["user", "detail", id]
  },
  restaurant: {
    all: ["restaurant"],
    list: ["restaurant", "list"],
    detail: (id) => ["restaurant", "detail", id]
  }
}