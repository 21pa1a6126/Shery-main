# src/utils/window_utils.py
import win32gui
import time
from ctypes import Structure, windll, c_uint, sizeof, byref

# Getting the active window
def get_active_window_title():
    window = win32gui.GetForegroundWindow()
    return win32gui.GetWindowText(window)

# Idle time detection
class LASTINPUTINFO(Structure):
    _fields_ = [('cbSize', c_uint), ('dwTime', c_uint)]

def get_idle_duration():
    lastInputInfo = LASTINPUTINFO()
    lastInputInfo.cbSize = sizeof(LASTINPUTINFO)
    windll.user32.GetLastInputInfo(byref(lastInputInfo))
    millis = windll.kernel32.GetTickCount() - lastInputInfo.dwTime
    return millis / 1000.0  # Convert to seconds

def is_idle(threshold=180):  # Idle if no activity for 3 minutes (180s)
    return get_idle_duration() > threshold


# import win32gui
# import time
# import psutil
# from ctypes import Structure, windll, c_uint, sizeof, byref
# import re
# from urllib.parse import urlparse

# # Getting the active window
# def get_active_window_title():
#     window = win32gui.GetForegroundWindow()
#     return win32gui.GetWindowText(window)

# # Idle time detection
# class LASTINPUTINFO(Structure):
#     _fields_ = [('cbSize', c_uint), ('dwTime', c_uint)]

# def get_idle_duration():
#     lastInputInfo = LASTINPUTINFO()
#     lastInputInfo.cbSize = sizeof(LASTINPUTINFO)
#     windll.user32.GetLastInputInfo(byref(lastInputInfo))
#     millis = windll.kernel32.GetTickCount() - lastInputInfo.dwTime
#     return millis / 1000.0  # Convert to seconds

# def is_idle(threshold=180):  # Idle if no activity for 3 minutes (180s)
#     return get_idle_duration() > threshold

# # Get the process name of the currently active window
# def get_active_process_name():
#     try:
#         # Get the PID (Process ID) of the active window
#         window = win32gui.GetForegroundWindow()
#         pid = win32gui.GetWindowThreadProcessId(window)[1]
        
#         # Use psutil to get process information based on the PID
#         process = psutil.Process(pid)
#         process_name = process.name()  # Get the process name
#         return process_name
#     except Exception as e:
#         return None

# # Extract the domain from the browser window's URL (or title)
# def extract_domain_from_title(window_title):
#     """
#     Extract domain from window title (common for browsers).
#     This can work for browsers like Chrome and Firefox where the title contains the URL or page title.
#     """
#     url_match = re.search(r'(https?://[^\s]+)', window_title)
#     if url_match:
#         url = url_match.group(1)
#         parsed_url = urlparse(url)
#         domain = parsed_url.netloc  # Extract domain
#         return domain
#     else:
#         # Fallback: extract the last part of the window title, assuming it contains a recognizable domain
#         return window_title.split(" - ")[-1]  # Last part as fallback

# # Enhanced domain extraction for browsers using psutil (Chrome, Firefox, Edge, etc.)
# def get_browser_domain():
#     active_process_name = get_active_process_name()

#     # Only check for domain if the active process is a browser
#     if active_process_name and active_process_name.lower() in ["chrome.exe", "firefox.exe", "msedge.exe", "opera.exe"]:
#         window_title = get_active_window_title()
#         domain = extract_domain_from_title(window_title)
#         return domain
#     else:
#         return None

# # Get the category of the active process or domain
# def categorize_activity(domain_or_process):
#     """
#     Categorize the activity based on the domain (for browsers) or process name.
#     """
#     if domain_or_process:
#         if "amazon" in domain_or_process:
#             return "Shopping"
#         elif "youtube" in domain_or_process:
#             return "Entertainment"
#         elif "stackoverflow" in domain_or_process:
#             return "Productive"
#         else:
#             return "General"
#     return "Uncategorized"


# import ctypes
# import time
# import win32gui
# import win32process
# import psutil
# from urllib.parse import urlparse

# def get_active_window_title():
#     hwnd = win32gui.GetForegroundWindow()
#     title = win32gui.GetWindowText(hwnd)
#     return title

# def get_active_window_url():
#     # For browser applications, we can check window titles or use specific techniques
#     title = get_active_window_title()
#     if "Mozilla" in title or "Chrome" in title or "Edge" in title:
#         # Simulated URL extraction based on window title; adjust as needed
#         # You might want to implement actual URL extraction for the specific browser
#         return "https://www.example.com/path"  # Placeholder URL
#     return None

# def is_idle(idle_threshold=300):
#     class LASTINPUTINFO(ctypes.Structure):
#         _fields_ = [("cbSize", ctypes.c_uint), ("dwTime", ctypes.c_ulong)]

#     last_input_info = LASTINPUTINFO()
#     last_input_info.cbSize = ctypes.sizeof(LASTINPUTINFO)
#     ctypes.windll.user32.GetLastInputInfo(ctypes.byref(last_input_info))
#     idle_time = (ctypes.windll.kernel32.GetTickCount() - last_input_info.dwTime) / 1000.0
#     return idle_time >= idle_threshold

# def get_domain_from_url(url):
#     parsed_url = urlparse(url)
#     return parsed_url.netloc  # Extract the domain

# def get_active_domain():
#     active_url = get_active_window_url()
#     if active_url:
#         return get_domain_from_url(active_url)
#     return None
