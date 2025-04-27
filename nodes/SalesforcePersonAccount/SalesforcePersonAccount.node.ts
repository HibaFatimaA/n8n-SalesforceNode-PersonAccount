import { IExecuteFunctions } from 'n8n-core';
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { ISalesforcePersonAccountCredentials } from './SalesforcePersonAccount.node.types';

export class SalesforcePersonAccount implements INodeType {
	description: INodeTypeDescription = {
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = (await this.getCredentials('salesforcePersonAccount') as ISalesforcePersonAccountCredentials);
		const operation = this.getNodeParameter('operation', 0) as string;
		const returnData: INodeExecutionData[] = [];
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
				const firstName = this.getNodeParameter('firstName', itemIndex) as string;
				const lastName = this.getNodeParameter('lastName', itemIndex) as string;
				const email = this.getNodeParameter('email', itemIndex) as string;

				// Create PersonAccount
				const createResponse = await this.helpers.request({
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
			} else if (operation === 'getPersonAccount') {
				const personAccountId = this.getNodeParameter('personAccountId', itemIndex) as string;

				// Get PersonAccount details
				const getResponse = await this.helpers.request({
					url: `${config.hostname}/services/data/v51.0/sobjects/Account/${personAccountId}`,
					method: 'GET',
					headers: {
						Authorization: `Bearer ${config.accessToken}`,
					},
					json: true,
				});
				returnData.push({ json: getResponse });
			} else if (operation === 'updatePersonAccount') {
				const personAccountId = this.getNodeParameter('personAccountId', itemIndex) as string;
				const email = this.getNodeParameter('email', itemIndex) as string;

				// Update PersonAccount
				const updateResponse = await this.helpers.request({
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
			} else if (operation === 'deletePersonAccount') {
				const personAccountId = this.getNodeParameter('personAccountId', itemIndex) as string;

				// Delete PersonAccount
				const deleteResponse = await this.helpers.request({
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
	}
}
