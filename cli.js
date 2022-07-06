#!/usr/bin/env node
const { execSync } = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed command ${command}`, e);
        return false;
    }
    return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/earoglif/react-ts-pure-project.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm pkg set name=${repoName} && rm -rf .git && git init && npm install`;

console.log(`Cloning the repository ${repoName}...`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName} and rename project`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log('Done!');
