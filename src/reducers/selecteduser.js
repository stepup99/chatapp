const selecteduserReducer = (state = {}, action) => {

    const { type, payload } = action;

    switch (type) {
        case "ADD_NAME":
            state = payload
            return state

        default:
            return state;
    }

}

export default selecteduserReducer;



