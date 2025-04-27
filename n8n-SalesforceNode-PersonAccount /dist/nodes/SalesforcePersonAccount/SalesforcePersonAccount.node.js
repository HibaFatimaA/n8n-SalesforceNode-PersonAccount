"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforcePersonAccount = void 0;
class SalesforcePersonAccount {
    constructor() {
        this.description = {
            displayName: 'Salesforce PersonAccount API',
            name: 'salesforcePersonAccount',
            group: ['salesforce'],
            version: 1,
            description: 'Manage Salesforce PersonAccount records',
            defaults: {
                name: 'PersonAccount',
                color: '#772244',
            },
            icon: 'file:salesforce.svg',
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'salesforcePersonAccount',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    options: [
                        {
                            name: 'Create PersonAccount',
                            value: 'createPersonAccount',
                        },
                        {
                            name: 'Get PersonAccount',
                            value: 'getPersonAccount',
                        },
                        {
                            name: 'Update PersonAccount',
                            value: 'updatePersonAccount',
                        },
                        {
                            name: 'Delete PersonAccount',
                            value: 'deletePersonAccount',
                        },
                    ],
                    default: 'getPersonAccount',
                    description: 'PersonAccount operation',
                },
                {
                    displayName: 'PersonAccount ID',
                    name: 'personAccountId',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: {
                        show: {
                            operation: ['getPersonAccount', 'updatePersonAccount', 'deletePersonAccount'],
                        },
                    },
                    description: 'The PersonAccount ID',
                },
                {
                    displayName: 'First Name',
                    name: 'firstName',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: {
                        show: {
                            operation: ['createPersonAccount'],
                        },
                    },
                    description: 'First name of the PersonAccount',
                },
                {
                    displayName: 'Last Name',
                    name: 'lastName',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: {
                        show: {
                            operation: ['createPersonAccount'],
                        },
                    },
                    description: 'Last name of the PersonAccount',
                },
                {
                    displayName: 'Email',
                    name: 'email',
                    type: 'string',
                    required: false,
                    default: '',
                    displayOptions: {
                        show: {
                            operation: ['createPersonAccount', 'updatePersonAccount'],
                        },
                    },
                    description: 'Email address of the PersonAccount',
                },
            ],
        };
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = yield this.getCredentials('salesforcePersonAccount');
            const operation = this.getNodeParameter('operation', 0);
            const returnData = [];
            const items = this.getInputData();
            // Salesforce API Configuration
            const config = {
                clientId: credentials.clientId,
                clientSecret: credentials.clientSecret,
                hostname: credentials.hostname,
                accessToken: credentials.accessToken, // Using the access token for authentication
            };
            for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
                // Perform operation based on selected operation type
                if (operation === 'createPersonAccount') {
                    const firstName = this.getNodeParameter('firstName', itemIndex);
                    const lastName = this.getNodeParameter('lastName', itemIndex);
                    const email = this.getNodeParameter('email', itemIndex);
                    // Create PersonAccount
                    const createResponse = yield this.helpers.request({
                        url: `${config.hostname}/services/data/v51.0/sobjects/Account/`,
                        method: 'POST',
                        body: {
                            FirstName: firstName,
                            LastName: lastName,
                            Email: email,
                            IsPersonAccount: true,
                        },
                        headers: {
                            Authorization: `Bearer ${config.accessToken}`,
                        },
                        json: true,
                    });
                    returnData.push({ json: createResponse });
                }
                else if (operation === 'getPersonAccount') {
                    const personAccountId = this.getNodeParameter('personAccountId', itemIndex);
                    // Get PersonAccount details
                    const getResponse = yield this.helpers.request({
                        url: `${config.hostname}/services/data/v51.0/sobjects/Account/${personAccountId}`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${config.accessToken}`,
                        },
                        json: true,
                    });
                    returnData.push({ json: getResponse });
                }
                else if (operation === 'updatePersonAccount') {
                    const personAccountId = this.getNodeParameter('personAccountId', itemIndex);
                    const email = this.getNodeParameter('email', itemIndex);
                    // Update PersonAccount
                    const updateResponse = yield this.helpers.request({
                        url: `${config.hostname}/services/data/v51.0/sobjects/Account/${personAccountId}`,
                        method: 'PATCH',
                        body: {
                            Email: email,
                        },
                        headers: {
                            Authorization: `Bearer ${config.accessToken}`,
                        },
                        json: true,
                    });
                    returnData.push({ json: updateResponse });
                }
                else if (operation === 'deletePersonAccount') {
                    const personAccountId = this.getNodeParameter('personAccountId', itemIndex);
                    // Delete PersonAccount
                    const deleteResponse = yield this.helpers.request({
                        url: `${config.hostname}/services/data/v51.0/sobjects/Account/${personAccountId}`,
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${config.accessToken}`,
                        },
                        json: true,
                    });
                    returnData.push({ json: deleteResponse });
                }
            }
            return this.prepareOutputData(returnData);
        });
    }
}
exports.SalesforcePersonAccount = SalesforcePersonAccount;
