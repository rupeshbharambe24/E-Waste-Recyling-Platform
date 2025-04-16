import os
import glob
from PIL import Image
import random

def create_dummy_annotations(dataset_path):
    classes = {
        'Battery': 0,
        'Keyboard': 1,
        'Microwave': 2,
        'Mobile': 3,
        'Mouse': 4,
        'PCB': 5,
        'Player': 6,
        'Printer': 7,
        'Television': 8,
        'Washing Machine': 9
    }
    
    for split in ['train', 'val', 'test']:
        for class_name, class_id in classes.items():
            image_dir = os.path.join(dataset_path, split, 'images', class_name)
            label_dir = os.path.join(dataset_path, split, 'labels', class_name)
            
            os.makedirs(label_dir, exist_ok=True)
            
            for img_path in glob.glob(os.path.join(image_dir, '*.jpg')):
                # Get image dimensions
                with Image.open(img_path) as img:
                    width, height = img.size
                
                # Create a dummy bounding box (center 50% of image, 30% size)
                x_center = 0.5
                y_center = 0.5
                box_width = 0.3
                box_height = 0.3
                
                # Write to label file
                label_path = os.path.join(label_dir, os.path.splitext(os.path.basename(img_path))[0] + '.txt')
                with open(label_path, 'w') as f:
                    f.write(f"{class_id} {x_center} {y_center} {box_width} {box_height}\n")

# Usage
create_dummy_annotations('datasets')