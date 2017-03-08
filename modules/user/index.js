'use strict'

const Path = require('path')
const Generators = require('yeoman-generator')
const GithubUrlFromGit = require('github-url-from-git')
const GitConfig = require('git-config')
const Mkdirp = require('mkdirp')


module.exports = Generators.Base.extend({
    constructor: function() {

        Generators.Base.apply(this, arguments);
    },
    init: function() {

        this.pkg = this.fs.readJSON(Path.join(__dirname, '../package.json'));
    },
    git: function() {
        const done = this.async();
        this.gitConfig = {};

        GitConfig((err, config) => {

            if (err) {
                return done();
            }

            this.gitConfig = config;
            done();
        });
    },
    askFor: function() {
        const prompts = [{
            name: 'authMode',
            message: 'AuthMode(password,vertifyCode)',
            default: 'password'
        }]

        return this.prompt(prompts).then((answers) => {
            this.authMode = answers.authMode
        })
    },
    github: function() {
        this.homepageUrl = GithubUrlFromGit(this.gitRepo);
        this.isGithub = Boolean(this.homepageUrl);

        if (this.isGithub) {
            this.bugsUrl = this.homepageUrl + '/issues';
            const matches = GithubUrlFromGit.re.exec(this.gitRepo);
            this.githubOwner = matches[2].split('/')[0];
        }
        else {
            this.homepageUrl = '';
            this.bugsUrl = '';
        }
    },
    app: function() {
        let isAppPath = this.fs.existsSync('server')
        if (isAppPath) {
            switch(this.authMode) {
                case "password":
                    
                    break
                case "vertifyCode":
                    
                    break
            }
        }
    }
})