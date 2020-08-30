import * as ActionTypes from './ActionTypes';

export const Results = (state = { isLoading: true, errMess: null, results:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_RESULT:
            return {...state, isLoading: false, errMess: null, results: action.payload};

        case ActionTypes.RESULT_LOADING:
            return {...state, isLoading: true, errMess: null, results: []}

        case ActionTypes.RESULT_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};