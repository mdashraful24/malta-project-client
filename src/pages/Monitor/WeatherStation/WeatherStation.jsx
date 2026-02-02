import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import Marquee from '../Marquee/Marquee';

const WeatherStation = () => {
    const [currentTime, setCurrentTime] = useState('10:40:24');

    // Stats data with glass effect
    const statsData = [
        {
            id: 1,
            title: "Temp",
            value: "22 °C",
            icon: "🌡️",
            color: "blue",
            change: "+1°C from yesterday",
            bgColor: "bg-white/10",
            borderColor: "border-gray-200 hover:border-white/20",
            glowColor: "from-blue-500/20 to-blue-400/10"
        },
        {
            id: 2,
            title: "Humidity",
            value: "68 %",
            icon: "💧",
            color: "green",
            change: "Comfortable range",
            bgColor: "bg-white/10",
            borderColor: "border-gray-200 hover:border-white/20",
            glowColor: "from-green-500/20 to-green-400/10"
        },
        {
            id: 3,
            title: "Soil",
            value: "45 %",
            icon: "🌱",
            color: "amber",
            change: "Optimal moisture",
            bgColor: "bg-white/10",
            borderColor: "border-gray-200 hover:border-white/20",
            glowColor: "from-amber-500/20 to-amber-400/10"
        },
        {
            id: 4,
            title: "Rain",
            value: "3 %",
            icon: "🌧️",
            color: "cyan",
            change: "NO rain today",
            bgColor: "bg-white/10",
            borderColor: "border-gray-200 hover:border-white/20",
            glowColor: "from-cyan-500/20 to-cyan-400/10",
            status: "NO"
        }
    ];

    // Simulate live time updates
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeString = now.toTimeString().split(' ')[0];
            setCurrentTime(timeString);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50/30 via-purple-50/20 to-cyan-50/30 relative overflow-hidden">
            {/* Background blur effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/40 to-transparent backdrop-blur-3xl"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-white/30 to-transparent backdrop-blur-3xl"></div>

                {/* Animated blur circles */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="container mx-auto px-4 lg:px-0 py-16 mt-10 relative z-10">

                {/* Header */}
                <header className="mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Weather Station</h1>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                            <div className="flex items-center">
                                <span className="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></span>
                                <span className="text-sm font-medium">
                                    Auto refresh 5s • Online • Ashulia/Birulia/Dhaka
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 4 Stats Cards with glass effect */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsData.map((stat) => (
                        <div
                            key={stat.id}
                            className={`relative backdrop-blur-xl ${stat.bgColor} rounded-2xl px-5 py-3 border ${stat.borderColor} 
                            shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] 
                            transition-all duration-500 hover:scale-[1.02] group overflow-hidden`}
                        >
                            {/* Gradient glow overlay */}
                            <div className={`absolute inset-0 bg-linear-to-br ${stat.glowColor} opacity-0 group-hover:opacity-100 
                                transition-opacity duration-500 rounded-2xl`}></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">{stat.title}</h3>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl 
                                        backdrop-blur-sm bg-white/30 border border-white/40 shadow-sm`}>
                                        {stat.icon}
                                    </div>
                                </div>

                                <div className="flex items-end justify-between">
                                    <div>
                                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                                        <div className="text-sm text-gray-700">{stat.change}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content - Chart and Marquee */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                        <Chart />
                    </div>
                    <div className="lg:col-span-2">
                        <Marquee />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherStation;
