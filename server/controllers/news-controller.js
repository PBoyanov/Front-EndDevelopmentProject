/* globals module */

module.exports = function(params) {
    let { data } = params;

    return {
        getAllNews(req, res) {
            data.getAllNews()
                .then(allNews => {
                    res.json({ data: allNews })
                })
                .catch(err => {
                    res.json(err);
                });
        },
        getNewsItemById(req, res) {
            data.getNewsItemById(req.params.id)
                .then((newsItem) => {
                    res.json({ data: newsItem });
                })
                .catch(err => {
                    res.json(err);
                });
        },
        addNewsItemComment(req, res) {
            let newsItemId = req.params.id;
            let putData = req.body;
            let username = putData.username;

            data.getUserByUsername(username)
                .then((user) => {
                    let comment = {
                        content: putData.commentContent,
                        date: putData.commentDate,
                        username: username,
                        userProfileImg: user.profileImg
                    }

                    data.addNewsItemComment(newsItemId, comment)
                        .then((newsItem) => {
                            res.status(200).send({ success: true, msg: "Успешно добавен коментар" });
                        })
                        .catch(err => {
                            res.json(err);
                        });
                })
                .catch(err => {
                    res.json(err);
                });
        }
    };
};