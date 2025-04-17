from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import supervision as sv
from inference import get_model
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Load model once
model = get_model(model_id="taylor-swift-records/3")

@app.route("/analyze", methods=["POST"])
def analyze_image():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    filename = secure_filename(file.filename)
    file_bytes = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Run inference
    results = model.infer(image)[0]
    detections = sv.Detections.from_inference(results)

    # Prepare response data
    detected_items = []
    for label, box in zip(detections.class_name, detections.xyxy):
        detected_items.append({
            "name": label,
            "bounding_box": [int(x) for x in box.tolist()]
        })

    # For demo: mock metadata for the first item
    if detected_items:
        main_item = detected_items[0]["name"]
        response = {
            "name": main_item,
            "type": "Electronics",
            "condition": "Used",
            "estimatedValue": 45,
            "recyclableComponents": ["Battery", "Screen", "Circuit Board", "Plastic Casing"],
            "environmentalImpact": "Medium"
        }
        return jsonify(response)
    else:
        return jsonify({"error": "No recognizable item found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
