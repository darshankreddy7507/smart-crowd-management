import cv2
import requests
from ultralytics import YOLO
import imutils
import time

# ---------------- YOLO MODEL ----------------
model = YOLO("cv/yolov8n.pt")

# ---------------- CAMERAS ----------------
bus_camera = cv2.VideoCapture(0)

# Phone camera (bus stop)
busstop_camera = cv2.VideoCapture("http://10.24.31.49:8080/video")

# ---------------- INFO ----------------
busNumber = "21"
location = "Mysuru"
busStopName = "A"
threshold = 5

# ---------------- CONTROL ----------------
frame_count = 0
process_every = 3
fixed_width, fixed_height = 640, 480

# ---------------- LOOP ----------------
while True:

    # ========= INSIDE BUS =========
    ret1, frame1 = bus_camera.read()
    count_bus = 0

    if ret1:
        frame1 = imutils.resize(frame1, width=500)
        results = model(frame1)

        for r in results:
            for box in r.boxes:
                if int(box.cls) == 0:  # person
                    count_bus += 1
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    cv2.rectangle(frame1, (x1, y1), (x2, y2), (255, 0, 0), 2)

        cv2.putText(frame1, f"Passengers: {count_bus}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

        # 🔥 SEND BUS DATA
        try:
            res = requests.post("http://127.0.0.1:5000/add-data", json={
                "busNumber": busNumber,
                "passengerCount": count_bus,
                "location": location
            }, timeout=5)

            print("✅ Bus Sent:", count_bus)
            print("Status:", res.status_code)

        except Exception as e:
            print("❌ BUS ERROR:", e)

    # ========= BUS STOP =========
    ret2, frame2 = busstop_camera.read()
    count_stop = 0
    frame_count += 1

    if ret2:
        frame2 = cv2.resize(frame2, (fixed_width, fixed_height))

        if frame_count % process_every == 0:
            results = model(frame2)

            for r in results:
                for box in r.boxes:
                    if int(box.cls) == 0:
                        count_stop += 1
                        x1, y1, x2, y2 = map(int, box.xyxy[0])
                        cv2.rectangle(frame2, (x1, y1), (x2, y2), (0, 255, 0), 2)

        cv2.putText(frame2, f"Waiting: {count_stop}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

        # 🔥 SEND BUS STOP DATA (FIXED API)
        try:
            res = requests.post("http://127.0.0.1:5000/add-busstop-data", json={
                "busStop": busStopName,
                "waitingCount": count_stop,
                "alert": "YES" if count_stop > threshold else "NO"
            }, timeout=5)

            print("🟢 Stop Sent:", count_stop)
            print("Status:", res.status_code)

        except Exception as e:
            print("❌ STOP ERROR:", e)

    # ========= SHOW =========
    if ret1:
        cv2.imshow("Inside Bus", frame1)

    if ret2:
        cv2.imshow("Bus Stop (Phone)", frame2)

    # Exit
    if cv2.waitKey(1) == 27:
        break

    # 🔥 IMPORTANT (avoid DB lock)
    time.sleep(1)

# ---------------- RELEASE ----------------
bus_camera.release()
busstop_camera.release()
cv2.destroyAllWindows()