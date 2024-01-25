import { useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/alink';
import Accordion from '~/components/features/accordion/accordion';
import Card from '~/components/features/accordion/card';
import PageHeader from '~/components/features/page-header';
import {loadStripe} from '@stripe/stripe-js';

import { cartPriceTotal } from '~/utils/index';
import axiosClient from "~/server/axiosClient/axios";
import { actions as cartAction } from '~/store/cart';
import { actions as userAction } from '~/store/user';

function Checkout ( props ) {
    const { cartlist, user } = props;
    console.log(cartlist)
    console.log(user)
    const formRef = useRef(); 

    useEffect( () => {
        document.querySelector( 'body' ).addEventListener( "click", clearOpacity )

        return () => {
            document.querySelector( 'body' ).removeEventListener( "click", clearOpacity );
        }
    }, [] )

    function clearOpacity () {
        if ( document.querySelector( '#checkout-discount-input' ).value == '' )
            document.querySelector( '#checkout-discount-form label' ).removeAttribute( 'style' );
    }

    function addOpacity ( e ) {
        e.currentTarget.parentNode.querySelector( "label" ).setAttribute( "style", "opacity: 0" );
    }

    const checkOutStripe = async (e) => {
        e.preventDefault();


        const description = e.target['description'].value
        // create billing_information_id first
        const newBilling = e.target['different-address'].value
        
        // create shipping_infomation if setCollapsibleElement true
        const newShipping = e.target['different-shipping'].value

        const stripePromise = loadStripe('pk_test_51OWCdNKX1zdpXEzPmC8Ly47dqvxpJsKvYChDpALpl7UQjwHm96G2K0KoizO5J53yv1nOD960a5FvFfQwT9YGBejN00lPJgMJy4');
        try {
            const stripe = await stripePromise;

            const response = await axiosClient.post('/orders',{
                req: {
                    products: cartlist,
                    description:  description
                }
            })

            if (response?.stripeSession?.id) {
                // clear cart
                props.removeCart()
            }

            await stripe.redirectToCheckout({
                sessionId: response.stripeSession.id,
            });
        } catch (e) {
            console.log(e)
        }

        formRef.current.reset(); 
    }

    return (
        <div className="main">
            <PageHeader title="Checkout" subTitle="Shop" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list">Shop</ALink>
                        </li>
                        <li className="breadcrumb-item active">Checkout</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="checkout">
                    <div className="container">
                        <div className="checkout-discount">
                            <form action="#" id="checkout-discount-form">
                                <input type="text" className="form-control" id="checkout-discount-input" onClick={ addOpacity } />
                                <label htmlFor="checkout-discount-input" className="text-truncate">Have a coupon? <span>Click here to enter your code</span></label>
                            </form>
                        </div>

                        <form action="#" onSubmit={checkOutStripe} ref={formRef} >
                            <div className="row">
                                <div className="col-lg-9">
                                     <SlideToggle duration={ 300 } collapsed >
                                        { ( { onToggle, setCollapsibleElement } ) => (
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox mt-0 address-box">
                                                    <input type="checkbox" className="custom-control-input"
                                                        name="different-address" id="different-address" onChange={ onToggle } />
                                                    <label className="custom-control-label" htmlFor="different-address">New billing address?
                                                    </label>
                                                </div>
                                                <div className="shipping-info" ref={ setCollapsibleElement } style={ { overflow: 'hidden' } }>
                                                <h2 className="checkout-title">Billing Details</h2>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <label>First Name *</label>
                                                            <input type="text" name="first_name" className="form-control" />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <label>Last Name *</label>
                                                            <input type="text" name="last_name" className="form-control" />
                                                        </div>
                                                    </div>

                                                    <label>Company Name (Optional)</label>
                                                    <input type="text" name="company_name" className="form-control" />

                                                    <label>Country *</label>
                                                    <input type="text" name ="country" className="form-control"  />

                                                    <label>Street address *</label>
                                                    <input type="text" name="street_1" className="form-control" placeholder="House number and Street name"  />
                                                    <input type="text" name="street_2"className="form-control" placeholder="Appartments, suite, unit etc ..."  />

                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <label>Town / City *</label>
                                                            <input type="text" name="city" className="form-control"  />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <label>State / County *</label>
                                                            <input type="text" name="country" className="form-control"  />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <label>Postcode / ZIP *</label>
                                                            <input type="text" name="postcode" className="form-control"  />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <label>Phone *</label>
                                                            <input type="tel" name="phone" className="form-control"  />
                                                        </div>
                                                    </div>

                                                    <label>Email address *</label>
                                                    <input type="email" name="email" className="form-control"  />
                                                </div>
                                            </div>
                                        )}
                                    </SlideToggle >

                                    <SlideToggle duration={ 300 } collapsed >
                                        { ( { onToggle, setCollapsibleElement } ) => (
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox mt-0 address-box">
                                                    <input type="checkbox" className="custom-control-input"
                                                       name="different-shipping" id="different-shipping" onChange={ onToggle } />
                                                    <label className="custom-control-label" htmlFor="different-shipping">Ship to a different address?
                                                    </label>
                                                </div>
                                                <div className="shipping-info" ref={ setCollapsibleElement } style={ { overflow: 'hidden' } }>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>First name <abbr className=""
                                                                    title="">*</abbr></label>
                                                                <input type="text" className="form-control"  />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Last name <abbr className=""
                                                                    title="">*</abbr></label>
                                                                <input type="text" className="form-control"  />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Company name (optional)</label>
                                                        <input type="text" className="form-control" />
                                                    </div>

                                                    <div className="select-custom">
                                                        <label>Country / Region <span className="required">*</span></label>
                                                        <select name="orderby" className="form-control">
                                                            <option value="" defaultValue="selected">Vanuatu</option>
                                                            <option value="1">Brunei</option>
                                                            <option value="2">Bulgaria</option>
                                                            <option value="3">Burkina Faso</option>
                                                            <option value="4">Burundi</option>
                                                            <option value="5">Cameroon</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group mb-1 pb-2">
                                                        <label>Street address <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <input type="text" className="form-control"
                                                            placeholder="House number and street name"  />
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="text" className="form-control"
                                                            placeholder="Apartment, suite, unit, etc. (optional)"  />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Town / City <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <input type="text" className="form-control"  />
                                                    </div>

                                                    <div className="select-custom">
                                                        <label>State / County <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <select name="orderby" className="form-control">
                                                            <option value="" defaultValue="selected">NY</option>
                                                            <option value="1">Brunei</option>
                                                            <option value="2">Bulgaria</option>
                                                            <option value="3">Burkina Faso</option>
                                                            <option value="4">Burundi</option>
                                                            <option value="5">Cameroon</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Postcode / ZIP <abbr className="required"
                                                            title="required">*</abbr></label>
                                                        <input type="text" className="form-control"  />
                                                    </div>
                                                </div>
                                            </div>
                                        ) }
                                    </SlideToggle >

                                    <label>Order notes (optional)</label>
                                    <textarea id="description" name="description" className="form-control" cols="30" rows="4" placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
                                </div>

                                <aside className="col-lg-3">
                                    <div className="summary">
                                        <h3 className="summary-title">Your Order</h3>

                                        <table className="table table-summary">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                { cartlist.map( ( item, index ) =>
                                                    <tr key={ index }>
                                                        <td> <ALink href={ `/product/default/${item.id}` }>{ item?.attributes?.product_name }</ALink></td>
                                                        <td>${ item.sum.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</td>
                                                    </tr>
                                                ) }
                                                <tr className="summary-subtotal">
                                                    <td>Subtotal:</td>
                                                    <td>${ cartPriceTotal( cartlist ).toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</td>
                                                </tr>
                                                <tr>
                                                    <td>Shipping:</td>
                                                    <td>Free Shipping</td>
                                                </tr>
                                                <tr className="summary-total">
                                                    <td>Total:</td>
                                                    <td>${ cartPriceTotal( cartlist ).toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <Accordion type="checkout">
                                            <Card title="Direct bank transfer" >
                                                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                                </Card>

                                            <Card title="Check payments">
                                                Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                                                </Card>

                                            <Card title="Cash on delivery">
                                                Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.
                                                </Card>

                                            <Card title='PayPal' >
                                                <small className="float-right paypal-link">What is PayPal?</small>
                                                    Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                                </Card>

                                            <Card title='Credit Card (Stripe)' expanded={ true } >
                                                <img src="images/payments-summary.png" alt="payments cards" className="mb-1" />
                                                    Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit ame.
                                                </Card>
                                        </Accordion>
                                        {
                                            user && user.id ?          
                                            <button type="submit" className="btn btn-outline-primary-2 btn-order btn-block">
                                                <span className="btn-text">Place Order</span>
                                                <span className="btn-hover-text">Proceed to Checkout</span>
                                            </button> :    
                                            <button disabled  className="btn btn-outline-primary-3 btn-order btn-block" >
                                                <span className="btn-text">Place Order</span>
                                                <span className="btn-hover-text">Please login First</span>
                                            </button>
                                        }
                               
                                    </div>
                                </aside>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const mapStateToProps = ( state ) => ( {
    cartlist: state.cartlist.data,
    user: state.user.data
} )

export default connect( mapStateToProps ,{ ...cartAction, ...userAction })( Checkout );