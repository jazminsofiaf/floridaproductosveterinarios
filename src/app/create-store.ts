import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from "./actions/reducers";

export default () => {
    return createStore(reducers, undefined, applyMiddleware(logger, thunk));
}