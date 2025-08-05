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
      name: "Mr. Devidas Deore",
      designation: "Group Development Officer",
      category: "Leadership",
      office: "Panchayat Samiti Navapur",
      phone: "+91 9689560349",
      image: "", // Unique image URL
      responsibilities: [
        "Overall supervision of Panchayat Samiti activities",
        "Policy formulation and implementation",
        "Coordination with state and district administration",
        "Community development programs"
      ]
    },
    {
      id: 2,
      name: "Mr. Kiran Gavit",
      designation: "Sixth Group Development Officer",
      category: "Leadership",
      office: "Panchayat Samiti Navapur",
      phone: "+91 8208780259",
      image: "",
      responsibilities: [
        "Assisting in group development activities",
        "Supporting policy implementation",
        "Community engagement"
      ]
    },
    {
      id: 3,
      name: "Mr. N.R. Ahirrao",
      designation: "Department of Women and Child Welfare",
      category: "Department Head",
      phone: "+91 7588828999",
      image: "",
      responsibilities: [
        "Overseeing women and child welfare programs",
        "Implementation of related schemes"
      ]
    },
    {
      id: 4,
      name: "Mr. Ajay Patil",
      designation: "Deputy Engineer, Gram Panchayat Department",
      category: "Department Head",
      phone: "+91 9403568158",
      image: "",
      responsibilities: [
        "Engineering and infrastructure development",
        "Technical supervision"
      ]
    },
    {
      id: 5,
      name: "Shri N.D. Pawar",
      designation: "Deputy Engineer Construction Department (Incharge)",
      category: "Department Head",
      phone: "+91 9834218475",
      image: "",
      responsibilities: [
        "Construction project management",
        "Supervision of engineering works"
      ]
    },
    {
      id: 6,
      name: "Mr. R.B. Chourey",
      designation: "Group Education Officer (Incharge)",
      category: "Department Head",
      phone: "+91 8698516771",
      image: "",
      responsibilities: [
        "Educational administration",
        "Coordination of educational programs"
      ]
    },
    {
      id: 7,
      name: "Mr. Nandkumar Suryavanshi",
      designation: "Agricultural Officer (Incharge)",
      category: "Department Head",
      phone: "+91 9923249324",
      image: "",
      responsibilities: [
        "Agricultural development",
        "Support to farmers"
      ]
    }
  ];

  const categoryColors = {
    "Leadership": "bg-purple-100 text-purple-800",
    "Department Head": "bg-blue-100 text-blue-800"
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
        <meta property="og:image" content="https://panchayatnavapur.netlify.app/logo.png" />
        <meta property="og:url" content="https://navapurpanchayat.gov.in/team" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Header />

      {/* Page Header with Background Image */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-16"
        style={{
          backgroundImage:
            'url(/black.jpeg)' // Rural India, fields, community
        }}
      >
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
                    src={member.image || "https://panchayatnavapur.netlify.app/logo.png"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                  />
                  <CardTitle className="text-lg leading-tight">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-gray-700">{member.designation}</CardDescription>
                  <Badge
                    className={`${categoryColors[member.category] || "bg-gray-100 text-gray-800"} 
                      transition-all duration-200 cursor-pointer
                      hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-lg`}
                  >
                    {member.category}
                  </Badge>
                  {member.office && (
                    <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {member.office}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2 pt-3">
                      <Phone className="h-4 w-4 text-blue-500" />
                      <a
                        href={`tel:${member.phone.replace(/\s|\+91/g, "")}`}
                        className="text-xs text-blue-700 hover:underline focus:outline-none"
                      >
                        {member.phone}
                      </a>
                    </div>
                    {member.responsibilities && (
                      <div className="pt-3 border-t border-gray-100">
                        <h4 className="font-semibold text-xs mb-2">Key Responsibilities:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {member.responsibilities.map((resp, index) => (
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
