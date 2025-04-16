import torch
from ultralytics import YOLO
import os
from pathlib import Path
import yaml

def verify_gpu():
    print(f"PyTorch version: {torch.__version__}")
    print(f"CUDA available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"GPU device: {torch.cuda.get_device_name(0)}")
        print(f"GPU memory: {torch.cuda.get_device_properties(0).total_memory/1024**3:.2f} GB")
    else:
        raise RuntimeError("CUDA GPU not available")

def verify_dataset_structure(data_yaml):
    """Verify the dataset structure matches YOLO classification or detection requirements"""
    with open(data_yaml) as f:
        data = yaml.safe_load(f)

    for split in ['train', 'val', 'test']:
        if split in data:
            split_path = Path(data[split])
            print(f"\n{split.upper()} SET: {split_path}")

            if not split_path.exists():
                raise FileNotFoundError(f"{split.capitalize()} directory not found: {split_path}")

            class_dirs = [d for d in split_path.iterdir() if d.is_dir()]
            if not class_dirs:
                raise ValueError(f"No class folders found in {split} set: {split_path}")

            total_images = sum(len(list(c.glob("*.*"))) for c in class_dirs)
            print(f"Found {len(class_dirs)} classes with {total_images} total images in {split} set")

def train_yolov8():
    verify_gpu()
    verify_dataset_structure('diff-train.yaml')
    
    # Load YOLOv8m model (will download if not available locally)
    model = YOLO('yolov8m-cls.pt')  # Medium size model
    
    # Training parameters
    train_args = {
        'data': 'diff-train.yaml',  # Path to your data.yaml file
        'epochs': 100,
        'batch': 8,
        'imgsz': 640,
        'device': '0',  # Use GPU 0
        'workers': 4,
        'project': 'e-waste-detection',
        'name': 'yolov8m_run',
        'optimizer': 'AdamW',
        'lr0': 0.001,
        'patience': 30,
        'save_period': 10,
        'amp': True,
        'seed': 42,
        'cos_lr': True,  # Cosine learning rate scheduler
        'label_smoothing': 0.1,
        'overlap_mask': True,
        'mask_ratio': 4,
        'dropout': 0.2
    }
    
    # Start training
    results = model.train(**train_args)
    
    # Validation
    metrics = model.val()
    print(f"\nValidation results:")
    print(f"mAP50: {metrics.box.map50:.4f}")
    print(f"mAP50-95: {metrics.box.map:.4f}")
    
    # Export to ONNX
    model.export(format='onnx', dynamic=True)
    print("\nModel exported to ONNX format")

if __name__ == '__main__':
    train_yolov8()
