const socket = io(); // Ensure socket connection is initialized first

if (navigator.geolocation) {
    // Get initial location when the map loads
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords; // Destructure coordinates

            // Set initial map view to user's location
            map.setView([latitude, longitude], 13);

            // Add a marker for the user's initial position
            userMarker = L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup("You are here")
                .openPopup();
            
        },
        (error) => {
            console.error("Geolocation error (initial load):", error);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        }
    );

    // Watch for location changes
    navigator.geolocation.watchPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords; // Destructure coordinates
            socket.emit("send-location", { latitude, longitude }); // Send to backend

            // Update the map view to user's location
            map.setView([latitude, longitude], 13);

            // Add or update the user's marker
            if (!userMarker) {
                userMarker = L.marker([latitude, longitude]).addTo(map);
            } else {
                userMarker.setLatLng([latitude, longitude]);
            }
        },
        (error) => {
            console.error("Geolocation error (watching):", error);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 2); // Initialize the map with a global view
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Devs",
}).addTo(map);

let markers = {}; // To hold other users' markers
let userMarker; // Declare the user's marker

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]); // Update the existing marker
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map); // Add a new marker if not present
    }
});

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]); // Remove the disconnected user's marker
        delete markers[id]; // Clean up the markers object
    }
});
