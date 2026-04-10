import io
from PIL import Image
from fastapi import HTTPException, UploadFile

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def validate_image(file: UploadFile):
    """
    Validates that the uploaded file is an image and within size limits.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")
    
    # We can't easily check size without reading, but we can check after reading
    # or rely on middleware. For simplicity, we check later or assume moderate size.
    pass

async def process_image(file: UploadFile) -> Image.Image:
    """
    Reads the UploadFile and converts it to a PIL Image.
    """
    try:
        content = await file.read()
        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File size exceeds 5MB limit.")
        
        image = Image.open(io.BytesIO(content)).convert("RGB")
        return image
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=400, detail=f"Invalid image file: {str(e)}")
