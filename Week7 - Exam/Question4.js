mongoimport -d blog -c posts < posts.json

package.json -> express ^3.X

grep -rn "XXX" .

// posts.js
this.incrementLikes = function(permalink, comment_ordinal, callback) {
    "use strict";

    var selector = {};
    selector['comments.' + comment_ordinal + '.num_likes'] = 1;


    posts.update({'permalink': permalink}, {$inc : selector}, function(err, numModified) {
        "use strict";

        if (err) return callback(err, null);

        callback(err, numModified);
    });
}