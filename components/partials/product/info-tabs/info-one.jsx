import React, { useState,useRef} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useMutation } from '@apollo/client';

import ALink from '~/components/features/alink';
import {CREATE_REVIEW} from "~/server/queries";

function InfoOne ( props ) {
    const { product } = props;
    const [rating, setRating] = useState(0);
    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_REVIEW);
    const formRef = useRef(); // create a ref for the form

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - Date.parse(date)) / 1000);
        
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
          return interval + ' years ago';
        }
      
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + ' months ago';
        }
      
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + ' days ago';
        }
      
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + ' hours ago';
        }
      
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + ' minutes ago';
        }
      
        if(seconds < 10) return 'just now';
      
        return Math.floor(seconds) + ' seconds ago';
    };

    const onSetRating = ( e ) => {
        e.preventDefault();
        if ( e.currentTarget.parentNode.querySelector( '.active' ) ) {
            e.currentTarget.parentNode.querySelector( '.active' ).classList.remove( 'active' );
        }

        e.currentTarget.classList.add( 'active' );
        setRating(()=> +e.currentTarget.innerHTML)
    }

    if ( !product ) {
        return <div></div>
    }

    const onCommented = (e)=>{
        e.preventDefault();
        const name = e.target['reply-name'].value
        const email = e.target['reply-email'].value
        const comment = e.target['reply-message'].value
        try {
            mutateFunction({
                variables: {
                    name: name,
                    comment: comment,
                    email: email,
                    rating: rating,
                    product: product.id   
                }
           })
           formRef.current.reset(); 
        } catch (err) {
            console.log(err)
        }
        
    }

    return (
        <Tabs selectedTabClassName="show" selectedTabPanelClassName="active show">
            <div className="product-details-tab">
                <TabList className="nav nav-pills justify-content-center">
                    <Tab className="nav-item">
                        <span className="nav-link"> Description</span>
                    </Tab>

                    <Tab className="nav-item">
                        <span className="nav-link"> Additional information</span>
                    </Tab>

                    <Tab className="nav-item">
                        <span className="nav-link">Shipping & Returns</span>
                    </Tab>

                    <Tab className="nav-item">
                        <span className="nav-link" >Reviews ({ product?.attributes?.reviews?.data?.length })</span>
                    </Tab>
                </TabList>

                <div className="tab-content">
                    <TabPanel className="tab-pane">
                        <div className="product-desc-content">
                            <h3>Product Information</h3>
                            <p>{product?.attributes.description}</p>
                        </div>
                    </TabPanel>

                    <TabPanel className="tab-pane">
                        <div className="product-desc-content">
                            <h3>Information</h3>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. </p>

                            <h3 className="pt-2">Fabric & care</h3>
                            <ul>
                                <li>Faux suede fabric</li>
                                <li>Gold tone metal hoop handles.</li>
                                <li>RI branding</li>
                                <li>Snake print trim interior </li>
                                <li>Adjustable cross body strap</li>
                                <li> Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop: 61cm</li>
                            </ul>

                            <h3>Size</h3>
                            <p>one size</p>
                        </div>
                    </TabPanel>

                    <TabPanel className="tab-pane">
                        <div className="product-desc-content">
                            <h3>Delivery & returns</h3>
                            <p>We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our <ALink href="#">Delivery information</ALink><br />
                                We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our <ALink href="#">Returns information</ALink></p>
                        </div>
                    </TabPanel>

                    <TabPanel className="tab-pane">
                        <div className="reviews">
                            <h3>Reviews ({product?.attributes?.reviews?.data?.length || 0})</h3>
                            {
                                product && product?.attributes?.reviews?.data?.length > 0 ?
                                        product?.attributes?.reviews?.data.map((item) =>

                                        <div className="review">
                                            <div className="row no-gutters">
                                                <div className="col-auto">
                                                    <h4><ALink href="#">{item.attributes?.name}</ALink></h4>
                                                    <div className="ratings-container">
                                                        <div className="ratings">
                                                            <div className="ratings-val"
                                                                 style={{width: item.attributes?.rating * 20 + '%'}}></div>
                                                            <span
                                                                className="tooltip-text">{item.attributes?.rating?.toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                    <span className="review-date mb-1">{timeAgo(item.attributes?.createdAt)}</span>
                                                </div>
                                                <div className="col">
                                                    <div className="review-content">
                                                        <p>{item.attributes?.comment}</p>
                                                    </div>
                                                    <div className="review-action">
                                                        <ALink href="#"><i className="icon-thumbs-up"></i>Helpful
                                                            (2)</ALink>
                                                        <ALink href="#"><i className="icon-thumbs-down"></i>Unhelpful
                                                            (0)</ALink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        ) : <></>
                            }

                        </div>

                        <div className="reply">
                            <div className="title-wrapper text-left">
                                <h3 className="title title-simple text-left text-normal">Add a Review
													</h3>
                                <p>Your email address will not be published. Required fields are
														marked *</p>
                            </div>
                            <form action="#" onSubmit={onCommented} ref={formRef}>

                                <div className="rating-form">
                                    <label htmlFor="rating" className="text-dark">Your rating * </label>
                                    <span className="rating-stars selected">
                                        { [ 1, 2, 3, 4, 5 ].map( ( num, index ) =>
                                            <a className={ `star-${num}` }  onClick={ onSetRating } key={ 'star-' + index }>{ num }</a>
                                        ) }
                                    </span>
                                    <select name="rating" id="rating" required=""
                                        style={ { display: 'none' } }>
                                        <option value="">Rate…</option>
                                        <option value="5">Perfect</option>
                                        <option value="4">Good</option>
                                        <option value="3">Average</option>
                                        <option value="2">Not that bad</option>
                                        <option value="1">Very poor</option>
                                    </select>
                                </div>

                                <textarea id="reply-message" cols="30" rows="6"
                                    className="form-control mb-2" placeholder="Comment *"
                                    required>
                                </textarea>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" id="reply-name"
                                            name="reply-name" placeholder="Name *" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" className="form-control" id="reply-email"
                                            name="reply-email" placeholder="Email *" required />
                                    </div>
                                </div>
                                <div className="form-checkbox d-flex align-items-start mb-2">
                                    <input type="checkbox" className="custom-checkbox"
                                        id="signin-remember" name="signin-remember" />
                                    <label className="form-control-label ml-3" htmlFor="signin-remember">
                                        Save my name, email, and website in this browser for the
                                        next time I comment.
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </TabPanel>
                </div>
            </div>
        </Tabs>
    );
}

export default React.memo( InfoOne );