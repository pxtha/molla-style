import { useQuery } from "@apollo/client";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Reveal from 'react-awesome-reveal';

import ALink from '~/components/features/alink';
import OwlCarousel from '~/components/features/owl-carousel';
import TrendyCollection from '~/components/partials/home/trendy-collection';
import DealCollection from '~/components/partials/home/deal-collection';
import NewCollection from '~/components/partials/home/new-collection';
import BlogCollection from '~/components/partials/home/blog-collection';
import NewsletterModal from "~/components/features/modals/newsletter-modal";

import withApollo from '~/server/apollo';
import { GET_HOME_DATA } from '~/server/queries';
import { attrFilter } from '~/utils';

import { homeData, introSlider, brandSlider, fadeInUpShorter, fadeInLeftShorter, fadeInRightShorter, fadeIn } from '~/utils/data';

function Home () {
    const { data, loading, error } = useQuery( GET_HOME_DATA );
    const products = data && data.home.data.attributes.trending?.products?.data;
    const dealProducts = data && [data.home.data.attributes.deal?.deal_of_the_day_1?.data, data.home.data.attributes.deal?.deal_of_the_day_2?.data];
    const newProducts = data && data.home.data.attributes.new_arrival?.products?.data;
    const vendor = data && data.home.data.attributes.vendor?.vendors.data;
    if ( error ) {
        return <div></div>
    }

    return (
        <main className="main home-page skeleton-body">
            <div className="intro-slider-container">
                <OwlCarousel adClass="intro-slider owl-theme owl-nav-inside owl-light" options={ introSlider }>
                    <div className="intro-slide" style={ { backgroundImage: 'url(images/home/sliders/slide-1.jpg' } }>
                        <div className="container intro-content text-center">
                            <Reveal keyframes={ fadeInUpShorter } delay={ 100 } duration={ 1000 }>
                                <>
                                    <h3 className="intro-subtitle text-white">You're Looking Good</h3>
                                    <h1 className="intro-title text-white">New Lookbook</h1>

                                    <ALink href="/shop/sidebar/list" className="btn btn-outline-white-4">
                                        <span>Discover More</span>
                                    </ALink>
                                </>
                            </Reveal>
                        </div>
                    </div>

                    <div className="intro-slide" style={ { backgroundImage: 'url(images/home/sliders/slide-2.jpg' } }>
                        <div className="container intro-content text-center">
                            <Reveal keyframes={ fadeInUpShorter } delay={ 100 } duration={ 1000 }>
                                <>
                                    <h3 className="intro-subtitle text-white">Don’t Miss</h3>
                                    <h1 className="intro-title text-white">Mysrety Deals</h1>

                                    <ALink href="/shop/sidebar/list" className="btn btn-outline-white-4">
                                        <span>Discover More</span>
                                    </ALink>
                                </>
                            </Reveal>
                        </div>
                    </div>
                </OwlCarousel>
            </div>

            <div className="pt-2 pb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <Reveal keyframes={ fadeInLeftShorter } delay={ 100 } duration={ 1000 } triggerOnce>
                                <div className="banner banner-overlay">
                                    <ALink href="/shop/sidebar/3cols" className="lazy-media">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="banner"
                                            src="images/home/banners/banner-1.jpg"
                                            threshold={ 500 }
                                            width="376"
                                            height="auto"
                                            effect="blur"
                                        />
                                    </ALink>

                                    <div className="banner-content banner-content-center">
                                        <h4 className="banner-subtitle text-white"><ALink href="/shop/sidebar/3cols">New in</ALink></h4>
                                        <h3 className="banner-title text-white"><ALink href="/shop/sidebar/3cols"><strong>Women’s</strong></ALink></h3>
                                        <ALink href="/shop/sidebar/3cols?category=women" className="btn btn-outline-white banner-link underline">Shop Now</ALink>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-sm-6">
                            <Reveal keyframes={ fadeInRightShorter } delay={ 100 } duration={ 1000 } triggerOnce>
                                <div className="banner banner-overlay">
                                    <ALink href="/shop/sidebar/3cols" className="lazy-media">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="banner"
                                            src="images/home/banners/banner-2.jpg"
                                            threshold={ 500 }
                                            width="376"
                                            height="auto"
                                            effect="blur"
                                        />
                                    </ALink>

                                    <div className="banner-content banner-content-center">
                                        <h4 className="banner-subtitle text-white"><ALink href="/shop/sidebar/3cols">New in</ALink></h4>
                                        <h3 className="banner-title text-white"><ALink href="/shop/sidebar/3cols"><strong>Men’s</strong></ALink></h3>
                                        <ALink href="/shop/sidebar/3cols?category=men" className="btn btn-outline-white banner-link underline">Shop Now</ALink>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                    <hr className="mt-0 mb-0" />
                </div>
            </div>

            <div className="mb-5"></div>
            <Reveal keyframes={ fadeIn } delay={ 100 } duration={ 1000 } triggerOnce>
                <TrendyCollection products={ products } loading={ loading } />
            </Reveal>

            <div className="mb-5"></div>
            <Reveal keyframes={ fadeIn } delay={ 100 } duration={ 1000 } triggerOnce>
                <DealCollection products={ dealProducts } loading={ loading } />
            </Reveal>

            <div className="pt-5 pb-3" style={ { backgroundColor: '#222' } }>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-sm-6">
                            <Reveal keyframes={ fadeInRightShorter } delay={ 100 } duration={ 1000 } triggerOnce>
                                <div className="icon-box text-center">
                                    <span className="icon-box-icon">
                                        <i className="icon-truck"></i>
                                    </span>
                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">Payment & Delivery</h3>
                                        <p>Free shipping for orders over $50</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <Reveal keyframes={ fadeInRightShorter } delay={ 100 } duration={ 1000 } triggerOnce>
                                <div className="icon-box text-center">
                                    <span className="icon-box-icon">
                                        <i className="icon-rotate-left"></i>
                                    </span>
                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">Return & Refund</h3>
                                        <p>Free 100% money back guarantee</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <Reveal keyframes={ fadeInLeftShorter } delay={ 100 } duration={ 1000 } triggerOnce>
                                <div className="icon-box text-center">
                                    <span className="icon-box-icon">
                                        <i className="icon-unlock"></i>
                                    </span>
                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">Secure Payment</h3>
                                        <p>100% secure payment</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <Reveal keyframes={ fadeInLeftShorter } delay={ 100 } duration={ 1000 } triggerOnce>
                                <div className="icon-box text-center">
                                    <span className="icon-box-icon">
                                        <i className="icon-headphones"></i>
                                    </span>
                                    <div className="icon-box-content">
                                        <h3 className="icon-box-title">Quality Support</h3>
                                        <p>Alway online feedback 24/7</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6"></div>
            <Reveal keyframes={ fadeIn } delay={ 100 } duration={ 1000 } triggerOnce>
                <NewCollection products={ newProducts } loading={ loading } />
            </Reveal>

            <div className="pb-3">
                <Reveal keyframes={ fadeIn } delay={ 100 } duration={ 1000 } triggerOnce>
                    <div className="container brands pt-5 pt-lg-7">
                        <h2 className="title text-center mb-4">shop by brands</h2>
                        <Reveal keyframes={ fadeIn } delay={ 100 } duration={ 500 } triggerOnce>
                            <OwlCarousel adClass="brands-border owl-simple brand-carousel mt-3 mb-3 cols-xl-7 cols-lg-5 cols-md-4 cols-sm-3 cols-2" options={ brandSlider }>
                                {
                                    vendor?.map( ( brand, index ) => (
                                        <ALink href="#" className="brand mr-0" key={ index } >
                                            <img width={ 100 } height={ 30 } src={ process.env.NEXT_PUBLIC_ASSET_URI + brand.attributes.logo.data.attributes.url } alt="brand"  />
                                        </ALink>
                                    ) )
                                }
                            </OwlCarousel>
                        </Reveal>
                    </div>
                </Reveal>

                <div className="mb-5 mb-lg-7"></div>

                <div className="container newsletter">
                    <div className="row">
                        <div className="col-lg-6 banner-overlay-div">
                            <Reveal keyframes={ fadeInLeftShorter } delay={ 100 } duration={ 1000 } triggerOnce>
                                <div className="banner banner-overlay">
                                    <ALink href="/shop/sidebar/3cols" className="lazy-media">
                                        <div className="lazy-overlay"></div>

                                        <LazyLoadImage
                                            alt="banner"
                                            src="images/home/banners/banner-3.jpg"
                                            threshold={ 200 }
                                            width="376"
                                            height="auto"
                                            effect="blur"
                                        />
                                    </ALink>

                                    <div className="banner-content banner-content-center">
                                        <h4 className="banner-subtitle text-white"><ALink href="/shop/sidebar/3cols">Limited time only.</ALink></h4>
                                        <h3 className="banner-title text-white"><ALink href="/shop/sidebar/3cols">End of Season<br />save 50% off</ALink></h3>
                                        <ALink href="/shop/sidebar/3cols" className="btn btn-outline-white banner-link underline">Shop Now</ALink>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="col-lg-6 d-flex align-items-stretch subscribe-div">
                            <div className="cta cta-box">
                                <div className="cta-content">
                                    <Reveal keyframes={ fadeInRightShorter } delay={ 100 } duration={ 1000 } triggerOnce>
                                        <>
                                            <h3 className="cta-title">Subscribe To Our Newsletter</h3>
                                            <p>Sign up now for <span className="primary-color">10% discount</span> on first order. Customise my news:</p>

                                            <form action="#">
                                                <input type="email" className="form-control" placeholder="Enter your Email Address" aria-label="Email Adress" required />
                                                <div className="text-center">
                                                    <button className="btn btn-outline-dark-2" type="submit"><span>subscribe</span></button>
                                                </div>
                                            </form>
                                        </>
                                    </Reveal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="mb-2"></div>*/}
            {/*<Reveal keyframes={ fadeIn } delay={ 100 } duration={ 1000 } triggerOnce>*/}
            {/*    <BlogCollection posts={ posts } loading={ loading } />*/}
            {/*</Reveal>*/}

            <NewsletterModal />
        </main>
    )
}

export default withApollo( { ssr: typeof window == 'undefined' } )( Home );