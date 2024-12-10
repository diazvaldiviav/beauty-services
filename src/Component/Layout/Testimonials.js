import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import '../../Styles/Style.css';

const Testimonials = () => {
    const testimonials = [
        {
            text: "Boost your product and service's credibility by adding testimonials from your clients. Feedback from others who've tried it is invaluable.",
            author: "Kiran Dhaliwal",
            position: "CEO at TechStart"
        },
        {
            text: "The team's expertise and dedication to delivering quality solutions exceeded our expectations. They truly understand what modern businesses need.",
            author: "Karishma Chaddha",
            position: "Marketing Director"
        },
        {
            text: "Working with them has transformed our digital presence. Their innovative approach and attention to detail made all the difference.",
            author: "Hansika Mehta",
            position: "Product Manager"
        }
    ];

    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <h2 className="testimonials-title">Client Testimonials</h2>
                    </div>
                </div>

                <div className="row">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="testimonial-card">
                                <div className="quote-icon">
                                    <FaQuoteLeft />
                                </div>
                                <p className="testimonial-text">
                                    {testimonial.text}
                                </p>
                                <div className="testimonial-author">
                                    <p className="author-name">
                                        - {testimonial.author}
                                    </p>
                                    <p className="author-position">
                                        {testimonial.position}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;