db = db.getSiblingDB("broken_sites");

db.createUser({
  user: "datareciever",
  pwd: "YOUR_SECURE_PASSWORD",
  roles: [{ role: "readWrite", db: "broken_sites" }]
});

