export const setUser = userData => {
    return {
        type: "SET_USER",
        payload: userData
    }
}

export const setUserMedication = medications => {
    console.log("SET USER",medications)
    return {
        type: "GET_USERS_MEDS",
        payload: medications
    }
}