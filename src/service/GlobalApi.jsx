import axios from "axios";

const BASE_URL = 'https://api.tomtom.com/search/2/search.json';

const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export const GetPlaceDetails = async (query) => {
    const apiKey = import.meta.env.VITE_TOMTOM_API_KEY; // Use your TomTom API key
    const url = `${BASE_URL}?key=${apiKey}&query=${encodeURIComponent(query)}&limit=10`; // Adjust query parameters as needed

    try {
        const response = await axios.get(url, config);
        const placeData = response.data;

        const image = placeData.image;
        console.log(image);

        // Add photo URL to the place data
        if (placeData.results.length > 0) {
            const firstPlace = placeData.results[0]; // Get the first result

            if (firstPlace.photos && firstPlace.photos.length > 0) {
                const photoRef = firstPlace.photos[0].name; // Access photo reference
                const photoUrl = GetPhotoUrl(photoRef); // Construct photo URL
                firstPlace.photoUrl = photoUrl; // Add photo URL to the first place object
            }
        }

        return placeData; // Return the place details with photo URL if available
    } catch (error) {
        console.error("Error fetching place details:", error);
        throw error; // Propagate error for handling
    }
};

export const GetPhotoUrl = (photoRef) => {
    return `https://api.tomtom.com/media/v1/photos/${photoRef}?key=${import.meta.env.VITE_TOMTOM_API_KEY}`;
};