import sys
import os

# Add tools directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../tools'))

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
# Now we can import the tool
import convert_code
import write_file

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthCheck(BaseModel):
    status: str
    message: str

class ConvertRequest(BaseModel):
    source_code: str
    target_language: str = "typescript"
    output_directory: str = "output"
    filename: str = "converted.spec.ts"

@app.get("/", response_model=HealthCheck)
def read_root():
    return {"status": "ok", "message": "B.L.A.S.T. Server is Running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/convert")
def convert(request: ConvertRequest):
    try:
        # Step 1: Convert
        # In a real scenario we'd do more orchestration here
        converted_code = convert_code.main(request.source_code, request.target_language)
        
        # Step 2: Write (Optional, or just return)
        # We will write it to disk as requested
        # Determine absolute path for output relative to project root or use provided
        # For safety, let's just use the server root's parent + output_directory
        project_root = os.path.dirname(os.path.dirname(__file__))
        target_dir = os.path.join(project_root, request.output_directory)
        
        write_result = write_file.save_file(converted_code, target_dir, request.filename)
        
        return {
            "converted_code": converted_code,
            "file_status": write_result["status"],
            "file_path": write_result.get("filepath", ""),
            "preview_html": f"<pre>{converted_code}</pre>" # Placeholder for syntax highlighting
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

