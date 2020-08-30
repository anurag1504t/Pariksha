import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Exams } from './exams';
import { Comments } from './comments';
import { Results } from './result';
import { Responses } from './response';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback, InitialMultiple, InitialNumerical, InitialSubjective } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            exams: Exams,
            comments: Comments,
            results: Results,
            responses: Responses,
            auth: Auth,
            ...createForms({
                feedback: InitialFeedback,
                multiple: InitialMultiple,
                numerical: InitialNumerical,
                subjective: InitialSubjective
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}