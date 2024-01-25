import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { connect } from 'react-redux';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import { removeToken } from "~/utils/manageLocalStorage";
import { actions as cartAction } from '~/store/cart';
import { actions as wishlistAction } from '~/store/wishlist';
import { actions as userAction } from '~/store/user';
import axiosClient from "~/server/axiosClient/axios";

function DashBoard (props) {
    const { user } = props;
    const [ orders, setOrders ] = useState( [] );
   
    useEffect( () => {
        if ( orders.length === 0 && user?.id) {
            orderApi().then( response => {
                setOrders( response );
            } )
        }
    }, [] )

    console.log(orders)

    async function orderApi  () {
        const response = await axiosClient.get('/orders?populate=*&filters[user_id][id]='+user.id)
        return response?.data; 
    }

    function toOrder ( e ) {
        e.preventDefault();
        document
            .querySelector( '.nav-dashboard .react-tabs__tab-list .nav-item:nth-child(2)' )
            .click();
    }

    function toAddress ( e ) {
        e.preventDefault();
        document
            .querySelector( '.nav-dashboard .react-tabs__tab-list .nav-item:nth-child(4)' )
            .click();
    }

    function toAccount ( e ) {
        e.preventDefault();
        document
            .querySelector( '.nav-dashboard .react-tabs__tab-list .nav-item:nth-child(5)' )
            .click();
    }

    function onSignOut(){
        
        removeToken();
        props.removeUser();
        props.removeWishlist();
        props.removeCart();
        //removeWishlist
        //removeCart
    }

    return (
        <div className="main">
            <PageHeader title="My Account" subTitle="Shop" />
            <nav className="breadcrumb-nav mb-3">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list">Shop</ALink>
                        </li>
                        <li className="breadcrumb-item active">My Account</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="dashboard">
                    <div className="container">
                        <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                            <Tabs selectedTabClassName="active show">
                                <div className="row">
                                    <aside className="col-md-4 col-lg-3 mb-md-0 mb-2">
                                        <TabList>
                                            <Tab className="nav-item">
                                                <span className="nav-link">Dashboard</span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">Orders</span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">Downloads</span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">Addresses</span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">Account Details</span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <a href="/" className="nav-link" onClick={onSignOut}>Sign Out</a>
                                            </Tab>
                                        </TabList>
                                    </aside>

                                    <div className="col-md-8 col-lg-9" style={ { marginTop: "1rem" } }>
                                        <div className="tab-pane">
                                            <TabPanel>
                                                <p>Hello <span className="font-weight-normal text-dark">User</span> (not <span className="font-weight-normal text-dark">User</span>? <ALink href="/">Log out</ALink>)
                                                    <br />
                                                        From your account dashboard you can view your <a href="#tab-orders" onClick={ toOrder } className="tab-trigger-link link-underline">recent orders</a>, manage your <a href="#tab-address" onClick={ toAddress } className="tab-trigger-link">shipping and billing addresses</a>, and <a href="#tab-account" onClick={ toAccount } className="tab-trigger-link">edit your password and account details</a>.</p>
                                            </TabPanel>

                                            <TabPanel>
                                                {
                                                    orders.length > 0 ? 
                                                        orders.map( order => {
                                                            return <div className="card card-dashboard">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">Order #{ order?.id }</h5>
                                                                    <p className="card-text">Placed on { order?.attributes?.createdAt }</p>
                                                                    <p className="card-text">Total: ${ order?.attributes?.total_amount / 100}</p>
                                                                    <p className="card-text">Status: { order?.attributes?.status }</p>
                                                                    <ALink href="#" className="btn btn-outline-primary-2">View Details</ALink>
                                                                </div>
                                                            </div>
                                                        } )
                                                    : <p>No order has been made yet.</p>
                                                }
                                            
                                                <ALink href="/shop/sidebar/list" className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></ALink>
                                            </TabPanel>

                                            <TabPanel>
                                                <p>No downloads available yet.</p>
                                                <ALink href="/shop/sidebar/list" className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></ALink>
                                            </TabPanel>

                                            <TabPanel>
                                                <p>The following addresses will be used on the checkout page by default.</p>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="card card-dashboard">
                                                            <div className="card-body">
                                                                <h3 className="card-title">Billing Address</h3>

                                                                <p>User Name<br />
                                                                        User Company<br />
                                                                        John str<br />
                                                                        New York, NY 10001<br />
                                                                        1-234-987-6543<br />
                                                                        yourmail@mail.com<br />
                                                                    <ALink href="#">Edit <i className="icon-edit"></i></ALink></p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="card card-dashboard">
                                                            <div className="card-body">
                                                                <h3 className="card-title">Shipping Address</h3>

                                                                <p>You have not set up this type of address yet.<br />
                                                                    <ALink href="#">Edit <i className="icon-edit"></i></ALink></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <form action="#">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <label>First Name *</label>
                                                            <input type="text" className="form-control" required />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <label>Last Name *</label>
                                                            <input type="text" className="form-control" required />
                                                        </div>
                                                    </div>

                                                    <label>Display Name *</label>
                                                    <input type="text" className="form-control" required />
                                                    <small className="form-text">This will be how your name will be displayed in the account section and in reviews</small>

                                                    <label>Email address *</label>
                                                    <input type="email" className="form-control" required />

                                                    <label>Current password (leave blank to leave unchanged)</label>
                                                    <input type="password" className="form-control" />

                                                    <label>New password (leave blank to leave unchanged)</label>
                                                    <input type="password" className="form-control" />

                                                    <label>Confirm new password</label>
                                                    <input type="password" className="form-control mb-2" />

                                                    <button type="submit" className="btn btn-outline-primary-2">
                                                        <span>SAVE CHANGES</span>
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>
                                                </form>
                                            </TabPanel>
                                            <TabPanel>
                                                <div></div>
                                            </TabPanel>
                                        </div>
                                    </div>
                                </div>
                            </Tabs>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps ( state ) {
    return {
        wishlist: state.wishlist.data,
        cartlist: state.cartlist.data,
        user: state.user.data
    }
}

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction, ...userAction} )( React.memo( DashBoard ));