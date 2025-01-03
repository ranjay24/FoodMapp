import { useRestaurantStore } from "@/store/useRestaurantStore";
import React, { useEffect, useState } from "react";

const TrackOrder: React.FC = () => {
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
  const [restaurantLocation, setRestaurantLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { restaurant } = useRestaurantStore();
  const restaurantAddress = restaurant?.address || "Paithan Rd, Kanchanwadi, Chhatrapati Sambhaji Nagar, Maharashtra 431001"; // Use the address from the restaurant state
  useEffect(() => {
    // Fetch restaurant location using address
    getCoordinatesFromAddress(restaurantAddress).then((coordinates) => {
      if (coordinates) {
        setRestaurantLocation(coordinates);
      } else {
        alert("Could not fetch restaurant location.");
      }
    });
  }, [restaurantAddress]);

  useEffect(() => {
    // Dynamically track user's location
    let watchId: number | null = null;

    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error fetching user's location:", error.message);
            alert("Unable to fetch your location. Please check location permissions.");
          },
          {
            enableHighAccuracy: true, // Request high accuracy GPS
            maximumAge: 0, // Do not use a cached position
            timeout: 10000, // Set a timeout for the location fetch
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    };

    fetchUserLocation();

    return () => {
      // Clear the watch position listener when the component unmounts
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // Initialize the map once both userLocation and restaurantLocation are available
  useEffect(() => {
    if (userLocation && restaurantLocation) {
      const initMap = () => {
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          zoom: 14,
          center: userLocation,
        });

        // Add a marker for the user's location
        const userMarker = new google.maps.Marker({
          position: userLocation,
          map,
          title: "Your Location",
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        });

        // Add a marker for the restaurant location
        new google.maps.Marker({
          position: restaurantLocation,
          map,
          title: "Restaurant Location",
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        });

        // Initialize directions service and renderer
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map,
          suppressMarkers: true, // Suppress default markers
        });

        // Calculate and display the route
        const calculateRoute = () => {
          directionsService.route(
            {
              origin: userLocation,
              destination: restaurantLocation,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
              if (status === google.maps.DirectionsStatus.OK && response) {
                directionsRenderer.setDirections(response);

                // Extract and set the estimated delivery time
                if (response.routes && response.routes.length > 0) {
                  const route = response.routes[0];
                  if (route.legs && route.legs.length > 0) {
                    const leg = route.legs[0];
                    if (leg.duration) {
                      setEstimatedTime(leg.duration.text); // Format like "20 mins"
                    }
                  }
                }
              } else {
                console.error("Directions request failed due to: " + status);
              }
            }
          );
        };

        calculateRoute();

        // Update the user's marker and re-center the map dynamically
        const updateUserMarker = () => {
          userMarker.setPosition(userLocation);
          map.setCenter(userLocation);
          calculateRoute(); // Recalculate the route based on the updated location
        };

        // Add a listener for user location changes
        const observer = new MutationObserver(() => {
          if (userLocation) {
            updateUserMarker();
          }
        });

        observer.observe(document.getElementById("map") as HTMLElement, { attributes: true, childList: true });

        return () => observer.disconnect();
      };

      // Call the map initialization function
      initMap();
    }
  }, [userLocation, restaurantLocation]);

  return (
    <div className="font-serif flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Track Your Order</h1>
    <div id="map" className="w-full h-80 mb-6 rounded-lg shadow-lg bg-gray-300"></div>
    
    {estimatedTime && (
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
        <div className="bg-yellow-500 rounded-full w-16 h-16 flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3143/3143267.png"
            alt="Delivery Icon"
            className="w-10 h-10"
          />
        </div>
        <div className="text-left">
          <h3 className="text-xl font-semibold text-gray-700">Estimated Delivery Time</h3>
          <p className="text-lg text-gray-600">{estimatedTime}</p>
        </div>
      </div>
    )}
  </div>
  
  );
};

// Utility function for Geocoding
async function getCoordinatesFromAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const apiKey = "AIzaSyAfGrxgDpMfg0_K14Ph2VPepvqmD5wSsNM"; // Replace with your Google API key
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );

    const data = await response.json();
    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      console.error("Error fetching location from address:", data.status);
      return null;
    }
  } catch (error) {
    console.error("Error in geocoding:", error);
    return null;
  }
}

export default TrackOrder;

