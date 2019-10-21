const initialState = {
    usersMedications: [1],
    user: {
        name: "Friend"
    }
}

const UserReducer = (state=initialState, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'GET_USERS_MEDS':
                return {
                    ...state,
                    usersMedications: action.payload
                }
        default:
            return state
    }
}

export default UserReducer