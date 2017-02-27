let createMaterial = (function () {
    function getAll(context) {
        templates.get("create-material")
            .then((templateFunc)=>{
                context.$element().html(templateFunc());

                $("#create-new-material").on("click", function(ev){
                    let title = $("#material-title").val();
                    let description = $("#material-description").val();
                    let image = $("#material-img").val();

                    data.createMaterial(title, description, image)
                        .then(()=>{
                            toastr.success("Your material was created");
                            context.redirect("#/home");
                        })
                        .catch((e)=>{
                            toastr.error(e.message);
                        });

                    ev.preventDefault();
                    return false;
                });
            });
    }

    return {
        all: getAll
    };
} ());