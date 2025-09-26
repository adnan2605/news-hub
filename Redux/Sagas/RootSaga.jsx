import {all} from 'redux-saga/effects';
import maincategorySagas from './MaincatergorySagas';
import subcategorySagas from './SubcatergorySagas';
import brandSagas from './BrandSagas';
import productSagas from './ProductSagas';
import testimonialSagas from './TestimonialSagas';
import contactusSagas from './ContactUsSagas';
import cartSagas from './CartSagas';
import newsletterSagas from './NewsletterSagas';
import wishlistSagas from './WishlistSagas';
import checkoutSagas from './CheckoutSagas';
import userSagas from './UserSagas'



export default function* RootSaga(){
    yield all ([
        maincategorySagas(),
        subcategorySagas(),
        brandSagas(),
        productSagas(),
        testimonialSagas(),
        cartSagas(),
        wishlistSagas(),
        checkoutSagas(),
        newsletterSagas(),
        contactusSagas(),
        userSagas()
    ])
}