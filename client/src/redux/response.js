import * as ActionTypes from './ActionTypes';

export const Responses = (state = { isLoading: true, errMess: null, responses:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_RESPONSE:
            return {...state, isLoading: false, errMess: null, responses: action.payload};

        case ActionTypes.RESPONSE_LOADING:
            return {...state, isLoading: true, errMess: null, responses: []}

        case ActionTypes.RESPONSE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};