

# import time
# import json
# from src.utils.window_utils import get_active_window_title, is_idle
# import google.generativeai as genai  # Import Google Gemini API
# from win10toast_click import ToastNotifier  # For notifications

# # Activity categories
# CATEGORIES = [
#     "Shopping", "Education", "Social Media", "Coding/Development",
#     "News", "Entertainment", "Work/Productivity", "Gaming", 
#     "Video Streaming", "Health & Fitness", "Unknown"
# ]



# genai.configure(api_key="AIzaSyBAJ2p2QFtH3fWb8PufBGQvKfLD45uMaKs")

# class ActivityTracker:
#     def __init__(self):
#         self.usage_log = {}
#         self.current_window = None
#         self.start_time = None
#         self.notify_threshold = 30  # 30 minutes threshold for notification (in seconds)
#         self.model = genai.GenerativeModel("gemini-1.5-flash")  # Instantiate the Gemini Model
#         self.toaster = ToastNotifier()  # Initialize the notification toaster

#     # Common applications to normalize
#     COMMON_APPS = {
#         "Visual Studio Code": ["Visual Studio Code", "VSCode", "Code", "vscode"],
#         "Notepad": ["Notepad", "Notepad++"],
#         "Microsoft Office": ["Word", "Excel", "PowerPoint", "Outlook"],
#         "IDE": ["PyCharm", "IntelliJ IDEA", "Eclipse", "NetBeans"],
#         "Slack": ["Slack"],
#         "Zoom": ["Zoom"],
#         "Discord": ["Discord"],
#         "Spotify": ["Spotify", "Spotify Web"],
#         "Postman": ["Postman"],
#         "Telegram": ["Telegram"],
#         "WhatsApp": ["WhatsApp"],
#         "Minecraft": ["Minecraft"],
#         "Visual Studio": ["Visual Studio"],
#         "Game Clients": ["Steam", "Epic Games Launcher", "Origin"],
#         # Add more applications as needed
#     }

#     def categorize_activity(self, window_title):
#         # Check predefined categories first
#         for key in CATEGORIES:
#             if key.lower() in window_title.lower():
#                 return key  # Return the found category
        
#         # Use Gemini API to categorize if not found in predefined categories
#         prompt = f"Classify the following activity based on the title: '{window_title}'. Only provide one word from these categories: {', '.join(CATEGORIES)}."
#         response = self.model.generate_content(prompt)
#         category = response.text.strip()
#         return category if category else "Unknown"

#     def normalize_window_title(self, window_title):
#         """Normalize the window title based on common applications."""
#         # Normalize Visual Studio Code titles regardless of the file being worked on
#         if "Visual Studio Code" in window_title or "VSCode" in window_title:
#             return "Visual Studio Code"  # Normalize to a single title for VSCode

#         # Only normalize for recognized applications
#         for app, keywords in self.COMMON_APPS.items():
#             if any(keyword.lower() in window_title.lower() for keyword in keywords):
#                 return app  # Return the common app name
            
#         return window_title  # Return original title for non-common apps


#     def track(self):
#         print("Tracking started... Press Ctrl+C to stop.")
#         try:
#             while True:
#                 if not is_idle():
#                     active_window = get_active_window_title()
#                     if active_window:
#                         # Normalize window title only for common apps
#                         normalized_window_title = self.normalize_window_title(active_window)

#                         # Log the activity with the normalized title
#                         self.log_activity(normalized_window_title)
#                 time.sleep(5)  # Sleep for 5 seconds before checking again
#         except KeyboardInterrupt:
#             print("Tracking stopped.")
#             self.save_log()

#     def log_activity(self, window_title):
#         current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

#         # If switching to a new window
#         if self.current_window != window_title:
#             if self.current_window:
#                 # Save time spent on the previous window
#                 elapsed_time = time.time() - self.start_time
#                 self.usage_log[self.current_window]["time_spent"] += elapsed_time

#             # Switch to the new window
#             self.current_window = window_title
#             self.start_time = time.time()

#             # Initialize log entry if not present
#             if window_title not in self.usage_log:
#                 self.usage_log[window_title] = {
#                     "category": None,  # Set category to None initially
#                     "time_spent": 0, 
#                     "start_time": current_time
#                 }

#             # Call categorize_activity function and display the category
#             category = self.categorize_activity(window_title)
#             self.usage_log[window_title]["category"] = category  # Update log entry with category
#             print(f"Current Activity: {window_title} ({category})")  # Display category immediately

#             # Save the updated log whenever there's a switch
#             self.save_log()

#         # Check if the user has been using the current window for more than the threshold
#         elapsed_time = time.time() - self.start_time
#         if elapsed_time >= self.notify_threshold:
#             print(f"User has been using {window_title} for more than 30 minutes. Trigger notification.")
#             self.trigger_break_notification()

#     def trigger_break_notification(self):
#         self.toaster.show_toast(
#             "ZenFocus Reminder",
#             "You have been using this app for 30 minutes. Time to take a break!",
#             duration=10,  # Show notification for 10 seconds
#             threaded=True,
#             callback_on_click=self.on_click_take_break  # User clicks the notification
#         )

#     def on_click_take_break(self):
#         print("User clicked the 'Take a break' notification.")

#     def save_log(self):
#         # Save elapsed time for the last active window
#         if self.current_window:
#             elapsed_time = time.time() - self.start_time
#             self.usage_log[self.current_window]["time_spent"] += elapsed_time
        
#         with open("usage_log.json", "w") as f:
#             json.dump(self.usage_log, f, indent=4)
#         print("Usage log updated.")

import sys
import random
sys.stdout.reconfigure(encoding='utf-8')
import time
import json
from window_utils import get_active_window_title, is_idle
import google.generativeai as genai  # Import Google Gemini API
from win10toast_click import ToastNotifier  # For notifications

# User preferences (set during onboarding; this could be fetched from a config file or database)
USER_PREFERENCES = {
    "break": False,
    "exercise": False,
    "games": False,
    "music": True
}

# Activity categories
CATEGORIES = [
    "Shopping", "Education", "Social Media", "Coding/Development",
    "News", "Entertainment", "Work/Productivity", "Gaming", 
    "Video Streaming", "Health & Fitness", "Unknown"
]

genai.configure(api_key="AIzaSyBAJ2p2QFtH3fWb8PufBGQvKfLD45uMaKs")

class ActivityTracker:
    def __init__(self):
        self.usage_log = {}
        self.current_window = None
        self.start_time = None
        self.notify_threshold = 60  # 30 minutes threshold for notification (in seconds)
        self.model = genai.GenerativeModel("gemini-1.5-flash")  # Instantiate the Gemini Model
        self.toaster = ToastNotifier()  # Initialize the notification toaster
        self.category_time = {category: 0 for category in self.CATEGORIES}  # Initialize category time tracking

    # Activity categories
    CATEGORIES = [
        "Shopping", "Education", "Social Media", "Coding/Development",
        "News", "Entertainment", "Work/Productivity", "Gaming", 
        "Video Streaming", "Health & Fitness", "Unknown"
    ]

   # Common applications to normalize
    COMMON_APPS = {
    # Development Tools
    "Visual Studio Code": ["Visual Studio Code", "VSCode", "Code", "vscode"],
    "Notepad": ["Notepad", "Notepad++"],
    "Microsoft Office": ["Word", "Excel", "PowerPoint", "Outlook"],
    "IDE": ["PyCharm", "IntelliJ IDEA", "Eclipse", "NetBeans", "Xcode", "Android Studio"],
    "Visual Studio": ["Visual Studio"],
    "GeeksforGeeks": ["GeeksforGeeks"],
    
    # Communication Tools
    "Slack": ["Slack"],
    "Zoom": ["Zoom"],
    "Discord": ["Discord"],
    "Telegram": ["Telegram"],
    "WhatsApp": ["WhatsApp"],
    "Google Meet": ["Google Meet", "Meet"],
    "Microsoft Teams": ["Microsoft Teams", "Teams"],
    "Skype": ["Skype"],
    "Gmail": ["Gmail"],

    
    # Entertainment & Media
    "Spotify": ["Spotify", "Spotify Web"],
    "Netflix": ["Netflix"],
    "Twitch": ["Twitch"],
    "Amazon Prime Video": ["Amazon Prime Video", "Prime Video"],
    "Disney+": ["Disney+", "Disney Plus"],
    "Hulu": ["Hulu"],
    
    # Shopping
    "Amazon": ["Amazon", "amazon.in", "amazon.com", "Amazon.in", "Amazon.com"],
    "Flipkart": ["Flipkart", "Flipkart.com"],
    "eBay": ["eBay", "eBay.com"],
    
    # Social Media
    "Facebook": ["Facebook"],
    "Twitter": ["Twitter", "X"],
    "Instagram": ["Instagram"],
    "LinkedIn": ["LinkedIn"],
    "Reddit": ["Reddit"],
    "Snapchat": ["Snapchat"],
    
    # Game Clients
    "Game Clients": ["Steam", "Epic Games Launcher", "Origin", "Battle.net", "GOG Galaxy", "Uplay"],
    "Minecraft": ["Minecraft"],
    "Roblox": ["Roblox"],
    "Valorant": ["Valorant"],
    "League of Legends": ["League of Legends", "LoL"],
    "Fortnite": ["Fortnite"],
    
    # Cloud Storage
    "Google Drive": ["Google Drive", "Drive"],
    "Dropbox": ["Dropbox"],
    "OneDrive": ["OneDrive"],
    "iCloud": ["iCloud"],
    
    # Utilities & Tools
    "Postman": ["Postman"],
    "Adobe Acrobat": ["Adobe Acrobat", "Acrobat Reader"],
    "Photoshop": ["Photoshop", "Adobe Photoshop"],
    "FileZilla": ["FileZilla"],
    "7-Zip": ["7-Zip"],
    "WinRAR": ["WinRAR"],
    
    # Productivity Tools
    "Trello": ["Trello"],
    "Asana": ["Asana"],
    "Notion": ["Notion"],
    "Jira": ["Jira"],
    "Todoist": ["Todoist"],
    "Evernote": ["Evernote"],
    
    # Virtual Machines & Development Tools
    "VirtualBox": ["VirtualBox"],
    "VMware": ["VMware"],
    "Docker": ["Docker"],
    
    
    }

    def categorize_activity(self, window_title):
        # Check predefined categories first
        for key in self.CATEGORIES:
            if key.lower() in window_title.lower():
                return key  # Return the found category
        
        # Use Gemini API to categorize if not found in predefined categories
        prompt = f"Classify the following activity based on the title: '{window_title}'. Only provide one word from these categories: {', '.join(self.CATEGORIES)}."
        response = self.model.generate_content(prompt)
        category = response.text.strip()
        return category if category else "Unknown"

    def normalize_window_title(self, window_title):
        """Normalize the window title based on common applications."""
        for app, keywords in self.COMMON_APPS.items():
            if any(keyword.lower() in window_title.lower() for keyword in keywords):
                return app  # Return the common app name
            
        return window_title  # Return original title for non-common apps

    def track(self):
        print("Tracking started... Press Ctrl+C to stop.")
        try:
            while True:
                if not is_idle():
                    active_window = get_active_window_title()
                    if active_window:
                        normalized_window_title = self.normalize_window_title(active_window)
                        self.log_activity(normalized_window_title)
                time.sleep(5)  # Sleep for 5 seconds before checking again
        except KeyboardInterrupt:
            print("Tracking stopped.")
            self.save_log()

    def log_activity(self, window_title):
        current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        # If switching to a new window
        if self.current_window != window_title:
            if self.current_window:
                elapsed_time = time.time() - self.start_time
                self.usage_log[self.current_window]["time_spent"] += elapsed_time
                current_category = self.usage_log[self.current_window]["category"]
                if current_category in self.category_time:
                    self.category_time[current_category] += elapsed_time

            self.current_window = window_title
            self.start_time = time.time()

            if window_title not in self.usage_log:
                self.usage_log[window_title] = {
                    "category": None,
                    "time_spent": 0,
                    "start_time": current_time
                }

            category = self.categorize_activity(window_title)
            self.usage_log[window_title]["category"] = category
            print(f"Current Activity: {window_title} ({category})")
            self.save_log()

        elapsed_time = time.time() - self.start_time
        if elapsed_time >= self.notify_threshold:
            print(f"User has been using {window_title} for more than 30 minutes. Trigger notification.")
            self.trigger_break_notification()

    def trigger_break_notification(self):
        """Trigger a notification based on user preferences."""
        activities = []
        if USER_PREFERENCES["break"]:
            activities.append("Take a break")
        if USER_PREFERENCES["exercise"]:
            activities.append("Do a quick exercise")
        if USER_PREFERENCES["games"]:
            activities.append("Play a puzzle")
        if USER_PREFERENCES["music"]:
            activities.append("Listen to some soothing music")

        if activities:
            activity = random.choice(activities)
            self.toaster.show_toast(
                "ZenFocus Reminder",
                f"You have been using this app for 30 minutes. {activity}!",
                duration=10,
                threaded=True,
                callback_on_click=lambda: self.on_click_activity(activity)
            )

    def on_click_activity(self, activity):
        """Handle what happens when the user clicks on a notification."""
        if activity == "Take a break":
            print("User chose to take a break. Navigating to the break screen...")
            # Implement break screen navigation
        elif activity == "Do a quick exercise":
            print("User chose to do a quick exercise. Navigating to exercise instructions...")
            # Implement exercise screen navigation
        elif activity == "Play a puzzle":
            print("User chose to play a puzzle. Navigating to a puzzle...")
            # Implement puzzle game navigation
        elif activity == "Listen to some soothing music":
            print("User chose to listen to music. Playing music...")
            # Implement music playing functionality

    def save_log(self):
        if self.current_window:
            elapsed_time = time.time() - self.start_time
            self.usage_log[self.current_window]["time_spent"] += elapsed_time
            current_category = self.usage_log[self.current_window]["category"]
            if current_category in self.category_time:
                self.category_time[current_category] += elapsed_time
        
        with open("usage_log.json", "w") as f:
            json.dump(self.usage_log, f, indent=4)

        with open("category_time.json", "w") as f:
            json.dump(self.category_time, f, indent=4)

        print("Usage log updated.")

