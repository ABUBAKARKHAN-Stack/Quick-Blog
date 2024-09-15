import React, { useEffect, useState } from 'react'
import ButtonSpinner  from '../assets/button-spinner.svg'

function ButtonSpanner() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 3 seconds (2000 ms)
        }, 2500);

        // Cleanup the timer when the component unmounts to avoid memory leaks
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <img src={ButtonSpinner} alt="button spinner" className='w-8' />

    return null;
}
export default ButtonSpanner
