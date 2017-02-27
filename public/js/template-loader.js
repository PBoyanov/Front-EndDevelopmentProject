let templateLoader = (() => {
    const cache = {};

    function getTemplate(templateName) {
        return new Promise((resolve, reject) => {
            if (cache[templateName] !== undefined) {
                resolve(cache[templateName]);
            } else {
                $.get(`/templates/${templateName}.handlebars`)
                    .done((source) => {
                        let template = Handlebars.compile(source);
                        cache[templateName] = template;
                        resolve(template);
                    })
                    .fail(reject);
            }
        });
    }

    return {
        get: getTemplate
    }
})();

export { templateLoader };

