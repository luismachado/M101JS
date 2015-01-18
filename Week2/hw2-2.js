var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var options = {'sort' : [['State', 1],
                             ['Temperature', -1]]};

    var cursor = db.collection('data').find({}, {}, options);

    var currentState = "";

    cursor.each(function(err, doc) {

        if(err) throw err;
        if(doc == null)
            console.log("Cursor End");
            //db.close();
        
        if(doc != null && currentState != doc.State) {
            console.dir(doc.State);
            currentState = doc.State;

            var query     = {'_id' : doc._id};
            var operation = {$set : {'month_high' : true}};

            db.collection('data').update(query, operation, function(err, update) {
                if(err) throw err;
                console.log('Updated Record.'); return;
            });    
        }

        return;
    });
    return;
});


/*cursor.each(function(err, doc) {

    if(err) throw err;
    if(doc == null)
        db.close();
    
    else if(currentState != doc.State) {
        currentState = doc.State;

        var query     = {'_id' : doc._id};
        var operation = {$set : {'month_high':true}};

        db.collection('data').update(query, operation, function(err, update) {
            if(err) throw err;
        });    
    }
});*/