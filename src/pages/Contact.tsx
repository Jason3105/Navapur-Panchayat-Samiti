import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useForm, ValidationError } from "@formspree/react";
import { Toaster, toast } from "sonner";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [state, handleSubmit] = useForm("xldnoayb");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  }, [state.succeeded]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Helmet>
  <title>Contact | Panchayat Samiti Navapur</title>
  <meta
    name="description"
    content="Contact Panchayat Samiti Navapur for queries, assistance, and feedback. Reach us via email, phone, or visit our office in Nandurbar."
  />
  <meta property="og:title" content="Contact Panchayat Samiti Navapur" />
  <meta
    property="og:description"
    content="We are here to help. Get in touch with Panchayat Samiti Navapur for any assistance."
  />
  <meta
    property="og:image"
    content="https://panchayatnavapur.netlify.app/logo.png"
  />
  <meta
    property="og:url"
    content="https://panchayatnavapur.netlify.app/contact"
  />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Contact Panchayat Samiti Navapur" />
  <meta
    name="twitter:description"
    content="Reach out to Panchayat Samiti Navapur for support or general inquiries."
  />
  <meta
    name="twitter:image"
    content="https://panchayatnavapur.netlify.app/logo.png"
  />
</Helmet>


      <Toaster position="bottom-right" richColors />
      <Header />

      <section
        className="relative bg-cover bg-center bg-no-repeat py-16"
        style={{
          backgroundImage:
            "url(/black.jpeg)",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-7xl px-4 text-white sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
            <p className="mx-auto max-w-3xl text-xl opacity-90">
              We're here to serve you. Get in touch with us for any queries or assistance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* LEFT – Info + Map */}
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription>
                  Visit us during office hours or reach us via:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex space-x-4">
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Office Address</h3>
                    <p>
                      Panchayat Samiti Office<br />
                      Navapur, Nandurbar<br />
                      Maharashtra – 425418
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Phone className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Phone Number</h3>
                    <a
      href="tel:9689560349"
      className="text-blue-700 hover:underline focus:outline-none"
    >
      +91 9689560349
    </a>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Mail className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Email Address</h3>
                    <p>(Fill in the contact form)</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Clock className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Office Hours</h3>
                    <p>
                      Mon – Fri : 10:00 AM – 5:30 PM<br />
                      Sat : 10:00 AM – 2:00 PM<br />
                      Sun : Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Location</CardTitle>
                <CardDescription>Find us on the map</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-hidden rounded-lg bg-gray-200">
                  <iframe
                    title="Panchayat Samiti Navapur Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.1398464812!2d73.8567437!3d21.1702401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd29c9dc0b2a5c5%3A0x31b1b1b1b1b1b1b1!2sNavapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1635678901234!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="mt-4">
                  <a
                    href="https://maps.google.com/?q=Navapur,Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View larger map
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT – Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we’ll reply as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {Array.isArray(state.errors) && state.errors.length > 0 && (
                  <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-800">
                    Something went wrong – please check the highlighted fields.
                  </div>
                )}

                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      placeholder="Enter the subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    <ValidationError
                      prefix="Subject"
                      field="subject"
                      errors={state.errors}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {state.submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
