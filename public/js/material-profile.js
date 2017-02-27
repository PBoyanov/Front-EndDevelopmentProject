"use strict";

let materialProfile = (function () {
    function getProfile(context) {
        let material;
        let id = context.params["id"];
        data.getMaterialById(id)
            .then((result) => {
                material = result.result;
                let date = new Date(material.createdOn);
                material.createdOn = date.toLocaleString();
                return templates.get("material-profile");
            })
            .then((tempplateFunc) => {
                context.$element().html(tempplateFunc(material));

                $("#add-comment-btn").on("click", function(ev){
                    let text = $("#new-comment").val();

                    data.addComment(id, text)
                        .then((result)=>{
                            toastr.success("Your comment was added.")
                            document.location.reload(true);
                        })
                        .catch((e)=>{
                            toastr.error(e.message);
                        })

                    ev.preventDefault();
                    return false;
                });

                $(".change-state-btn").on("click", function(ev){
                    let target = $(ev.target);
                    let category = target.attr("data-type");
                    let id = $("#material-profile").attr("data-id");

                    data.addToCategory(id, category)
                        .then((result)=>{
                            toastr.success(`Added to ${category}`);
                        })
                        .catch((e) => {
                            if (e.responseText) {
                                let response = JSON.parse(e.responseText);
                                 toastr.error(response.result.error);
                            }else{
                                toastr.error(e.message);
                            }
                        });

                    ev.preventDefault();
                    return false;
                });
            });
    }

    return {
        all: getProfile
    }
} ());