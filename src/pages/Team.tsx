import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Shri Rajesh Kumar Patil",
      designation: "Panchayat Samiti President",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      phone: "+91 9876543201",
      email: "president@navapurpanchayat.gov.in",
      experience: "15 years in public service",
      education: "M.A. in Political Science",
      responsibilities: [
        "Overall supervision of Panchayat Samiti activities",
        "Policy formulation and implementation",
        "Coordination with state and district administration",
        "Community development programs"
      ]
    },
    {
      id: 2,
      name: "Mrs. Sunita Devi Sharma",
      designation: "Vice President",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=400&h=400&fit=crop&crop=face",
      phone: "+91 9876543202",
      email: "vicepresident@navapurpanchayat.gov.in",
      experience: "12 years in rural development",
      education: "M.S.W. in Rural Development",
      responsibilities: [
        "Women and child development programs",
        "Social welfare schemes implementation",
        "Coordination with women's self-help groups",
        "Health and nutrition programs"
      ]
    },
    {
      id: 3,
      name: "Mr. Anil Kumar Singh",
      designation: "Block Development Officer",
      category: "Administration",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      phone: "+91 9876543203",
      email: "bdo@navapurpanchayat.gov.in",
      experience: "18 years",
      specialization: "Rural Planning & Development"
    },
    {
      id: 4,
      name: "Dr. Priya Deshmukh",
      designation: "Chief Medical Officer",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      phone: "+91 9876543214",
      email: "health@navapurpanchayat.gov.in",
      experience: "10 years",
      specialization: "Community Medicine"
    },
    {
      id: 5,
      name: "Mr. Sunil Patil",
      designation: "Agriculture Extension Officer",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      phone: "+91 9876543213",
      email: "agriculture@navapurpanchayat.gov.in",
      experience: "14 years",
      specialization: "Crop Management & Soil Science"
    },
    {
      id: 6,
      name: "Mrs. Anjali Deshmukh",
      designation: "Education Officer",
      category: "Education",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      phone: "+91 9876543215",
      email: "education@navapurpanchayat.gov.in",
      experience: "11 years",
      specialization: "Educational Administration"
    },
    {
      id: 7,
      name: "Mr. Ramesh Jadhav",
      designation: "Housing Development Officer",
      category: "Housing",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      phone: "+91 9876543211",
      email: "housing@navapurpanchayat.gov.in",
      experience: "13 years",
      specialization: "Rural Housing & Infrastructure"
    },
    {
      id: 8,
      name: "Mrs. Lata Patel",
      designation: "Water Resource Officer",
      category: "Water Supply",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      phone: "+91 9876543212",
      email: "water@navapurpanchayat.gov.in",
      experience: "9 years",
      specialization: "Water Management & Conservation"
    }
  ];

  const categoryColors = {
    "Leadership": "bg-purple-100 text-purple-800",
    "Administration": "bg-blue-100 text-blue-800",
    "Healthcare": "bg-red-100 text-red-800",
    "Agriculture": "bg-green-100 text-green-800",
    "Education": "bg-orange-100 text-orange-800",
    "Housing": "bg-yellow-100 text-yellow-800",
    "Water Supply": "bg-cyan-100 text-cyan-800"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
  <title>Our Team | Panchayat Samiti Navapur</title>
  <meta
    name="description"
    content="Meet the dedicated officials and staff behind Panchayat Samiti Navapur, working tirelessly to implement policies and serve the community."
  />
  <meta name="keywords" content="Panchayat Samiti Navapur team, public officials, rural development officers, government staff, Navapur governance" />
  <meta name="author" content="Panchayat Samiti Navapur" />
  <meta property="og:title" content="Our Team – Panchayat Samiti Navapur" />
  <meta property="og:description" content="Get to know the people leading the initiatives and development programs at Panchayat Samiti Navapur." />
  <meta property="og:image" content="/logo.png" />
  <meta property="og:url" content="https://navapurpanchayat.gov.in/team" />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
      <Header />
      
      {/* Page Header with Background Image */}
      <section className="relative bg-cover bg-center bg-no-repeat py-16" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=600&fit=crop)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Meet the dedicated officials working for rural development and community welfare
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                  />
                  <CardTitle className="text-lg leading-tight">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-gray-700">{member.designation}</CardDescription>
                  <Badge className={categoryColors[member.category] || "bg-gray-100 text-gray-800"}>
                    {member.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p><strong>Experience:</strong> {member.experience}</p>
                      {member.specialization && (
                        <p><strong>Specialization:</strong> {member.specialization}</p>
                      )}
                      {member.education && (
                        <p><strong>Education:</strong> {member.education}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <span className="text-xs">{member.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <span className="text-xs break-all">{member.email}</span>
                      </div>
                    </div>
                    
                    {member.responsibilities && (
                      <div className="pt-3 border-t border-gray-100">
                        <h4 className="font-semibold text-xs mb-2">Key Responsibilities:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {member.responsibilities.slice(0, 2).map((resp, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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

export default Team;
