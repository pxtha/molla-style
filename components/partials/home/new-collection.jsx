import ALink from '~/components/features/alink';
import ProductTwelve from '~/components/features/products/product-twelve';

function NewCollection ( props ) {
    const { products = [], loading } = props;

    return (
        <div className="container">
            <h2 className="title text-center mb-4">New Arrivals</h2>

            <div className="products">
                <div className="row justify-content-center">
                    {
                        loading ?
                            [ 1, 2, 3, 4, 5, 6, 7, 8 ].map( item =>
                                <div className="col-6 col-md-4 col-lg-3" key={ item }>
                                    <div className="skel-pro"></div>
                                </div>
                            )
                            :
                            products?.map( ( product, index ) =>
                                <div className="col-6 col-md-4 col-lg-3" key={ index }>
                                    <ProductTwelve product={ product } />
                                </div>
                            )
                    }
                </div>
            </div>
            <div className="more-container text-center mt-2">
                <ALink href="/shop/sidebar/list" className="btn btn-more"><span>show more</span></ALink>
            </div>
        </div>
    )
}

export default NewCollection;