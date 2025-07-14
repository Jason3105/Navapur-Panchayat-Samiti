import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Award, Target, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";

const About = () => {
  const timeline = [
    {
      year: 1995,
      event: "Establishment of Panchayat Samiti Navapur",
      description: "Panchayat Samiti Navapur was established to decentralize governance and promote rural development in the tribal-dominated region of Nandurbar district.",
      icon: MapPin,
      color: "bg-blue-500"
    },
    {
      year: 2000,
      event: "Implementation of Key Government Schemes",
      description: "Initiated implementation of key government schemes such as MGNREGA, PMGSY, and SGSY to address poverty, employment, and infrastructure development.",
      icon: Users,
      color: "bg-green-500"
    },
    {
      year: 2010,
      event: "Focus on Education and Healthcare",
      description: "Increased focus on improving education and healthcare facilities in rural areas through initiatives like Sarva Shiksha Abhiyan and National Rural Health Mission.",
      icon: Heart,
      color: "bg-red-500"
    },
    {
      year: 2015,
      event: "Digitalization and Transparency",
      description: "Launched e-governance initiatives to enhance transparency, accountability, and citizen participation in local governance.",
      icon: Target,
      color: "bg-purple-500"
    },
    {
      year: 2020,
      event: "Sustainable Development Goals",
      description: "Aligned development programs with the Sustainable Development Goals (SDGs) to promote inclusive and sustainable growth in the region.",
      icon: Award,
      color: "bg-orange-500"
    },
    {
      year: 2024,
      event: "Continued Progress and Innovation",
      description: "Continued commitment to rural development through innovative programs, community engagement, and effective implementation of government schemes.",
      icon: Calendar,
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>About Us | Panchayat Samiti Navapur</title>
        <meta
          name="description"
          content="Discover the history, milestones, and mission of Panchayat Samiti Navapur—empowering rural communities of Nandurbar since 1995."
        />
        <meta property="og:title" content="About Panchayat Samiti Navapur" />
        <meta
          property="og:description"
          content="Learn about the journey and impact of Panchayat Samiti Navapur in driving rural development and governance."
        />
        <meta property="og:image" content="https://panchayatnavapur.netlify.app/logo.png" />
        <meta property="og:url" content="https://panchayatnavapur.netlify.app/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Panchayat Samiti Navapur" />
        <meta name="twitter:description" content="Rural development journey of Panchayat Samiti Navapur." />
        <meta name="twitter:image" content="https://panchayatnavapur.netlify.app/logo.png" />
      </Helmet>

      <Header />

      {/* Page Header with Background Image */}
      <section className="relative bg-cover bg-center bg-no-repeat py-16" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=600&fit=crop)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Learn about the history and establishment of Panchayat Samiti Navapur
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Three decades of dedicated service to the tribal communities of Nandurbar district
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                  Panchayat Samiti Navapur serves as a crucial intermediate tier of the Panchayati Raj system,
                  bridging the gap between Gram Panchayats and the Zilla Parishad to ensure effective governance
                  and development in the tribal-dominated region of Nandurbar district.
                </p>
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                  Our mission is to empower rural communities through participatory governance, sustainable development,
                  and social justice. We strive to improve the quality of life for all residents by providing access
                  to essential services, promoting economic opportunities, and preserving our rich cultural heritage.
                </p>
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                  Through transparent governance, community participation, and innovative development programs,
                  we continue to work towards creating a prosperous and equitable society for all.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop"
                  alt="Panchayat Samiti Building"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-full opacity-10"></div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-500 rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section - Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key milestones and achievements that shaped our commitment to rural development
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200"></div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className={`flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${index % 2 === 0 ? '' : 'md:pr-8'} ${index % 2 === 1 ? '' : 'md:pl-8'}`}>
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center`}>
                              <item.icon className="h-4 w-4 text-white" />
                            </div>
                            <Badge variant="outline" className="text-xs font-semibold">
                              {item.year}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg leading-tight">{item.event}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <CardDescription className="text-gray-600 leading-relaxed text-sm">
                            {item.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 flex items-center justify-center">
                      <div className={`w-3 h-3 ${item.color} rounded-full border-2 border-white shadow-lg z-10`}></div>
                    </div>

                    <div className="hidden md:block w-5/12"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
