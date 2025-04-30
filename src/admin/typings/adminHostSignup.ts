interface HostRequestItem {
  hostId: number;
  createdAt: string;
}

interface HostRequestDetail {
  email: string;
  name: string;
  phoneNumber: string;
  businessLicenseImageUrl: string;
  submitDocumentImageUrl: string;
}

export { HostRequestItem, HostRequestDetail };
