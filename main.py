from newtracker import ActivityTracker
import time
import threading

def track_activity(tracker):
    tracker.track()  # This will keep running and logging activity

if __name__ == "__main__":
    tracker = ActivityTracker()
    
    # Start tracking activity in a separate thread
    tracking_thread = threading.Thread(target=track_activity, args=(tracker,), daemon=True)
    tracking_thread.start()

    try:
        while True:
            time.sleep(1)  # Keep the main thread alive
    except KeyboardInterrupt:
        print("Program terminated.")
        tracker.save_log()  # Save the log when the program is interrupted
