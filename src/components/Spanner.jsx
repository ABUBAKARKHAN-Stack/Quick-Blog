import React, { useEffect, useState } from 'react';
import spannerImage from '../assets/spanner-1.svg'; // Adjust the path as needed

function Spanner() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 3 seconds (3000 ms)
        }, 2000);

        // Cleanup the timer when the component unmounts to avoid memory leaks
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <img src={spannerImage} alt="Loader" className="w-20" />
            </div>
        );
    }

    return null; // Return null or alternative content when not loading
}

export default Spanner;
