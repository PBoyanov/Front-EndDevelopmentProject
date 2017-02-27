let validator =(() => {
    function validateUsername(username){
        if(typeof username !== 'string' || username.length < 6 || username.length > 30){
            throw new Error('Потребителското име трябва да е между 6 и 30 символа!');
        }

        let replacedString = username.replace(/[A-Za-z0-9_.]/g, "");

        if(replacedString.length > 0){
            throw new Error('Потребителското име може да съдържа само главни и малки латински букви,' +
            ' цифри и символите "_" и "."!');
        }
    }

    function validatePassword(password){
        if(typeof password !== 'string' || password.length < 6 || password.length > 30){
            throw new Error("Паролата трябва да е между 6 и 30 символа!");
        }

        // let replacedString = password.replace(/[A-Za-z0-9]/g, "");

        // if(replacedString.length > 0){
        //     throw new Error("Паролата може да се състои само от букви и цифри!");
        // }
    }

     function validateTitle(title){
        if(typeof title !== "string" || title.length < 6 || title.length > 100){
            throw new Error("Invalid title length");
        }
    }

    function validateDescription(description){
        if(typeof description !== "string"){
            throw new Error("Invalid description");
        }
    }

    return{
        validateUsername,
        validatePassword,
        validateTitle,
        validateDescription
    }
})();

export { validator };
