// get posts
db.posts.ensureIndex({date:-1});
// get posts by tag
db.posts.ensureIndex({tags:1});
// get post by permalinl
db.posts.ensureIndex({permalink:1});