import React, { useState } from 'react';
import Header from '../components/header';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';

function Talent(props) {
    const [loading, setLoading] =useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        try {

            setLoading(false)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    const handleScroll = () => {
        const element = document.getElementById('contact-us');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        };
    return (
        <div>
            <Header />
            <div className="flex items-center justify-center lg:p-20 md:p-18 sm:p-16 p-14 xl:p-24 bg-[#FAFAFA] sm:min-h-[80vh]">
                <div className=' text-center'>
                    <p className="m-0 lg:text-[64px] font-semibold md:text-[62px] sm:text-[52px] text-[42px] xl:text-[72px]">Hire. Build. Grow. Win.</p>
                    <p className="m-0 md:w-[70%] mx-auto xl:text-[20px] lg:text-[18px] md:text-[17px] text-[15px] text-gray-500">Find experienced, job-ready professionals who can join your team and start contributing immediately. Hire faster, smarter, and better.</p>
                    
                    <div className='mt-6 '>
                        <Button variant="primary" className="bg-neutral-600 hover:bg-gray-700 text-white font-semibold lg:py-5 md:px-8 md:py-4 px-10 py-5 lg:px-10 rounded-lg shadow-md transition duration-300">
                            Hire Talent
                        </Button>
                    </div>
                </div>
            </div>
            <div className="my-10 sm:mx-5 mx-4 sm:flex items-center justify-center gap-10">
                {/* Left Side: Message Block */}
                <div data-aos="fade-in" className='bg-neutral-300 py-10 w-[330px] h-[400px] sm:h-[400px] sm:mx-0 mx-auto sm:w-[400px] rounded-sm p-5 text-start '>
                    <p className="lg:text-[30px] md:text-[28px] text-[24px] font-bold lg:mt-24   md:mt-20 sm:mt-16 mt-27 text-gray-900">
                    A Trusted Marketplace for Exceptional Tech Talent
                    </p>
                    <p className="text-sm mt-3">
                    Hire vetted, job-ready professionals across design, development, and product, trained to deliver results and drive innovation.
                    </p>
                </div>

                {/* Right Side: Benefits Block */}
                <div data-aos="fade-in" data-aos-duration="3000"  className="sm:w-[400px] w-[330px] h-[400px] sm:h[400px] bg-gray-900 text-white rounded-sm p-6 flex flex-col sm:mx-0 mx-auto justify-center sm:mt-0 mt-6">
                    <h3 className="text-xl font-bold mb-4 text-center">Why Hire From Us?</h3>
                    <ul className="space-y-3 text-sm leading-relaxed">
                    <li>✅ <span className="font-semibold">Pre-vetted professionals</span> trained through real-world projects.</li>
                    <li>⚡ <span className="font-semibold">Faster onboarding</span>, talents who understand agile workflows.</li>
                    <li>💡 <span className="font-semibold">Problem-solvers, not just coders</span>, ready to deliver business impact.</li>
                    <li>🌍 <span className="font-semibold">Global collaboration experience</span> from working in diverse teams.</li>
                    </ul>
                </div>
            </div>
            {/* <div   className="bg-[#F8F8F8] py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Meet Our Talents</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                    From front-end developers to product designers, our network is filled with individuals 
                    who have been trained, mentored, and tested on real-world projects. Every talent is ready 
                    to make meaningful contributions from day one.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {[1, 2, 3].map((_, index) => (
                    <div key={index} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={index * 200}  className="bg-white shadow-md rounded-lg p-6 w-[300px] hover:shadow-lg transition">
                        <div className="h-[120px] w-[120px] bg-gray-200 rounded-full mx-auto mb-4"></div>
                        <h3 className="font-semibold text-lg">Jane Doe</h3>
                        <p className="text-sm text-gray-500 mb-3">Frontend Developer</p>
                        <p className="text-gray-600 text-sm mb-4">
                        Skilled in React, TypeScript, and modern UI frameworks. Passionate about building scalable, responsive interfaces.
                        </p>
                        <Button className="bg-neutral-700 hover:bg-neutral-800 text-white text-sm px-5 py-2 rounded-md">View Profile</Button>
                    </div>
                    ))}
                </div>
            </div> */}
            <div className="bg-gray-900 text-white py-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">
                Whether you’re building your first product or scaling an existing one, our talents can 
                help you get there faster. Let’s connect and create something exceptional together.
            </p>
            <Button onClick={handleScroll}  className="bg-white text-gray-900 hover:bg-gray-200 font-semibold px-8 py-4 rounded-md">
                Get in Touch
            </Button>
            </div>
                    {/* Contact Section */}
            <div className="flex flex-col lg:flex-row items-center justify-center bg-[#F3F3F3] py-20 px-10 gap-10">
            
            {/* Left Side - Text */}
            <div className="lg:w-1/2 text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Ready to Hire Exceptional Talent?
                </h2>
                <p className="text-gray-600 mb-6 max-w-md">
                Let’s help you find top-tier designers, developers, and product managers trained to 
                deliver excellence from day one. Fill out the form to connect with us, we’ll match 
                you with the perfect talent for your team.
                </p>
                <p className="text-gray-500 text-sm">
                We respond to all inquiries within 24 hours.
                </p>
            </div>

            {/* Right Side - Form */}
            <div id='contact-us' className="lg:w-1/2 w-full bg-white shadow-md rounded-lg p-8">
                <form onSubmit={handleSubmit}  className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
                    <input 
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Company Email</label>
                    <input 
                    type="email"
                    placeholder="Enter your company email"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">What Role Are You Hiring For?</label>
                    <input 
                    type="text"
                    placeholder="e.g. Frontend Developer, Product Designer"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
                    <textarea 
                    rows="4"
                    placeholder="Tell us a bit about your hiring needs"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                    ></textarea>
                </div>

                <Button className="bg-gray-900 hover:bg-gray-800 text-white w-full py-3 rounded-md font-semibold" type='submit'>
                    {loading ? "Loading": "Submit Inquiry"}
                </Button>
                </form>
            </div>
            </div>

            <Footer />

        </div>
    );
}

export default Talent;