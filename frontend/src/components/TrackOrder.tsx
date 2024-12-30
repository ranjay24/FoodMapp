// import React, { useEffect, useState } from "react";

// // Function to extract latitude and longitude from a URL

// // function getCoordinatesFromUrl(url: string): { latitude: number; longitude: number } | null {
// //   try {
// //     // Parse the URL
// //     const parsedUrl = new URL(url);
// //     // Extract latitude and longitude from query parameters
// //     const latitude = parseFloat(parsedUrl.searchParams.get("lat") || "");
// //     const longitude = parseFloat(parsedUrl.searchParams.get("lng") || "");

// //     // Validate the extracted values
// //     if (isNaN(latitude) || isNaN(longitude)) {
// //       throw new Error("Invalid latitude or longitude");
// //     }

// //     // Return the extracted coordinates
// //     return { latitude, longitude };
// //   } catch (error) {
// //     // Check if error is an instance of Error
// //     if (error instanceof Error) {
// //       console.error("Error extracting coordinates:", error.message);
// //     } else {
// //       console.error("An unknown error occurred while extracting coordinates.");
// //     }
// //     return null;
// //   }
// // }
// //------------------------------------------------------------
// const TrackOrder: React.FC = () => {
//   const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
// //19.8288555856858, 75.28598731306451 19.878457636305754, 75.36614495767162
//   const restaurantLocation = {lat: 19.878457636305754, lng: 75.36614495767162 }; // Example restaurant coordinates
//   // const restaurantUrl = "https://maps.app.goo.gl/hvJYo7qgzKHKPGkZ8";
//   // const coordinates = getCoordinatesFromUrl(restaurantUrl);
//   // const restaurantLocation = { lat: coordinates.latitude, lng: coordinates.longitude };
  
//   useEffect(() => {
//     const initMap = (userLocation: google.maps.LatLngLiteral) => {
//       // Initialize the map centered at the user's location
//       const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
//         zoom: 14,
//         center: userLocation,
//       });

//       // Add a marker for the user's location
//       new google.maps.Marker({
//         position: userLocation,
//         map,
//         title: "Your Location",
//         icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//       });

//       // Add a marker for the restaurant location
//       new google.maps.Marker({
//         position: restaurantLocation,
//         map,
//         title: "Restaurant Location",
//         icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       });

//       // Initialize directions service and renderer
//       const directionsService = new google.maps.DirectionsService();
//       const directionsRenderer = new google.maps.DirectionsRenderer({
//         map,
//         suppressMarkers: true, // Suppress default markers
//       });

//       // Calculate and display the route
//       directionsService.route(
//         {
//           origin: userLocation,
//           destination: restaurantLocation,
//           travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (response, status) => {
//           if (status === google.maps.DirectionsStatus.OK && response) {
//             directionsRenderer.setDirections(response);

//             // Extract and set the estimated delivery time
//             if (response.routes && response.routes.length > 0) {
//               const route = response.routes[0];
//               if (route.legs && route.legs.length > 0) {
//                 const leg = route.legs[0];
//                 if (leg.duration) {
//                   setEstimatedTime(leg.duration.text); // Format like "20 mins"
//                 }
//               }
//             }
//           } else {
//             console.error("Directions request failed due to: " + status);
//           }
//         }
//       );
//     };

//     const fetchUserLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const userLocation = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             };
//             initMap(userLocation);
//           },
//           (error) => {
//             console.error("Error fetching user's location:", error.message);
//             alert("Unable to fetch your location. Please check location permissions.");
//           }
//         );
//       } else {
//         alert("Geolocation is not supported by your browser.");
//       }
//     };

//     fetchUserLocation();
//   }, []);

//   return (
//     <div>
//       <h1 style={{ textAlign: "center", margin: "20px 0", fontSize: "24px", fontWeight: "bold" }}>
//         Track Your Order
//       </h1>
//       <div id="map" style={{ width: "100%", height: "500px", marginBottom: "20px" }}></div>
//       {estimatedTime && (
//         <div
//           style={{
//             margin: "0 auto",
//             padding: "20px",
//             maxWidth: "400px",
//             textAlign: "center",
//             borderRadius: "15px",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//             backgroundColor: "#fff",
//             display: "flex",
//             alignItems: "center",
//             gap: "15px",
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "#FFD700",
//               borderRadius: "50%",
//               width: "60px",
//               height: "60px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3143/3143267.png"
//               alt="Delivery Icon"
//               style={{ width: "40px", height: "40px" }}
//             />
//           </div>
//           <div style={{ textAlign: "left" }}>
//             <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "bold", color: "#333" }}>
//               Estimated Delivery Time
//             </h3>
//             <p style={{ margin: 0, fontSize: "18px", color: "#555" }}>{estimatedTime}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TrackOrder;


//-------------------------------------------------------------------------------------------------------------------------------------------



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
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0", fontSize: "24px", fontWeight: "bold" }}>
        Track Your Order
      </h1>
      <div id="map" style={{ width: "100%", height: "500px", marginBottom: "20px" }}></div>
      {estimatedTime && (
        <div
          style={{
            margin: "0 auto",
            padding: "20px",
            maxWidth: "400px",
            textAlign: "center",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFD700",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3143/3143267.png"
              alt="Delivery Icon"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "bold", color: "#333" }}>
              Estimated Delivery Time
            </h3>
            <p style={{ margin: 0, fontSize: "18px", color: "#555" }}>{estimatedTime}</p>
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

