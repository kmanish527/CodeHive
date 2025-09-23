import React from 'react';
import { Link } from 'react-router-dom';

const CodeHiveLogo = () => (
    <div className="flex items-center justify-center mb-6">
        <img src="public/image/Logo.png" alt="CodeHive Logo" className="w-48 h-auto" />
    </div>
);


export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-zinc-900" > {/* ✅ Background color from Image 3 */}
            <div className="text-center p-8 bg-zinc-800 rounded-lg shadow-xl max-w-2xl mx-auto ">
                <CodeHiveLogo />
                <h1 className="text-6xl font-extrabold text-white mb-4">OOPS! PAGE NOT FOUND.</h1>
            
                <p className="text-xl text-zinc-300 leading-relaxed mb-8">
                    You must have picked the wrong door because I haven't been able to lay my eye on the page you've been searching for.
                </p> 
                
                <Link
                    to="/"
                    className="px-8 py-3 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 transition-colors text-lg" 
                >
                    BACK TO HOME
                </Link>
            </div>
        </div>
    );
}