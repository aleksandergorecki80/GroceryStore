import { SET_ALERT } from "./constants"

export const setAlert = (message) => {
    return { type: SET_ALERT, message}
}
