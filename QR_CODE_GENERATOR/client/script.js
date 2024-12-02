document.getElementById("qr-form").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const id = document.getElementById("qr-id").value;
    const prize = document.getElementById("qr-price").value;
    // Validate the input fields
    if (!id || !prize) {
        alert('Please fill in both fields.');
        return;
    }

    // Prepare the data object to send
    const data = { id, prize };

    // Setup the fetch options
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Corrected the content-type header
        },
        body: JSON.stringify(data), // Send data as a JSON string
    };

    // Send the request to the backend
    fetch("http://localhost:3000/generate-qr", options)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.blob(); // Get the binary data (image blob)
        })
        .then((blob) => {
            const qrImage = document.createElement('img');
            const qrImageUrl = URL.createObjectURL(blob); // Create a URL for the Blob object
            qrImage.src = qrImageUrl; // Set the image source

            // Clear any previous content and display the new QR code
            const qrResultDiv = document.getElementById('qr-result');
            qrResultDiv.innerHTML = ''; // Clear previous content
            qrResultDiv.appendChild(qrImage); // Append the new QR image
        })
        .catch(error => {
            console.error('Error generating QR code:', error); // Handle any errors
            alert('There was an error generating the QR code.');
        });
});
