document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url-input');
    const generateBtn = document.getElementById('generate-btn');
    const svgBtn = document.getElementById('download-svg');
    const pngBtn = document.getElementById('download-png');
    const canvasContainer = document.getElementById('canvas-container');

    let qrCode;

    // Initialize QR Code Styling
    function initQRCode(data) {
        qrCode = new QRCodeStyling({
            width: 200,
            height: 200,
            type: "svg",
            data: data,
            dotsOptions: {
                color: "#0f172a",
                type: "extra-rounded"
            },
            backgroundOptions: {
                color: "#ffffff",
            },
            cornersSquareOptions: {
                type: "extra-rounded",
                color: "#0f172a"
            },
            cornersDotOptions: {
                type: "extra-rounded",
                color: "#0f172a"
            }
        });

        // Clear container and append new QR
        canvasContainer.innerHTML = '';
        qrCode.append(canvasContainer);

        // Add a slight delay to ensure it's rendered, then enable downloads
        setTimeout(() => {
            svgBtn.disabled = false;
            pngBtn.disabled = false;
        }, 100);
    }

    // Handle Generation
    generateBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();

        if (!url) {
            alert('Please enter a valid URL');
            return;
        }

        // Visual feedback
        generateBtn.classList.add('loading');
        canvasContainer.classList.add('pulse');

        // Initialize/Update QR
        if (!qrCode) {
            initQRCode(url);
        } else {
            qrCode.update({
                data: url
            });
        }

        // Reset button state
        setTimeout(() => {
            generateBtn.classList.remove('loading');
            canvasContainer.classList.remove('pulse');
        }, 600);
    });

    // Handle SVG Download
    svgBtn.addEventListener('click', () => {
        if (qrCode) {
            qrCode.download({
                name: "qr-aura-code",
                extension: "svg"
            });
        }
    });

    // Handle PNG Download
    pngBtn.addEventListener('click', () => {
        if (qrCode) {
            qrCode.download({
                name: "qr-aura-code",
                extension: "png"
            });
        }
    });

    // Handle Enter key in input
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });

    // Auto-generate initial QR if value exists
    if (urlInput.value) {
        initQRCode(urlInput.value);
    }
});
