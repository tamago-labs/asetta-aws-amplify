"use client"

import { Building2, Users, MapPin, Shield, Target, Mail, Phone } from 'lucide-react';
import Breadcrumb from '../Breadcrumb';


const AboutContainer = () => {
    return (
        <div className="min-h-screen bg-white">

            <div className="py-16 pt-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumb items={[
                        { label: 'Home', href: '/' },
                        { label: 'About' }
                    ]} />

                    <h1 className="text-5xl font-extralight mb-6 tracking-tight">About ASETTA</h1>
                    <p className="text-xl font-light text-gray-600 mb-12 leading-relaxed">
                        Revolutionizing real estate investment through blockchain technology and AI-powered tokenization.
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h2 className="text-2xl font-light mb-4">Our Mission</h2>
                            <p className="text-gray-600 font-light leading-relaxed mb-6">
                                To democratize access to premium real estate investments by leveraging blockchain technology,
                                making institutional-grade properties accessible to retail investors worldwide.
                            </p>

                            <h2 className="text-2xl font-light mb-4">Our Vision</h2>
                            <p className="text-gray-600 font-light leading-relaxed">
                                A world where geographical boundaries and capital requirements no longer limit access to
                                high-quality real estate investment opportunities.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-light mb-6">Get in Touch</h2>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Mail size={18} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Email</div>
                                        <div className="text-gray-600 font-light">hello@asetta.xyz</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Phone size={18} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Phone</div>
                                        <div className="text-gray-600 font-light">+1 (555) 123-4567</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <MapPin size={18} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Address</div>
                                        <div className="text-gray-600 font-light">
                                            123 Financial District<br />
                                            New York, NY 10004
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-light mb-4">Office Hours</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-light">Monday - Friday</span>
                                        <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-light">Saturday</span>
                                        <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-light">Sunday</span>
                                        <span className="font-medium">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="bg-gray-50 rounded-lg p-8">
                            <h3 className="text-xl font-light mb-6">Key Statistics</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-light">Assets Under Management</span>
                                    <span className="font-medium">$160.7M</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-light">Active Projects</span>
                                    <span className="font-medium">6</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-light">Average Yield</span>
                                    <span className="font-medium">7.6%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-light">Investors</span>
                                    <span className="font-medium">2,400+</span>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building2 size={24} />
                            </div>
                            <h3 className="text-lg font-light mb-2">Premium Assets</h3>
                            <p className="text-sm text-gray-600 font-light">
                                Carefully selected Class A properties in prime locations
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users size={24} />
                            </div>
                            <h3 className="text-lg font-light mb-2">Fractional Ownership</h3>
                            <p className="text-sm text-gray-600 font-light">
                                Own portions of high-value assets with minimal capital requirements
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-lg font-light mb-2">Secure & Compliant</h3>
                            <p className="text-sm text-gray-600 font-light">
                                Blockchain security with full regulatory compliance
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target size={24} />
                            </div>
                            <h3 className="text-lg font-light mb-2">Transparent Returns</h3>
                            <p className="text-sm text-gray-600 font-light">
                                Real-time performance tracking and monthly distributions
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default AboutContainer