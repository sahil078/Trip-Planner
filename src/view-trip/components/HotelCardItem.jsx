import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ item }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        item && GetPlaceImg();
    }, [item]);

    const GetPlaceImg = async () => {
        const result = await GetPlaceDetails(item?.hotelName).catch(error => {
            console.error('Error fetching place details:', error);
        });

        if (result && result.data && result.data.results && result.data.results.length > 0) {
            const placeData = result.data.results[0];

            // Assuming TomTom API returns an image URL
            const imageUrl = placeData.poi ? placeData.poi.image : null; // Adjust based on the actual API response
            setPhotoUrl(imageUrl || '/public/road-trip-vacation.jpg'); // Default image if none is available
        }
    };

    return (
        <div>
            <Link to={`https://www.tomtom.com/maps/search/?api=1&query=${item?.hotelName},${item?.hotelAddress}`} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img 
                        src={photoUrl ? photoUrl : '/public/road-trip-vacation.jpg'} 
                        className='rounded-xl h-[180px] w-full object-cover' 
                        alt={item?.hotelName} 
                    />
                    <div className='my-3 py-2'>
                        <h2 className='font-medium'>{item?.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📍{item?.hotelAddress}</h2>
                        <h2 className='text-sm'>💰{item?.price}</h2>
                        <h2 className='text-sm'>⭐{item?.rating}</h2>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default HotelCardItem;
