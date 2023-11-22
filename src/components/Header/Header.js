import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            {/* <div className="bg-sky-500 px-4 py-2 mb-4">
                <div className="mx-auto max-w-[1150px] px-4">
                    <div className="font-bold text-xl text-white">Summary</div>
                </div>
            </div> */}
            <div className="bg-sky-500 px-4 py-2 mb-4">
                <div className="mx-auto max-w-[1150px] px-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="font-bold text-xl text-white">Calendar</Link>
                        <div className="flex justify-end gap-2">
                         
                            <Link to="/summary" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Summary
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
