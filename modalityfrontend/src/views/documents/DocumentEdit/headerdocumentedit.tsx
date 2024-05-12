// HeaderGoBack.tsx
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const HeaderGoBack = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate('/companies/company-edit/:companyid')
    }

    return (
        <button onClick={handleGoBack} className="flex items-center">
            <HiArrowLeft className="text-lg text-emerald-500" />
            <span className="text-emerald-500 text-sm font-semibold ml-1">
                Back
            </span>
        </button>
    )
}

export default HeaderGoBack
