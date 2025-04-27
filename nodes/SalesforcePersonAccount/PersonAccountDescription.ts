import { INodeProperties } from 'n8n-workflow';

export const personAccountOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['personAccount'],
      },
    },
    options: [
      {
        name: 'Create PersonAccount',
        value: 'createPersonAccount',
        description: 'Create a new PersonAccount'
      },
      {
        name: 'Update PersonAccount',
        value: 'updatePersonAccount',
        description: 'Update an existing PersonAccount'
      },
      {
        name: 'Get PersonAccount',
        value: 'getPersonAccount',
        description: 'Get a PersonAccount by ID'
      },
      {
        name: 'Delete PersonAccount',
        value: 'deletePersonAccount',
        description: 'Delete a PersonAccount by ID' 
      },
    ],
    default: 'createPersonAccount',
  },
];

export const personAccountFields: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                 personAccount:create                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'First Name',
    name: 'firstName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['personAccount'],
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
        resource: ['personAccount'],
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
        resource: ['personAccount'],
        operation: ['createPersonAccount', 'updatePersonAccount'],
      },
    },
    description: 'Email address of the PersonAccount',
  },
  {
    displayName: 'Phone',
    name: 'phone',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        resource: ['personAccount'],
        operation: ['createPersonAccount', 'updatePersonAccount'],
      },
    },
    description: 'Phone number of the PersonAccount',
  },
  {
    displayName: 'Is PersonAccount',
    name: 'isPersonAccount',
    type: 'boolean',
    required: true,
    default: true,
    displayOptions: {
      show: {
        resource: ['personAccount'],
        operation: ['createPersonAccount'],
      },
    },
    description: 'Whether the account is a PersonAccount. This is always true for PersonAccounts.',
  },

  /* -------------------------------------------------------------------------- */
  /*                                 personAccount:update                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'PersonAccount ID',
    name: 'personAccountId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['personAccount'],
        operation: ['updatePersonAccount'],
      },
    },
    description: 'ID of the PersonAccount to update',
  },
  {
    displayName: 'Update First Name',
    name: 'firstName',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        resource: ['personAccount'],
        operation: ['updatePersonAccount'],
      },
    },
    description: 'First name of the PersonAccount to update',
  },
  {
    displayName: 'Update Last Name',
    name: 'lastName',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        resource: ['personAccount'],
        operation: ['updatePersonAccount'],
      },
    },
    description: 'Last name of the PersonAccount to update',
  },
  {
    displayName: 'Update Email',
    name: 'email',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        resource: ['personAccount'],
        operation: ['updatePersonAccount'],
      },
    },
    description: 'Email address of the PersonAccount to update',
  },

  /* -------------------------------------------------------------------------- */
  /*                                 personAccount:get                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'PersonAccount ID',
    name: 'personAccountId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['personAccount'],
        operation: ['getPersonAccount'],
      },
    },
    description: 'ID of the PersonAccount to fetch',
  },

  /* -------------------------------------------------------------------------- */
  /*                                 personAccount:delete                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'PersonAccount ID',
    name: 'personAccountId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['personAccount'],
        operation: ['deletePersonAccount'],
      },
    },
    description: 'ID of the PersonAccount to delete',
  },
];
