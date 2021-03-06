import * as ActionTypes from './ActionTypes';

export const Exams = (state = { isLoading: true, errMess: null, exams:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_EXAMS:
            return {...state, isLoading: false, errMess: null, exams: action.payload};

        case ActionTypes.EXAMS_LOADING:
            return {...state, isLoading: true, errMess: null, exams: []}

        case ActionTypes.EXAMS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
        case ActionTypes.ADD_EXAM:
            var exam = action.payload;
            return { ...state, exams: [...state.exams, exam]};

        default:
            return state;
    }
};