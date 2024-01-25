import { all } from 'redux-saga/effects';
import { cartSaga } from './cart';
import { wishlistSaga } from './wishlist';
import { compareSaga } from './compare';
import { userSaga } from './user';

export default function* rootSaga () {
    yield all( [
        userSaga(),
        cartSaga(),
        wishlistSaga(),
        compareSaga(),
    ] );
}