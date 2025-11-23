import { navLinks } from "../constants";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';

const NavBar = () => {
    const { t } = useTranslation();

    const scrollToSection = (navKey) => {
        const sectionMap = {
            'services': 'code-terminal',
            'projects': 'features',
            'about': 'highlights',
            'contact': 'contact'
        };

        const sectionId = sectionMap[navKey];
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const navItems = ['services', 'projects', 'about', 'contact'];

    return (
        <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
            <nav className="flex w-full screen-max-width items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="./lightning.svg" alt="CodeSpark" width={24} height={24} />
                    <span className="text-white font-bold text-lg">CodeSpark</span>
                </div>

                <div className="flex flex-1 justify-center max-sm:hidden">
                    {navItems.map((navKey) => (
                        <button
                            key={navKey}
                            onClick={() => scrollToSection(navKey)}
                            className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
                        >
                            {t(`nav.${navKey}`)}
                        </button>
                    ))}
                </div>

                <LanguageSwitcher />
            </nav>
        </header>
    )
}

export default NavBar
