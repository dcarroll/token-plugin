import {core, flags, SfdxCommand} from '@salesforce/command';
import * as cp from 'child_process';

// Initialize Messages with the current plugin directory
core.Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core.Messages.loadMessages('token-plugin', 'generate');

interface AuthURL {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  instanceUrl: string;
}

export default class Generate extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx org:token:generate --targetusername myOrg@example.com
  Token generated for myOrg@example.com
  `
  ];

  public static args = [];

  protected static flagsConfig = {
    verbose: flags.boolean({char: 'v', description: messages.getMessage('verboseFlagDescription')})
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<core.AnyJson> {
    const name = this.flags.name || 'world';
    const orgDisplay = JSON.parse(cp.execSync('sfdx force:org:display -u ' + this.flags.targetusername +
        ' --verbose --json').toString()).result;
    const authUrl: AuthURL = this.getUrlParts(orgDisplay.sfdxAuthUrl);

    let outputString = `Token generated for ${this.flags.targetusername}:`;
    outputString += '\n' + authUrl.refreshToken;
    outputString += '\n' + authUrl.instanceUrl;
    if (this.flags.verbose) {
      outputString += '\n' + authUrl.clientId;
      outputString += '\n' + authUrl.clientSecret;
    }

    this.ux.log(outputString);

    const token = {
      refreshToken: authUrl.refreshToken,
      instanceUrl: authUrl.instanceUrl
    };
    // Return an object to be displayed with --json
    if (this.flags.verbose) {
      token['clientId'] = authUrl.clientId;
      token['clientSecret'] = authUrl.clientSecret;
    }
    return {
      targetusername: this.flags.targetusername,
      refreshToken: token
    };
  }

  public getUrlParts(sfdxAuthUrl: string): AuthURL {
    const parts = sfdxAuthUrl.split('@');
    const leftPart = parts[0];
    const rightPart = parts[1];
    const authUrl: AuthURL = { clientId: leftPart.split(':')[1].replace('//', ''),
      clientSecret: leftPart.split(':')[2],
      refreshToken: leftPart.split(':')[3],
      instanceUrl: rightPart
    };
    return authUrl;
  }
}
