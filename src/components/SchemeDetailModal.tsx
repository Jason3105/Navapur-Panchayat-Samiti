import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Download, ExternalLink, Check, Phone, Mail } from 'lucide-react';

interface SchemeDetailModalProps {
  scheme: any;
  isOpen: boolean;
  onClose: () => void;
}

// Team contacts mapping based on department
const teamContacts: Record<string, { name: string; designation: string; phone: string }> = {
  "Agriculture Department": {
    name: "Mr. Nandkumar Suryavanshi",
    designation: "Agricultural Officer (Incharge)",
    phone: "+91 9923249324"
  },
  "Housing Department": {
    name: "Mr. Devidas Deore",
    designation: "Group Development Officer",
    phone: "+91 9689560349"
  },
  "Social Justice Department": {
    name: "Mr. Devidas Deore",
    designation: "Group Development Officer",
    phone: "+91 9689560349"
  },
  "Tribal Development Department": {
    name: "Mr. Devidas Deore",
    designation: "Group Development Officer",
    phone: "+91 9689560349"
  },
  "Education Department": {
    name: "Mr. R.B. Chourey",
    designation: "Group Education Officer (Incharge)",
    phone: "+91 8698516771"
  },
  "Health Department": {
    name: "Mr. N.R. Ahirrao",
    designation: "Department of Women and Child Welfare",
    phone: "+91 7588828999"
  },
  "Finance Department": {
    name: "Mr. Devidas Deore",
    designation: "Group Development Officer",
    phone: "+91 9689560349"
  },
  "Employment Department": {
    name: "Mr. Devidas Deore",
    designation: "Group Development Officer",
    phone: "+91 9689560349"
  },
  "Department of Financial Services": {
    name: "Mr. Devidas Deore",
    designation: "Group Development Officer",
    phone: "+91 9689560349"
  },
  "Department of Agriculture & Farmers Welfare": {
    name: "Mr. Nandkumar Suryavanshi",
    designation: "Agricultural Officer (Incharge)",
    phone: "+91 9923249324"
  },
  "Ministry of Rural Development": {
    name: "Mr. Devidas Deore",
    designation: "Group Development Officer",
    phone: "+91 9689560349"
  },
  "Rural Development Department": {
    name: "Mr. Devidas Deore",
    designation: "Group Development Officer",
    phone: "+91 9689560349"
  }
};

const SchemeDetailModal = ({ scheme, isOpen, onClose }: SchemeDetailModalProps) => {
  if (!isOpen || !scheme) return null;

  // Define online application links for each scheme
  const onlineApplicationLinks = {
    1: "https://pmksy.gov.in/", // PM Krishi Sinchai Yojana
    2: "https://soilhealth.dac.gov.in", // Soil Health Card
    3: "https://pmayg.nic.in/netiay/home.aspx", // PM Awaas Yojana
    4: "https://sjsa.maharashtra.gov.in", // Ramai Awaas Yojana
    5: "https://tribal.maharashtra.gov.in", // Shabari Awaas Yojana
    6: "https://mdm.nic.in", // School Nutrition Scheme
    7: "https://education.maharashtra.gov.in", // Attendance Allowance
    8: "https://education.maharashtra.gov.in", // Free Textbook Scheme
    9: "https://education.maharashtra.gov.in", // Free Uniform Scheme
    10: "https://pmjay.gov.in", // Ayushman Bharat
    11: "https://www.nsiindia.gov.in", // Sukanya Samriddhi Yojana
    12: "https://nrega.nic.in", // MGNREGA
    13: "https://ddugky.info/", // DDU-GKY
    14: "https://pmkisan.gov.in/" // PM Kisan Samman Nidhi
  };

  // Define form file names for each scheme
  const formFiles = {
    1: "pm-krishi-sinchai-application.pdf",
    2: "soil-health-card-application.pdf",
    3: "pm-awaas-yojana-application.pdf",
    4: "ramai-awaas-yojana-application.pdf",
    5: "shabari-awaas-yojana-application.pdf",
    6: "school-nutrition-scheme-application.pdf",
    7: "attendance-allowance-application.pdf",
    8: "free-textbook-scheme-application.pdf",
    9: "free-uniform-scheme-application.pdf",
    10: "ayushman-bharat-application.pdf",
    11: "sukanya-samriddhi-yojana-application.pdf",
    12: "mgnrega-application.pdf",
    13: "ddu-gky-application.pdf"
  };

  const handleDownloadForm = () => {
    const fileName = formFiles[scheme.id] || "application-form.pdf";
    const link = document.createElement('a');
    link.href = `/forms/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApplyOnline = () => {
    const url = onlineApplicationLinks[scheme.id];
    if (url) {
      window.open(url, '_blank');
    }
  };

  // Helper function to ensure eligibility criteria is an array
  const getEligibilityCriteriaArray = () => {
    if (Array.isArray(scheme.eligibilityCriteria)) {
      return scheme.eligibilityCriteria;
    } else if (typeof scheme.eligibilityCriteria === 'string') {
      return [scheme.eligibilityCriteria];
    } else if (scheme.eligibility) {
      return Array.isArray(scheme.eligibility) ? scheme.eligibility : [scheme.eligibility];
    }
    return [];
  };

  // Helper function to ensure required documents is an array
  const getRequiredDocumentsArray = () => {
    if (Array.isArray(scheme.requiredDocuments)) {
      return scheme.requiredDocuments;
    } else if (typeof scheme.requiredDocuments === 'string') {
      return [scheme.requiredDocuments];
    }
    return [];
  };

  // Get contact info based on department
  const contact =
    teamContacts[scheme.department] ||
    teamContacts["Rural Development Department"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{scheme.title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <img
                  src={scheme.image}
                  alt={scheme.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <Badge className={`${scheme.color} px-3 py-1 text-sm`}>
                  {scheme.category}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{scheme.detailedDescription}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Eligibility Criteria</h3>
                <div className="space-y-2">
                  {getEligibilityCriteriaArray().map((criteria: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Benefits</h3>
                <p className="text-gray-600 leading-relaxed">{scheme.detailedBenefits}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Required Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {getRequiredDocumentsArray().map((doc: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-600 text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">How to Apply</h3>
                <p className="text-gray-600 leading-relaxed">{scheme.applicationProcess}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" size="sm" onClick={handleDownloadForm}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Form
                  </Button>
                  <Button variant="outline" className="w-full" size="sm" onClick={handleApplyOnline}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply Online
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>
                    <strong>Department:</strong> {scheme.department || 'Panchayat Samiti Office'}
                  </p>
                  <p>
                    <strong>Contact Person:</strong> {contact.name}
                  </p>
                  <p>
                    <strong>Designation:</strong> {contact.designation}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <a
                      href={`tel:${contact.phone.replace(/\s|\+91/g, "")}`}
                      className="text-blue-700 hover:underline focus:outline-none"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <a
                      href="/contact#contact-form"
                      className="text-blue-700 hover:text-blue-900 focus:outline-none"
                    >
                      (Fill in the contact form)
                    </a>
                  </div>
                  <p>
                    <strong>Office Hours:</strong> Mon-Fri: 10:00 AM - 5:30 PM
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailModal;
