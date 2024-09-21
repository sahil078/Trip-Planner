import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        place && GetPlaceImg();
    }, [place]);

    const GetPlaceImg = async () => {
        const result = await GetPlaceDetails(place.placeName).catch(error => {
            console.error('Error fetching place details:', error);
        });

        if (result && result.data && result.data.results && result.data.results.length > 0) {
            const placeData = result.data.results[0];

            // Check if there's a photo available
            if (placeData.poi && placeData.poi.openingHours) {
                // Replace with your desired photo handling logic
                const imageUrl = placeData.poi.image; // Check how TomTom returns images
                setPhotoUrl(imageUrl || '/public/road-trip-vacation.jpg'); // Default image if none is available
            }
        }
    };

    return (
        <div>
            <Link to={`https://www.tomtom.com/maps/search/?api=1&query=${place?.placeName},${place?.geoCoordinates}`} target='_blank'>
                <div className='my-4 bg-gray-50 p-2 gap-2 border rounded-lg flex flex-cols-2 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                    <div className='py-2 mx-3'>
                        <img 
                            src={photoUrl ? photoUrl : '/public/road-trip-vacation.jpg'} 
                            className='w-[140px] h-[140px] rounded-xl object-cover' 
                            alt={place?.placeName}
                        />
                    </div>
                    <div>
                        <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                        <h2 className='font-bold'>{place.placeName}</h2>
                        <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                        <h2 className='text-blue-700 text-sm'>{place.ticketPricing}</h2>
                        <h2 className='text-sm text-yellow-500'>⭐{place.rating}</h2>
                    </div>
                    <div className='mt-36'>
                        <Button><FaLocationDot /></Button>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PlaceCardItem;
