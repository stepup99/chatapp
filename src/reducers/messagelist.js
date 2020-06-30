const messageListReducer = (state = [], action) => {

    const { type, payload } = action;

    switch (type) {
        case "value":

            break;

        default:
            return state;
    }

}

export default messageListReducer;



