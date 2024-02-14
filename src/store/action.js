import { SET_KEY_SEARCH, SET_USER } from "./constants";

export const setKeySearch = payload => (
    {
        type: SET_KEY_SEARCH,
        payload
    }
)

export const setUser = payload => (
    {
        type: SET_USER,
        payload
    }
)
