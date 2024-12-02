const { formatData, generateQrCode } = require("./service");

module.exports.generateQr = async (req, res) => {
    try {
        const  data = req.body; // Get the data from the request body
        console.log("The data obj from the controller",data)
        const text = await formatData(data); // Format the data
        const qrCodeBuffer = await generateQrCode(text); // Generate the QR code buffer

        // Set headers for the response (force download of the image)
        res.setHeader('Content-Disposition', 'attachment; filename=qr_code.png');
        res.type('image/png').send(qrCodeBuffer); // Send the image as the response
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send({ error: 'Internal Server Error' }); // Handle errors
    }
};
