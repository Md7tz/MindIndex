require('dotenv').config();

module.exports = {
  apps: [{
    name: 'mindindex',
    script: 'app.mjs',
    watch: false,
    node_args: '--experimental-json-modules',
    instances: 'max',
    exec_mode: 'cluster'
  }],

  deploy: {
    production: {
      key: process.env.DEPLOY_KEY_PATH,
      user: 'medhatusama',
      host: '35.197.136.120',
      ref: 'origin/dev',
      repo: 'git@github.com:ScientiaLiber/MindIndex.git',
      path: '/home/ubuntu/code/MindIndex',
      "pre-deploy-local": "git fetch",
      "post-deploy": "npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "npx knex migrate:latest --env production"
    }
  }
};
