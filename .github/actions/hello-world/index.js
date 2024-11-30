const core = require('@actions/core');

try {
    const name = core.getInput('who-to-greet');
    console.log(`Hello ${name}!`);
    core.setOutput('time', new Date().toTimeString());
} catch (error) {
    core.setFailed(error.message);
}


