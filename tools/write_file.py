import os

def save_file(content: str, directory: str, filename: str) -> dict:
    """
    Saves content to the specified file.
    """
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
        
        filepath = os.path.join(directory, filename)
        
        # Simple overwrite protection could go here, but per requirements we just write for now
        # or maybe append a number. For now, strictly overwrite as per common dev tools behavior unless specified.
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
            
        return {"status": "success", "filepath": filepath}
    except Exception as e:
        return {"status": "error", "error": str(e)}

if __name__ == "__main__":
    print(save_file("console.log('hello')", "./output", "test.ts"))
