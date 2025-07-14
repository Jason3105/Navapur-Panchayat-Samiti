import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SchemeDetailModal from '../components/SchemeDetailModal';
import { Helmet } from "react-helmet";

const Schemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const schemes = [
    {
      id: 1,
      title: "Pradhan Mantri Krishi Sinchai Yojana",
      description: "Irrigation support scheme for farmers to improve water usage efficiency",
      eligibility: "Small and marginal farmers",
      benefits: "Subsidy for micro-irrigation",
      category: "Agriculture",
      image: "/pmksy.jpg",
      color: "bg-green-100 text-green-800",
      detailedDescription: "The Pradhan Mantri Krishi Sinchai Yojana (PMKSY) aims to improve farm water use efficiency to reduce wastage and increase availability both in duration and extent. The scheme focuses on creating sources for assured irrigation and protecting water resources by integrating water sources, distribution and efficient use.",
      eligibilityCriteria: [
        "Small and marginal farmers with landholding up to 2 hectares are given priority",
        "All farmers are eligible but preference is given to SC/ST farmers",
        "Small & marginal farmers, and women farmers get priority",
        "Must have valid land ownership documents"
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
      department: "Agriculture Department"
    },
    {
      id: 2,
      title: "Soil Health Card Scheme",
      description: "Provides soil health assessment and recommendations for farmers",
      eligibility: "All farmers",
      benefits: "Free soil testing and advice",
      category: "Agriculture",
      image: "/shcs.png",
      color: "bg-green-100 text-green-800",
      detailedDescription: "The Soil Health Card Scheme provides farmers with soil health information to improve productivity and soil quality through judicious use of inputs.",
      eligibilityCriteria: ["All farmers are eligible"],
      detailedBenefits: "Free soil testing and customized fertilizer recommendations based on soil health status.",
      requiredDocuments: ["Land documents", "Aadhaar Card", "Farmer ID"],
      applicationProcess: "Contact local agriculture extension officer for soil sample collection.",
      department: "Agriculture Department"
    },
    {
      id: 3,
      title: "Pradhan Mantri Awaas Yojana - Gramin",
      description: "Provides financial assistance for affordable housing to economically weaker sections",
      eligibility: "BPL families without house",
      benefits: "Financial assistance to build house",
      category: "Housing",
      image: "/pmay.jpg",
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
        "SECC data verification",
        "Aadhaar Card",
        "Bank account details",
        "Land ownership documents",
        "Income certificate",
        "Caste certificate (if applicable)"
      ],
      applicationProcess: "Applications can be submitted at the Gram Panchayat office. The list of eligible beneficiaries is prepared by the Gram Sabha based on SECC-2011 data. After verification, houses are sanctioned.",
      department: "Housing Department"
    },
    {
      id: 4,
      title: "Ramai Awaas Yojana",
      description: "Provides financial assistance for housing to Scheduled Caste (SC) and Neo-Buddhist families in Maharashtra",
      eligibility: "BPL SC and Neo-Buddhist families without a home",
      benefits: "Monetary Benefits as per area of residence",
      category: "Housing",
      image: "/ray.png",
      color: "bg-blue-100 text-blue-800",
      detailedDescription: "The scheme Ramai Awaas (Gharkul) Scheme for SC & Nav-Buddha (Urban and Rural) is a housing scheme by the Department of Social Justice & Special Assistance of the Government of Maharashtra.",
      eligibilityCriteria: [
        "The applicant should have lived for 15 years in Maharashtra",
        "Annual income limit: Rural Area ₹1,00,000, Municipal Area ₹1,50,000, Municipal Corporation ₹2,00,000",
        "Only one person in the family will get the benefit",
        "The applicant should have his/her own land",
        "Should not be receiving benefits of any other housing scheme"
      ],
      detailedBenefits: "Rural Area: ₹1,00,000 (Beneficiary's share is Nil), Municipal Area: ₹1,50,000 (Beneficiary's share is 7.5%), Municipal Corporation: ₹2,00,000 (Beneficiary's share is 10%)",
      requiredDocuments: [
        "Application Form",
        "Caste certificate",
        "Income certificate",
        "Aadhaar Card",
        "Bank Passbook",
        "Land documents"
      ],
      applicationProcess: "Applications can be submitted at the local Gram Panchayat or Municipal Office. Selection based on government surveys and eligibility criteria.",
      department: "Social Justice Department"
    },
    {
      id: 5,
      title: "Shabari Awaas Yojana",
      description: "Provides financial assistance for housing to Scheduled Tribe (ST) families in Maharashtra",
      eligibility: "BPL ST families in Maharashtra who do not own a pucca house",
      benefits: "Financial assistance to build house",
      category: "Housing",
      image: "/say.png",
      color: "bg-blue-100 text-blue-800",
      detailedDescription: "Shabari Awaas Yojana is a housing scheme by the Maharashtra Government aimed at providing financial assistance for constructing or improving homes for Scheduled Tribe (ST) families living below the poverty line (BPL).",
      eligibilityCriteria: [
        "Must belong to the Scheduled Tribe (ST) community",
        "Must be a resident of Maharashtra",
        "Should be listed as BPL (Below Poverty Line) or be economically weak",
        "Should not own a pucca house anywhere in India"
      ],
      detailedBenefits: "Free permanent houses for eligible beneficiaries, financial assistance for house construction, land ownership rights for those without land, basic amenities like water supply and sanitation, Direct Bank Transfer (DBT) for transparency.",
      requiredDocuments: [
        "ST Certificate",
        "BPL Certificate",
        "Aadhaar Card",
        "Income Certificate",
        "Bank account details"
      ],
      applicationProcess: "Applications can be submitted at the local Gram Panchayat or Tribal Development Office. Beneficiaries are selected based on government surveys and eligibility criteria.",
      department: "Tribal Development Department"
    },
    {
      id: 6,
      title: "School Nutrition Scheme",
      description: "Provides nutritious cooked meals to students in government and government-aided schools",
      eligibility: "All students from Grades 1 to 8 in government schools",
      benefits: "Free nutritious cooked meals",
      category: "Education",
      image: "/sns.png",
      color: "bg-purple-100 text-purple-800",
      detailedDescription: "The Mid-Day Meal Scheme (Shaley Poshan Aahar Yojana) provides free cooked meals to students. Launched in 1995, the scheme aims to improve nutrition, increase school enrollment, and reduce dropout rates.",
      eligibilityCriteria: [
        "Students from Grades 1 to 8",
        "Enrolled in government or government-aided schools",
        "Includes partially-aided schools, ashram schools, and Mahatma Phule Education Guarantee"
      ],
      detailedBenefits: "The Mid-Day Meal Scheme provides free cooked meals to students, ensuring better nutrition and health. It helps combat malnutrition, encourages higher school attendance, and supports better learning outcomes by reducing classroom hunger.",
      requiredDocuments: [
        "Birth Certificate",
        "Aadhaar Card",
        "Residence Proof (Ration card, electricity bill, etc.)",
        "School Admission Certificate",
        "Caste certificate (if applicable)"
      ],
      applicationProcess: "The Mid-Day Meal Scheme does not require any separate application process or documentation for students. However, schools may verify basic details during enrollment.",
      department: "Education Department"
    },
    {
      id: 7,
      title: "Attendance Allowance Scheme",
      description: "Monthly financial incentive to students maintaining 75% or higher attendance",
      eligibility: "Students with 75% or higher monthly attendance",
      benefits: "Monthly allowance (₹100–₹300 depending on class level)",
      category: "Education",
      image: "/aas.jpeg",
      color: "bg-purple-100 text-purple-800",
      detailedDescription: "The Attendance Allowance Scheme offers monthly financial support to students in government schools who maintain at least 75% attendance, encouraging regular attendance and reducing dropouts.",
      eligibilityCriteria: [
        "Enrolled in a government or government-aided school",
        "Minimum 75% attendance every month",
        "Belong to economically weaker sections (as per state norms, if applicable)",
        "Must have valid school ID and attendance records"
      ],
      detailedBenefits: "The Attendance Allowance Scheme provides monthly financial support to students studying in government or government-aided schools who maintain at least 75% attendance. The allowance amount may vary depending on the student's class and the state government's policy.",
      requiredDocuments: [
        "Aadhaar Card (Student)",
        "School ID or Bonafide Certificate",
        "Attendance Record (Certified by School)",
        "Bank Account Details (Student or Guardian)",
        "Income Certificate (if applicable as per state rules)",
        "Passport-size Photograph"
      ],
      applicationProcess: "The Attendance Allowance Scheme does not require a separate application; eligible students are identified by schools based on attendance records.",
      department: "Education Department"
    },
    {
      id: 8,
      title: "Free Textbook Scheme",
      description: "Easy access to learning materials without any application process",
      eligibility: "All students from Class 1 to 8 in government, semi-government, and private-aided schools",
      benefits: "Free textbooks for students, ensuring access to learning materials",
      category: "Education",
      image: "/fts.jpg",
      color: "bg-purple-100 text-purple-800",
      detailedDescription: "The Free Textbook Scheme provides free textbooks to Class 1 to 8 students in government, semi-government, and private-aided schools, ensuring easy access to learning materials without any application process.",
      eligibilityCriteria: [
        "All students from Class 1 to 8 studying in government, semi-government, and private-aided schools"
      ],
      detailedBenefits: "Free textbooks provided to Class 1 to 8 students, ensuring access to essential learning materials and reducing educational expenses.",
      requiredDocuments: [
        "No separate documents are required; students are automatically eligible based on school enrollment"
      ],
      applicationProcess: "No separate application is required; textbooks are distributed directly through schools.",
      department: "Education Department"
    },
    {
      id: 9,
      title: "Free Uniform Scheme",
      description: "Provides free school uniforms to support education and reduce financial burden",
      eligibility: "All students from Class 1 to 8 in government, semi-government, and private-aided schools",
      benefits: "Free uniforms for students",
      category: "Education",
      image: "/fus.png",
      color: "bg-purple-100 text-purple-800",
      detailedDescription: "The Free Uniform Scheme provides free school uniforms to students in Class 1 to 8 in government, semi-government, and private-aided schools, supporting education and reducing financial burden.",
      eligibilityCriteria: [
        "All students from Class 1 to 8 studying in government, semi-government, and private-aided schools"
      ],
      detailedBenefits: "Free uniforms for students, ensuring they have proper attire for school and reducing financial strain on families.",
      requiredDocuments: [
        "No separate documents are required; students are automatically eligible based on school enrollment"
      ],
      applicationProcess: "No separate application is required; uniforms are distributed directly through schools.",
      department: "Education Department"
    },
    {
      id: 10,
      title: "Ayushman Bharat Yojana",
      description: "Health insurance scheme providing coverage up to ₹5 lakh per family",
      eligibility: "Low-income families",
      benefits: "Free healthcare services",
      category: "Healthcare",
      image: "/aby.png",
      color: "bg-red-100 text-red-800",
      detailedDescription: "Ayushman Bharat Yojana is a health insurance scheme providing coverage up to ₹5 lakh per family, ensuring access to quality healthcare services for low-income families.",
      eligibilityCriteria: [
        "Low-income families as identified by government criteria",
        "Families listed in the Socio-Economic Caste Census (SECC) database",
        "Beneficiaries of Rashtriya Swasthya Bima Yojana (RSBY)"
      ],
      detailedBenefits: "Health insurance coverage up to ₹5 lakh per family per year, covering secondary and tertiary care hospitalization expenses. Includes pre- and post-hospitalization expenses, ensuring comprehensive healthcare support.",
      requiredDocuments: [
        "Aadhaar Card",
        "Ration Card",
        "SECC-2011 data verification",
        "Mobile number linked with Aadhaar"
      ],
      applicationProcess: "Eligible families can visit empanelled hospitals and avail cashless treatment. Verification is done using Aadhaar and SECC data.",
      department: "Health Department"
    },
    {
      id: 11,
      title: "Sukanya Samriddhi Yojana",
      description: "Small savings scheme for girl child education and marriage expenses",
      eligibility: "Girl child under 10 years",
      benefits: "High interest rate & tax benefits",
      category: "Finance",
      image: "/ssy.png",
      color: "bg-yellow-100 text-yellow-800",
      detailedDescription: "Sukanya Samriddhi Yojana is a small savings scheme for girl child education and marriage expenses, providing financial security and encouraging parents to save for their daughters' future.",
      eligibilityCriteria: [
        "Girl child under 10 years of age",
        "Account can be opened in the name of the girl child by parents or legal guardians",
        "Maximum two girls per family are eligible (exceptions for twins or triplets)"
      ],
      detailedBenefits: "High interest rate compared to other savings schemes, tax benefits under Section 80C of the Income Tax Act, and guaranteed returns for education and marriage expenses.",
      requiredDocuments: [
        "Birth Certificate of the girl child",
        "Identity proof of parent/guardian (Aadhaar Card, PAN Card, Passport)",
        "Address proof of parent/guardian (Aadhaar Card, Passport, Utility Bill)",
        "Photograph of the girl child and parent/guardian"
      ],
      applicationProcess: "Account can be opened at any authorized bank or post office. Fill the application form and submit required documents.",
      department: "Department of Financial Services"
    },
    {
      id: 12,
      title: "MGNREGA",
      description: "Guarantees 100 days of wage employment to rural households",
      eligibility: "Adult members of rural families",
      benefits: "Guaranteed employment & wages",
      category: "Employment",
      image: "/mgnrega.jpg",
      color: "bg-orange-100 text-orange-800",
      detailedDescription: "MGNREGA guarantees 100 days of wage employment to rural households, providing livelihood security and promoting rural development through public works.",
      eligibilityCriteria: [
        "Adult members of rural families willing to do unskilled manual work",
        "Must be registered with the Gram Panchayat",
        "Job card is required to avail benefits"
      ],
      detailedBenefits: "Guaranteed 100 days of wage employment per year, unemployment allowance if work is not provided within 15 days, and creation of durable assets for rural infrastructure.",
      requiredDocuments: [
        "Job card",
        "Aadhaar Card",
        "Bank account details",
        "Residence proof"
      ],
      applicationProcess: "Register with the Gram Panchayat to obtain a job card. Apply for work as per availability and receive wages directly in the bank account.",
      department: "Rural Development Department"
    },
    {
      id: 13,
      title: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana",
      description: "Skill development training for rural youth to enhance employment opportunities",
      eligibility: "Rural youth 15-35 years",
      benefits: "Free training and placement",
      category: "Employment",
      image: "/ddu.jpg",
      color: "bg-orange-100 text-orange-800",
      detailedDescription: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana provides skill development training for rural youth to enhance employment opportunities and improve their livelihoods.",
      eligibilityCriteria: [
        "Rural youth aged 15-35 years",
        "Must be from a BPL family or meet other eligibility criteria as per the scheme guidelines",
        "Educational qualifications may vary depending on the training program"
      ],
      detailedBenefits: "Free skill development training, placement assistance, and certification. Training is provided in various sectors such as IT, retail, hospitality, and healthcare.",
      requiredDocuments: [
        "Aadhaar Card",
        "BPL card or other income proof",
        "Educational certificates",
        "Passport size photographs"
      ],
      applicationProcess: "Contact the nearest training center or visit the official website to register. Attend counseling and undergo assessment before enrolling in the training program.",
      department: "Ministry of Rural Development"
    },
    {
      id: 14,
      title: "PM Kisan Samman Nidhi",
      description: "Income support scheme providing ₹6,000 per year to farmers",
      eligibility: "All landholding farmers",
      benefits: "Direct income support",
      category: "Finance",
      image: "/pmksy1.png",
      color: "bg-yellow-100 text-yellow-800",
      detailedDescription: "PM Kisan Samman Nidhi is an income support scheme providing ₹6,000 per year to farmers, ensuring financial assistance and improving their livelihoods.",
      eligibilityCriteria: [
        "All landholding farmers are eligible",
        "Farmers must have cultivable land in their name",
        "Exclusions may apply for certain categories of beneficiaries as per scheme guidelines"
      ],
      detailedBenefits: "Direct income support of ₹6,000 per year, paid in three equal installments of ₹2,000 every four months. The amount is directly credited to the farmer's bank account.",
      requiredDocuments: [
        "Land ownership documents",
        "Aadhaar Card",
        "Bank account details",
        "Mobile number linked with Aadhaar"
      ],
      applicationProcess: "Register online through the PM Kisan portal or contact the local agriculture department. Provide necessary documents and undergo verification.",
      department: "Department of Agriculture & Farmers Welfare"
    }
  ];

  const categories = [
    { name: "All", icon: "📋" },
    { name: "Agriculture", icon: "🌾" },
    { name: "Housing", icon: "🏠" },
    { name: "Education", icon: "📚" },
    { name: "Healthcare", icon: "🏥" },
    { name: "Finance", icon: "💰" },
    { name: "Employment", icon: "👷" }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openSchemeDetail = (scheme: any) => {
    setSelectedScheme(scheme);
    setIsModalOpen(true);
  };

  const closeSchemeDetail = () => {
    setSelectedScheme(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
  <title>Government Schemes | Panchayat Samiti Navapur</title>
  <meta
    name="description"
    content="Explore the list of key government schemes implemented by Panchayat Samiti Navapur to promote rural development, welfare, and empowerment."
  />
  <meta
    name="keywords"
    content="Government Schemes, Navapur, Panchayat Samiti, Rural Development, Maharashtra, MGNREGA, PMAY, NRLM"
  />
  <meta name="author" content="Panchayat Samiti Navapur" />

  {/* Open Graph / Facebook */}
  <meta property="og:title" content="Government Schemes | Panchayat Samiti Navapur" />
  <meta
    property="og:description"
    content="Discover various government initiatives and welfare programs facilitated by Panchayat Samiti Navapur."
  />
  <meta property="og:image" content="/logo.png" />
  <meta property="og:url" content="https://navapurpanchayat.gov.in/schemes" />
  <meta property="og:type" content="website" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Government Schemes | Panchayat Samiti Navapur" />
  <meta
    name="twitter:description"
    content="Find government welfare schemes actively implemented for the rural community of Navapur."
  />
  <meta name="twitter:image" content="/logo.png" />
</Helmet>
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Government Schemes</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Explore various government schemes designed to support rural development and community welfare
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className="text-sm"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schemes Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredSchemes.length} of {schemes.length} schemes
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchemes.map((scheme) => (
              <Card key={scheme.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={scheme.image}
                    alt={scheme.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={scheme.color}>
                      {scheme.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg leading-tight">{scheme.title}</CardTitle>
                  <CardDescription className="text-sm">{scheme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-1">Eligibility:</h4>
                      <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-1">Benefits:</h4>
                      <p className="text-sm text-gray-600">{scheme.benefits}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4" 
                      size="sm"
                      onClick={() => openSchemeDetail(scheme)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredSchemes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No schemes found matching your search criteria.</p>
              <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <SchemeDetailModal 
        scheme={selectedScheme}
        isOpen={isModalOpen}
        onClose={closeSchemeDetail}
      />

      <Footer />
    </div>
  );
};

export default Schemes;
