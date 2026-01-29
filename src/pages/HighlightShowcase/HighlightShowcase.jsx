import { useEffect } from "react";
import { useNavigate } from "react-router";

const HighlightShowcase = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const highlights = [
        {
            id: 1,
            number: "01",
            title: "Clean Architecture",
            description: "Well-structured components that are easy to scale and maintain over time.",
            details: "Our clean architecture follows SOLID principles and separation of concerns, making your codebase maintainable and scalable. Features include modular design, dependency injection, and clear separation between business logic and presentation layers."
        },
        {
            id: 2,
            number: "02",
            title: "Lightning Fast",
            description: "Optimized performance with utility-first styling and modern tooling.",
            details: "We achieve blazing-fast performance through code splitting, lazy loading, optimized images, and efficient state management. Our solutions are built with performance-first mindset using React.memo, useMemo, and useCallback where appropriate."
        },
        {
            id: 3,
            number: "03",
            title: "Consistent UI",
            description: "Design systems that ensure consistency across your entire product.",
            details: "Our comprehensive design system includes reusable components, consistent spacing, typography scales, and color palettes. This ensures uniformity across all pages and components, reducing cognitive load for users and developers alike."
        }
    ];

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-16 mt-10">
                {/* Back Button */}
                {/* <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </button> */}

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-4 md:mb-5 tracking-tight leading-tight">
                        Why Teams Choose Us
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                        Detailed overview of our powerful features designed to help you move faster and work smarter.
                    </p>
                </div>

                {/* Highlight Details */}
                <div className="space-y-12 max-w-5xl mx-auto">
                    {highlights.map((highlight) => (
                        <div
                            key={highlight.id}
                            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                        >
                            <div className="flex flex-col md:flex-row md:items-start">
                                {/* Number Badge */}
                                <div className="mb-6 md:mb-0 md:mr-8">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 font-bold text-2xl">
                                        {highlight.number}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                        {highlight.title}
                                    </h2>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Summary:</h3>
                                        <p className="text-gray-600 text-lg">{highlight.description}</p>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Detailed Overview:</h3>
                                        <p className="text-gray-700 leading-relaxed">{highlight.details}</p>
                                    </div>

                                    {/* Additional Features */}
                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-indigo-50 rounded-lg p-4">
                                            <h4 className="font-semibold text-indigo-800 mb-2">Key Benefits</h4>
                                            <ul className="text-gray-700 space-y-1">
                                                <li>• Increased productivity</li>
                                                <li>• Reduced maintenance cost</li>
                                                <li>• Better developer experience</li>
                                            </ul>
                                        </div>

                                        <div className="bg-green-50 rounded-lg p-4">
                                            <h4 className="font-semibold text-green-800 mb-2">Technical Features</h4>
                                            <ul className="text-gray-700 space-y-1">
                                                <li>• React 18+ compatible</li>
                                                <li>• TypeScript support</li>
                                                <li>• Responsive design</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                {/* <div className="mt-16 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-6">Our Impact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="text-4xl font-bold mb-2">95%</div>
                            <div className="text-indigo-100">Client Satisfaction</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">40%</div>
                            <div className="text-indigo-100">Faster Development</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">99.9%</div>
                            <div className="text-indigo-100">Code Reliability</div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default HighlightShowcase;
