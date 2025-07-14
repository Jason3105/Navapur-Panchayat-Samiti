
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('categories'); // 'categories' or 'event'
  const [searchParams] = useSearchParams();

  const categories = [
    'All',
    'Independence Day',
    'Health Camps',
    'Education Programs',
    'Agriculture Training',
    'Infrastructure Development',
    'Community Events'
  ];

  const events = [
    {
      id: 1,
      title: "Independence Day Celebration 2024",
      category: "Independence Day",
      date: "August 15, 2024",
      description: "Flag hoisting ceremony and cultural programs at Panchayat Samiti office",
      coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      images: [
        {
          src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
          caption: "Flag hoisting ceremony by Panchayat Samiti President"
        },
        {
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
          caption: "Cultural performances by local school children"
        },
        {
          src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
          caption: "Community members participating in the celebration"
        },
        {
          src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
          caption: "Distribution of sweets and prizes to participants"
        },
        {
          src: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop",
          caption: "Group photo of all participants and officials"
        }
      ]
    },
    {
      id: 2,
      title: "Free Health Check-up Camp",
      category: "Health Camps",
      date: "September 10, 2024",
      description: "Ayushman Bharat health camp providing free medical check-ups",
      coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      images: [
        {
          src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
          caption: "Doctors conducting health check-ups"
        },
        {
          src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
          caption: "Medical equipment and testing facilities"
        },
        {
          src: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=800&h=600&fit=crop",
          caption: "Patients receiving consultation"
        },
        {
          src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
          caption: "Distribution of free medicines"
        }
      ]
    },
    {
      id: 3,
      title: "Digital Literacy Program",
      category: "Education Programs",
      date: "October 5, 2024",
      description: "Training session on digital skills for rural youth",
      coverImage: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop",
      images: [
        {
          src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop",
          caption: "Computer training session for rural youth"
        },
        {
          src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
          caption: "Participants learning basic computer skills"
        },
        {
          src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
          caption: "Certificate distribution ceremony"
        }
      ]
    },
    {
      id: 4,
      title: "Farmers Training Workshop",
      category: "Agriculture Training",
      date: "November 12, 2024",
      description: "Organic farming techniques workshop",
      coverImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop",
      images: [
        {
          src: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop",
          caption: "Agricultural expert demonstrating organic farming techniques"
        },
        {
          src: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop",
          caption: "Farmers examining soil quality and composition"
        },
        {
          src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
          caption: "Distribution of improved seeds and fertilizers"
        },
        {
          src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=600&fit=crop",
          caption: "Group discussion on crop management practices"
        }
      ]
    },
    {
      id: 5,
      title: "Water Tank Construction",
      category: "Infrastructure Development",
      date: "August 20, 2024",
      description: "Inauguration of new water storage facility",
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      images: [
        {
          src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
          caption: "Newly constructed water storage tank"
        },
        {
          src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
          caption: "Inauguration ceremony by local officials"
        },
        {
          src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
          caption: "Community members celebrating the new facility"
        }
      ]
    },
    {
      id: 6,
      title: "Women Self-Help Group Meeting",
      category: "Community Events",
      date: "September 25, 2024",
      description: "Monthly meeting discussing livelihood programs",
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
      images: [
        {
          src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
          caption: "Women's self-help group monthly meeting"
        },
        {
          src: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=800&h=600&fit=crop",
          caption: "Discussion on microfinance and livelihood programs"
        },
        {
          src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop",
          caption: "Training on handicrafts and skill development"
        }
      ]
    }
  ];

  // Ensure filteredEvents is always an array
  const filteredEvents = Array.isArray(events) 
    ? (selectedCategory === 'All' ? events : events.filter(event => event.category === selectedCategory))
    : [];

  const openEventGallery = (event) => {
    setSelectedEvent(event);
    setSelectedImageIndex(0);
    setViewMode('event');
  };

  const closeEventGallery = () => {
    setSelectedEvent(null);
    setViewMode('categories');
  };

  const nextImage = () => {
    if (selectedEvent && Array.isArray(selectedEvent.images)) {
      setSelectedImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  };

  const prevImage = () => {
    if (selectedEvent && Array.isArray(selectedEvent.images)) {
      setSelectedImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
    }
  };

  useEffect(() => {
    // Handle navigation from home page
    const categoryParam = searchParams.get('category');
    const eventParam = searchParams.get('event');
    
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
    
    if (eventParam && Array.isArray(events)) {
      const eventId = parseInt(eventParam);
      const event = events.find(e => e && e.id === eventId);
      if (event) {
        openEventGallery(event);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
       <Helmet>
        <title>Gallery | Panchayat Samiti Navapur</title>
        <meta name="description" content="Explore our visual journey of community development, government initiatives, and public welfare activities" />
        <meta property="og:title" content="Gallery | Panchayat Samiti Navapur" />
        <meta property="og:description" content="Explore our visual journey of community development, initiatives, and events." />
        <meta property="og:image" content="https://panchayatnavapur.netlify.app/logo.png" />
        <meta property="og:url" content="https://panchayatnavapur.netlify.app/gallery" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gallery | Panchayat Samiti Navapur" />
        <meta name="twitter:description" content="Visual showcase of rural programs, training, and government activities in Navapur." />
        <meta name="twitter:image" content="https://panchayatnavapur.netlify.app/logo.png" />
      </Helmet>
      <Header />
      
      {/* Page Header with Background Image */}
      <section className="relative bg-cover bg-center bg-no-repeat py-16" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=1200&h=600&fit=crop)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Explore our visual journey of community development, government initiatives, and public welfare activities
            </p>
          </div>
        </div>
      </section>

      {viewMode === 'categories' && (
        <>
          {/* Category Filter */}
          <section className="py-8 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {Array.isArray(categories) && categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                </p>
              </div>
            </div>
          </section>

          {/* Events Grid */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.isArray(filteredEvents) && filteredEvents.map((event) => (
                  <Card 
                    key={event.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => openEventGallery(event)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={event.coverImage}
                          alt={event.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            {event.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <Badge className="bg-black bg-opacity-70 text-white">
                            {Array.isArray(event.images) ? event.images.length : 0} Photos
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <p className="text-xs text-gray-500">{event.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No events found in this category.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedCategory('All')} 
                    className="mt-4"
                  >
                    View All Events
                  </Button>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Event Gallery View */}
      {viewMode === 'event' && selectedEvent && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={closeEventGallery}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Gallery
              </Button>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
              <p className="text-gray-600 mb-1">{selectedEvent.description}</p>
              <p className="text-sm text-gray-500">{selectedEvent.date}</p>
            </div>

            {/* Main Image Display */}
            {selectedEvent.images && Array.isArray(selectedEvent.images) && selectedEvent.images.length > 0 && (
              <>
                <div className="relative mb-8">
                  <div className="bg-black rounded-lg overflow-hidden">
                    <img
                      src={selectedEvent.images[selectedImageIndex]?.src || ''}
                      alt={selectedEvent.images[selectedImageIndex]?.caption || ''}
                      className="w-full h-96 md:h-[500px] object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevImage}
                      className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextImage}
                      className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black bg-opacity-70 text-white p-3 rounded">
                      <p className="text-sm">{selectedEvent.images[selectedImageIndex]?.caption || ''}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {selectedImageIndex + 1} of {selectedEvent.images.length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
                  {selectedEvent.images.map((image, index) => (
                    <div
                      key={index}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image.src}
                        alt={image.caption}
                        className="w-full h-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
