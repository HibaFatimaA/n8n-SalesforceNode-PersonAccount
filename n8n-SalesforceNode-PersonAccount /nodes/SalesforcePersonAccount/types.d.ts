declare module 'n8n' {
    export interface PersonAccount {
        Id?: string; 
        FirstName: string; 
        LastName: string;  
        Email: string;    
        Phone?: string;    
        BillingAddress?: string;  
        AccountSource?: string;   
        Industry?: string;       
        AccountNumber?: string;   
        IsPersonAccount: boolean; 
    }

    export interface SalesforceResponse {
        success: boolean;
        data: PersonAccount | PersonAccount[];
        error?: string; 
    }

    export function createPersonAccount(data: PersonAccount): Promise<SalesforceResponse>;
    export function updatePersonAccount(accountId: string, data: PersonAccount): Promise<SalesforceResponse>;
}
