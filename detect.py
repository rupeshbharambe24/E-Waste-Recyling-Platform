from ultralytics import YOLO
import cv2

def detect_ewaste(model_path, image_path):
    # Load the trained model
    model = YOLO(model_path)
    
    # Perform detection
    results = model(image_path)
    
    # Show results
    for r in results:
        im_array = r.plot()  # plot a BGR numpy array of predictions
        cv2.imshow("Detection", im_array)
        cv2.waitKey(0)
    
    cv2.destroyAllWindows()

# Usage
detect_ewaste('e-waste-detection/yolov11_run/weights/best.pt', 'test_image.jpg')
