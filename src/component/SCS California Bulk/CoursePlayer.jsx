import React, { useState, useEffect } from 'react';
import {
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    Search,
    Circle,
    CheckCircle,
    ArrowRight,
    ExternalLink,
    Building2,
    Users,
    MessageCircle,
    AlertTriangle,
    Maximize2
} from 'lucide-react';

// ==========================================
// 1. COURSE CONTENT DATA
// ==========================================
const courseContent = [
    {
        title: "CALIFORNIA LAW BULK INTERNET OPT-OUT",
        modules: [
            {
                id: 1,
                title: "What is the California bulk internet opt-out law?",
                type: "lesson",
                duration: "5 min",
                content: (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Intro Section */}
                        <div className="prose max-w-none text-gray-700">
                            <p className="text-lg leading-relaxed mb-6">
                                On October 10th, 2025, California Gov. Gavin Newsom signed into law <span className="font-bold text-gray-900">Assembly Bill-1414</span>, which requires landlords to allow tenants to opt out of bulk internet that are a part of the tenant's lease agreement. This law goes into affect on <span className="font-bold text-red-700">January 1, 2026</span>.
                            </p>
                            <p className="leading-relaxed mb-6">
                                On January 1, 2026, California's Multi-dwelling Unit tenants will be allowed to opt out of their bulk internet contract with a Communications Provider that the property has chosen to ensure that the tenants have reliable and discounted internet service. This law will require some changes to the Spectrum Community Solutions bulk internet agreements that are in place. This eLearn is to help sales navigate these changes along with issues that might arise from the enactment of the law.
                            </p>
                        </div>

                        {/* Key Points Card */}
                        <div className="bg-gray-50 border-l-4 border-red-600 p-6 rounded-r-xl shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">The new law includes the following points:</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 items-start">
                                    <div className="w-2 h-2 mt-2 bg-red-600 rounded-full shrink-0"></div>
                                    <p className="text-gray-700 text-sm">Requires, for any new or renewed tenancies on or after January 1, 2026, that a landlord provide a tenant the option to opt out of any subscription from a third-party internet service provider for wired-internet, cellular, or satellite service that is offered as part of residing at that property.</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="w-2 h-2 mt-2 bg-red-600 rounded-full shrink-0"></div>
                                    <p className="text-gray-700 text-sm">Specifies that if the landlord violates the provision described in the new bill then the tenant may deduct the cost of the subscription from their rent.</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="w-2 h-2 mt-2 bg-red-600 rounded-full shrink-0"></div>
                                    <p className="text-gray-700 text-sm">However, the bill specifies that a <span className="font-semibold">landlord is not prohibited</span> from offering bulk billing arrangements to their tenants.</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="w-2 h-2 mt-2 bg-red-600 rounded-full shrink-0"></div>
                                    <p className="text-gray-700 text-sm">Prohibits a landlord from retaliating in any manner against a tenant for exercising their rights under this bill, consistent with specified tenant protections against retaliation.</p>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="w-2 h-2 mt-2 bg-red-600 rounded-full shrink-0"></div>
                                    <p className="text-gray-700 text-sm">Defines the following term: a) "internet service provider" to be the definition of that term provided in Section 3100 of the Civil Code, which defines it as a business that provides broadband internet access service to an individual, corporation, government, or other customer in California.</p>
                                </li>
                            </ul>

                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <a href="#" className="inline-flex items-center gap-2 text-red-600 font-bold  hover:underline transition-colors">
                                    Link to view AB1414 law <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Resident Impact Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">What does the opt out law mean for residents?</h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Law AB-1414 stipulates that an owner/landlord cannot require that the resident pay an amenity fee for internet service if the resident chooses to opt out. The resident needs to inform the owner/landlord that they do not want to pay the amenity fee or the resident can deduct that amenity fee from the cost of rent.
                            </p>

                            <div className="bg-red-50 text-red-800 p-4 rounded-lg font-medium border border-red-100">
                                âš ï¸ Note: The residents CANNOT contact SCS to opt out. They must reach out to the owner/landlord.
                            </div>
                        </div>

                        {/* Property Impact Section */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-2">Scope of Law</h3>
                                <p className="text-gray-600 text-sm">
                                    While California Law AB-1414 applies to Multifamily and SFU rental properties, we believe the law is limited to rental properties and therefore <span className="font-bold">does not apply to HOAs</span>.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-2">Bulk Service Permission</h3>
                                <p className="text-gray-600 text-sm">
                                    Law AB-1414 <span className="font-bold">does permit</span> landlords/property owners to offer bulk internet service to their tenants.
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                            The new law in no way prevents Spectrum Community Solutions from selling fast reliable bulk internet service to property owners for their tenants' use. The property owners will still be able to purchase bulk internet service with cost cutting and enhanced service offerings for their residents.
                        </p>

                        <div className="bg-gray-900 text-gray-300 p-6 rounded-xl">
                            <p className="leading-relaxed">
                                <span className="text-white font-bold block mb-2">Video Service Impact:</span>
                                California Law AB-1414 states that residents may only opt out of bulk internet. However, because internet service is typically required to deliver our bulk video service, we will process opt out bulk for bulk video service with a bulk internet opt out.
                            </p>
                        </div>
                    </div>
                )
            },
            {
                id: 2,
                title: "Opt out of bulk guidelines and answers",
                type: "lesson",
                duration: "10 min",
                content: (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Intro Section */}
                        <div className="prose max-w-none">
                            <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-red-600 pl-4">
                                The California Law <span className="font-bold text-gray-900">AB-1414</span> will go into effect on <span className="font-bold text-red-700">January 1st, 2026</span>. Below are the key guidelines and answers to frequent questions from property owners and residents.
                            </p>
                        </div>

                        {/* Q&A Section */}
                        <div className="grid gap-6">

                            {/* 1. How to Opt Out Card */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="bg-red-100 text-red-700 w-6 h-6 flex items-center justify-center rounded-full text-xs">1</span>
                                    How do residents opt out of bulk internet?
                                </h3>
                                <div className="text-gray-700 space-y-4">
                                    <p>The resident must reach out to the <span className="font-semibold">landlord or property owner</span> directly. The opt-out cannot be completed by calling Spectrum customer service.</p>

                                    <div className="bg-gray-50 rounded-lg p-4 text-sm border-l-4 border-gray-400">
                                        <p className="font-bold text-gray-900 mb-2">Owner/Landlord Process:</p>
                                        <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                                            <li>Receive opt-out request from resident.</li>
                                            <li>Call <span className="font-bold text-red-600">Spectrum Property Staff Support (877.647.7732)</span>.</li>
                                            <li>Provide resident info and <strong>lease end date</strong> (service resets after this date).</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Video Service Impact */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="bg-red-100 text-red-700 w-6 h-6 flex items-center justify-center rounded-full text-xs">2</span>
                                    What about bulk video service?
                                </h3>
                                <p className="text-gray-700">
                                    While AB-1414 allows opting out of internet, bulk internet is typically required to deliver our bulk video service. Therefore, <span className="font-semibold text-gray-900">we will process an opt-out for bulk video service alongside any bulk internet opt-out.</span>
                                </p>
                            </div>

                            {/* 3. Billing & Amendments Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h4 className="font-bold text-gray-900 mb-2">Billing Impact</h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Bulk billing is generally <span className="underline decoration-red-200">not reduced</span> when a property owner requests an opt-out.
                                    </p>
                                    <div className="bg-yellow-50 text-yellow-800 text-xs p-3 rounded border border-yellow-100">
                                        <strong>Exception:</strong> If opt-outs exceed <strong>15%</strong>, Spectrum will meet with the owner to review and recommend fair program changes.
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h4 className="font-bold text-gray-900 mb-2">Contract Amendments</h4>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-bold text-red-600">No Amendment is required.</span> AB-1414 does not require service providers to reduce bulk billing for residents that choose to opt out.
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2 italic">*Always refer to specific property contracts for unique terms.</p>
                                </div>
                            </div>

                            {/* 4. Logistics (Re-establishing service) */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Service Management Logistics</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-600 shrink-0"></div>
                                        <div>
                                            <strong className="block text-gray-900">Is the address permanently removed?</strong>
                                            <span className="text-gray-600 text-sm">No. Bulk service is <span className="font-semibold">re-established on the lease end date</span>. If a new resident (or renewing resident) wants to opt out, the landlord must call to request it again.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-1.5 h-1.5 mt-2 rounded-full bg-green-600 shrink-0"></div>
                                        <div>
                                            <strong className="block text-gray-900">Can a resident opt back in?</strong>
                                            <span className="text-gray-600 text-sm">Yes. The landlord must call <span className="font-semibold">Spectrum Property Staff Support (877.647.7732)</span> to add the address back into the bulk program.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Outro / Transition */}
                        <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white p-6 rounded-xl shadow-lg mt-8">
                            <p className="text-lg font-light leading-relaxed italic opacity-90">
                                "While the California law is changing some bulk agreements, there are still many ways to position Spectrum as the best choice for owners and residents. Let's discuss them in the next section."
                            </p>
                        </div>
                    </div>
                )
            },
            {
                id: 3,
                title: "Bulk is a benefit to Property Owners & Residents",
                type: "lesson",
                duration: "8 min",
                content: (
                    <div className="space-y-8 animate-fadeIn">
                        <div className="prose max-w-none">
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                While the passing of the California Law <span className="font-bold">AB-1414</span> is bringing changes, there is no doubt that bulk internet service is a still a valuable benefit for both property owners and residents. These arrangements still offer choice, quality and value.
                            </p>
                        </div>

                        {/* Benefit Comparison Grid */}
                        <div className="grid lg:grid-cols-2 gap-6">

                            {/* For Property Owners */}
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                                <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Building2 size={20} />
                                    </div>
                                    <h3 className="font-bold text-gray-900">For Property Owners</h3>
                                </div>
                                <div className="p-6">
                                    <ul className="space-y-4">
                                        <li className="flex gap-3 items-start">
                                            <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                                            <span className="text-gray-700 text-sm">Superior connectivity for the properties' internet offering, enhancing resident living experience.</span>
                                        </li>
                                        <li className="flex gap-3 items-start">
                                            <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                                            <span className="text-gray-700 text-sm">Fast Speeds.</span>
                                        </li>
                                        <li className="flex gap-3 items-start">
                                            <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                                            <span className="text-gray-700 text-sm">24/7 Customer Service Support.</span>
                                        </li>
                                        <li className="flex gap-3 items-start">
                                            <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                                            <span className="text-gray-700 text-sm font-semibold">Increased Net Operating Income to improve the property's value.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* For Residents */}
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                                <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center gap-3">
                                    <div className="bg-purple-100 p-2 rounded-lg text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <Users size={20} />
                                    </div>
                                    <h3 className="font-bold text-gray-900">For Residents</h3>
                                </div>
                                <div className="p-6">
                                    <ul className="space-y-4">
                                        <li className="flex gap-3 items-start">
                                            <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                                            <span className="text-gray-700 text-sm">Benefit of High-Speed internet.</span>
                                        </li>
                                        <li className="flex gap-3 items-start">
                                            <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                                            <span className="text-gray-700 text-sm">24/7 Customer Service support ensuring residents feel supported and valued.</span>
                                        </li>
                                        <li className="flex gap-3 items-start">
                                            <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                                            <span className="text-gray-700 text-sm font-semibold">Savings over residential rates.</span>
                                        </li>
                                        <li className="flex gap-3 items-start">
                                            <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                                            <span className="text-gray-700 text-sm">More savings when adding best-in-class Spectrum video and mobile.</span>
                                        </li>
                                        <li className="flex gap-3 items-start">
                                            <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                                            <span className="text-gray-700 text-sm">Proven record of customer satisfaction and reliability.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Objection Handling Card */}
                        <div className="bg-red-50 border border-red-100 rounded-xl p-6 lg:p-8 mt-4">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-white p-3 rounded-full shadow-sm text-red-600">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Handling Concerns</h3>
                                    <p className="text-red-800 text-sm mt-1">What if the property owner has a resident who is concerned about being "forced" into a service plan?</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
                                <p className="text-gray-700 mb-4 font-medium">Tell the property owner to emphasize the benefits that comes with having a reliable bulk internet service plan already in place:</p>
                                <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
                                    {[
                                        "Fast speeds",
                                        "Cost savings below residential rate",
                                        "Best in class facilities",
                                        "Immediate connectivity",
                                        "No credit checks or security deposit",
                                        "No separate bills",
                                        "No separate equipment rental fees",
                                        "Dedicated support & flexibility"
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                                            <span className="text-sm text-gray-600">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                id: 4,
                title: "Salesforce Screenshots",
                type: "lesson",
                duration: "15 min",
                content: (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Header Warning */}
                        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl shadow-sm">
                            <div className="flex gap-3 items-start">
                                <AlertTriangle className="text-red-600 shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-red-800 mb-2">Important Warning for Sales</h3>
                                    <p className="text-red-700 text-sm leading-relaxed">
                                        Sales should <span className="font-extrabold underline">NOT</span> inform the property owner/landlord that they can renegotiate their contract if opt-outs exceed 15%. The information in Salesforce is for <span className="font-bold">internal usage only</span>. If a property owner inquires about renegotiation, immediately contact your leadership for guidance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Screenshots List */}
                        <div className="space-y-8">
                            <p className="text-gray-700 text-lg">Sales might see the following information in Salesforce about bulk properties in California.</p>

                            {/* Screenshot 1 */}
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                    {/* Placeholder for screenshot */}
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Salesforce ineligible" className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-bold text-gray-800 flex items-center gap-2"><Maximize2 size={16} /> Click to enlarge</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-gray-900 mb-2">1. Not Eligible for Opt-Out</h4>
                                    <p className="text-gray-600 text-sm">
                                        Shows a <span className="font-bold text-red-600">red thumbs down</span> next to "Property Eligible for CA Opt-Out". This indicates the property is <strong>not eligible</strong>.
                                    </p>
                                </div>
                            </div>

                            {/* Screenshot 2 */}
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Salesforce eligible under 15%" className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-bold text-gray-800 flex items-center gap-2"><Maximize2 size={16} /> Click to enlarge</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-gray-900 mb-2">2. Eligible (Under 15% Threshold)</h4>
                                    <p className="text-gray-600 text-sm">
                                        Shows a property banner indicating eligibility for CA opt-out, but it <span className="font-semibold">does not meet the 15% threshold</span> for renegotiation.
                                    </p>
                                </div>
                            </div>

                            {/* Screenshot 3 */}
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Salesforce eligible over 15%" className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-bold text-gray-800 flex items-center gap-2"><Maximize2 size={16} /> Click to enlarge</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-gray-900 mb-2">3. Eligible (Over 15% Threshold)</h4>
                                    <p className="text-gray-600 text-sm">
                                        Shows eligibility <span className="font-bold text-green-600">greater than the 15% threshold</span>. If the property inquires, their bulk contract could be renegotiated.
                                    </p>
                                </div>
                            </div>

                            {/* Screenshot 4 */}
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Salesforce stats" className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-bold text-gray-800 flex items-center gap-2"><Maximize2 size={16} /> Click to enlarge</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-gray-900 mb-2">4. Detailed Stats View</h4>
                                    <p className="text-gray-600 text-sm">
                                        Shows the "Doors/Address Information" screen with specific counts: number of Bulk Single Units opted out and the exact percentage.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Closing Action */}
                        <div className="bg-gray-100 p-6 rounded-xl text-center">
                            <p className="text-gray-700 font-medium">
                                If a property reaches out to discuss renegotiating due to {'>'}15% opt-outs, please contact your point of contact listed in the <span className="font-bold">Resources</span> section.
                            </p>
                        </div>
                    </div>
                )
            }
        ]
    },
    {
        title: "CONCLUSION",
        modules: [
            { id: 5, title: "Resources", type: "lesson", duration: "5 min", content: <div className="text-gray-500 italic">Resources content...</div> },
            { id: 6, title: "Knowledge Check", type: "quiz", duration: "10 min", content: <div className="text-gray-500 italic">Quiz content...</div> }
        ]
    }
];

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
const CoursePlayer = ({ onExit }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeModuleId, setActiveModuleId] = useState(1);
    const [expandedSections, setExpandedSections] = useState({ 0: true, 1: true });

    // Scroll to top when active module changes
    useEffect(() => {
        document.getElementById('content-scroller')?.scrollTo(0, 0);
    }, [activeModuleId]);

    // Helper: Get all modules in a flat array for easy navigation
    const allModules = courseContent.flatMap(section => section.modules);

    // Find active module and its index
    const activeModuleIndex = allModules.findIndex(m => m.id === activeModuleId);
    const activeModule = allModules[activeModuleIndex];

    const toggleSection = (index) => {
        setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const handleModuleSelect = (moduleId) => {
        setActiveModuleId(moduleId);
        // Automatically close sidebar on mobile when a module is selected
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    const handleContinue = () => {
        // Dynamic navigation logic
        if (activeModuleIndex < allModules.length - 1) {
            const nextModule = allModules[activeModuleIndex + 1];
            setActiveModuleId(nextModule.id);
            // Scroll to top of content
            document.getElementById('content-scroller')?.scrollTo(0, 0);
        } else {
            alert("Course Complete!");
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">

            {/* ==================== SIDEBAR ==================== */}
            <aside
                className={`${isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'} absolute lg:relative z-30 h-full shrink-0 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none`}
            >
                {/* Sidebar Header */}
                <div className="h-48 relative bg-gray-900 flex flex-col justify-end p-6 shrink-0">
                    {/* Background with Red Overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-red-900 to-gray-900"></div>

                    <div className="relative z-10">
                        <h2 className="text-white font-bold text-xl leading-tight mb-3">
                            California Law Bulk Internet Opt Out eLearn
                        </h2>
                        <div className="flex items-center gap-2 text-xs font-bold text-red-100 mb-2">
                            <span>{Math.round(((activeModuleIndex) / (allModules.length - 1 || 1)) * 100)}% COMPLETE</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                            <div
                                className="bg-red-500 h-full transition-all duration-500"
                                style={{ width: `${((activeModuleIndex) / (allModules.length - 1 || 1)) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    {/* Search Icon */}
                    <button className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer">
                        <Search size={18} />
                    </button>
                </div>

                {/* Sidebar Content List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50">
                    {courseContent.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="border-b border-gray-200/50 last:border-0">
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(sectionIndex)}
                                className="w-full flex items-center justify-between p-4 text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 uppercase tracking-wider transition-colors cursor-pointer"
                            >
                                {section.title}
                                {expandedSections[sectionIndex] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>

                            {/* Section Modules */}
                            <div className={`overflow-hidden transition-all duration-300 ${expandedSections[sectionIndex] ? 'max-h-96' : 'max-h-0'}`}>
                                <div className="flex flex-col pb-2">
                                    {section.modules.map((module) => (
                                        <button
                                            key={module.id}
                                            onClick={() => handleModuleSelect(module.id)}
                                            className={`
                                                relative flex items-start gap-3 px-4 py-3 text-left text-sm transition-all border-l-4 cursor-pointer
                                                ${activeModuleId === module.id
                                                    ? 'bg-white border-red-600 text-red-700 font-bold shadow-sm'
                                                    : 'border-transparent text-gray-600 hover:bg-white hover:text-gray-900'}
                                            `}
                                        >
                                            <div className={`mt-0.5 shrink-0 ${activeModuleId === module.id ? 'text-red-600' : 'text-gray-300'}`}>
                                                {module.id < activeModuleId ? (
                                                    <CheckCircle size={18} className="text-green-500" />
                                                ) : (
                                                    <Circle size={18} strokeWidth={2} />
                                                )}
                                            </div>
                                            <span className="leading-snug">{module.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Sidebar Overlay for Mobile */}
            {/* FIXED: Only show overlay if sidebar IS open */}
            {isSidebarOpen && (
                <div
                    className="absolute inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* ==================== MAIN CONTENT ==================== */}
            <main className="flex-1 flex flex-col h-full relative bg-white w-full">

                {/* Top Navigation Bar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors cursor-pointer"
                        >
                            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <div className="text-xs text-gray-400 font-medium uppercase tracking-widest hidden sm:block">
                            Lesson {activeModuleIndex + 1} of {allModules.length}
                        </div>
                    </div>
                    <button
                        onClick={onExit}
                        className="text-xs font-bold text-gray-500  tracking-wider transition-colors px-3 py-1 border border-transparent hover:border-red-100 rounded cursor-pointer"
                    >
                        EXIT COURSE
                    </button>
                </header>

                {/* Content Scroller */}
                <div id="content-scroller" className="flex-1 overflow-y-auto relative scroll-smooth">
                    <div className="max-w-4xl mx-auto p-6 lg:p-12 pb-24">

                        {/* Lesson Header */}
                        <div className="mb-8 animate-slideIn">
                            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-3">
                                Lesson {activeModuleId}
                            </span>
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                                {activeModule?.title}
                            </h1>
                            <div className="w-20 h-1.5 bg-red-600 rounded-full"></div>
                        </div>

                        {/* Dynamic Content */}
                        <div className="min-h-[400px]">
                            {activeModule?.content}
                        </div>

                    </div>
                </div>

                {/* Footer / Continue Bar (No Background Box) */}
                <div className="absolute bottom-8 right-8 z-20">
                    <button
                        onClick={handleContinue}
                        className="group flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-red-200 hover:bg-red-700 hover:scale-105 transition-all cursor-pointer"
                    >
                        CONTINUE
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </main>

            {/* FIXED: Use standard style tag for better compatibility */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default CoursePlayer;