token-plugin
============



[![Version](https://img.shields.io/npm/v/token-plugin.svg)](https://npmjs.org/package/token-plugin)
[![CircleCI](https://circleci.com/gh/dcarroll/token-plugin/tree/master.svg?style=shield)](https://circleci.com/gh/dcarroll/token-plugin/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/dcarroll/token-plugin?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/token-plugin/branch/master)
[![Codecov](https://codecov.io/gh/dcarroll/token-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/dcarroll/token-plugin)
[![Greenkeeper](https://badges.greenkeeper.io/dcarroll/token-plugin.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/dcarroll/token-plugin/badge.svg)](https://snyk.io/test/github/dcarroll/token-plugin)
[![Downloads/week](https://img.shields.io/npm/dw/token-plugin.svg)](https://npmjs.org/package/token-plugin)
[![License](https://img.shields.io/npm/l/token-plugin.svg)](https://github.com/dcarroll/token-plugin/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g token-plugin
$ token-plugin COMMAND
running command...
$ token-plugin (-v|--version|version)
token-plugin/0.0.0 darwin-x64 node-v10.4.0
$ token-plugin --help [COMMAND]
USAGE
  $ token-plugin COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`token-plugin org:token:generate`](#token-plugin-orgtokengenerate)

## `token-plugin org:token:generate`

Generates a scratch org token.

```
USAGE
  $ token-plugin org:token:generate

OPTIONS
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  -v, --verbose                                   Generates client secret in addition to token
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLE
  $ sfdx org:token:generate --targetusername myOrg@example.com
     Token generated for myOrg@example.com
```

_See code: [src/commands/org/token/generate.ts](https://github.com/dcarroll/token-plugin/blob/v0.0.0/src/commands/org/token/generate.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
