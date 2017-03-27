let validator =(() => {
    function validateUsername(username){
        if(typeof username !== "string" || username.length < 6 || username.length > 30){
            throw new Error("Потребителското име трябва да е между 6 и 30 символа!");
        }

        let replacedString = username.replace(/[A-Za-z0-9_.]/g, "");

        if(replacedString.length > 0){
            throw new Error('Потребителското име може да съдържа само главни и малки латински букви,' +
            ' цифри и символите "_" и "."!');
        }
    }

    function validatePassword(password){
        if(typeof password !== "string" || password.length < 6 || password.length > 30){
            throw new Error("Паролата трябва да е между 6 и 30 символа!");
        }
    }

    function validateConfirmPassword(password, confirmPassword) {
        if(password !== confirmPassword) {
            throw new Error("Паролите не съвпадат!");
        }
    }

    return{
        validateUsername,
        validatePassword,
        validateConfirmPassword
    }
})();

export { validator };
