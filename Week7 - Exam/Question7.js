mongoimport -d photosharing -c albums < albums.json
mongoimport -d photosharing -c images < images.json 

var existing_ids = db.albums.aggregate({$unwind:"$images"},{$group:{_id:"$images"}}).map(function (image) {return image._id});
db.images.remove({_id : { $nin : existing_ids }});
db.images.find().count(); //89737

db.images.find({tags : "kittens"}).count(); //44822