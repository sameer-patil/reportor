# Artifact Appendix (Required for all badges)

Paper title: ReporTor: Facilitating User Reporting of Issues Encountered in Naturalistic Web Browsing via the Tor Browser

Requested Badge(s):
  - [x] **Available**
  - [x] **Functional**
  - [ ] **Reproduced**

## Description (Required for all badges)

This repository contains the source code for the ReporTor plugin. If you use this work in your research, please cite our paper as follows:

@article{micallef2026reportor,
  title = {ReporTor: Facilitating User Reporting of Issues Encountered in Naturalistic Web Browsing via the Tor Browser},
  author = {Micallef, Nicholas and Cartier, Cameron and Gallagher, Kevin and Zagal, Lucas and Patil, Sameer},
  journal = {Proceedings on Privacy Enhancing Technologies},
  volume = {2026}, 
  issue = {1},
  year ={2026},
  series = {PoPETS '26}, 
  doi = {<to add>}
  url= {<to add>}
}

ReporTor is a browser plugin designed for the Tor Browser that enables users to voluntarily and anonymously report issues encountered during web browsing through a plugin. The tool features automatic URL capture (with query parameters stripped for privacy), predefined issue categories, open-ended text input for additional detail, and manual entry fields for exit node and Tor Browser security level. All reports are transmitted over the Tor network to a secure onion service database. ReporTor directly addresses the challenge identified in our research - the lack of traditional telemetry and analytics collections in the Tor Browser users due to privacy constraints - by demonstrating that user-driven issue reporting can serve as a viable alternative to automated telemetry while maintaining essential privacy standards. The artifact is the main tool used in our research to collect real-world browsing issues during a month-long naturalistic study. The successful deployment and use of ReporTor validates that privacy-preserving voluntary reporting can yield actionable insight about the user experience. ReporTor is a deployable practical solution that could be integrated within the Tor Browser to surface user-encountered challenges and improve the user experience of everyday web browsing.

### Security/Privacy Issues and Ethical Concerns (Required for all badges)

ReporTor does not introduce security or privacy risks to the evaluator's machine since it operates as a standard Tor Browser extension without disabling any security mechanisms or running vulnerable code. The plugin does not perform any automated data collection or background monitoring of browsing activity. All reporting functionality is entirely voluntary and requires explicit user action to submit a report, ensuring that users control what information to share. Users can browse with the Tor Browser without ever engaging with ReporTor's reporting features. Those who do choose to report issues using ReporTor can review and decide on a case-by-case basis whether to submit the report, allowing them to avoid sharing any URLs they feel might compromise anonymity.

## Basic Requirements (Required for Functional and Reproduced badges)

The artifact requires only the Tor Browser (version 14.5.6 recommended, though any latest version should work), which is freely available for download at https://www.torproject.org/download/. No special hardware, remote access, or proprietary software is needed for the evaluation.

### Hardware Requirements (Required for Functional and Reproduced badges)

Can run on any computer capable of running the desktop version of the Tor Browser.

### Software Requirements (Required for Functional and Reproduced badges)

1. Operating System: The artifact was tested on Windows 11 Enterprise (64-bit, x64-based processor), but it is OS-agnostic and can run on any operating system that supports the latest version of the Tor Browser, including Windows (10/11), macOS (10.15+), and Linux distributions (Ubuntu 20.04+, etc.).
2. OS Packages: No additional OS-level packages are required beyond the standard system.
3. Artifact Packaging: No container runtime or VM is required. The artifact runs directly within the Tor Browser.
4. Programming Language: The ReporTor plugin is a browser extension written in JavaScript and runs within the Tor Browser's built-in JavaScript engine. No separate compiler or interpreter is required.
5. Dependencies: The only required software dependency is the latest version of the Tor Browser. The ReporTor extension itself has no external package dependencies as it leverages the Tor Browser's native WebExtension APIs.
6. Machine Learning Models: Not applicable. The artifact does not use machine learning models.
7. Datasets: Not applicable. The artifact does not require pre-existing datasets. Users generate their own data by browsing websites and submitting reports during the evaluation process.

### Estimated Time and Storage Consumption (Required for Functional and Reproduced badges)

The complete evaluation process requires approximately 1 hour, which includes downloading the Tor Browser and the ReporTor plugin (~10-15 minutes), installation and configuration (~10 minutes), and testing the functionality by browsing websites and submitting sample reports (~30 minutes). The compute time is minimal, consisting only of the browser runtime and extension loading. The total disk space requirement is less than 150 MB, which includes the Tor Browser installation (~100 MB) and the ReporTor plugin ZIP file. These minimal requirements make the artifact easily executable on most modern systems without requiring significant resources.


## Environment (Required for all badges)

Installation Instructions
Step 1: Download and Install Tor Browser
1. Download the latest version of the Tor Browser for your operating system:
- https://www.torproject.org/download/

2. Install Tor Browser:
- Windows: Run the installer (.exe file) and follow the prompts.
- macOS: Open the .dmg file and drag Tor Browser to your Applications folder.
- Linux: Extract the tar.xz file and run the start-tor-browser.desktop file.

3. Launch Tor Browser via the Tor Browser icon.

Step 2: Download the ReporTor Plugin
1. Download the ReporTor extension ZIP file from GitHub: https://github.com/sameer-patil/reportor
2. Extract the ZIP file to a folder on your computer (remember this location).

Step 3: Install the ReporTor Plugin
1. Open Tor Browser if not already running.
2. Access the debugging page:
- Type about:debugging in the address bar and press Enter.
3. Load the ReporTor extension:
- Click "This Tor Browser" in the left sidebar.
- Click the "Load Temporary Add-on..." button.
- Navigate to the folder where you extracted the ReporTor ZIP file.
- Select the manifest.json file and click "Open."
4. Configure the extension permissions:
- Click the application menu in the far right of the toolbar.
- Select "Add-ons and themes."
- Click on "Extensions" in the left sidebar.
- Find ReporTor in the list and click on it.
- Enable the extension by toggling the switch in the top right to "ON."
- Under "Run in Private Windows", click the "Allow" button.
5. Pin the extension for easy access:
- Look for the puzzle piece icon in the browser toolbar (top-right corner).
- Click the puzzle piece icon to see all extensions.
- Find ReporTor in the list.
- Click the pin icon next to ReporTor to pin it to the toolbar.
- The ReporTor icon (face emoji) should now appear directly in your toolbar for easy access during browsing.

### Accessibility (Required for all badges)

Download reporTor Plugin using the following github repository:
https://github.com/sameer-patil/reportor.git

### Set up the environment (Required for Functional and Reproduced badges)

The environment configuration is described in the Environment section above.

### Testing the Environment (Required for Functional and Reproduced badges)

To verify that the environment is correctly configured and the ReporTor plugin is functioning properly, perform the following basic functionality test:

1. Launch Tor Browser from your installed location.
2. Navigate to a test website by entering the following URL in the address bar: https://www.bbc.com/news
3. Activate the ReporTor plugin by clicking the face emoji icon in the browser toolbar.

Expected Output:
You should see the ReporTor plugin UI window appear, displaying the following elements:
- URL being reported (pre-filled with the current page URL, with query parameters stripped off).
- Exit node information. 
- Browser Security Level indicator. 
- "What problem did you experience?" options.
- "Additional detail" text area.
Two action buttons: "Cancel" and "Send Report."

The interface should match the layout shown in Figure 1 of the paper. If the plugin interface opens without errors, the environment is correctly configured and ready for evaluation.

Note: The plugin window can be closed by clicking "Cancel" without submitting a report. This test verifies only that the plugin loads correctly.


## Artifact Evaluation (Required for Functional and Reproduced badges)

This section includes all steps required to evaluate ReporTor functionality and validate the paper's key results and claims regarding successful error reporting for issues encountered when browsing the web with the Tor Browser.

Main Results and Claims

Main Result 1: Successful Error Reporting for Browsing Issues Encountered in the Tor Browser
Our paper demonstrates that the ReporTor plugin enables users to report the problems they encountere while browsing websites with the Tor Browser. When users encounter issues accessing a website, they can invoke ReporTor to submit anonymous issue reports that include exit node information, browser security settings, issue types, and open-ended contextual information. This claim is reproducible by executing Experiment 1 below, where evaluators will encounter issues and report them through the plugin interface. These results support the findings presented in our paper.

Experiments

Experiment 1: Testing Issues Reporting through ReporTor

Time: 30 human-minutes. 
Storage: <1MB (for temporary report data).

This experiment reproduces the main findings about successful reporting of issues encountered when browsing with the Tor Browser. You will test five representative websites and submit reports for those that exhibit problems.

Step 1: Test Working Websites

1. Launch the Tor Browser.
2. Navigate to each of the following websites that work normally:
https://cnn.com
https://doodle.com

- For doodle.com, you may need to complete a CAPTCHA.
- Verify that both sites load and function correctly in the Tor Browser.

Step 2: Test Problematic Websites and Submit Reports.
Perform these steps for each of the following websites that should exhibit issues:
https://airbnb.com
https://sciencedirect.com
https://walmart.com

1. Navigate to the website (You should encounter an error message, access denial, or functionality issues.)

2. Note the Tor circuit information:
- Click on the circuit display (showing the connection path).
- Note the exit node country/name on paper (e.g., "Germany - 168.19.2.55").

3. Note the current Security setting:
- Click the application menu in the far right of the toolbar.
- Select "Settings".
- Click on "Privacy & Security" in the left sidebar.
- Scroll down to the Security section and take note of the security level (Standard/Safer/Sasfest).

4. Open the ReporTor plugin:
- Click the face emoji icon in the toolbar.

5. Complete the report form:
- Exit Node: Type the exit node information you noted.
- Browser Security Level: Select the current setting of the security slider in the Tor Browser (Standard/Safer/Safest).
- What problem did you experience?: Check the relevant issue(s).
- Additional Detail: Enter a brief description, e.g., "Airbnb shows an 'Access Denied' page with message about unusual activity".

6. Submit the report:
- Click the "Send Report" button.

Expected Results:
- CNN and Doodle should load successfully (possibly with CAPTCHAs for Doodle).
- Airbnb, ScienceDirect, and Walmart should display various error messages or access restrictions.
- You should successfully submit 3 error reports through the ReporTor interface.
- All report submissions should take less than 30 seconds once the error is encountered.

These results validate that ReporTor enables users to submit issue reports as described in our paper.


## Limitations (Required for Functional and Reproduced badges)

The one-month naturalistic browsing study described in the paper cannot be reproduced within the scope of artifact evaluation. The artifact allows evaluators to test the user interface, the reporting mechanism, and the plugin features described in the paper.


## Notes on Reusability (Encouraged for all badges)

The ReporTor plugin can be adapted and extended by researchers to collected data in studies involving the Tor Browser. To reuse this artifact, researchers need to set up a backend infrastructure to receive and store reports.

Setting Up Your Own Report Collection Infrastructure
1. Set up a MongoDB database:
# Install MongoDB
sudo apt-get install mongodb

# Create database and user
mongo
> use broken_sites
> db.createUser({
    user: "datareciever",
    pwd: "YOUR_SECURE_PASSWORD",
    roles: [{role: "readWrite", db: "broken_sites"}]
})
> db.createCollection("reports")

2. Create a Flask server to receive reports:
# app.py
from flask import Flask, request, jsonify
from pymongo import MongoClient

def send_to_mongo(dataz):
    # Replace with your MongoDB credentials
    uri = 'mongodb://datareciever:YOUR_SECURE_PASSWORD@localhost:27017/broken_sites'
    try:
        conn = MongoClient(uri)
        print("Connected successfully!!!")
    except:
        print("Could not connect to MongoDB")
    
    # Connect to database
    db = conn.broken_sites
    collection = db.reports
    
    # Insert the report
    rec_id1 = collection.insert_one(dataz)
    print("Data inserted with record ids", rec_id1)
    
    # Optional: Print inserted data for debugging
    cursor = collection.find()
    for record in cursor:
        print(record)

app = Flask(__name__)

@app.route('/', methods=['POST'])
def foo():
    data = request.json
    print(data)
    send_to_mongo(data)
    return 'Thanks!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

3. Set up an onion service for anonymous report collection:
# Install Tor
sudo apt-get install tor

# Edit /etc/tor/torrc to add:
HiddenServiceDir /var/lib/tor/reportor_service/
HiddenServicePort 80 127.0.0.1:5000

# Restart Tor
sudo service tor restart

# Get your onion address
sudo cat /var/lib/tor/reportor_service/hostname

4. Configure ReporTor to use your onion service:
- Edit sendToServer.js in the js folder
- Replace the existing URL with your onion service address:

navigator.sendBeacon("http://[YOUR_ONION_ADDRESS].onion:80", blob);