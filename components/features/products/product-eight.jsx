import React, { useState, useEffect } from 'react';
import ALink from '~/components/features/alink';

function ProductEight ( props ) {
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
        <div className="product product-sm">
            <figure className="product-media">
                <ALink href={ `/product/default/${product?.id}` }>
                    <img
                        src={ product?.attributes.images?.data ? process.env.NEXT_PUBLIC_ASSET_URI + product?.attributes.images?.data[ 0 ]?.attributes?.url : "" }
                        alt="Product"
                        className="product-image"
                    />
                </ALink>
            </figure>

            <div className="product-body">
                <h5 className="product-title">
                    <ALink href={ `/product/default/${product?.id}` }>{ product?.attributes?.product_name }</ALink>
                </h5>
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
                                    <span className="new-price">${ minPrice?.toFixed( 2 ) }</span>
                                    <span className="old-price">${ maxPrice.toFixed( 2 ) }</span>
                                </div>
                                :
                                <div className="product-price">${ minPrice?.toFixed( 2 ) }&ndash;${ maxPrice.toFixed( 2 ) }</div>
                }
            </div>
        </div>
    )
}
export default React.memo( ProductEight );
