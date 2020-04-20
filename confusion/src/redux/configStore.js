import {createStore, combineReducers} from 'redux';

import {Dishes} from './dishes.js';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import {Comments} from './comments';




export const ConfigStore = () =>
{
    const store = createStore (
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            leaders:Leaders,
            promotions:Promotions,
        })
    );
    return store;
}
