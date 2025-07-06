import axios from 'axios';

const getReportIdByRole = (role: string): string | null => {
  switch (role) {
    case "Admin":
      return process.env.NEXT_PUBLIC_BURSAR_POWERBI_REPORT_ID!;
    case "Receivable-Accountant":
      return process.env.NEXT_PUBLIC_RECEIVABLE_ACCOUNTANT_POWERBI_REPORT_ID!;
    case "Billing-Accountant":
      return process.env.NEXT_PUBLIC_BILLING_ACCOUNTANT_REPORT_ID!;
    default:
      return null;
  }
};

export const getPowerBiToken = async (role: string) => {
  try {
    const reportId = getReportIdByRole(role);
    
    if (!reportId) {
      throw new Error('Invalid role');
    }

    const response = await axios.post(
      'https://YOUR_AZURE_FUNCTION_URL/api/getPowerBiToken',
      { 
        role,
        reportId 
      }
    );

    return {
      embedToken: response.data.embedToken,
      embedUrl: response.data.embedUrl,
      reportId
    };
  } catch (error) {
    console.error('Error getting Power BI token:', error);
    throw error;
  }
};