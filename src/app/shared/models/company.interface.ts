export interface Company {
  id: number;
  companyName: string;
  primaryContact: number;
  numberOfTickets?: number;
  assigned: string;
  address?: {
    street: string;
    city: string;
    zipCode: number;
  };
}
