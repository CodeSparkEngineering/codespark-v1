import { footerLinks, socialMedia } from "../constants/index.js";
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer id="contact" className="py-10 sm:px-10 px-5">
            <div className="screen-max-width">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex flex-col gap-4 items-center md:items-start">
                        <div className="flex items-center gap-2">
                            <img src="./lightning.svg" alt="CodeSpark logo" width={24} height={24} />
                            <h3 className="text-xl font-bold text-white">{t('hero.title')}</h3>
                        </div>
                        <p className="text-gray text-sm font-semibold text-center md:text-left max-w-xs">
                            {t('footer.tagline')}
                        </p>
                        <p className="text-gray text-xs">
                            {t('footer.contactPrefix')} <a href="mailto:codespark.dev@proton.me" className="text-blue hover:underline">codespark.dev@proton.me</a> {t('footer.contactOr')} <a href="https://wa.me/message/D4VY7QSTGWJXO1" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">{t('footer.whatsapp')}</a>
                        </p>
                    </div>

                    <div className="flex gap-4">
                        {socialMedia.map((item) => (
                            <a
                                key={item.id}
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative w-12 h-12 flex justify-center items-center rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 hover:from-blue-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/50"
                            >
                                {/* Animated background glow */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

                                {item.icon === 'instagram' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-gray-300 group-hover:text-white transition-all duration-300 group-hover:rotate-12">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                )}
                                {item.icon === 'github' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-gray-300 group-hover:text-white transition-all duration-300 group-hover:rotate-12">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                )}
                                {item.icon === 'email' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-gray-300 group-hover:text-white transition-all duration-300 group-hover:rotate-12">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                )}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="bg-neutral-700 my-5 h-[1px] w-full" />

                <div className="flex md:flex-row flex-col md:items-center justify-between">
                    <p className="font-semibold text-gray text-xs text-center md:text-left">
                        {t('footer.copyright')} <br />
                        <span className="text-gray-500">{t('footer.founder')}</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
export default Footer
