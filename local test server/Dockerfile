FROM python:3.8-slim

WORKDIR /workspace

# Install Tor
RUN apt-get update && \
    apt-get install -y tor curl && \
    rm -rf /var/lib/apt/lists/*

# Copy Python requirements
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask app
COPY app.py .

# Expose Flask port
EXPOSE 5000

CMD ["python", "app.py"]


