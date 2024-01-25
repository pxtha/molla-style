import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ALink from '~/components/features/alink';
import LoginModal from '~/components/features/modals/login-modal';
import HeaderSearch from '~/components/partials/header/partials/header-search';
import WishlistMenu from '~/components/partials/header/partials/wishlist-menu';
import CartMenu from '~/components/partials/header/partials/cart-menu';
import MainMenu from '~/components/partials/header/partials/main-menu';
import StickyHeader from '~/components/features/sticky-header';

function Header (props) {
    const { user } = props;
    const router = useRouter();
    const path = router.asPath;
    const [ containerClass, setContainerClass ] = useState( 'container' );

    function openMobileMenu () {
        document.querySelector( 'body' ).classList.add( 'mmenu-active' );
    }

    useEffect( () => {
        setContainerClass( router.asPath.includes( 'fullwidth' ) ? 'container-fluid' : 'container' );
    }, [ router.asPath ] );

    return (
        <header className="header header-6">
            <div className="header-top">
                <div className={ containerClass }>
                    <div className="header-left">
                        <ul className="top-menu top-link-menu d-none d-md-block">
                            <li>
                                <ALink href="#">Links</ALink>
                                <ul>
                                    <a href="tel:#"><i className="icon-phone"></i>Call: +0123 456 789</a>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className="header-right">
                        <div className="social-icons social-icons-color">
                            <ALink href="#" className="social-icon social-facebook" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                            <ALink href="#" className="social-icon social-twitter" title="Twitter"><i className="icon-twitter"></i></ALink>
                            <ALink href="#" className="social-icon social-pinterest" title="Instagram"><i className="icon-pinterest-p"></i></ALink>
                            <ALink href="#" className="social-icon social-instagram" title="Pinterest"><i className="icon-instagram"></i></ALink>
                        </div>
                        <ul className="top-menu top-link-menu">
                            <li className="breadcrumb-item active">
                                <ul>
                                    {user?.email 
                                        ? <ALink href="/shop/dashboard">{user.email}</ALink>
                                        : <LoginModal/>
                                    }
                                </ul>
                            </li>
                        </ul>

                        <div className="header-dropdown">
                            <ALink href="#">USD</ALink>
                            <div className="header-menu">
                                <ul>
                                    <li><ALink href="#">Eur</ALink></li>
                                    <li><ALink href="#">Usd</ALink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="header-dropdown">
                            <ALink href="#">Eng</ALink>
                            <div className="header-menu">
                                <ul>
                                    <li><ALink href="#">English</ALink></li>
                                    <li><ALink href="#">French</ALink></li>
                                    <li><ALink href="#">Spanish</ALink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-middle">
                <div className={ containerClass }>
                    <div className="header-left">
                        <HeaderSearch />
                    </div>

                    <div className="header-center">
                        <ALink href="/" className="logo">
                            <img src="images/home/logo.png" alt="Molla Logo" width={ 82 } height={ 20 } />
                        </ALink>
                    </div>

                    <div className="header-right">
                        <WishlistMenu />
                        <CartMenu />
                    </div>
                </div>
            </div>

            <StickyHeader>
                <div className="header-bottom sticky-header">
                    <div className={ containerClass }>
                        <div className="header-left">
                            <MainMenu />

                            <button className="mobile-menu-toggler" onClick={ openMobileMenu }>
                                <span className="sr-only">Toggle mobile menu</span>
                                <i className="icon-bars"></i>
                            </button>
                        </div>

                        <div className="header-center">
                        </div>

                    </div>
                </div>
            </StickyHeader>
        </header>
    )
}

function mapStateToProps ( state ) {
    return {
        user: state.user.data
    }
}

export default connect( mapStateToProps, {} )( Header );