import {BASE_URL} from './WorkingURL'

export const setContraindicationSearch = contraindications => {
    return {
        type: "GET_CONTRAINDICATIONS",
        payload: contraindications
    }
}

export const fetchContraindicationSearch = userID => {
    return async dispatch => {
        return fetch(BASE_URL+'/get-contraindications', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                user_id: userID
            })
        })
        .then(res => res.json())
        .then(contraindication_json => dispatch(setContraindicationSearch(contraindication_json)))
        .catch(err => console.log("Error in fetchContraindicationSearch:", err))
    }
}

