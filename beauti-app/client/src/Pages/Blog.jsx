import React from 'react'

const Blog = () => {
    return (
        <div>
            <div class="blog-section">
                <div class="container">
                    <div class="row mb-5">
                        <div class="col-md-6">
                            <h2 class="section-title">Recent Blog</h2>
                        </div>
                        <div class="col-md-6 text-start text-md-end">
                            <a href="#" class="more">View All Posts</a>
                        </div>
                    </div>

                    <div class="row">

                        <div class="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div class="post-entry">
                                <a href="#" class="post-thumbnail"><img src="images/logo/images4.png" alt="Image" class="img-fluid" /></a>
                                <div class="post-content-entry">
                                    <h3><a href="#">Company Owner Ideas</a></h3>
                                    <div class="meta">
                                        <span>by <a href="#">Manpreet Singh</a></span> <span>on <a href="#">18-04-2023</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div class="post-entry">
                                <a href="#" class="post-thumbnail"><img src="images/logo/images4.png" alt="Image" class="img-fluid" /></a>
                                <div class="post-content-entry">
                                    <h3><a href="#">How To Keep Your Best Products</a></h3>
                                    <div class="meta">
                                        <span>by <a href="#">Manager</a></span> <span>on <a href="#">18-04-2023</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div class="post-entry">
                                <a href="#" class="post-thumbnail"><img src="images/logo/images4.png" alt="Image" class="img-fluid" /></a>
                                <div class="post-content-entry">
                                    <h3><a href="#">Small Space Furniture Apartment Ideas</a></h3>
                                    <div class="meta">
                                        <span>by <a href="#">Our Clients</a></span> <span>on <a href="#">oct 12, 2024</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog
