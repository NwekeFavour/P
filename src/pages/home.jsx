import React from 'react';
import HeroSection from '../components/heroSection';
import { Award, Code, Sparkle, TrendingUp, Users } from 'lucide-react';
import Accordion from '../components/accordion';
import AboutUsSection from '../components/aboutUsSection';
import HowItWorksSection from '../components/works';
import Footer from '../components/footer';

function Home(props) {
    return (
        <div>
            <HeroSection/>
            <div className='bg-gradient-to-br from-[#FFE4D6] via-[#FFD4C0] to-[#FFE4D6] w-full xl:px-7 lg:px-6 md:px-5 px-3 py-16 xl:h-[750px] lg:h-[720px] md:h-[1000px] h-auto '>
                <div className='max-w-7xl mx-auto'>
                    {/* Section Header */}
                    <div className='text-center mb-12'>
                    <div className='flex items-center justify-center gap-3 mb-4'>
                        <div className='h-[2px] w-12 bg-orange-600'></div>
                        <div className='flex items-center gap-2'>
                        <Sparkle className="w-5 h-5 text-orange-600" />
                        <p className="m-0 lg:text-[20px] md:text-[18px] text-[16px] font-semibold text-orange-900 uppercase tracking-wide">
                            Why Choose Us?
                        </p>
                        </div>
                        <div className='h-[2px] w-12 bg-orange-600'></div>
                    </div>
                    <h2 className="m-0 lg:text-[48px] md:text-[38px] text-[32px] font-bold text-gray-900 leading-tight">
                        Best Learning Experience
                    </h2>
                    <p className="text-gray-700 mt-4 text-lg max-w-2xl mx-auto">
                        Everything you need to launch your tech career in one comprehensive program
                    </p>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Live Projects Card */}
                    <div className="group relative" data-aos="fade-up" data-aos-duration="1000"> 
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500" />
                        <div className="relative bg-white h-72 rounded-3xl p-6 transition-all duration-300  shadow-lg hover:shadow-2xl hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br  rounded-2xl flex items-center border justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Code className="w-8 h-8 text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-10">Live Projects</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Build production apps for real companies. Ship code that matters and see your work go live.
                        </p>
                        </div>
                    </div>

                    {/* Expert Mentors Card */}
                    <div className="group relative" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200"> 
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500" />
                        <div className="relative bg-white h-72 rounded-3xl p-6  transition-all duration-300  shadow-lg hover:shadow-2xl hover:-translate-y-2">
                        <div className="w-16 border h-16 bg-gradient-to-br  rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-8 h-8 text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-10">Expert Instructor</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Learn from senior engineers at top Nigerian and international tech companies.
                        </p>
                        </div>
                    </div>

                    {/* Paid Stipend Card */}
                    <div className="group relative" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500" />
                    <div className="relative bg-white h-72 rounded-3xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-6 border group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="w-8 h-8 text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-10">Earning Opportunities</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                        While we don’t pay stipends, top learners land internships, projects, and roles that pay ₦150k–₦500k monthly.
                        </p>
                    </div>
                    </div>


                    {/* Career Launch Card */}
                    <div className="group relative" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500" />
                        <div className="relative bg-white h-72 rounded-3xl p-6  transition-all duration-300  shadow-lg hover:shadow-2xl hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br  rounded-2xl flex items-center border justify-center mb-6  group-hover:scale-110 transition-transform duration-300">
                            <Award className="w-8 h-8 text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-10">Career Launch</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Certificate, portfolio projects, and direct connections to hiring companies.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#FAFAFA] w-full xl:px-7 lg:px-6 md:px-5 px-3 py-10 sm:py-16 xl:h-[900px] lg:h-[920px] md:h-[950px] h-auto'>
                <div className='max-w-7xl mx-auto'>
                    <div>
                        <Accordion  />
                    </div>
                </div>
            </div>
            <div>
                <HowItWorksSection/>
                <AboutUsSection/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default Home;