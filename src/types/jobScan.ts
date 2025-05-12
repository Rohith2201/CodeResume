export interface JobScan {
  id: string;
  companyName: string;
  jobTitle: string;
  dateScanned: string;
  jobDescription: string;
  matchScore: number;
  status: 'applied' | 'saved' | 'archived';
}

export interface JobScanHistory {
  scans: JobScan[];
}