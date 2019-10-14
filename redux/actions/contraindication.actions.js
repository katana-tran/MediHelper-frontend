
export const setContraindicationSearch = contraindications => {
    console.log("GET_CONTRAINDICATIONS", contraindications)
    return {
        type: "GET_CONTRAINDICATIONS",
        payload: contraindications
    }
}

