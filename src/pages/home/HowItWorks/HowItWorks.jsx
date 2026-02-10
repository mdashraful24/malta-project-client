import { useTranslation } from 'react-i18next';
import { UserPlus, Eye, Zap, Target, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const HowItWorks = () => {
    const { t } = useTranslation();
    const steps = t('howItWorks.steps', { returnObjects: true }) || [];
    const [activeStep, setActiveStep] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const [autoPlay, setAutoPlay] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef(null);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    const iconMap = {
        UserPlus: UserPlus,
        Eye: Eye,
        Zap: Zap,
        Target: Target
    };

    // Detect mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-slider functionality
    useEffect(() => {
        if (autoPlay && steps.length > 0 && !isHovering) {
            intervalRef.current = setInterval(() => {
                setActiveStep(prev => (prev + 1) % steps.length);
            }, 3000);

            return () => clearInterval(intervalRef.current);
        } else {
            clearInterval(intervalRef.current);
        }
    }, [autoPlay, steps.length, isHovering]);

    // Sync openIndex with activeStep when autoPlay is enabled on mobile
    useEffect(() => {
        if (autoPlay && isMobile) {
            setOpenIndex(activeStep);
        }
    }, [activeStep, autoPlay, isMobile]);

    // Handle step hover with debounce
    const handleStepHover = (index) => {
        if (!autoPlay) {
            setActiveStep(index);
        }
    };

    // Handle mouse enter with delay
    const handleMouseEnter = (index) => {
        setIsHovering(true);
        if (!autoPlay) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setActiveStep(index);
            }, 100);
        }
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
        setIsHovering(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    // Toggle between hover and auto-slider modes
    const toggleMode = () => {
        setAutoPlay(prev => !prev);
        setActiveStep(0);
        if (!prev && isMobile) {
            setOpenIndex(0);
        }
    };

    // Mobile accordion toggle
    const toggleAccordion = (index) => {
        if (autoPlay) {
            // In auto-play mode, just show the active step
            setOpenIndex(openIndex === index ? null : index);
        } else {
            // In manual mode, toggle normally
            setOpenIndex(openIndex === index ? null : index);
            setActiveStep(index);
        }
    };

    // Manual navigation
    const goToNextStep = () => {
        const nextStep = (activeStep + 1) % steps.length;
        setActiveStep(nextStep);
    };

    const goToPrevStep = () => {
        const prevStep = (activeStep - 1 + steps.length) % steps.length;
        setActiveStep(prevStep);
    };

    // Calculate connector line animation
    const getConnectorColor = (index) => {
        if (activeStep >= index) {
            return 'bg-gradient-to-r from-green-400 via-green-500 to-green-400';
        }
        return 'bg-gradient-to-r from-gray-200 to-gray-300';
    };

    return (
        <div
            className="container mx-auto pt-2 pb-24 lg:pb-30 px-4 overflow-hidden"
            ref={containerRef}
            onMouseLeave={handleMouseLeave}
        >
            {/* Header with Mode Toggle */}
            <div className="mb-8 lg:mb-16 text-center animate-fade-in">
                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="text-left">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            {t('howItWorks.title')}
                        </h2>
                        <p className="text-lg lg:text-xl leading-relaxed">
                            {t('howItWorks.subtitle')}
                        </p>
                    </div>

                    {/* Mode Toggle */}
                    {/* Large screen Only */}
                    <div className="hidden lg:flex gap-4">
                        <span className="font-bold">
                            {autoPlay ? t('howItWorks.autoMode') : t('howItWorks.hoverMode')}
                        </span>
                        <button
                            onClick={toggleMode}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 ${autoPlay ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                            aria-label={autoPlay ? 'Switch to hover mode' : 'Switch to auto-slide mode'}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${autoPlay ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Mobile screen */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mt-6">
                        <span className="font-bold">
                            {autoPlay ? 'Auto-slide mode' : 'Hover mode'}
                        </span>
                        <button
                            onClick={toggleMode}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 ${autoPlay ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                            aria-label={autoPlay ? 'Switch to hover mode' : 'Switch to auto-slide mode'}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${autoPlay ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile View - Accordion Style */}
            <div className="lg:hidden space-y-4 animate-fade-in">
                {steps.map((step, index) => {
                    const IconComponent = iconMap[step.icon] || UserPlus;
                    const isOpen = autoPlay ? activeStep === index : openIndex === index;
                    const isActive = autoPlay ? activeStep === index : openIndex === index;

                    return (
                        <div
                            key={index}
                            className={`rounded-2xl p-4 border-2 transition-all duration-500 ease-out-expo ${isActive
                                ? 'border-green-300 shadow-lg scale-[1.02]'
                                : 'border-gray-100 hover:border-green-200'
                                }`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full text-left focus:outline-none"
                            >
                                <div className="flex flex-col items-start justify-between">
                                    <div className='flex items-center justify-between w-full'>
                                        <div className="flex items-center gap-4 grow">
                                            <div className={`flex items-center justify-center w-9 h-9 lg:w-12 lg:h-12 rounded-xl transition-all duration-500 ${isActive
                                                ? 'bg-linear-to-br from-green-500 to-green-600 text-white scale-110'
                                                : 'bg-green-50 text-green-600'
                                                }`}>
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700">
                                                        Step {step.number}
                                                    </span>
                                                    <h3 className="text-lg font-bold">
                                                        {step.title}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <ChevronDown
                                                className={`w-5 h-5 text-green-600 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={`grid transition-all duration-500 ease-out-expo ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="mt-4 pt-3 border-t border-gray-200">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Desktop View - Step by Step */}
            <div className="hidden lg:block animate-fade-in max-w-[96%] mx-auto">
                <div className="relative">
                    {/* Connector Line Container */}
                    <div className="absolute top-24 left-8 right-8 h-1.5">
                        <div className="relative h-full">
                            {steps.map((_, index) => (
                                index < steps.length - 1 && (
                                    <div
                                        key={`connector-${index}`}
                                        className={`absolute h-full transition-all duration-1000 ease-out-expo ${getConnectorColor(index)
                                            }`}
                                        style={{
                                            left: `${(index * 100) / (steps.length - 1)}%`,
                                            width: `${100 / (steps.length - 1)}%`,
                                            transform: activeStep >= index ? 'scaleX(1)' : 'scaleX(0.8)',
                                            transformOrigin: 'left center',
                                            opacity: activeStep >= index ? 1 : 0.5,
                                        }}
                                    />
                                )
                            ))}
                        </div>
                    </div>

                    {/* Steps Container */}
                    <div className="grid grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => {
                            const IconComponent = iconMap[step.icon] || UserPlus;
                            const isActive = activeStep === index;
                            const isPast = activeStep > index;

                            return (
                                <div
                                    key={index}
                                    className="group relative"
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onFocus={() => handleMouseEnter(index)}
                                >
                                    {/* Step Card */}
                                    <div className="relative transition-all duration-700 ease-out-expo transform hover:scale-[1.03]">
                                        {/* Glow Effect for Active Card */}
                                        {isActive && (
                                            <div className="absolute -inset-2 bg-linear-to-r from-green-400/20 to-emerald-400/10 rounded-3xl blur-xl" />
                                        )}

                                        <div
                                            className={`relative bg-white rounded-2xl p-8 transition-all duration-700 ease-out-expo cursor-pointer ${isActive
                                                ? 'ring-2 ring-green-300 shadow-2xl'
                                                : 'ring-1 ring-gray-200 shadow-lg hover:shadow-xl hover:ring-green-200'
                                                }`}
                                            onClick={() => setActiveStep(index)}
                                        >
                                            {/* Icon Container with Animation */}
                                            <div className="relative">
                                                <div
                                                    className={`flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-700 ease-out-expo transform ${isActive
                                                        ? 'bg-linear-to-br from-green-500 to-emerald-600 scale-110 shadow-lg'
                                                        : isPast
                                                            ? 'bg-linear-to-br from-green-500 to-green-600'
                                                            : 'bg-linear-to-br from-gray-400 to-gray-500'
                                                        }`}
                                                >
                                                    <IconComponent
                                                        className={`w-8 h-8 text-white transition-all duration-700 ${isActive ? 'scale-110' : ''
                                                            }`}
                                                    />
                                                </div>

                                                {/* Active Indicator */}
                                                {isActive && !autoPlay && (
                                                    <div className="absolute -top-2 -right-2">
                                                        <div className="w-4 h-4 bg-green-500 rounded-full animate-ping" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Step Number Badge */}
                                            <div
                                                className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold mb-4 transition-all duration-500 ${isActive
                                                    ? 'bg-green-100 text-green-700 scale-105'
                                                    : 'bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                <span className={`w-2 h-2 rounded-full mr-2 transition-all duration-500 ${isActive ? 'bg-green-500' : 'bg-gray-400'
                                                    }`} />
                                                Step {step.number}
                                            </div>

                                            {/* Title */}
                                            <h3
                                                className={`text-xl font-bold transition-colors duration-500 ${isActive
                                                    ? 'text-green-600 mb-4'
                                                    : ''
                                                    }`}
                                            >
                                                {step.title}
                                            </h3>

                                            {/* Description with Smooth Height Transition */}
                                            <div className="overflow-hidden">
                                                <div
                                                    className={`transition-all duration-700 ease-out-expo ${isActive
                                                        ? 'max-h-48 opacity-100 translate-y-0'
                                                        : 'max-h-0 opacity-0 -translate-y-2'
                                                        }`}
                                                >
                                                    <p>{step.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            {autoPlay && !isMobile && (
                <div className="flex justify-center items-center gap-5 mt-16">
                    <button
                        onClick={goToPrevStep}
                        className="p-2 rounded-full bg-white border border-gray-300 hover:bg-green-500 hover:text-white hover:border-green-400 hover:shadow-md transition-all duration-300 hover:scale-110 disabled:hover:bg-inherit disabled:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={activeStep === 0}
                    >
                        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Progress Indicators */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-1.5 lg:gap-2">
                            {steps.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setActiveStep(i);
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-green-300 ${i === activeStep
                                        ? 'lg:w-8 w-6 bg-green-500'
                                        : i < activeStep
                                            ? 'bg-green-300'
                                            : 'bg-gray-300'
                                        }`}
                                    aria-label={`Go to step ${i + 1}`}
                                />
                            ))}
                        </div>
                        {/* Step Counter - Optional */}
                        {/* <div className="text-sm text-gray-600 hidden lg:block">
                        Step {activeStep + 1} of {steps.length}
                    </div> */}
                    </div>

                    <button
                        onClick={goToNextStep}
                        className="p-2 rounded-full bg-white border border-gray-300 hover:bg-green-500 hover:text-white hover:border-green-400 hover:shadow-md transition-all duration-300 hover:scale-110"
                    >
                        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default HowItWorks;
