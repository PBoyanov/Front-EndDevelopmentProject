"use strict";

let userProfile = (function () {
    function getProfile(context) {
        let userInfo;
        let username = context.params["username"];
        data.getUserByUsername(username)
            .then((result) => {
                userInfo = result.result;
                if (context.params["category"]) {
                    let category = context.params["category"];
                    userInfo.userMaterials = userInfo.userMaterials.filter(m => m.category === category);
                    userInfo.categories = [{
                        category: category,
                        materials: userInfo.userMaterials
                    }];
                }else{
                    let wantToWatch = [];
                    let watched = [];
                    let watching = [];
                    userInfo.userMaterials.forEach((m)=>{
                        if(m.category === "want-to-watch"){
                            wantToWatch.push(m);
                        }else if(m.category === "watched"){
                            watched.push(m);
                        }else if(m.category === "watching"){
                            watching.push(m);
                        }
                    });

                    let categories = [{
                        category: "want-to-watch",
                        materials: wantToWatch,
                        username: username
                    },{
                        category: "watched",
                        materials: watched,
                        username: username
                    },{
                        category: "watching",
                        materials: watching,
                        username: username
                    }];

                    userInfo.categories = categories;
                }
                return templates.get("user-profile");
            })
            .then((templateFunc) => {

                context.$element().html(templateFunc(userInfo));
            });
    }

    return {
        all: getProfile
    }
} ());