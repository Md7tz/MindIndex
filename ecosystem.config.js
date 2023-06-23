module.exports = {
  apps : [{
      name: 'mindindex',
      script: 'app.mjs',
      watch: false,
      node_args: '--experimental-json-modules',
      instances: 'max',
      exec_mode: 'cluster'
  }],

  deploy : {
    production : {
      user : 'medhatusama',
      host : 'http://34.124.227.222/',
      ref  : 'origin/dev',
      repo : 'git@github.com:ScientiaLiber/MindIndex.git',
      path : '/home/ubuntu/code/MindIndex',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
