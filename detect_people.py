import cv2
import sqlite3
import os
from detect_people import count_people

# Path to DB
db_path = os.path.join("backend", "bus.db")

# Save count to database
def save_count(count):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS bus_counts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            count INTEGER
        )
    """)

    cursor.execute("INSERT INTO bus_counts (count) VALUES (?)", (count,))
    conn.commit()
    conn.close()

# Main function
def main():
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Camera not working ❌")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Count people
        people_count = count_people(frame)

        # Save to DB
        save_count(people_count)

        # Show result
        cv2.putText(frame, f"People: {people_count}", (20, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)