import cv2
import requests
from ultralytics import YOLO
import imutils

# YOLO model
model = YOLO("yolov8n.pt")

camera = cv2.VideoCapture(0)  # 0 = first camera
threshold = 0  # optional for inside-bus

busNumber = "21"
location = "Mysuru"

while True:
    ret, frame = camera.read()
    if not ret:
        break

    frame_resized = imutils.resize(frame, width=500)

    # YOLO detection
    results = model(frame_resized)
    count = 0
    for r in results:
        boxes = r.boxes
        for box, cls in zip(boxes.xyxy, r.cls):
            if int(cls) == 0:  # person
                count += 1
                x1, y1, x2, y2 = map(int, box)
                cv2.rectangle(frame_resized, (x1, y1), (x2, y2), (255, 0, 0), 2)

    cv2.putText(frame_resized, f"Passengers: {count}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

    # Send data to backend
    data = {"busNumber": busNumber, "passengerCount": count, "location": location}
    try:
        requests.post("http://localhost:5000/add-data", json=data)
    except:
        print("Error sending bus data")

    cv2.imshow("Inside Bus", frame_resized)

    if cv2.waitKey(1) == 27:  # ESC to exit
        break

camera.release()
cv2.destroyAllWindows()