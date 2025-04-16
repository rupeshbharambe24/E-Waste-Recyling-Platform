import cv2
from ultralytics import YOLO
import torch

def detect_from_image(model, image_path):
    """
    Perform detection on an image.
    Args:
        model (YOLO): The trained YOLO model.
        image_path (str): The path to the image for detection.
    """
    # Load the image
    img = cv2.imread(image_path)
    
    # Perform inference on the image
    results = model(img)
    
    # Render the results
    results.show()  # This will display the image with bounding boxes in a window
    results.save()  # Optionally, save the results to a file (default is 'runs/detect/exp')

def detect_from_camera(model):
    """
    Perform detection from the live camera feed.
    Args:
        model (YOLO): The trained YOLO model.
    """
    # Initialize the camera (0 for the default camera)
    cap = cv2.VideoCapture(0)

    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()

        if not ret:
            print("Failed to grab frame")
            break

        # Perform inference on the frame
        results = model(frame)

        # Render the results
        results.show()  # This will display the frame with bounding boxes in a window

        # If you want to break on a key press, you can use:
        # Press 'q' to quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the capture when done
    cap.release()
    cv2.destroyAllWindows()

def main():
    # Check if GPU is available
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f"Using device: {device}")

    # Load the pretrained YOLOv8 model (use your trained model)
    model = YOLO('e-waste-classifier.pt').to(device)

    # Ask the user for input
    choice = input("Enter 'camera' for live detection or 'image' for image detection: ").strip().lower()

    if choice == 'camera':
        detect_from_camera(model)
    elif choice == 'image':
        image_path = input("Enter the image path: ").strip()
        detect_from_image(model, image_path)
    else:
        print("Invalid choice. Please enter either 'camera' or 'image'.")

if __name__ == '__main__':
    main()
