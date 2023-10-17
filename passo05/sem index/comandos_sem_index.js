db.project.stats();

db.stats();

db.user.find({first_name: "William"}).explain("executionStats")