export interface Certification {
  name: string;
  issuer: string;
  issuedDate: string;
  credentialId: string;
  verifyUrl: string;
  image: string;
}

export const certifications: Certification[] = [
  {
    name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    issuedDate: 'Aug 2026',
    credentialId: '7DD23730B12BBE07',
    verifyUrl: 'https://learn.microsoft.com/en-us/users/pathmikaweerarathna-2693/credentials/7dd23730b12bbe07',
    image: '/az-900-certificate.webp',
  },
];
