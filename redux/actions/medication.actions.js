
export const setFilterTerm = filterTerm => {
    return {
        type: "SET_FILTER_TERM",
        payload: filterTerm
    }
}

export const setMedicationSearch = medications => {
    console.log("SET SEARCH",medications)
    return {
        type: "GET_MEDICATIONS",
        payload: medications
    }
}

export const clearSearchResults = () => {
    console.log("CLEARING MEDICATIONS STATE")
    return {
        type: "CLEAR_SEARCH"
    }
}