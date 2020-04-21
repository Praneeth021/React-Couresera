import {createStore, combineReducers,applyMiddleware} from 'redux';

import {Dishes} from './dishes.js';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import {Comments} from './comments';

import logger from 'redux-logger';
import thunk from 'redux-thunk';


export const ConfigStore = () =>
{
    const store = createStore (
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            leaders:Leaders,
            promotions:Promotions,
        }),
        applyMiddleware(logger,thunk),
    );
    return store;
}
