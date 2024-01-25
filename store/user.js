import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { takeEvery } from "redux-saga/effects";
import { toast } from 'react-toastify';

export const actionTypes = {
    addToUser: "ADD_TO_USER",
    removeUser: "REMOVE_USER",
    refreshStore: "REFRESH_STORE",
    updateUser: "UPDATE_USER",
};

const initialState = {
    data: {}
}

const userReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.addToUser:
            console.log( 'userReducer', action.payload.user );
            return {
                data: {
                    ...action.payload.user
                }
            }
        case actionTypes.removeUser:
            return {  
                data: {}
            }

        case actionTypes.updateUser:
            return {
                data: {
                    ...action.payload.user
                }
            };
        case actionTypes.refreshStore:
            return initialState;

        default:
            return state;
    }
}

export const actions = {
    addToUser: ( user) => ( {
        type: actionTypes.addToUser,
        payload: {
            user: user,
        }
    } ),

    removeUser: (  ) => ( {
        type: actionTypes.removeUser
    } ),

    updateUser: ( user ) => ( {
        type: actionTypes.updateUser,
        payload: {
            user: user
        }
    } )
}

export function* userSaga () {
    yield takeEvery( actionTypes.addToUser, function* saga ( e ) {
        toast.success( "User login success" );
    } );

    yield takeEvery( actionTypes.removeUser, function* saga ( e ) {
        toast.success( "User logout success" );
    } );

    yield takeEvery( actionTypes.updateUser, function* saga ( e ) {
        toast.success( "User updated successfully" );
    } );
}

const persistConfig = {
    keyPrefix: "molla-",
    key: "user",
    storage
}

export default persistReducer( persistConfig, userReducer );