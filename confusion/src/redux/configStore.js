import {createStore, combineReducers,applyMiddleware} from 'redux';

import {Dishes} from './dishes.js';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import {Comments} from './comments';
import {InitialFeedback} from './forms'

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import {createForms} from 'react-redux-form';


export const ConfigStore = () =>
{
    const store = createStore (
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            leaders:Leaders,
            promotions:Promotions,
            ...createForms({
                feedback:InitialFeedback
            })
        }),
        applyMiddleware(logger,thunk),
    );
    return store;
}
