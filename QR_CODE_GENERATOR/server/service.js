const qrCode = require("qrcode");

module.exports = {
    formatData: (data) => {
        const { id, prize } = data;
        const qrCodeText = `Product ID:${id}, Product price $${prize}`;
        return qrCodeText;
    },
    generateQrCode: async (text) => {
        const options = {
            errorCorrectionLevel: "M",
            margin: 1, // Corrected to integer value
            type: "image/png"
        };
        const imageGenerated = await qrCode.toBuffer(text, options); // Correct order of arguments
        return imageGenerated;
    }
};
