for(i = 1; i < 100000; i++) {
	db.fubar.save({
		a: parseInt(Math.random() * 100000),
		b: parseInt(Math.random() * 100000),
		c: parseInt(Math.random() * 100000)
	});
}
db.fubar.ensureIndex({a:1, b:1})
db.fubar.ensureIndex({a:1, c:1})
db.fubar.ensureIndex({c:1})
db.fubar.ensureIndex({a:1, b:1, c:-1})

db.fubar.getIndexes();
//db.system.indexes.find();

db.fubar.find({'a':{'$lt':10000}, 'b':{'$gt': 5000}}, {'a':1, 'c':1}).sort({'c':-1}).explain();
"cursor" : "BtreeCursor c_1 reverse",

db.fubar.dropIndex( { "c": 1 } );
db.fubar.find({'a':{'$lt':10000}, 'b':{'$gt': 5000}}, {'a':1, 'c':1}).sort({'c':-1}).explain();
"cursor" : "BtreeCursor a_1_b_1",

db.fubar.dropIndex( { "a": 1, "b" : 1 } );
db.fubar.find({'a':{'$lt':10000}, 'b':{'$gt': 5000}}, {'a':1, 'c':1}).sort({'c':-1}).explain();
"cursor" : "BtreeCursor a_1_b_1_c_-1",

db.fubar.dropIndex( { "a": 1, "b" : 1, "c" : -1} );
db.fubar.find({'a':{'$lt':10000}, 'b':{'$gt': 5000}}, {'a':1, 'c':1}).sort({'c':-1}).explain();
"cursor" : "BtreeCursor a_1_c_1",

db.fubar.dropIndex( { "a": 1, "c" : 1} );
db.fubar.find({'a':{'$lt':10000}, 'b':{'$gt': 5000}}, {'a':1, 'c':1}).sort({'c':-1}).explain();
"cursor" : "BasicCursor",