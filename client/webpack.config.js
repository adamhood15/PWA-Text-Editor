const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
    return {
        mode: 'development',
        entry: {
            main: './src/js/index.js',
            install: './src/js/install.js',
        },
        devServer: {
            hot: 'only',
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            // // Webpack plugin that generates our html file and injects our bundles.
            new HtmlWebpackPlugin({
                template: './index.html',
                title: 'Webpack Plugin',
            }),

            new InjectManifest({
                swSrc: './src-sw.js',
                swDest: 'src-sw.js',
            }),

            // // Creates a manifest.json file.
            new WebpackPwaManifest({
                fingerprints: false,
                inject: true,
                name: 'J.A.T.E. Text Editor',
                short_name: 'J.A.T.E.',
                description: 'J.A.T.E. Text Editor',
                background_color: '#ffffff',
                start_url: '/',
                publicPath: '/',
                crossorigin: 'use-credentials', 
                icons: [
                    {
                        src: path.resolve('src/images/logo.png'),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join('assets', 'icons'), // multiple sizes
                    },
                ],
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/transform-runtime',
                            ],
                        },
                    },
                },
            ],
        },
    };
};
