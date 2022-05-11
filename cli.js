#!/usr/bin/env node
'use strict'

const { execSync } = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
};

const projectName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/earoglif/react-ts-pure-project.git ${projectName}`;
const goToProjectDirCommand = `cd ${projectName}`;
const renameProjectNameCommand = `npm pkg set name=${projectName}`;
const installDepsCommand = `npm install`;

console.log(`Cloning the repository with name ${projectName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Go to ${projectName}`);
const goToProjectDir = runCommand(goToProjectDirCommand);
if (!goToProjectDir) process.exit(-1);

console.log(`Rename project`);
const renameProjectName = runCommand(renameProjectNameCommand);
if (!renameProjectName) process.exit(-1);

console.log(`Installing dependencies for ${projectName}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log(
    'Congratulations! You are ready. Follow the following commands to start'
);
console.log(`cd ${projectName} && npm start`);