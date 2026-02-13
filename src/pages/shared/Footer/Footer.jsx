import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router';
import { Droplets } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white border-t border-gray-200">
            <div className="container mx-auto px-4 pb-5 pt-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 mb-8">

                    {/* Brand */}
                    <div className="space-y-5">
                        <NavLink to="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 
                                    rounded-xl flex items-center justify-center shadow-md 
                                    group-hover:shadow-lg transition-shadow duration-300">
                                <Droplets className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-2xl lg:text-3xl font-bold text-green-600 tracking-tight">
                                {t('brand')}
                            </span>
                        </NavLink>
                        <p className="text-sm leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold mb-3">{t('footer.navigationLabel')}</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-green-500 text-sm">{t('nav.home')}</Link></li>
                            <li><Link to="/about" className="hover:text-green-500 text-sm">{t('nav.about')}</Link></li>
                            <li><Link to="/highlight" className="hover:text-green-500 text-sm">{t('nav.highlight')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-3">{t('footer.contactLabel')}</h3>
                        <ul className="space-y-3 text-sm">
                            <li className='hover:text-green-500 hover:underline'><a href="mailto:contact@smartirrigation.com">contact@smartirrigation.com</a></li>
                            <li className='hover:text-green-500 hover:underline'><a href="tel:+15551234567">+1 (555) 123-4567</a></li>
                            <li>{t('footer.contact.2.value')}</li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold mb-3">{t('footer.legalLabel')}</h3>
                        <ul className="space-y-2">
                            <li><Link to="/privacy" className="hover:text-green-500 text-sm">{t('footer.legal.0.title')}</Link></li>
                            <li><Link to="/terms" className="hover:text-green-500 text-sm">{t('footer.legal.1.title')}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-sm text-gray-400">
                    {t('footer.copyright', { year: currentYear })}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
