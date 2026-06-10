from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware


from generate_image import get_processed_image_bytes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate-image")
def generate_image(img_num: int, dist_type: int):
    image_bytes = get_processed_image_bytes(img_num, dist_type)
    
    return Response(content=image_bytes, media_type="image/png")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)