import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Users, FileText, Heart, Home, Zap, Droplets, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SchemeDetailModal from '../components/SchemeDetailModal';
import { Helmet } from "react-helmet";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isSchemeModalOpen, setIsSchemeModalOpen] = useState(false);
  const navigate = useNavigate();

  const announcements = [
    {
      title: "Announcements",
      description: "For any queries please visit the Panchayat Office / Fill in the Contact Form on this website.",
      date: "July 20, 2025",
      urgent: true
    }
    // {
    //   title: "Free Health Check-up Camp",
    //   description: "Ayushman Bharat health camp organized at Primary Health Center on December 15th, 2024.",
    //   date: "Dec 8, 2024",
    //   urgent: false
    // },
    // {
    //   title: "Skill Development Training Program",
    //   description: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana training starts from January 2025. Register now!",
    //   date: "Dec 5, 2024",
    //   urgent: false
    // }
  ];

  const services = [
    {
      id: 1,
      icon: Home,
      title: "Rural Housing",
      description: "Affordable housing solutions for rural families",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      icon: Droplets,
      title: "Water Supply",
      description: "Clean and adequate water supply to all households",
      color: "bg-cyan-100 text-cyan-600"
    },
    {
      id: 3,
      icon: FileText,
      title: "Agriculture",
      description: "Supporting farmers with modern techniques",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 4,
      icon: Heart,
      title: "Healthcare",
      description: "Primary healthcare facilities and awareness",
      color: "bg-red-100 text-red-600"
    },
    {
      id: 5,
      icon: Users,
      title: "Education",
      description: "Enhancing educational infrastructure and quality",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 6,
      icon: Zap,
      title: "Electrification",
      description: "Working towards 100% rural electrification",
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  const featuredSchemes = [
    {
      id: 1,
      title: "PM Krishi Sinchai Yojana",
      description: "Irrigation support for farmers",
      image: "/pmksy.jpg",
      benefits: "Up to 55% subsidy for small & marginal farmers",
      eligibility: "All farmers, priority to SC/ST",
      category: "Agriculture",
      color: "bg-green-100 text-green-800",
      detailedDescription: "The Pradhan Mantri Krishi Sinchai Yojana (PMKSY) aims to improve farm water use efficiency to reduce wastage and increase availability both in duration and extent. The scheme focuses on creating sources for assured irrigation and protecting water resources by integrating water sources, distribution and efficient use.",
      eligibilityCriteria: [
        "Small and marginal farmers with landholding up to 2 hectares are given priority",
        "All farmers are eligible but preference is given to SC/ST farmers",
        "Women farmers are given special consideration",
        "Farmers should have valid land ownership documents"
      ],
      detailedBenefits: "Financial assistance for micro-irrigation systems like drip and sprinkler irrigation, up to 55% subsidy for small & marginal farmers and 45% for other farmers. Additional benefits include water conservation structures and watershed development activities.",
      requiredDocuments: [
        "Land ownership documents",
        "Bank account details",
        "Aadhaar Card",
        "Caste certificate (if applicable)",
        "Passport size photographs",
        "Mobile number linked with Aadhaar"
      ],
      applicationProcess: "Applications can be submitted at the local Agriculture Department office or through the online portal. Field verification will be conducted before approval, and installation must be done through empaneled vendors.",
      department: "Department of Agriculture & Cooperation"
    },
    {
      id: 3,
      title: "PM Awaas Yojana - Gramin",
      description: "Affordable housing for rural families",
      image: "/pmay.jpg",
      benefits: "₹1.20 lakh financial assistance",
      eligibility: "BPL families without house",
      category: "Housing",
      color: "bg-blue-100 text-blue-800",
      detailedDescription: "The Pradhan Mantri Awaas Yojana (PMAY) is a housing scheme by the Government of India aimed at providing affordable and permanent housing to economically weaker sections, low-income groups, and middle-income groups.",
      eligibilityCriteria: [
        "Families listed under the Socio-Economic Caste Census (SECC) 2011 as lacking a pucca house",
        "Households with no adult earning members aged 16-59 years",
        "Women, SC/ST, OBC, minorities, and differently-abled individuals are given preference",
        "Must not have received benefits from other central housing schemes"
      ],
      detailedBenefits: "Financial Assistance for Rural Housing: ₹1.20 lakh in plain areas and ₹1.30 lakh in hilly/difficult areas. Basic Amenities Provided: Includes toilets, LPG connections, electricity, and clean drinking water. Direct Bank Transfer (DBT): The subsidy amount is credited directly to the beneficiary's bank account.",
      requiredDocuments: [
        "Application Form",
        "Passport Size Photo",
        "Resolution of Gram Sevak",
        "Income Certificate",
        "Caste certificate (if applicable)",
        "Bank Passbook",
        "Consent Letter",
        "Aadhaar Card"
      ],
      applicationProcess: "Applications can be submitted at the Gram Panchayat office. The list of eligible beneficiaries is prepared by the Gram Sabha based on SECC-2011 data. After verification, houses are sanctioned.",
      department: "Ministry of Rural Development"
    },
    {
      id: 10,
      title: "Ayushman Bharat Yojana",
      description: "Health insurance coverage",
      image: "/aby.png",
      benefits: "Up to ₹5 lakh health coverage",
      eligibility: "Low-income families",
      category: "Healthcare",
      color: "bg-red-100 text-red-800",
      detailedDescription: "Ayushman Bharat provides health insurance coverage to economically vulnerable families, ensuring access to quality healthcare services.",
      eligibilityCriteria: [
        "Low-income families as per SECC-2011 data",
        "Families without any earning member aged 16-59 years",
        "Vulnerable categories including differently-abled individuals",
        "Households with no adult male member aged 16-59 years"
      ],
      detailedBenefits: "Up to ₹5 lakh health coverage per family per year, cashless treatment at empaneled hospitals, coverage for pre and post-hospitalization expenses, coverage for secondary and tertiary care hospitalization.",
      requiredDocuments: [
        "Aadhaar Card",
        "Ration Card",
        "Income Certificate",
        "Family ID",
        "Mobile number"
      ],
      applicationProcess: "Visit nearest Common Service Center (CSC) or empaneled hospital. Verification is done through Ayushman Bharat beneficiary identification system.",
      department: "Ministry of Health & Family Welfare"
    }
  ];

  const teamMembers = [
    {
      name: "Shri Rajesh Kumar Patil",
      designation: "Panchayat Samiti President",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      contact: "+91 9876543210"
    },
    {
      name: "Mrs. Sunita Devi Sharma",
      designation: "Vice President",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=200&h=200&fit=crop&crop=face",
      contact: "+91 9876543201"
    },
    {
      name: "Mr. Anil Kumar Singh",
      designation: "Block Development Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      contact: "+91 9876543202"
    }
  ];

  const galleryHighlights = [
    {
      title: "Independence Day Celebration",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
      description: "Flag hoisting ceremony and cultural programs",
      category: "Independence Day",
      eventId: 1
    },
    {
      title: "Health Camp",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      description: "Free medical check-ups for villagers",
      category: "Health Camps",
      eventId: 2
    },
    {
      title: "Digital Literacy Program",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop",
      description: "Computer training for rural youth",
      category: "Education Programs",
      eventId: 3
    },
    {
      title: "Agriculture Training",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
      description: "Organic farming techniques workshop",
      category: "Agriculture Training",
      eventId: 4
    }
  ];

  // Auto-scroll announcements every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleServiceClick = (serviceId: number) => {
    navigate(`/services#service-${serviceId}`);
  };

  const handleSchemeClick = (scheme: any) => {
    setSelectedScheme(scheme);
    setIsSchemeModalOpen(true);
  };

  const handleGalleryItemClick = (item: any) => {
    navigate(`/gallery?category=${encodeURIComponent(item.category)}&event=${item.eventId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
      <title>Panchayat Samiti Navapur | Official Website</title>
      <meta
        name="description"
        content="Official website of Panchayat Samiti Navapur – Government schemes, services, leadership, and local development information for residents of Navapur, Nandurbar."
      />
      <meta property="og:title" content="Panchayat Samiti Navapur" />
      <meta
        property="og:description"
        content="Explore government schemes, services, and announcements from Panchayat Samiti Navapur."
      />
      <meta property="og:image" content="https://panchayatnavapur.netlify.app/logo.png" />
      <meta property="og:url" content="https://panchayatnavapur.netlify.app/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Panchayat Samiti Navapur" />
      <meta name="twitter:description" content="Official government website for Navapur." />
      <meta name="twitter:image" content="https://panchayatnavapur.netlify.app/logo.png" />
    </Helmet>
      <Header />
      
      {/* Hero Section with Background Image */}
      <section className="relative bg-cover bg-center bg-no-repeat py-16" style={{ backgroundImage: 'url(https://frontdesk.co.in/wp-content/uploads/2024/03/image-21-1030x571.png)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Panchayat Samiti Navapur
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Nandurbar, Maharashtra
            </p>
            <p className="text-lg mb-8 opacity-80 max-w-3xl mx-auto">
              Serving rural communities with dedication, transparency and development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schemes">
                <Button size="lg" variant="secondary" className="text-blue-700">
                  View All Schemes
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-white border-white bg-transparent hover:bg-white hover:text-blue-700 transition-all duration-300">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Carousel */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Announcements</h2>
            <p className="text-gray-600">Stay updated with the latest news and announcements</p>
          </div>
          
          <div className="relative">
            <Card className="mx-auto max-w-4xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {announcements[currentSlide].urgent && (
                      <Badge variant="destructive" className="animate-pulse">URGENT</Badge>
                    )}
                    <span className="text-sm text-gray-500">{announcements[currentSlide].date}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={prevSlide}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextSlide}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-3">{announcements[currentSlide].title}</CardTitle>
                <CardDescription className="text-base">{announcements[currentSlide].description}</CardDescription>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-4 space-x-2">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Schemes Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Government Schemes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore key government schemes designed for rural development and community welfare
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredSchemes.map((scheme, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleSchemeClick(scheme)}
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={scheme.image}
                    alt={scheme.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{scheme.title}</CardTitle>
                  <CardDescription>{scheme.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Benefits: </span>
                      <span className="text-gray-600">{scheme.benefits}</span>
                    </div>
                    <div>
                      <span className="font-medium">Eligibility: </span>
                      <span className="text-gray-600">{scheme.eligibility}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Form
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/schemes">
              <Button variant="outline">
                View All Schemes <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive services to support the development and welfare of our rural communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleServiceClick(service.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mx-auto mb-4`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/services">
              <Button variant="outline">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated officials working for rural development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.designation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.contact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/team">
              <Button variant="outline">
                Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Activities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our visual journey of community development and welfare activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {galleryHighlights.map((item, index) => (
              <div 
                key={index} 
                className="relative h-48 overflow-hidden rounded-lg hover:scale-105 transition-transform cursor-pointer"
                onClick={() => handleGalleryItemClick(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs opacity-90">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/gallery">
              <Button variant="outline">
                View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          isOpen={isSchemeModalOpen}
          onClose={() => {
            setIsSchemeModalOpen(false);
            setSelectedScheme(null);
          }}
        />
      )}
    </div>
  );
};

export default Index;
