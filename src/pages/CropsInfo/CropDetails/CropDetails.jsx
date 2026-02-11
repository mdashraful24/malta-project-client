import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { Droplets, Thermometer, Cloud, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Custom hook for checking if element is in viewport
const useInView = () => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px"
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return [ref, isInView];
};

const CropDetails = () => {
    const [powerOn, setPowerOn] = useState(true);
    const [ref, isInView] = useInView();
    const { t } = useTranslation();

    const fieldName = "North Field";
    const cropName = "Cucumber";
    const avgSoil = 65;
    const avgTemperature = 28;
    const avgHumidity = 72;

    // Sample sensor data
    const soilSensors = Array.from({ length: 15 }, (_, i) => ({
        id: `S${i + 1}`,
        value: 60 + Math.floor(Math.random() * 20)
    }));

    const tempSensors = [
        { id: 'TEMP-01', value: 27.5 },
        { id: 'TEMP-02', value: 28.5 }
    ];

    const humiditySensors = [
        { id: 'HUM-01', value: 70 },
        { id: 'HUM-02', value: 74 }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen">
            <div ref={ref} className="container mx-auto px-4 py-16 mt-10 mb-5">
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-3xl lg:text-5xl font-semibold mb-4">
                        <span className="font-serif">{fieldName}</span>
                    </h1>
                    <div className="flex flex-row justify-center items-center-safe gap-3">
                        <h2 className="text-2xl lg:text-3xl font-semibold">
                            {cropName}
                        </h2>
                        <span className="flex items-center px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold border border-amber-400">
                            Crop
                        </span>
                    </div>
                </div>

                {/* Average Metrics Section - Premium Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Soil Moisture Card */}
                    <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-amber-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-linear-to-br from-amber-50 to-amber-100 rounded-xl">
                                <Droplets className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="text-xs font-medium px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full">
                                {t('cropDetails.optimal')}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-1">{t('cropDetails.soilMoisture')}</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl lg:text-3xl font-bold">
                                    {isInView ? (
                                        <CountUp
                                            start={0}
                                            end={avgSoil}
                                            duration={2}
                                            suffix="%"
                                        />
                                    ) : "0%"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Temperature Card */}
                    <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-linear-to-br from-red-50 to-red-100 rounded-xl">
                                <Thermometer className="w-5 h-5 text-red-600" />
                            </div>
                            <div className="text-xs font-medium px-2.5 py-1 bg-red-50 text-red-700 rounded-full">
                                {t('cropDetails.optimal')}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-1">{t('cropDetails.temperature')}</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl lg:text-3xl font-bold">
                                    {isInView ? (
                                        <CountUp
                                            start={0}
                                            end={avgTemperature}
                                            duration={2}
                                            suffix="°C"
                                        />
                                    ) : "0°C"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Humidity Card */}
                    <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                                <Cloud className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-xs font-medium px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
                                {t('cropDetails.optimal')}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-1">{t('cropDetails.humidity')}</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl lg:text-3xl font-bold">
                                    {isInView ? (
                                        <CountUp
                                            start={0}
                                            end={avgHumidity}
                                            duration={2}
                                            suffix="%"
                                        />
                                    ) : "0%"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* System Status Card */}
                    <div className="group bg-linear-to-b from-gray-50 to-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-purple-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl">
                                <Zap className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${powerOn ? 'bg-green-50 text-green-700' : 'bg-gray-100'}`}>
                                {powerOn ? t('cropDetails.online') : t('cropDetails.offline')}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-1">{t('cropDetails.systemStatus')}</h3>
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${powerOn ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                <span className="text-xl font-bold">
                                    {powerOn ? t('cropDetails.allSystemsActive') : t('cropDetails.systemOffline')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sensor Grids Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Soil Moisture Sensors */}
                    <div className="bg-linear-to-b from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl lg:text-2xl font-semibold mb-2">{t('cropDetails.soilMoistureGrid')}</h3>
                                <p>{t('cropDetails.moistureLevels')}</p>
                            </div>
                            <div className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-sm font-medium border border-amber-200">
                                {isInView ? (
                                    <CountUp
                                        start={0}
                                        end={15}
                                        duration={2}
                                        suffix={` ${t('cropDetails.nodes')}`}
                                    />
                                ) : `0 ${t('cropDetails.nodes')}`}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 lg:gap-4">
                            {soilSensors.map((sensor) => (
                                <div
                                    key={sensor.id}
                                    className="group relative bg-linear-to-b from-white to-gray-50 rounded-xl p-4 text-center border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="absolute top-3 right-3 text-xs font-medium">
                                        {sensor.id}
                                    </div>
                                    <div className="text-2xl lg:text-3xl font-bold mt-4 mb-3">
                                        {isInView ? (
                                            <CountUp
                                                start={0}
                                                end={sensor.value}
                                                duration={2}
                                                suffix="%"
                                            />
                                        ) : "0%"}
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-1000 ${sensor.value > 75 ? 'bg-red-500' :
                                                sensor.value < 50 ? 'bg-blue-500' :
                                                    'bg-linear-to-r from-amber-400 to-amber-600'
                                                }`}
                                            style={{ width: isInView ? `${sensor.value}%` : "0%" }}
                                        ></div>
                                    </div>
                                    <div className="text-xs mt-2">
                                        {sensor.value > 75 ? t('cropDetails.high') : sensor.value < 50 ? t('cropDetails.low') : t('cropDetails.withinRange')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Temperature & Humidity Side */}
                    <div className="space-y-8">
                        {/* Temperature Sensors */}
                        <div className="bg-linear-to-b from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl lg:text-2xl font-semibold mb-2">{t('cropDetails.temperatureZones')}</h3>
                                    <p>{t('cropDetails.ambientTemp')}</p>
                                </div>
                                <div className="px-3 py-1 bg-red-50 text-red-800 rounded-full text-sm font-medium border border-red-200">
                                    {isInView ? (
                                        <CountUp
                                            start={0}
                                            end={2}
                                            duration={2}
                                            suffix={` ${t('cropDetails.temperatureSensors')}`}
                                        />
                                    ) : `0 ${t('cropDetails.temperatureSensors')}`}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                {tempSensors.map((sensor) => (
                                    <div
                                        key={sensor.id}
                                        className="group bg-linear-to-br from-white to-red-50 rounded-xl px-4 py-3 border border-red-100 hover:border-red-300 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="font-medium">{sensor.id}</div>
                                            <Thermometer className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div className="text-3xl lg:text-4xl font-bold mb-2">
                                            {isInView ? (
                                                <CountUp
                                                    start={0}
                                                    end={sensor.value}
                                                    duration={2}
                                                    suffix="°C"
                                                    decimals={1}
                                                />
                                            ) : "0°C"}
                                        </div>
                                        <div className={`text-sm font-medium ${sensor.value > 30 ? 'text-red-600' : sensor.value < 20 ? 'text-blue-600' : 'text-green-600'}`}>
                                            {sensor.value > 30 ? t('cropDetails.aboveOptimal') : sensor.value < 20 ? t('cropDetails.belowOptimal') : t('cropDetails.withinRange')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Humidity Sensors */}
                        <div className="bg-linear-to-b from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl lg:text-2xl font-semibold mb-2">{t('cropDetails.humidityLevels')}</h3>
                                    <p>{t('cropDetails.atmosphericHumidity')}</p>
                                </div>
                                <div className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                                    {isInView ? (
                                        <CountUp
                                            start={0}
                                            end={2}
                                            duration={2}
                                            suffix={` ${t('cropDetails.humiditySensors')}`}
                                        />
                                    ) : `0 ${t('cropDetails.humiditySensors')}`}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                {humiditySensors.map((sensor) => (
                                    <div
                                        key={sensor.id}
                                        className="group bg-linear-to-br from-white to-blue-50 rounded-xl px-4 py-3 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="font-medium">{sensor.id}</div>
                                            <Cloud className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div className="text-3xl lg:text-4xl font-bold mb-2">
                                            {isInView ? (
                                                <CountUp
                                                    start={0}
                                                    end={sensor.value}
                                                    duration={2}
                                                    suffix="%"
                                                />
                                            ) : "0%"}
                                        </div>
                                        <div className={`text-sm font-medium ${sensor.value > 80 ? 'text-red-600' : sensor.value < 40 ? 'text-blue-600' : 'text-green-600'}`}>
                                            {sensor.value > 80 ? t('cropDetails.highHumidity') : sensor.value < 40 ? t('cropDetails.lowHumidity') : t('cropDetails.optimalRange')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropDetails;
