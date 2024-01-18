import React from 'react';
import { useRouter } from 'next/router';
import ALink from '~/components/features/alink';

function Breadcrumb ( props ) {
    const router = useRouter();
    const { prev, next, current, fullWidth = false } = props;

    return (
        <nav className="breadcrumb-nav border-0 mb-0">
            <div className={ 'd-flex align-items-center ' + ( fullWidth ? 'container-fluid' : 'container' ) }>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <ALink href="/">Home</ALink>
                    </li>
                    <li className="breadcrumb-item">
                        <ALink href="/product/default/dark-yellow-lace-cut-out-swing-dress">Product</ALink>
                    </li>
                    <li className="breadcrumb-item active">{ current }</li>
                </ol>

                <nav className="product-pager ml-auto">
                    {
                        prev ?
                            <ALink
                                href={ {pathname: router.pathname, query: {slug: prev.id}} }
                                className={ `product-pager-link product-pager-prev ${!next ? 'prev-only' : ''}` }
                            >
                                <i className="icon-angle-left"></i>
                                <span>Prev</span>
                                <div className="product-detail">
                                    <figure>
                                        <img
                                            src={ prev.attributes.images.data.length > 0 ? process.env.NEXT_PUBLIC_ASSET_URI + prev.attributes.images.data[ 0 ].attributes.url : "" }
                                            alt="product"
                                            width={ 300 }
                                            height={ 300 }
                                        />
                                    </figure>
                                    <h3 className="product-name mb-0">{ prev.attributes.product_name }</h3>
                                </div>
                            </ALink>
                            : ""
                    }

                    {
                        next ?
                            <ALink
                                href={ {pathname: router.pathname, query: {slug: next.id}} }
                                className="product-pager-link product-pager-next"
                            >
                                <span>Next</span>
                                <i className="icon-angle-right"></i>
                                <div className="product-detail">
                                    <figure>
                                        <img
                                            src={ next.attributes.images.data.length > 0 ? process.env.NEXT_PUBLIC_ASSET_URI + next.attributes.images.data[ 0 ].attributes.url : "" }
                                            alt="product"
                                            width={ 300 }
                                            height={ 300 }
                                        />
                                    </figure>
                                    <h3 className="product-name mb-0">{ next.attributes.product_name }</h3>
                                </div>
                            </ALink>
                            : ""
                    }

                </nav >
            </div >
        </nav >
    )
}

export default React.memo( Breadcrumb );