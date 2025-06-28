import { SIGN_IN, SIGN_OUT } from '../actions/types';

const storedSignedIn = localStorage.getItem('isSignedIn') === 'true';
const storedUserId = localStorage.getItem('userId');

const INITIAL_STATE = {
    isSignedIn: storedSignedIn && storedUserId ? true : false,
    userId: storedUserId
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            localStorage.setItem('isSignedIn', 'true');
            localStorage.setItem('userId', action.payload);
            return { ...state, isSignedIn: true, userId: action.payload };
        case SIGN_OUT:
            localStorage.setItem('isSignedIn', 'false');
            localStorage.removeItem('userId');
            return { ...state, isSignedIn: false, userId: null };
        default:
            return state;
    }
};
