import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToHome = () => {
        navigate("/");
    }

    const navigateToSummary = () => {
        navigate("/summary");
    }

    return (
        <div className="bg-sky-500 px-4 py-2 mb-4">
            <div className="mx-auto max-w-[1150px] px-4">
                <div className="flex items-center justify-between">
                    <button onClick={navigateToHome} className="font-bold text-xl text-white">
                        Calendar
                    </button>
                    <div className="flex justify-end gap-2">

                        <button
                            onClick={navigateToSummary}
                            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${location.pathname === '/summary' ? 'bg-green-700' : ''
                                }`}
                        >
                            Summary
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
