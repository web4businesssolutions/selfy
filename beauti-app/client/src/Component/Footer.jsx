import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer-section bg-amber-800">
            <div className="container relative">

                <div className="sofa-img">
                    <img src="images/logo/makeup10.png" alt="Image" className="img-fluid" />
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        <div className="subscription-form">
                            <h3 className="d-flex align-items-center"><span className="me-1"><img src="images/envelope-outline.svg" alt="Image" className="img-fluid" /></span><span>Subscribe to Newsletter</span></h3>

                            <form action="#" className="row g-3">
                                <div className="col-auto">
                                    <input type="text" className="form-control" placeholder="Enter your name" />
                                </div>
                                <div className="col-auto">
                                    <input type="email" className="form-control" placeholder="Enter your email" />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary">
                                        <span className="fa fa-paper-plane"></span>

                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="row g-5 mb-5">
                    <div className="col-lg-4">
                        <div className="mb-4 footer-logo-wrap"> <a href="#" className="flex items-center">
                            <img src="/images/logo/logo2.png" alt="Logo" className="h-12" />
                        </a></div>
                        <p className="mb-4 text-black">At SelfySnap, we believe beauty is more than skin deep — it’s a celebration of confidence, care, and self-expression. Founded with a passion for clean, effective, and inclusive beauty, SelfySnap blends science and nature to create skincare and cosmetic products that work for every skin type and tone.</p>

                        <ul className="list-unstyled custom-social">
                            <li><Link to={'https://facebook.com'}><span className="fa fa-brands fa-facebook-f"></span></Link></li>
                            <li><a href="#"><span className="fa fa-brands fa-twitter"></span></a></li>
                            <li><a href="#"><span className="fa fa-brands fa-instagram"></span></a></li>
                            <li><a href="#"><span className="fa fa-brands fa-linkedin"></span></a></li>
                        </ul>
                    </div>

                    <div className="col-lg-8">
                        <div className="row links-wrap">
                            <div className="col-6 col-sm-6 col-md-3">
                                <ul className="list-unstyled">
                                    <li><Link to={'/About'}>About us</Link></li>
                                    <li><Link to={'/product'}>Products</Link></li>
                                    <li><Link to={'/Blog'}>Blog</Link></li>
                                    <li><Link to={'/contact'}>Contact us</Link></li>

                                </ul>
                            </div>

                            <div className="col-6 col-sm-6 col-md-3">
                                <ul className="list-unstyled">
                                    <li><a href="#">24/7 Support</a></li>
                                    <li><a href="#">Our Products</a></li>
                                    <li><a href="#">Live chat</a></li>
                                    <li><a href="#">Mobile No: +91 9992088843 </a></li>
                                </ul>
                            </div>

                            <div className="col-6 col-sm-6 col-md-3">
                                <ul className="list-unstyled">
                                    <li><a href="#">Terms & Condition</a></li>
                                    <li><a href="#">Our team</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Email:Support@selfysnap.com</a></li>
                                </ul>
                            </div>

                            <div className="col-6 col-sm-6 col-md-3">
                                <ul className="list-unstyled">
                                    <li><a href="#">Orders</a></li>
                                    <li><a href="#">Return Policy</a></li>
                                    <li><a href="#">About</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border-top copyright">
                    <div className="row pt-4">
                        <div className="col-lg-6">
                            <p className="mb-2 text-center text-lg-start text-black">Copyright &copy;<script>document.write(new Date().getFullYear());</script>. All Rights Reserved. &mdash; Designed by<a href="https://untree.co"></a> <a hreff="#">Web4Businesssolutions.com</a>
                            </p>
                        </div>

                        <div className="col-lg-6 text-center text-lg-end">
                            <ul className="list-unstyled d-inline-flex ms-auto">
                                <li className="me-4"><a href="#">Terms &amp; Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer
