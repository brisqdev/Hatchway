export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo and Brand Name */}
                    <div className="flex-shrink-0 flex items-center">
                        <div className="flex items-center">
                            <img
                                className="h-15.5 w-auto translate-y-0.75"
                                src="/favicon.png"
                                alt="Hatchway Logo"
                            />
                            <h1 className="ml-0.5 text-2xl font-bold text-gray-900">Hatchway</h1>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="md:ml-6 md:flex space-x-8">
                        <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition-colors duration-200">
                            Home
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}