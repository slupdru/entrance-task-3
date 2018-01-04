module.exports = {
    entry:'./src/App.jsx',
    output:{
        filename: 'bundle.js',
        path: __dirname + '/public'
    },
    

    module:{
        rules:[
            {
                test:/\.scss$/,
                use: ["style-loader","css-loader", "sass-loader"]
            },
            {
                test:/\.jsx?/,
                exclude:/node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[ext]'
                    }  
                  }
                ]
              }

        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        proxy:{
            "/graphql": "http://localhost:3000"
        }
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}