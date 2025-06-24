import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'assetaContent',
    access: (allow) => ({
        'images/*': [
            allow.guest.to(['read', 'write']),
            allow.authenticated.to(['read', 'write', 'delete'])
        ],
        'documents/*': [
            allow.guest.to(['read', 'write']),
            allow.authenticated.to(['read', 'write', 'delete'])
        ],
        'projects/*': [
            allow.guest.to(['read', 'write']),
            allow.authenticated.to(['read', 'write', 'delete'])
        ],
    })
});