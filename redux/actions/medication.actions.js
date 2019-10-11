export const setMedicationSearch = medications => {
    console.log(medications)
    return {
        type: "GET_MEDICATIONS",
        payload: medications
    }
}


