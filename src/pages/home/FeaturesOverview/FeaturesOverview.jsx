import { useTranslation } from 'react-i18next';
import {
    Activity,
    Cloud,
    Sprout,
    Smartphone,
    BarChart3,
    Bell
} from 'lucide-react';

const FeaturesOverview = () => {
    const { t } = useTranslation();
    const features = t('features.items', { returnObjects: true }) || [];

    const iconMap = {
        Activity: Activity,
        Cloud: Cloud,
        Sprout: Sprout,
        Smartphone: Smartphone,
        BarChart3: BarChart3,
        Bell: Bell
    };

    return (
        <div className="container mx-auto pb-20 px-4">
            {/* Header */}
            <div className="mb-12 md:mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold capitalize mb-4">
                    {t('features.title')}
                </h2>
                <p className="text-lg lg:text-xl max-w-2xl mx-auto">
                    {t('features.subtitle')}
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {features.map((feature, index) => {
                    const IconComponent = iconMap[feature.icon] || Activity;
                    return (
                        <div
                            key={index}
                            className="group relative flex flex-col rounded-2xl hover:rounded-t-2xl hover:rounded-b-none p-6 bg-white shadow-sm ring-1 ring-gray-100 hover:ring-green-300 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Icon Container */}
                            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-green-500 to-green-600 text-white mb-6 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                <IconComponent className="w-7 h-7" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed grow">
                                {feature.description}
                            </p>

                            {/* Animated border accent */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-green-500 w-0 group-hover:w-full transition-all duration-500"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturesOverview;
