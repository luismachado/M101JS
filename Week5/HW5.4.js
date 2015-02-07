db.zips.aggregate([
	{$match : 
		{
			city : {$regex : "^[0-9]"}
		}
	},
	{$group :
		{
			_id : null,
			rural_pop: {$sum : "$pop"}
		}
	}
]);
		

/*db.zips.aggregate([
    {$project : {city:{$substr:["$city",0,1]}}},
    {$sort : {city : 1}}, 
    {$match: {city: {$type: 16}}} // city is a 32-bit integer
]);*/

/* Doc Example
{
	"_id" : "92278",
	"city" : "TWENTYNINE PALMS",
	"loc" : [
		-116.06041,
		34.237969
	],
	"pop" : 11412,
	"state" : "CA"
}
*/