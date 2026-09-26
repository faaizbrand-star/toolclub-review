export interface ProofItem {
  id: string;
  customerId: string;
  customerName?: string;
  serviceName: string;
  deliveryDate: string;
  notes?: string;
  screenshots: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  verifiedAt: string;
  verificationHash: string;
}

export interface AdminStats {
  total: number;
  active: number;
  inactive: number;
}

export interface AdminUser {
  username: string;
  email?: string;
  role: string;
}

export interface PublicProofData {
  id?: string;
  customerId: string;
  customerName?: string;
  serviceName: string;
  deliveryDate: string;
  notes?: string;
  screenshots: string[];
  verifiedAt: string;
  verificationHash: string;
}

export interface PublicProofResponse {
  found: boolean;
  status?: 'active' | 'inactive';
  customerId?: string;
  serviceName?: string;
  message?: string;
  error?: string;
  proof?: PublicProofData;
}
