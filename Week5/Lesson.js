// $sum
db.zips.aggregate([
    {$group : 
        {
            _id : "$state",
            population : {$sum : "$pop"}
        }
    }
]);    

// $avg
db.zips.aggregate([
    {$group : 
        {
            _id : "$state",
            avg_population : {$avg : "$pop"}
        }
    }
]);  

// $addToSet
db.zips.aggregate([
    {$group : 
        {
            _id : "$city",
            postal_codes : {$addToSet : "$_id"}
        }
    }
]);  

// $min and $max
db.zips.aggregate([
    {$group : 
        {
            _id : "$state",
            pop : {$max : "$pop"}
        }
    }
]);  

// $project
db.zips.aggregate([
    {$project : 
        {
            _id : 0,
            city : {"$toLower" : "$city"},
            pop : 1,
            state : 1,
            zip : "$_id"
        }
    }
]);  

// $match
db.zips.aggregate([
    {$match : 
        {
            pop : {$gt : 100000}
        }
    }
]);  

// $sort
db.zips.aggregate([
    {$sort : 
        {
            state : 1,
            city : 1
        }
    }
]);  