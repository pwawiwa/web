import { initCursor } from '../cursor.js';

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    
    const predictBtn = document.getElementById('predict-btn');
    const imageFile = document.getElementById('image-file');
    const resultsDiv = document.getElementById('results');

    predictBtn.addEventListener('click', async () => {
        if (!imageFile.files || imageFile.files.length === 0) {
            resultsDiv.innerHTML = '<p style="color: red;">Please select an image file first.</p>';
            return;
        }

        const file = imageFile.files[0];
        const formData = new FormData();
        formData.append('file', file);

        resultsDiv.innerHTML = '<p>Classifying...</p>';

        try {
            const response = await fetch('https://image-ml-api-fxykwdtdta-as.a.run.app/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            // Assuming the API returns a JSON with 'prediction' and 'confidence'
            if (data && data.prediction && data.confidence) {
                resultsDiv.innerHTML = `
                    <h3>Prediction Results:</h3>
                    <p><strong>Prediction:</strong> ${data.prediction}</p>
                    <p><strong>Confidence:</strong> ${(data.confidence * 100).toFixed(2)}%</p>
                    <p><strong>Filename:</strong> ${data.filename}</p>
                `;
            } else {
                resultsDiv.innerHTML = `
                    <p style="color: orange;">Could not get a valid prediction from the API.</p>
                    <p><b>Raw API Response (for debugging):</b></p>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                `;
            }

        } catch (error) {
            console.error('Error during prediction:', error);
            resultsDiv.innerHTML = `<p style="color: red;">An error occurred: ${error.message}</p>`;
        }
    });
});
