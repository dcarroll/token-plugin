token-plugin
============


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
    Token generated for HubOrg3:
    5Aep861hJJeETRTRP__6dTS6Kh<snipped>jA1p_GmVf8NQlFNVf71kbyoy21cq
    some-dx-org.my.salesforce.com

  $ sfdx org:token:generate --targetusername myOrg@example.com --verbose --json
  {
  "status": 0,
  "result": {
    "targetusername": "listview",
    "refreshToken": {
      "refreshToken": "5Aep861dR8AR<snipped>ny8dZ",
      "instanceUrl": "customer-nosoftware-2504-dev-ed.cs40.my.salesforce.com",
      "clientId": "SalesforceDevelopmentExperience",
      "clientSecret": "<snipped>"
    }
  }
}

```

_See code: [src/commands/org/token/generate.ts](https://github.com/dcarroll/token-plugin/blob/v0.0.0/src/commands/org/token/generate.ts)_
<!-- commandsstop -->
