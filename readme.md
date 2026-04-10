# Machine Learning Deployment & API Logic

> im no software engineer, this is indeed vibecoded.

This document serves as a reference for how the Image Classification system is architected, how the API handles data, and how to maintain the deployment on Google Cloud Platform.

---

## 1. How API Calling Works (The Bridge)
When a user interacts with the **ML Deployment** page, a Request-Response cycle occurs:

- **Frontend (JavaScript):** Located in [`js/pages/ml-deployment.js`](./js/pages/ml-deployment.js). It uses the `fetch()` API to send an image inside a `FormData` object to the Cloud Run endpoint via a **POST** request.
- **Backend (FastAPI):** Receives the request at the `/predict` endpoint, processes the image using the Hugging Face model, and returns a JSON response containing the label and confidence score.
- **Data Parsing:** The frontend calls `response.json()` on line 32 of the JS file to decode the results and update the UI dynamically.

---

## 2. ML Development Workflow (The Factory)
The deployment follows a professional ML Ops pipeline:

### Phase A: Model & API
- **Model:** Pre-trained Vision Transformer (ViT) via `transformers`.
- **Framework:** FastAPI for high-performance inference.
- **Logic:** `inference.py` handles image preprocessing, the forward pass, and output decoding.

### Phase B: Containerization
- **Dockerfile:** Defines the portable environment (Python, PyTorch, requirements).
- **Storage:** Built images are stored in the **GCP Artifact Registry** (Search for "Artifact Registry" in the GCP Console to find them).

### Phase C: Cloud Deployment
Deployment is handled via the Google Cloud SDK (`gcloud`).

#### Deploying Updates:
To push new code or model changes to production, you should run these commands from the directory containing the `Dockerfile`:

```bash
# 1. Navigate to the ML API directory
cd reference-api-source/image-ml-api/

# 2. Build and push the container image
gcloud builds submit --tag gcr.io/your-project-id/image-ml-api

# 3. Deploy to Cloud Run
gcloud run deploy image-ml-api \
  --image gcr.io/your-project-id/image-ml-api \
  --region asia-southeast1 \
  --allow-unauthenticated
```

*Alternatively, the "All-in-one" command from inside that directory:*
```bash
cd reference-api-source/image-ml-api/
gcloud run deploy image-ml-api --source . --region asia-southeast1
```

---

## 3. Key Resources
- **Live UI:** [pwawiwa.my.id/pages/ml-deployment](https://pwawiwa.my.id/pages/ml-deployment)
- **API Documentation (Swagger):** [Cloud Run URL]/docs
- **GCP Region:** `asia-southeast1` (Singapore)