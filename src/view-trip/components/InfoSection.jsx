import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && GetPlaceImg();
    }, [trip]);

    const GetPlaceImg = async () => {
        const result = await GetPlaceDetails(trip?.userSelection?.location).catch(error => {
            console.error('Error fetching place details:', error);
        });

        if (result && result.data && result.data.results && result.data.results.length > 0) {
            const placeData = result.data.results[0];
            
            // Assuming TomTom API returns an image URL
            const imageUrl = placeData.poi ? placeData.poi.image : null; // Check how TomTom returns images
            setPhotoUrl(imageUrl || '/public/road-trip-vacation.jpg'); // Default image if none is available
        }
    };

    return (
        <div>
            <img src={photoUrl ? photoUrl : '/public/road-trip-vacation.jpg'} className='h-[330px] w-full object-cover rounded-xl' />
            <div className='flex justify-between items-center'>
                <div className='my-6 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
                    <div className='flex gap-6 mt-4'>
                        <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>🗓️ {trip?.userSelection?.totalDays} Day</h2>
                        <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>👩‍👧‍👦 Number of Travelers: {trip?.userSelection?.traveler} People</h2>
                        <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>💵 {trip?.userSelection?.budget} Budget</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;
