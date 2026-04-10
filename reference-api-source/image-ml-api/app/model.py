import os
from transformers import AutoImageProcessor, AutoModelForImageClassification

# Set the cache directory for Hugging Face
MODEL_NAME = "google/vit-base-patch16-224"
CACHE_DIR = os.getenv("HF_HOME", "./models")

def get_model_and_processor():
    """
    Loads the model and processor from the hub.
    They will be cached in the default HF cache directory.
    """
    processor = AutoImageProcessor.from_pretrained(MODEL_NAME)
    model = AutoModelForImageClassification.from_pretrained(MODEL_NAME)
    return model, processor

# No pre-download logic needed in main script
if __name__ == "__main__":
    print(f"Warmup: Downloading/Loading model {MODEL_NAME}...")
    get_model_and_processor()
    print("Done!")
