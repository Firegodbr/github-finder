import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS, NO_RESULTS } from '../types';

export default  (state, action) => {

    switch(action.type){
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                searched: true
            };
        case NO_RESULTS:
            return {
                ...state,
                searched: false
            }
        case CLEAR_USERS:
            return {
                ...state,
                users:[],
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}