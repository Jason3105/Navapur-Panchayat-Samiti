
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Droplets, Users, Heart, BookOpen, Zap, Phone, Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Rural Housing",
      description: "Providing affordable housing solutions for rural families",
      detailedDescription: "Our housing service aims to provide safe and affordable housing to rural families through various government schemes. We facilitate the construction of new houses, renovation of existing structures, and provide financial assistance to eligible beneficiaries.",
      icon: Home,
      color: "bg-blue-100 text-blue-600",
      process: [
        "Submit application at the Panchayat office with required documents",
        "Field verification by Panchayat officials",
        "Approval of application by Gram Sabha",
        "Issuance of sanction letter",
        "Release of funds in installments based on construction progress"
      ],
      documents: [
        "Aadhaar Card",
        "Income Certificate",
        "BPL Card (if applicable)",
        "Land ownership documents",
        "Bank account details",
        "Passport size photographs"
      ],
      contact: {
        name: "Mr. Ramesh Jadhav",
        designation: "Housing Department",
        phone: "+91 9876543211",
        email: "housing@navapurpanchayat.gov.in"
      }
    },
    {
      id: 2,
      title: "Water Supply",
      description: "Ensuring clean and adequate water supply to all households",
      detailedDescription: "The Panchayat Samiti is committed to providing clean and safe drinking water to all rural households through proper infrastructure development. We manage water supply systems, install hand pumps, and implement water conservation measures to ensure sustainable water access.",
      icon: Droplets,
      color: "bg-cyan-100 text-cyan-600",
      process: [
        "Submit application for water connection/hand pump installation",
        "Technical survey by water department",
        "Approval by the Water Committee",
        "Payment of connection fee (if applicable)",
        "Installation of connection/hand pump"
      ],
      documents: [
        "Aadhaar Card",
        "Property ownership document",
        "Passport size photograph",
        "Previous water bill (if any)"
      ],
      contact: {
        name: "Mrs. Lata Patel",
        designation: "Water Department",
        phone: "+91 9876543212",
        email: "water@navapurpanchayat.gov.in"
      }
    },
    {
      id: 3,
      title: "Agriculture",
      description: "Supporting farmers with modern techniques and resources",
      detailedDescription: "Our agriculture services aim to enhance farm productivity and farmer income through technical support, input subsidies, and market linkages. We organize training programs, provide soil testing facilities, and promote sustainable farming practices.",
      icon: Users,
      color: "bg-green-100 text-green-600",
      process: [
        "Register with Agriculture Department at Panchayat office",
        "Submit application for specific service/subsidy",
        "Field verification by agriculture officer",
        "Approval and issuance of service/subsidy"
      ],
      documents: [
        "Aadhaar Card",
        "Land record (7/12 extract)",
        "Farmer ID card",
        "Bank account details",
        "Previous season's crop details"
      ],
      contact: {
        name: "Mr. Sunil Patil",
        designation: "Agriculture Department",
        phone: "+91 9876543213",
        email: "agriculture@navapurpanchayat.gov.in"
      }
    },
    {
      id: 4,
      title: "Healthcare",
      description: "Promoting public health through primary healthcare facilities",
      detailedDescription: "We are committed to improving the health status of rural communities through primary health centers, awareness campaigns, and preventive healthcare measures. Our services include regular health check-ups, immunization, maternal and child healthcare, and health education.",
      icon: Heart,
      color: "bg-red-100 text-red-600",
      process: [
        "Visit the nearest Primary Health Center",
        "Register with your Aadhaar card and contact details",
        "Consultation with the medical staff",
        "Receive treatment/referral to higher center if needed"
      ],
      documents: [
        "Aadhaar Card",
        "Previous medical records (if any)",
        "Health insurance card (if any)"
      ],
      contact: {
        name: "Dr. Meena Singh",
        designation: "Health Department",
        phone: "+91 9876543214",
        email: "health@navapurpanchayat.gov.in"
      }
    },
    {
      id: 5,
      title: "Education",
      description: "Enhancing educational infrastructure and quality",
      detailedDescription: "Our education services focus on improving school infrastructure, enhancing teaching quality, and ensuring access to education for all rural children. We implement various educational schemes, provide scholarships, and organize educational activities to promote learning.",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-600",
      process: [
        "Visit the Education Department at Panchayat office",
        "Submit application for specific educational service/scholarship",
        "Document verification by education officer",
        "Approval and issuance of service/scholarship"
      ],
      documents: [
        "Student's Aadhaar Card",
        "Birth certificate",
        "Previous school records",
        "Parent's income certificate (for scholarships)",
        "Bank account details"
      ],
      contact: {
        name: "Mrs. Anjali Deshmukh",
        designation: "Education Department",
        phone: "+91 9876543215",
        email: "education@navapurpanchayat.gov.in"
      }
    },
    {
      id: 6,
      title: "Electrification",
      description: "Working towards 100% rural electrification",
      detailedDescription: "Our electrification services aim to ensure reliable power supply to all rural households and public spaces. We coordinate with electricity departments for new connections, maintenance of existing infrastructure, and promotion of renewable energy sources.",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-600",
      process: [
        "Submit application for new electricity connection",
        "Technical feasibility assessment by electricity department",
        "Payment of connection fee (if applicable)",
        "Installation of meter and connection establishment"
      ],
      documents: [
        "Aadhaar Card",
        "Property ownership document",
        "Passport size photograph",
        "NOC from landlord (for tenants)"
      ],
      contact: {
        name: "Mr. Vijay Kumar",
        designation: "Electricity Department",
        phone: "+91 9876543216",
        email: "electricity@navapurpanchayat.gov.in"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
<Helmet>
  <title>Services | Panchayat Samiti Navapur</title>
  <meta
    name="description"
    content="Explore the essential public services offered by Panchayat Samiti Navapur, including health, education, sanitation, and agriculture support for the local community."
  />
  <meta name="keywords" content="Panchayat Samiti Navapur, public services, health services, education, sanitation, agriculture support, rural development, Maharashtra" />
  <meta name="author" content="Panchayat Samiti Navapur" />
  <meta property="og:title" content="Services – Panchayat Samiti Navapur" />
  <meta property="og:description" content="Discover the range of community services provided by Panchayat Samiti Navapur for inclusive and sustainable rural development." />
  <meta property="og:image" content="/logo.png" />
  <meta property="og:url" content="https://navapurpanchayat.gov.in/services" />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>

      <Header />
      
      {/* Page Header with Background Image */}
      <section className="relative bg-cover bg-center bg-no-repeat py-16" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Public Services</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Comprehensive services to support the development and welfare of our rural communities
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card key={service.id} id={`service-${service.id}`} className="shadow-lg">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center`}>
                      <service.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-lg">{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">About This Service</h3>
                        <p className="text-gray-600">{service.detailedDescription}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Process</h3>
                        <ol className="space-y-2">
                          {service.process.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start space-x-3">
                              <Badge variant="outline" className="min-w-6 h-6 flex items-center justify-center text-xs">
                                {stepIndex + 1}
                              </Badge>
                              <span className="text-sm text-gray-600">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Required Documents</h3>
                        <ul className="space-y-2">
                          {service.documents.map((doc, docIndex) => (
                            <li key={docIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-gray-600">{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">Contact Person</h3>
                        <div className="space-y-2">
                          <p className="font-medium">{service.contact.name}</p>
                          <p className="text-sm text-gray-600">{service.contact.designation}</p>
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-4 w-4 text-blue-500" />
                            <span>{service.contact.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="h-4 w-4 text-blue-500" />
                            <span>{service.contact.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
