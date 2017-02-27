import { templateLoader } from './template-loader';

let home = (() => {
    function getHome(context) {
        let materials;
        // data.getMaterials()
        //     .then((result) => {
        //         materials = result.result;
        templateLoader.get("home")
            //})
            .then((template) => {
                // let filterProp;
                // let filterValue;
                // if (context.params["title"]) {
                //     filterProp = "title";
                //     filterValue = context.params["title"];
                // } else if (context.params["description"]) {
                //     filterProp = "description";
                //     filterValue = context.params["description"];
                // } else if (context.params["user"]) {
                //     filterProp = "user";
                //     filterValue = context.params["user"];
                // }

                // if (filterProp === "user") {
                //     materials = materials.filter(m => m.user.username.toLowerCase() === filterValue);
                // }
                // else if (filterProp) {
                //     materials = materials.filter(m => {
                //         let value = m[filterProp].toLowerCase();
                //         return value.indexOf(filterValue) >= 0
                //     });
                // }

                // materials.forEach((m)=>{
                //     let date = new Date(m.createdOn);
                //     m.createdOn = date.toLocaleString();
                // });
                // console.log(materials);
                context.$element().html(template({ /*materials*/ }));

                let properties = ["title", "description", "user"];
                properties.forEach((property) => {
                    $(`#${property}-btn`).on("click", function (ev) {
                        let value = $(`#${property}`).val().toLowerCase();
                        if (value === "") {
                            toastr.error(`Empty {property}`);
                        } else {
                            context.redirect(`#/home?${property}=${value}`);
                        }
                        ev.preventDefault();
                        return false;
                    });
                });

            });
    }

    return {
        renderPage: getHome
    }
})();

export { home };