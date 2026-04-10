# Image ML API (Hugging Face)

A production-ready image classification API built with FastAPI and Hugging Face Transformers.

## Features
- **Pre-trained Model**: Uses `google/vit-base-patch16-224` (Vision Transformer).
- **FastAPI**: Modern, fast web framework for building APIs.
- **Persistence Caching**: Models are cached locally in the `models/` directory.
- **Lifespan Warmup**: Model is loaded into memory at startup to ensure low latency for the first request.
- **Containerized**: Ready for deployment with Docker and Google Cloud Run.

## Project Structure
```text
image-ml-api/
├── app/
│   ├── main.py          # FastAPI app and endpoints
│   ├── model.py         # Model loading/caching
│   ├── inference.py     # Prediction logic
│   └── utils.py         # Image utilities
├── models/              # Local cache (gitignored)
├── requirements.txt
├── Dockerfile
└── README.md
```

## Local Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run Locally**:
   ```bash
   uvicorn app.main:app --reload
   ```

3. **Test the API**:
   - Health check: `GET http://localhost:8000/health`
   - Predict: `POST http://localhost:8000/predict` with a multipart form-data `file`.

## Docker Usage

1. **Build the Image**:
   ```bash
   docker build -t image-ml-api .
   ```

2. **Run the Container**:
   ```bash
   docker run -p 8000:8000 -v $(pwd)/models:/app/models image-ml-api
   ```

## GCP Deployment (Cloud Run)

### 1. Basic Deployment
1. **Build and Tag**:
   ```bash
   gcloud builds submit --tag gcr.io/[PROJECT_ID]/image-ml-api
   ```
2. **Deploy**:
   ```bash
   gcloud run deploy image-ml-api \
     --image gcr.io/[PROJECT_ID]/image-ml-api \
     --memory 2Gi \
     --allow-unauthenticated
   ```

### 2. Professional Deployment (Custom Domain)
To map a custom domain (e.g., `api.yourdomain.com`) professionally:
1. **Reserve Static IP**: `gcloud compute addresses create image-ml-api-ip --global`
2. **Create Serverless NEG**: `gcloud compute network-endpoint-groups create image-ml-api-neg --region=us-central1 --network-endpoint-type=serverless --cloud-run-service=image-ml-api`
3. **Configure Load Balancer**: Use the Google Cloud Console or `gcloud` to create an HTTP(S) Load Balancer using the NEG as a backend and attaching a Google-managed SSL certificate.
4. **Update DNS**: Set an `A` record for your domain to the Reserved Static IP.

## Example Request (curl)
```bash
curl -X POST "http://localhost:8000/predict" -F "file=@cat.jpg"
```
