import cv2
import requests
from ultralytics import YOLO
import imutils

# YOLO model
model = YOLO("yolov8n.pt")

camera = cv2.VideoCapture(1)  # 1 = second camera or external
threshold = 5  # alert if more than 5 people waiting

while True:
    ret, frame = camera.read()
    if not ret:
        break

    frame_resized = imutils.resize(frame, width=500)

    results = model(frame_resized)
    count = 0
    for r in results:
        boxes = r.boxes
        for box, cls in zip(boxes.xyxy, r.cls):
            if int(cls) == 0:  # person
                count += 1
                x1, y1, x2, y2 = map(int, box)
                cv2.rectangle(frame_resized, (x1, y1), (x2, y2), (0, 255, 0), 2)

    cv2.putText(frame_resized, f"Waiting Count: {count}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

    # Send data to backend
    data = {"busStop": "A", "waitingCount": count, "alert": "YES" if count > threshold else "NO"}
    try:
        requests.post("http://localhost:5000/add-busstop-data", json=data)
        if count > threshold:
            print(f"ALERT! Bus Stop crowd: {count}")
    except:
        print("Error sending bus stop data")

    cv2.imshow("Bus Stop", frame_resized)

    if cv2.waitKey(1) == 27:  # ESC
        break

camera.release()
cv2.destroyAllWindows()