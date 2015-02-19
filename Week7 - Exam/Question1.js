mongorestore -d enron messages.bson

{
	"_id" : ObjectId("4f16fc97d1e2d32371003f02"),
	"body" : "BLABLA",
	"filename" : "2.",
	"headers" : {
		"Content-Transfer-Encoding" : "7bit",
		"Content-Type" : "text/plain; charset=us-ascii",
		"Date" : ISODate("2001-07-30T22:19:40Z"),
		"From" : "reservations@marriott.com",
		"Message-ID" : "<32788362.1075840323896.JavaMail.evans@thyme>",
		"Mime-Version" : "1.0",
		"Subject" : "84029698 Marriott  Reservation Confirmation Number",
		"To" : [
			"ebass@enron.com"
		],
		"X-FileName" : "eric bass 6-25-02.PST",
		"X-Folder" : "\\ExMerge - Bass, Eric\\Personal",
		"X-From" : "Reservations@Marriott.com",
		"X-Origin" : "BASS-E",
		"X-To" : "EBASS@ENRON.COM",
		"X-bcc" : "",
		"X-cc" : ""
	},
	"mailbox" : "bass-e",
	"subFolder" : "personal"
}

Question 1:
	db.messages.find({"headers.From" : "andrew.fastow@enron.com", "headers.To" : "jeff.skilling@enron.com"}).count()
	Resp: 3