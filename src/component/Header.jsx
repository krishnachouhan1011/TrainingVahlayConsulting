import React, { useState, useRef, useEffect } from 'react';
import {
    Search,
    LayoutGrid,
    List,
    Filter,
    ChevronDown,
    Star,
    PlayCircle,
    Award,
    BookOpen,
    MoreHorizontal,
    Menu,
    User,
    Bell,
    Download,
    Clock,
    CheckCircle,
    Home,
    GraduationCap
} from 'lucide-react';

// ... (rest of the imports and mock data remain the same)

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const menuOptions = [
        {
            id: 1,
            label: "Home",
            icon: <Home size={18} className="text-gray-500" />,
            href: "#"
        },
        {
            id: 2,
            label: "Training",
            icon: <GraduationCap size={18} className="text-gray-500" />,
            href: "#"
        }
    ];

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Left Section */}
                    <div className="flex items-center gap-8">
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`p-2 rounded-lg flex items-center gap-2 transition-colors ${isMenuOpen ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100 text-gray-600'} cursor-pointer`}
                            >
                                <Menu size={20} />
                                <span className="text-sm font-medium hidden sm:inline">Menu</span>
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                                    <div className="py-2">
                                        {menuOptions.map((option) => (
                                            <a
                                                key={option.id}
                                                href={option.href}
                                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50  transition-colors group"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <div className="group-hover:scale-110 transition-transform">
                                                    {option.icon}
                                                </div>
                                                <span className="font-medium">{option.label}</span>
                                            </a>
                                        ))}

                                        {/* Divider */}
                                        <div className="border-t border-gray-100 my-1"></div>

                                        {/* Current Page Indicator */}
                                        <div className="px-4 py-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                <span className="text-xs text-gray-500 font-medium">Currently on: Course Catalog</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Logo and Title */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-linear-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-sm">
                                <GraduationCap size={18} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-800">Learning Portal</h1>
                                <p className="text-xs text-gray-500">Course Catalog</p>
                            </div>
                        </div>

                        {/* Navigation Tabs - Visible on larger screens */}
                        <div className="hidden md:flex items-center gap-6 ml-8">
                            <a
                                href="#"
                                className="flex items-center gap-2 text-sm font-medium text-red-600 pb-1 border-b-2 border-red-600"
                            >
                                <Home size={16} />
                                Home
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 text-sm font-medium text-gray-600  pb-1 border-b-2 border-transparent hover:border-red-600 transition-colors"
                            >
                                <GraduationCap size={16} />
                                Training
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 text-sm font-medium text-gray-600  pb-1 border-b-2 border-transparent hover:border-red-600 transition-colors"
                            >
                                <Award size={16} />
                                Certifications
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 text-sm font-medium text-gray-600  pb-1 border-b-2 border-transparent hover:border-red-600 transition-colors"
                            >
                                <BookOpen size={16} />
                                Resources
                            </a>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Search Button - Visible on larger screens */}
                        <button className="hidden md:flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                            <Search size={20} className="text-gray-600" />
                            <span className="text-sm text-gray-600">Search</span>
                        </button>

                        {/* Notification */}
                        <button className="p-2 hover:bg-gray-100 rounded-lg relative group cursor-pointer">
                            <Bell size={20} className="text-gray-600 transition-colors" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
                            <div className="absolute -top-2 -right-2 w-3 h-3">
                                <div className="w-full h-full bg-red-400 rounded-full animate-ping opacity-75"></div>
                            </div>
                        </button>

                        {/* User Profile */}
                        <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg group cursor-pointer">
                            <div className="relative">
                                <div className="w-8 h-8 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-sm">
                                    <User size={16} className="text-gray-600" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-700">John Doe</p>
                                <p className="text-xs text-gray-500">Student</p>
                            </div>
                            <ChevronDown size={16} className="text-gray-400 transition-colors hidden md:block" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Tabs - Hidden on larger screens */}
                <div className="md:hidden py-3 border-t border-gray-100">
                    <div className="flex items-center justify-around">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-1 text-red-600"
                        >
                            <Home size={18} />
                            <span className="text-xs font-medium">Home</span>
                        </a>
                        <a
                            href="#"
                            className="flex flex-col items-center gap-1 text-gray-600"
                        >
                            <GraduationCap size={18} />
                            <span className="text-xs font-medium">Training</span>
                        </a>
                        <a
                            href="#"
                            className="flex flex-col items-center gap-1 text-gray-600"
                        >
                            <Award size={18} />
                            <span className="text-xs font-medium">Certifications</span>
                        </a>
                        <a
                            href="#"
                            className="flex flex-col items-center gap-1 text-gray-600"
                        >
                            <BookOpen size={18} />
                            <span className="text-xs font-medium">Resources</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;