
export const setUserMedication = medications => {
    console.log("SET USER",medications)
    return {
        type: "GET_USERS_MEDS",
        payload: medications
    }
}


export const setMedicationSearch = medications => {
    console.log("SET SEARCH",medications)
    return {
        type: "GET_MEDICATIONS",
        payload: medications
    }
}