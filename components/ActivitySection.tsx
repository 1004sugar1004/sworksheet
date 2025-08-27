
import React from 'react';

interface ActivitySectionProps {
    step: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    iframeSrc: string;
    children: React.ReactNode;
    isGrayBg?: boolean;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ step, title, description, icon, iframeSrc, children, isGrayBg = false }) => {
    return (
        <section className={`p-6 ${isGrayBg ? 'bg-gray-50' : ''}`}>
            {/* Section Header */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg mb-6 shadow-md">
                <div>
                    <span className="bg-amber-400 text-amber-900 py-1 px-3 rounded-full font-bold text-sm">
                        {step}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-1 flex items-center">
                        {icon}
                        <span className="ml-3">{title}</span>
                    </h2>
                    <p className="opacity-90">{description}</p>
                </div>
            </header>

            {/* Embedded App */}
            <div className="border-4 border-gray-200 rounded-xl overflow-hidden shadow-lg mb-6 bg-gray-200">
                <iframe src={iframeSrc} width="100%" height="500" className="border-none block" title={`${title} App`}></iframe>
            </div>

            {/* Questions */}
            {children}
        </section>
    );
};

export default ActivitySection;
