import { useTranslation } from 'react-i18next';

const Marquee = () => {
    const { t } = useTranslation();
    const notices = t('marquee.notices', { returnObjects: true }) || [];

    return (
        <div className="w-full border border-gray-200 rounded-2xl shadow-lg p-5">
            <marquee
                direction="up"
                className="h-94"
                scrollamount="4"
                onMouseOver={(e) => e.currentTarget.stop()}
                onMouseOut={(e) => e.currentTarget.start()}
            >
                <div className="flex flex-col gap-4">
                    {notices.map((notice) => (
                        <div
                            key={notice.id}
                            className={`border p-3 rounded-xl transition-all duration-300 hover:shadow-md ${notice.title.includes('Alert')
                                ? 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100'
                                : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
                                }`}
                        >
                            <h3 className="font-semibold text-md mb-1">{notice.title}</h3>
                            <p className="text-sm">{notice.body}</p>
                        </div>
                    ))}
                </div>
            </marquee>
        </div>
    );
};

export default Marquee;
