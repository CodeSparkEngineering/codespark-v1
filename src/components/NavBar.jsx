import { navLinks } from "../constants";

const NavBar = () => {
    const scrollToSection = (nav) => {
        const sectionMap = {
            'Services': 'code-terminal',
            'Projects': 'features',
            'About': 'highlights',
            'Contact': 'contact'
        };

        const sectionId = sectionMap[nav];
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
            <nav className="flex w-full screen-max-width items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="./lightning.svg" alt="CodeSpark" width={24} height={24} />
                    <span className="text-white font-bold text-lg">CodeSpark</span>
                </div>

                <div className="flex flex-1 justify-center max-sm:hidden">
                    {['Services', 'Projects', 'About', 'Contact'].map((nav) => (
                        <button
                            key={nav}
                            onClick={() => scrollToSection(nav)}
                            className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
                        >
                            {nav}
                        </button>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default NavBar
