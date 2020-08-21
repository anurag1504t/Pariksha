import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Exams } from './exams';
import { Comments } from './comments';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            exams: Exams,
            comments: Comments,
            auth: Auth,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}