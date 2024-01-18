import { Magnifier } from 'react-image-magnifiers';
import React, { useState, useEffect } from 'react';
import LightBox from 'react-image-lightbox';

function GallerySticky( props ) {
    const { product } = props;
    const [ isOpen, setIsOpen ] = useState( false );
    const [ photoIndex, setPhotoIndex ] = useState( 0 );

    useEffect( () => {
        if ( product ) {
            setIsOpen( false );
            setPhotoIndex( 0 );
        }
    }, [ product ] )

    function moveNextPhoto() {
        setPhotoIndex( ( photoIndex + 1 ) % product.attributes.images.data.length );
    }

    function movePrevPhoto() {
        setPhotoIndex( ( photoIndex + product.attributes.images.data.length - 1 ) % product.attributes.images.data.length );
    }

    function openLightBox( e, index ) {
        setIsOpen( true );
        setPhotoIndex( index );
    }

    function closeLightBox() {
        setIsOpen( false );
    }

    if ( !product ) {
        return <div></div>
    }

    return (
        <>
            <div className="product-gallery product-gallery-separated">
                {
                    product.attributes.is_new ?
                        <span className="product-label label-new">New</span>
                        : ""
                }

                {
                    product.attributes.sale_price ?
                        <span className="product-label label-sale">Sale</span>
                        : ""
                }

                {
                    product.attributes.top ?
                        <span className="product-label label-top">Top</span>
                        : ""
                }

                {
                    product.attributes.stock == 0 ?
                        <span className="product-label label-out">Out of Stock</span>
                        : ""
                }
                {
                    product.attributes.images.data.map( ( item, index ) => (
                        <figure className="product-main-image" key={ index } style={ { backgroundColor: '#f4f4f4' } }>
                            <Magnifier
                                imageSrc={ process.env.NEXT_PUBLIC_ASSET_URI + item.attributes.url }
                                imageAlt="product"
                                largeImageSrc={ process.env.NEXT_PUBLIC_ASSET_URI + item.attributes.url } // Optional
                                dragToMove={ false }
                                mouseActivation="hover"
                                className="zoom-image position-relative overflow-hidden"
                                cursorStyleActive="crosshair"
                                width={ product.attributes.images.data[ index ].width }
                                height={ product.attributes.images.data[ index ].height }
                                style={ { paddingTop: `${ product.attributes.images.data[ index ].height / product.attributes.images.data[ index ].width * 100 }%` } }
                            />

                            <button id="btn-product-gallery" className="btn-product-gallery" onClick={ e => openLightBox( e, index ) }>
                                <i className="icon-arrows"></i>
                            </button>
                        </figure>
                    ) )
                }
            </div>

            {
                isOpen ?
                    <LightBox
                        mainSrc={ process.env.NEXT_PUBLIC_ASSET_URI + product.attributes.images.data[ photoIndex ].attributes.url }
                        nextSrc={ process.env.NEXT_PUBLIC_ASSET_URI + product.attributes.images.data[ ( photoIndex + 1 ) % product.attributes.images.data.length ].attributes.url }
                        prevSrc={ process.env.NEXT_PUBLIC_ASSET_URI + product.attributes.images.data[ ( photoIndex + product.attributes.images.data.length - 1 ) % product.attributes.images.data.length ].attributes.url }
                        onCloseRequest={ closeLightBox }
                        onMovePrevRequest={ moveNextPhoto }
                        onMoveNextRequest={ movePrevPhoto }
                        reactModalStyle={ {
                            overlay: {
                                zIndex: 1041
                            },
                        }
                        }
                        wrapperClassName="lightbox-modal"
                    />
                    : ''
            }
        </>
    )
}

export default React.memo( GallerySticky );