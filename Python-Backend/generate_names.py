from tensorflow.keras.preprocessing.image import ImageDataGenerator

# 1. Point to your training directory
TRAIN_DIR = r"C:\Users\91623\Desktop\final year project\Data fo Project\Data to detect diseases\Traning data"

# 2. Quickly load the folders
print("Reading folders...")
train_datagen = ImageDataGenerator(rescale=1./255)
train_generator = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=(224,224),
    batch_size=32,
    class_mode='categorical'
)

# 3. Extract the names and save them to the file
class_names = list(train_generator.class_indices.keys())

with open("class_names.txt", "w") as f:
    for name in class_names:
        f.write(name + "\n")

print("\n[SUCCESS] class_names.txt has been generated with the following classes:")
print(class_names)