from ultralytics import YOLO
import torch

class EarlyStopping:
    def __init__(self, patience=5, delta=0):
        """
        Args:
        - patience (int): The number of epochs with no improvement after which training will be stopped.
        - delta (float): Minimum change to qualify as an improvement.
        """
        self.patience = patience
        self.delta = delta
        self.best_loss = None
        self.patience_counter = 0

    def should_stop(self, current_loss):
        """Check whether to stop training."""
        if self.best_loss is None:
            self.best_loss = current_loss
            return False
        elif current_loss < self.best_loss - self.delta:
            self.best_loss = current_loss
            self.patience_counter = 0
        else:
            self.patience_counter += 1
        
        if self.patience_counter >= self.patience:
            print(f"Early stopping triggered at epoch {epoch}")
            return True
        
        return False


def main():
    # Check if GPU is available
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f"Using device: {device}")

    # Load the pretrained YOLOv8 medium classification model
    model = YOLO('yolov8m-cls.pt').to(device)

    # Initialize early stopping
    early_stopping = EarlyStopping(patience=5, delta=0.001)

    # Train the model
    for epoch in range(100):  # Train for 100 epochs
        print(f"Epoch {epoch+1}/100")

        # Train for one epoch
        results = model.train(
            data='datasets/diff-types',  # path to your dataset (root folder)
            epochs=1,                   # train for one epoch at a time
            batch=8,                    # batch size
            imgsz=224,                  # image size
            device=0,                   # use GPU (0 means first GPU)
            workers=4,                  # number of worker threads
            optimizer='Adam',           # optimizer
            lr0=0.001,                  # initial learning rate
            seed=42                     # random seed
        )

        # Get the current validation loss (this will depend on your model)
        current_loss = results.metrics['val/loss']  # assuming validation loss is available
        
        # Check if early stopping should be triggered
        if early_stopping.should_stop(current_loss):
            print("Stopping early due to no improvement.")
            break

    # Save the trained model
    model.save('e-waste-classifier.pt')

if __name__ == '__main__':
    main()
