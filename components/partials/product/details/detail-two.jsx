import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/alink';
import Qty from '~/components/features/qty';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';

import { canAddToCart, isInWishlist } from '~/utils';

function DetailTwo ( props ) {
    const router = useRouter();
    const { product } = props;
    const [ qty, setQty ] = useState( 1 );
    const [ colorArray, setColorArray ] = useState( [] );
    const [ sizeArray, setSizeArray ] = useState( [] );
    const [ variationGroup, setVariationGroup ] = useState( [] );
    const [ selectedVariant, setSelectedVariant ] = useState( { id: null, size_id: null, color: null, colorName: null, price: null, size: "" } );
    const [ showClear, setShowClear ] = useState( false );
    const [ showVariationPrice, setShowVariationPrice ] = useState( false );
    const [ maxPrice, setMaxPrice ] = useState( 0 );
    const [ minPrice, setMinPrice ] = useState( 99999 );

    useEffect( () => {
        let min = 99999;
        let max = 0;

        setVariationGroup( product?.attributes.product_variants.data.reduce( ( acc, cur ) => {
            cur.attributes.sizes.data.map( item => {
                acc.push( {
                    id: cur.id,
                    color: cur.attributes.color,
                    colorName: cur.attributes.color_name,
                    size: item.attributes.name,
                    price: cur.attributes.price
                } );
            } );
            if ( min > cur.attributes.price ) min = cur.attributes.price;
            if ( max < cur.attributes.price ) max = cur.attributes.price;
            return acc;
        }, [] ) );

        if ( product?.attributes.product_variants.data.length == 0 ) {
            min = product?.attributes.sale_price
                ? product?.attributes.sale_price
                : product?.attributes?.price;
            max = product?.attributes?.price;
        }

        setMinPrice( min );
        setMaxPrice( max );
    }, [ product ] )

    useEffect( () => {
        setSelectedVariant( { id: null, size_id: null, color: null, colorName: null, price: null, size: "" } );
        setQty( 1 );
    }, [ router.query.slug ] )

    useEffect( () => {
        refreshSelectableGroup();
    }, [ variationGroup, selectedVariant ] )

    useEffect( () => {
        setShowClear( ( selectedVariant.color || selectedVariant.size != "" ) ? true : false );
        setShowVariationPrice( ( selectedVariant.color && selectedVariant.size != "" ) ? true : false );
        let toggle = document.querySelector( '.product-details-top .variation-toggle' );

        if ( toggle ) {
            if ( ( selectedVariant.color && selectedVariant.size != "" ) && toggle.classList.contains( 'collapsed' ) ) {
                toggle.click();
            }

            if ( ( !( selectedVariant.color && selectedVariant.size != "" ) ) && !toggle.classList.contains( 'collapsed' ) ) {
                toggle.click();
            }
        }
    }, [ selectedVariant ] )

    function onWishlistClick ( e ) {
        e.preventDefault();
        if ( !isInWishlist( props.wishlist, product ) ) {
            props.addToWishlist( product );
        } else {
            router.push( '/pages/wishlist' );
        }
    }

    function refreshSelectableGroup () {
        let tempArray = [ ...variationGroup ];
        if ( selectedVariant.color ) {
            tempArray = variationGroup.reduce( ( acc, cur ) => {
                if ( selectedVariant.color !== cur.color ) {
                    return acc;
                }
                return [ ...acc, cur ];
            }, [] );
        }

        setSizeArray( tempArray.reduce( ( acc, cur ) => {
            if ( acc.findIndex( item => item.size == cur.size ) !== -1 )
                return acc;
            return [ ...acc, cur ];
        }, [] ) );

        tempArray = [ ...variationGroup ];
        if ( selectedVariant.size ) {
            tempArray = variationGroup.reduce( ( acc, cur ) => {
                if ( selectedVariant.size !== cur.size ) {
                    return acc;
                }
                return [ ...acc, cur ];
            }, [] );
        }

        setColorArray( product?.attributes.product_variants.data.reduce( ( acc, cur ) => {
            if (
                tempArray.findIndex( item => item.color == cur.attributes.color ) == -1
            ) {
                return [
                    ...acc,
                    {
                        id: cur.id,
                        color: cur.attributes.color,
                        colorName: cur.attributes.color_name,
                        price: cur.attributes.price,
                        disabled: true
                    }
                ];
            }
            return [
                ...acc,
                {
                    id: cur.id,
                    color: cur.attributes.color,
                    colorName: cur.attributes.color_name,
                    price: cur.attributes.price,
                    disabled: false
                }
            ];
        }, [] ) );
    }

    function selectColor ( e, item ) {
        e.preventDefault()
        if ( item.color == selectedVariant.color ) {
            setSelectedVariant( {
                ...selectedVariant,
                color: null,
                colorName: null,
                price: item.price,
                id: item.id
            } );
        } else {
            setSelectedVariant( {
                ...selectedVariant,
                color: item.color,
                colorName: item.colorName,
                price: item.price,
                id: item.id
            } );
        }
    }

    function selectSize ( e ) {
        if ( e.target.value == "" ) {
            setSelectedVariant( { ...selectedVariant, size: "" } );
        } else {
            setSelectedVariant( { ...selectedVariant, size: e.target.value } );
        }
    }

    function onChangeQty ( current ) {
        setQty( current );
    }

    function clearSelection ( e ) {
        e.preventDefault();
        setSelectedVariant( ( {
            ...selectedVariant,
            color: null,
            colorName: null,
            size: ""
        } ) );
        refreshSelectableGroup();
    }

    function onCartClick ( e ) {
        e.preventDefault();
        if ( e.currentTarget.classList.contains( 'btn-disabled' ) ) return;

        let newProduct = { ...product };
        if ( product?.attributes.product_variants.data.length > 0 ) {
            newProduct = {
                ...product,
                size_id: selectedVariant.size_id,
                product_variant_id: selectedVariant.id,
                name:
                    product?.attributes.product_name +
                    ' - ' +
                    selectedVariant.colorName +
                    ', ' +
                    selectedVariant.size,
                price: selectedVariant.price
            };
        }
        props.addToCart(
            newProduct, qty
        );
    }

    if ( !product ) {
        return <div></div>;
    }

    return (
        <div className="product-details product-details-centered">
            <h1 className="product-title">{ product?.attributes.product_name }</h1>

            <div className="ratings-container">
                <div className="ratings">
                    <div className="ratings-val" style={ { width: product?.attributes.rating * 20 + '%' } }></div>
                    <span className="tooltip-text">{ product?.attributes.rating?.toFixed( 2 ) }</span>
                </div>
                <span className="ratings-text">( { product?.attributes?.reviews?.length } Reviews )</span>
            </div>

            {
                product?.attributes.stock == 0 ?
                    <div className="product-price">
                        <span className="out-price">
                            {
                                minPrice == maxPrice ?
                                    <span>${ product?.attributes?.price.toFixed( 2 ) }</span>
                                    :
                                    <span>${ minPrice?.toFixed( 2 ) }&ndash;${ maxPrice.toFixed( 2 ) }</span>
                            }
                        </span>
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

            <div className="product-content">
                <p>{ product?.attributes.description }</p>
            </div>

            {
                product?.attributes.product_variants.data.length > 0 ?
                    <>
                        <div className="details-filter-row details-row-size">
                            <label>Color:</label>

                            <div className="product-nav product-nav-dots">
                                {
                                    colorArray.map( ( item, index ) => (
                                        <a
                                            href="#"
                                            className={ `${( item.color == selectedVariant.color ? 'active ' : '' ) + ( item.disabled ? 'disabled' : '' )}` }
                                            style={ { backgroundColor: item.color } }
                                            key={ index }
                                            onClick={ e => selectColor( e, item ) }
                                        ></a>
                                    ) )
                                }
                            </div>
                        </div>

                        <div className="details-filter-row details-row-size">
                            <label htmlFor="size">Size:</label>
                            <div className="select-custom">
                                <select
                                    name="size"
                                    className="form-control"
                                    value={ selectedVariant.size }
                                    onChange={ selectSize }
                                >
                                    <option value="">Select a size</option>
                                    {
                                        sizeArray.map( ( item, index ) => (
                                            <option
                                                value={ item.size }
                                                key={ index }
                                            >{ item.size }</option>
                                        ) )
                                    }
                                </select>
                            </div>

                            <ALink href="#" className="size-guide mr-4">
                                <i className="icon-th-list"></i>size guide
                            </ALink>
                            {
                                showClear ?
                                    <a href="#" onClick={ clearSelection }>clear</a>
                                    : ""
                            }
                        </div >
                        <SlideToggle collapsed={ true }>
                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <div>
                                    <button className={ `d-none variation-toggle ${toggleState.toLowerCase()}` } onClick={ onToggle }></button>
                                    <div ref={ setCollapsibleElement } style={ { overflow: 'hidden' } }>
                                        <div className="product-price">
                                            ${ selectedVariant.price ? selectedVariant.price.toFixed( 2 ) : 0 }
                                        </div>
                                    </div>
                                </div>
                            ) }
                        </SlideToggle>
                    </>
                    : ""
            }

            <div className="product-details-action">
                <div className="details-action-col">
                    <Qty changeQty={ onChangeQty } max={ product?.attributes.stock } adClass="mr-3 mr-sm-4"></Qty>
                    <a
                        href="#"
                        className={ `btn-product btn-cart ${( !canAddToCart( props.cartlist, product, qty ) || ( product?.attributes.product_variants.data.length > 0 && !showVariationPrice ) ) ? 'btn-disabled' : ''}` }
                        onClick={ onCartClick }
                    >
                        <span>add to cart</span>
                    </a>
                </div>
                <div className="details-action-wrapper">
                    {
                        isInWishlist( props.wishlist, product ) ?
                            <ALink href="/shop/wishlist" className="btn-product btn-wishlist added-to-wishlist"><span>Go to Wishlist</span></ALink>
                            :
                            <a href="#" className="btn-product btn-wishlist" onClick={ onWishlistClick }><span>Add to Wishlist</span></a>

                    }
                </div>
            </div >

            <div className="product-details-footer">
                <div className="product-cat">
                    <span>Category:</span>
                    {
                        product?.attributes?.categories?.data.map( ( cat, index ) => (
                            <span key={ index }>
                                <ALink
                                    href={ { pathname: '/shop/sidebar/list', query: { category: cat.slug } } }
                                >{ cat.attributes.name }</ALink>
                                { index < product?.attributes?.categories?.data.length - 1 ? ',' : '' }
                            </span>
                        ) )
                    }
                </div >

                <div className="social-icons social-icons-sm">
                    <span className="social-label">Share:</span>
                    <ALink href="#" className="social-icon" title="Facebook">
                        <i className="icon-facebook-f"></i>
                    </ALink>
                    <ALink href="#" className="social-icon" title="Twitter">
                        <i className="icon-twitter"></i>
                    </ALink>
                    <ALink href="#" className="social-icon" title="Instagram">
                        <i className="icon-instagram"></i>
                    </ALink>
                    <ALink href="#" className="social-icon" title="Pinterest">
                        <i className="icon-pinterest"></i>
                    </ALink>
                </div>
            </div >
        </div >
    )
}

const mapStateToProps = ( state ) => {
    return {
        cartlist: state.cartlist.data,
        wishlist: state.wishlist.data,
    }
}

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction } )( DetailTwo );
