var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var cursor = db.collection('students').find({}, {scores:true});

    var currentState = "";

    cursor.count(function(err,count){
        var remaining = count;

        if(count == 0) {
            db.close();
            return;
        }

        cursor.each(function(err, doc) {

            if(err) throw err;
            if(doc == null) {}
            else {
		        var idxToRemove = -1, lowestGrade = 100;	
		        for(var scoresIdx = 0; scoresIdx < doc.scores.length; scoresIdx++) {

		        	if(doc.scores[scoresIdx].type == 'homework' && doc.scores[scoresIdx].score < lowestGrade) {
		        		idxToRemove = scoresIdx;
		        		lowestGrade = doc.scores[scoresIdx].score;
		        	}
		        }

		        if(idxToRemove != -1) {
		        	doc.scores.splice(idxToRemove,1);

		        	db.collection('students').update({'_id':doc._id}, {$set: {'scores':doc.scores}}, function(err, update) {
		                if(err) throw err;
		                if(--remaining == 0) db.close();
		            });
		        } else {
		            if(--remaining == 0)
		                db.close();
		        }
		    }
        });
    });
});