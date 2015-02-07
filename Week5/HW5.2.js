db.zips.aggregate([
	{$group :
		{
			_id : {state : "$state", city : "$city"},
			city_pop : {$sum : "$pop"}
		}
	},
	{$match : 
		{
			city_pop : {$gt : 25000},
			$or :[{'_id.state' : "CA"},{'_id.state' : "NY"}] 
		}
	},
	{$group :
		{
			_id : null,
			avg_pop : {$avg : "$city_pop"}
		}
	}	
]);

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