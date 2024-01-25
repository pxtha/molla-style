import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { actions as compareAction } from '~/store/compare';
import { actions as demoAction } from '~/store/demo';

function ProductThirteen ( props ) {
    const { product } = props;
    const [ maxPrice, setMaxPrice ] = useState( 0 );
    const [ minPrice, setMinPrice ] = useState( 99999 );

    useEffect( () => {
        let min = minPrice;
        let max = maxPrice;
        product?.attributes.product_variants.data.map( item => {
            if ( min > item.attributes?.price ) min = item.attributes?.price;
            if ( max < item.attributes?.price ) max = item.attributes?.price;
        }, [] );

        if ( product?.attributes.product_variants.data.length == 0 ) {
            min = product?.attributes?.sale_price
                ? product?.attributes?.sale_price
                : product?.attributes?.price;
            max = product?.attributes?.price;
        }

        setMinPrice( min );
        setMaxPrice( max );
    }, [] )

    return (
        <div className="deal-product text-center">
            <figure className="product-media">
                <ALink href={ `/product/default/${product?.id}` }>
                    <LazyLoadImage
                        alt="product"
                        src={ product?.attributes.images?.data ? process.env.NEXT_PUBLIC_ASSET_URI + product?.attributes.images?.data[ 0 ]?.attributes?.url : "" }
                        threshold={ 500 }
                        effect="black and white"
                        wrapperClassName="product-image"
                    />
                    {
                        product?.attributes.images?.data.length >= 2 ?
                            <LazyLoadImage
                                alt="product"
                                src={ process.env.NEXT_PUBLIC_ASSET_URI + product?.attributes.images?.data[ 1 ].attributes.url }
                                threshold={ 500 }
                                effect="black and white"
                                wrapperClassName="product-image-hover"
                            />
                            : ""
                    }
                </ALink>
            </figure>

            <div className="product-body pt-2">
                <h3 className="product-title">
                    <ALink href={ `/product/default/${product?.id}` }>{ product?.attributes?.product_name }</ALink>
                </h3>

                {
                    !product?.attributes?.stock || product?.attributes?.stock == 0 ?
                        <div className="product-price">
                            <span className="out-price">${ product?.attributes?.price?.toFixed( 2 ) }</span>
                        </div>
                        :
                        minPrice == maxPrice ?
                            <div className="product-price">${ minPrice?.toFixed( 2 ) }</div>
                            :
                            product?.attributes.product_variants.data.length == 0 ?
                                <div className="product-price">
                                    <span className="new-price">Now ${ minPrice?.toFixed( 2 ) }</span>
                                    <span className="old-price">Was ${ maxPrice.toFixed( 2 ) }</span>
                                </div>
                                :
                                <div className="product-price">${ minPrice?.toFixed( 2 ) }&ndash;${ maxPrice.toFixed( 2 ) }</div>
                }
            </div>
            <ALink href="/shop/sidebar/list" className="action">Shop Now</ALink>
        </div>
    )
}

const mapStateToProps = ( state ) => {
    return {
        wishlist: state.wishlist.data,
        comparelist: state.comparelist.data
    }
}

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction, ...compareAction, ...demoAction } )( ProductThirteen );