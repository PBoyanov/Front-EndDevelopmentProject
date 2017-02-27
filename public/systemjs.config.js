SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        app: 'static/js',
        'plugin-babel':
        './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build':
        './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        // app start script
        //'main': './js/app.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
        app: {
            main: './app.js'
        }
    }
});