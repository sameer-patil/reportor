# Artifact Appendix (Required for all badges)

Paper title: ReporTor: Facilitating User Reporting of Issues Encountered in Naturalistic Web Browsing via Tor Browser

Requested Badge(s):
  - [x] **Available**
  - [x] **Functional**
  - [ ] **Reproduced**

## Description (Required for all badges)

This repository contains the source code for the ReporTor plugin. If you use this work in your research, please cite our paper as follows:

@article{micallef2026reportor,
  title = {ReporTor: Facilitating User Reporting of Issues Encountered in Naturalistic Web Browsing via Tor Browser},
  author = {Micallef, Nicholas and Cartier, Cameron and Gallagher, Kevin and Zagal, Lucas and Patil, Sameer},
  journal = {Proceedings on Privacy Enhancing Technologies},
  volume = {2026}, 
  issue = {1},
  year ={2026},
  series = {PoPETS '26}, 
  doi = {<to add>}
  url= {<to add>}
}

ReporTor is a plugin for Tor Browser that enables voluntary, anonymous end-user reporting of issues encountered during web browsing. ReporTor provides automatic URL capture (with query parameters stripped for privacy), predefined issue categories, open-ended text input for additional detail, and manual entry fields for exit node and Tor Browser security level. All reports are transmitted over the Tor network to a database hosted via an onion service. ReporTor addresses the lack of traditional telemetry and analytics collection due to the privacy constraints in Tor Browser and demonstrates that user-driven issue reporting can serve as a viable privacy-preserving alternative. The artifact is the plugin used in our research to collect real-world browsing issues during a month-long naturalistic study. The successful deployment and use of ReporTor validates that privacy-preserving voluntary reporting can yield actionable insight about the user experience. ReporTor is a deployable practical solution that could be integrated within Tor Browser to surface user-encountered challenges and improve the user experience of everyday web browsing.

### Security/Privacy Issues and Ethical Concerns (Required for all badges)

ReporTor does not introduce security or privacy risks to the evaluator's machine since it operates as a standard Tor Browser extension without disabling any security mechanisms or running vulnerable code.The plugin does not perform automated data collection or background monitoring of browsing activity. All reporting functionality is entirely voluntary and requires explicit user action to submit a report, ensuring that users control the information that is shared. Users can browse with Tor Browser without ever engaging with ReporTor's reporting features. Those who choose to report issues using ReporTor can review and decide on a case-by-case basis whether to submit the report, allowing them to avoid sharing any URLs they feel might compromise anonymity.

## Basic Requirements (Required for Functional and Reproduced badges)

The artifact requires only Tor Browser (version 14.5.6 recommended, though any later version should work), which is freely available for download at https://www.torproject.org/download/. No special hardware, remote access, or proprietary software is needed for the evaluation.

### Hardware Requirements (Required for Functional and Reproduced badges)

Can run on any computer capable of running the desktop version of Tor Browser.

### Software Requirements (Required for Functional and Reproduced badges)

1. Operating System: The artifact was tested on Ubuntu 25.04, but it is OS-agnostic and can run on any operating system that supports the latest version of Tor Browser, including Windows (10/11), macOS (10.15+), and Linux distributions (Ubuntu 20.04+, etc.).
2. OS Packages: No additional OS-level packages are required beyond the standard system.
3. Artifact Packaging: A docker container is required to test the server-side functionality. The plugin runs directly within Tor Browser.
4. Programming Language: The ReporTor plugin is a browser extension written in JavaScript and runs within Tor Browser's built-in JavaScript engine. The server-side container installs python:3.8-slim.
5. Dependencies: The software dependency for the ReporTor extension is the latest version of Tor Browser, which leverages Tor Browser's native WebExtension APIs. The server-side container requires Flask and pymongo. The Dockerfile installs these dependencies and the docker-compose.yml configures Tor dependencies to allow the submitted reports to be transmitted to an onion address.
6. Machine Learning Models: Not applicable. The artifact does not use machine learning models.
7. Datasets: Not applicable. The artifact does not require pre-existing datasets. Evaluators can generate their own data by browsing websites and submitting reports during the evaluation process.

### Estimated Time and Storage Consumption (Required for Functional and Reproduced badges)

The complete evaluation process requires approximately 1.5 hours, which includes downloading Tor Browser and server-side container (~20 minutes), installation and configuration of the ReporTor plugin (~20 minutes), testing the functionality by browsing websites and submitting test reports (~30 minutes), and viewing the submitted reports in the mongodb database (~10 minutes). The compute time is minimal, consisting only of the browser runtime, container runtime, and extension loading. The total disk space requirement is less than 1 GB, which includes the Tor Browser installation, the docker container, and the ReporTor plugin ZIP file. These minimal requirements make the artifact easily executable on most modern systems without consuming significant resources.


## Environment (Required for all badges)

Installation Instructions
Step 1: Download and Install Tor Browser
1. Download the latest version of Tor Browser for your operating system:
- https://www.torproject.org/download/

2. Install Tor Browser:
- Windows: Run the installer (.exe file) and follow the prompts.
- macOS: Open the .dmg file and drag Tor Browser to your Applications folder.
- Linux: Extract the tar.xz file and run the start-tor-browser.desktop file.

3. Launch Tor Browser via Tor Browser icon.

Step 2: Download and Install Docker
A. Linux (Ubuntu / Debian-based example)

1. Remove any old Docker versions if present:
sudo apt remove docker docker-engine docker.io containerd runc

2. Update your packages:
sudo apt update

3. Install prerequisite packages:
sudo apt install ca-certificates curl gnupg

4. Add Docker GPG key and repository:
sudo install -m 0755 -d /etc/apt/keyrings  
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg  
echo \
  "deb [arch=$(dpkg --print-architecture) \
  signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

5. Install Docker Engine, CLI, and supporting tools:
sudo apt update  
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin  

6. Start & enable Docker so it launches on boot:
sudo systemctl start docker  
sudo systemctl enable docker  

7. (Optional) Allow your user to run Docker without sudo:
sudo usermod -aG docker $USER  

8. Verify installation:
docker run hello-world  

If you see the "Hello from Docker!"" message, it is working. 

B. Windows

Use Docker Desktop for Windows. 
1. Ensure your Windows edition supports Docker Desktop (Windows 10/11 with WSL 2 or Pro/Enterprise with Hyper-V).

2. Download Docker Desktop from the official Docker site (https://docs.docker.com/desktop/setup/install/windows-install/).

3. Run the installer and follow the prompts (including enabling WSL 2 or Hyper-V if required).

4. After installation, launch Docker Desktop.

5. Verify from PowerShell or Command Prompt:
docker --version  
docker compose version  

6. To test:
docker run hello-world  

C. macOS
Use Docker Desktop for macOS. 
1. Download Docker Desktop for your architecture (https://docs.docker.com/desktop/setup/install/mac-install/).

2. Open the .dmg file and drag the Docker icon into Applications.

3. Launch Docker from Applications.

4. Verify:
docker --version  
docker compose version  

5. Test:
docker run hello-world  

Step 3: Download and Build the ReporTor Server-side Container
1. Download the provided ReporTor Server-side container  
2. Extract the ZIP file to a folder on your computer (remember this location).
3. Open a new terminal window and locate the just extracted folder.
4. Run the following command to build an run the container:
sudo docker-compose up --build
5. Wait for all services to launch.

Step 4: Download ReporTor Plugin and setup Onion Address
1. Open a new terminal window and locate the extracted directory of ReporTor Server-side container.
2. Run the following commands to download the ReporTor plugin and automatically configure the plugin with the newly created onion address:
sudo chmod +x update_plugin.py
sudo ./update_plugin.py
sudo chmod -R 777 reportor/

Step 5: Install the ReporTor Plugin
1. Open Tor Browser if not already running.
2. Access the debugging page:
- Type about:debugging in the address bar and press Enter.
3. Load the ReporTor extension:
- Click "This Tor Browser" in the left sidebar.
- Click the "Load Temporary Add-on..." button.
- Navigate to the folder where you extracted the ReporTor Server-side container, which should contain the the ReporTor plugin downloaded in the previous step.
- Select the manifest.json file and click "Open."
4. Configure the extension permissions:
- Click the application menu in the far right of the toolbar.
- Select "Add-ons and themes."
- Click on "Extensions" in the left sidebar.
- Find ReporTor in the list and click on it.
- Enable the extension by toggling the switch in the top right to "ON."
- Under "Run in Private Windows", click the "Allow" button.
- At this stage, you may see a one-time permission prompt. It will request the extension's approval to `download files...'. Please grant this permission to proceed.
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

To verify that the environment is correctly configured and the ReporTor plugin is functioning properly, perform the following basic functionality tests:

Test 1
1. Launch Tor Browser from your installed location.
2. The window will display the Connect to Tor page. Click Connect and wait for the browser to establish a connection to the Tor network.
3. Click the + button next to "New Tab" in the top-left corner of the window to open a new tab.
4. Navigate to a test website by entering the following URL in the address bar: https://www.bbc.com/news
5. Activate the ReporTor plugin by clicking the face emoji icon in the browser toolbar.

Expected Output:
You should see the ReporTor plugin UI window appear, displaying the following elements:
- URL being reported (pre-filled with the current page URL, with query parameters stripped off).
- Exit Node Information: Includes a question mark icon (tooltip). Clicking it opens a new tab with a detailed explanation of the 'exit node' concept.
- Browser Security Level Indicator: Includes a question mark icon (tooltip). Clicking it opens a new tab with a detailed explanation of the 'security level' concept.
- "What problem did you experience?" options.
- "Additional detail" text area.
Two action buttons: "Cancel" and "Send Report."

The interface should match the layout shown in Figure 1 of the paper. If the plugin interface opens without errors, the environment is correctly configured and ready for evaluation.

Note: The plugin window can be closed by clicking "Cancel" without submitting a report. This test verifies only that the plugin loads correctly.

Test 2
1. If you closed the window, redo all the steps from Test 1.
2. Complete form displayed by ReporTor plugin.
3. Submit Report.
4. Open new terminal window.
5. Run the following commands:
sudo docker exec -it reportor_mongo mongosh
use broken_sites
show collections
db.reports.find().pretty()

Expected Output:
You should see a json object of the report that you just submitted. 

## Artifact Evaluation (Required for Functional and Reproduced badges)

This section includes all steps required to evaluate ReporTor functionality and validate the paper's key results and claims regarding successful error reporting for issues encountered when browsing the web with Tor Browser.

Main Results and Claims

Main Result 1: Successful Error Reporting for Browsing Issues Encountered in Tor Browser

Our paper demonstrates that the ReporTor plugin enables users to report the problems they encounter while browsing websites with Tor Browser. When users encounter issues accessing a website, they can invoke ReporTor to submit anonymous issue reports that include exit node information, browser security settings, issue types, and open-ended contextual information. This claim is reproducible by executing Experiment 1 below, where evaluators will encounter issues, report them through the plugin interface, and see the reported issues stored in the database. These results support the findings presented in our paper.

Experiments

Experiment 1: Testing Issues Reporting through ReporTor

Time: 30 minutes. 
Storage: <1MB (for temporary report data).

This experiment reproduces the main findings about successful reporting of issues encountered when browsing with Tor Browser. You will test five representative websites and submit reports for those that exhibit problems.

Step 1: Test Working Websites

1. Launch Tor Browser.
2. The window will display the Connect to Tor page. Click Connect and wait for the browser to establish a connection to the Tor network.
3. Click the + button next to "New Tab" in the top-left corner of the window to open a new tab.
4. Navigate to each of the following websites that work normally:
https://cnn.com
https://doodle.com

- For doodle.com, you may need to complete a CAPTCHA.
- Verify that both sites load and function correctly in Tor Browser.

Step 2: Test Problematic Websites and Submit Reports.
Perform these steps for each of the following websites that should exhibit issues:
https://airbnb.com
https://sciencedirect.com
https://walmart.com

1. Navigate to the website (You should encounter an error message, access denial, or functionality issues.)
- If a website takes a long time to load, wait for Tor Browser timeout error message before proceeding to the next step.

2. Note the Tor circuit information:
- Click on the circuit display (showing the connection path).
- Note the exit node country/name on paper (e.g., "Germany - 168.19.2.55").

3. Note the current Security setting:
- Click the application menu in the far right of the toolbar.
- Select "Settings."
- Click on "Privacy & Security" in the left sidebar.
- Scroll down to the Security section and take note of the security level (Standard/Safer/Sasfest).

4. Open the ReporTor plugin:
- Click the face emoji icon in the toolbar.

5. Complete the report form:
- Exit Node: Type the exit node information you noted. If you want to learn more about the 'exit node' click on question mark icon (tooltip) to open a new tab with a detailed explanation of this concept.
- Browser Security Level: Select the current setting of the security slider in Tor Browser (Standard/Safer/Safest). If you want to learn more about the 'security levels' click on question mark icon (tooltip) to open a new tab with a detailed explanation of this concept.
- What problem did you experience?: Check the relevant issue(s).
- Additional Detail: Enter a brief description, e.g., "Airbnb shows an 'Access Denied' page with message about unusual activity".

6. Submit the report:
- Click the "Send Report" button.

7. Open new terminal window.
8. Run the following commands:
sudo docker exec -it reportor_mongo mongosh
use broken_sites
show collections
db.reports.find().pretty()

Expected Results:
- CNN and Doodle should load successfully (possibly with CAPTCHAs for Doodle).
- Airbnb, ScienceDirect, and Walmart should display various error messages or access restrictions.
- You should successfully submit 3 error reports through the ReporTor interface.
- All report submissions should take less than 30 seconds once the error is encountered.
- In the terminal window, you should see json objects of the reports that you just submitted. 

These results validate that ReporTor enables users to submit issue reports as described in our paper. In addition, the reports are transmited via onion address to a flask server that stores them in a database as described in the paper.


## Limitations (Required for Functional and Reproduced badges)

The one-month naturalistic browsing study described in the paper cannot be reproduced within the scope of artifact evaluation. The artifact allows evaluators to test the user interface, the reporting mechanism, the plugin features, and the server-side functionality described in the paper.


## Notes on Reusability (Encouraged for all badges)

Nothing else to add in this section.