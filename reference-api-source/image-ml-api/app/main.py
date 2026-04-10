import time
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from .utils import validate_image, process_image
from .inference import load_inference_model, run_inference

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Model Warmup
    logger.info("Initializing model warmup...")
    start_time = time.time()
    load_inference_model()
    logger.info(f"Model loaded in {time.time() - start_time:.2f} seconds.")
    yield
    # Cleanup (if needed)
    logger.info("Shutting down...")

app = FastAPI(
    title="Image Classification API",
    description="Production-ready API for classifying images using Hugging Face models.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://pwawiwa.my.id",
        "https://web-ml-api.vercel.app", # Potential Vercel preview
        "http://localhost:3000",
        "http://127.0.0.1:5500", # Live Server default
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Image Classification API",
        "endpoints": {
            "health": "/health",
            "documentation": "/docs",
            "prediction": "/predict (POST)"
        },
        "status": "online",
        "region": "asia-southeast1 (Singapore)"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "model_loaded": True
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Endpoint to receive an image and return classification predictions.
    """
    # 1. Validation
    validate_image(file)
    
    # 2. Preprocessing
    image = await process_image(file)
    
    # 3. Inference
    start_time = time.time()
    prediction = run_inference(image)
    latency = time.time() - start_time
    
    # 4. Logging
    logger.info(f"File: {file.filename} | Prediction: {prediction['label']} | Latency: {latency:.4f}s")
    
    return {
        "filename": file.filename,
        "prediction": prediction["label"],
        "confidence": prediction["confidence"],
        "latency_s": round(latency, 4)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
