import torch
from .model import get_model_and_processor

# Global variables for model and processor to enable warmup
_model = None
_processor = None

def load_inference_model():
    global _model, _processor
    if _model is None or _processor is None:
        _model, _processor = get_model_and_processor()
    return _model, _processor

def run_inference(image):
    """
    Runs the inference pipeline: preprocess -> forward pass -> postprocess.
    """
    model, processor = load_inference_model()
    
    # Preprocessing
    inputs = processor(images=image, return_tensors="pt")
    
    # Inference (Disable gradients)
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Post-processing
    logits = outputs.logits
    predicted_class_id = logits.argmax(-1).item()
    label = model.config.id2label[predicted_class_id]
    
    # Get confidence score (softmax)
    probabilities = torch.nn.functional.softmax(logits, dim=-1)
    confidence = probabilities[0][predicted_class_id].item()
    
    return {
        "label": label,
        "confidence": round(confidence, 4)
    }
