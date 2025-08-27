import React from 'react';

interface QuestionBoxProps {
    title: string;
    icon: React.ReactNode;
    titleColorClass?: string;
    children: React.ReactNode;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ title, icon, titleColorClass = 'text-blue-800', children }) => {
    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className={`font-bold text-lg mb-3 flex items-center ${titleColorClass}`}>
                {icon}
                <span className="ml-2">{title}</span>
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-2">
                {children}
            </div>
        </div>
    );
};

export default QuestionBox;