db.messages.aggregate([
	{$project :
		{
			"headers.From" : 1,
			"headers.To" : 1
		}
	},
	{$unwind : "$headers.To"},
	{$group : 
		{
			_id : "$_id",
			"from" : {$first : "$headers.From"},
			"to" : {$addToSet : "$headers.To"}
			
		}
	},
	{$unwind : "$to"},
	{$group : 
		{
			_id : {first : "$from", to : "$to"},
			qte : {$sum : 1}
			
		}
	},
	{$sort : {qte : -1}}
]);

//750

{ "_id" : { "first" : "susan.mara@enron.com", "to" : "jeff.dasovich@enron.com" }, "qte" : 750 }
{ "_id" : { "first" : "soblander@carrfut.com", "to" : "soblander@carrfut.com" }, "qte" : 679 }
{ "_id" : { "first" : "susan.mara@enron.com", "to" : "james.steffes@enron.com" }, "qte" : 646 }
{ "_id" : { "first" : "susan.mara@enron.com", "to" : "richard.shapiro@enron.com" }, "qte" : 616 }
{ "_id" : { "first" : "evelyn.metoyer@enron.com", "to" : "kate.symes@enron.com" }, "qte" : 567 }