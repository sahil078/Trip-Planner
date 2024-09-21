import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      GetPlaceImg();
    }
  }, [trip]);

  const GetPlaceImg = async () => {
    const data = trip?.userSelection?.location; // Directly use the location
    try {
      const response = await GetPlaceDetails(data);
      const places = response.results; // Access the results array

      if (places.length > 0 && places[0].photos && places[0].photos.length > 0) {
        const photoRef = places[0].photos[0].photoReference; // Get the first photo reference
        const PhotoUrl = `https://api.tomtom.com/media/v1/photos/${photoRef}?key=${import.meta.env.VITE_TOMTOM_API_KEY}`;
        setPhotoUrl(PhotoUrl); // Set the photo URL state
      } else {
        console.log("No photos available for this place.");
        setPhotoUrl('/path/to/default/image.jpg'); // Fallback image
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      setPhotoUrl('/path/to/default/image.jpg'); // Fallback image on error
    }
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className='hover:scale-105 transition-all hover:shadow-sm'>
        <img src={'/public/road-trip-vacation.jpg'} className='rounded-xl h-[200px] w-full object-cover' alt={trip?.userSelection?.location} />
        <div>
          <h2 className='font-medium text-lg'>{trip?.userSelection?.location}</h2>
          <h2 className="text-sm text-gray-600">{trip?.userSelection?.totalDays} Days trip with {trip?.userSelection?.budget}</h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
