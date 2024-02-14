import { SET_KEY_SEARCH, SET_USER } from "./constants";
export const initState = {
    keySearch: "",
    user: {
        userId: null,
        username: null,
        password: null,
        email: null,
        fullName: null,
        birthdate: null,
        gender: null,
        profilePicture: null,
        coverPhoto: null,
        bio: null,
        website: null,
        phoneNumber: null,
        lastLogin: null,
        registrationDate: null,
        status: null,
        role: null
    }
}

function reducer(state, action) {
    switch (action.type) {
        case SET_KEY_SEARCH:
            return {
                ...state,
                keySearch: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            throw new Error('Invalid action.')
    }
}


export default reducer;