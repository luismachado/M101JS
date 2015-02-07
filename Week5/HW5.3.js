db.grades.aggregate([
	{$unwind : "$scores"},
	{$match : 
		{
			'scores.type' : {$ne : "quiz"}
		}
	},
	{$group :
		{
			_id : 
				{ student_id : "$student_id", class_id : "$class_id" },
			avg_grade_by_student_class : {$avg : "$scores.score"}
		}
	},
	{$group :
		{
			_id : {class_id : "$_id.class_id"} ,
			avg_grade_by_class : {$avg : "$avg_grade_by_student_class"}
		}
	},
	{$sort : {avg_grade_by_class : -1}},
	{$limit : 1}
]);
		

/* Doc Example
{
	"_id" : ObjectId("50b59cd75bed76f46522c392"),
	"student_id" : 10,
	"class_id" : 5,
	"scores" : [
		{
			"type" : "exam",
			"score" : 69.17634380939022
		},
		{
			"type" : "quiz",
			"score" : 61.20182926719762
		},
		{
			"type" : "homework",
			"score" : 73.3293624199466
		},
		{
			"type" : "homework",
			"score" : 15.206314042622903
		},
		{
			"type" : "homework",
			"score" : 36.75297723087603
		},
		{
			"type" : "homework",
			"score" : 64.42913107330241
		}
	]
}
*/