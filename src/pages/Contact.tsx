/* contact.tsx -------------------------------------------------------------- */
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
import { Toaster, toast } from "sonner"; // ⬅️ toast library

const Contact = () => {
  /* ----------------------------------------------------------------------- */
  /* Formspree hook – replace “xldnoayb” with your own ID if needed          */
  /* ----------------------------------------------------------------------- */
  const [state, handleSubmit] = useForm("xldnoayb");

  /* Local controlled inputs (optional but nicer UX) ----------------------- */
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

  /* Show toast on success, then clear form -------------------------------- */
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
      /* Optional: you can also call state.reset() here, but clearing fields
         is enough because Formspree auto-resets its internal state soon.   */
    }
  }, [state.succeeded]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* One global toaster for this page.
         ⓘ If you already have <Toaster /> in _app.tsx / index.tsx, remove this. */}
      <Toaster position="bottom-right" richColors />

      <Header />

      {/* -------------------- Hero banner ---------------------------------- */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-16"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-7xl px-4 text-white sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
            <p className="mx-auto max-w-3xl text-xl opacity-90">
              We're here to serve you. Get in touch with us for any queries or
              assistance.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------- Two-column section --------------------------- */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* LEFT COLUMN – info + map -------------------------------------- */}
          <div>
            {/* Contact Info Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription>
                  Visit us during office hours or reach us via:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Address */}
                <div className="flex space-x-4">
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Office Address</h3>
                    <p>Panchayat Samiti Office<br/>Navapur, Nandurbar<br/>Maharashtra – 425418</p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex space-x-4">
                  <Phone className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Phone Number</h3>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex space-x-4">
                  <Mail className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Email Address</h3>
                    <p>info@navapurpanchayat.gov.in</p>
                  </div>
                </div>
                {/* Hours */}
                <div className="flex space-x-4">
                  <Clock className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Office Hours</h3>
                    <p>
                      Mon – Fri : 10 AM–5 PM<br/>
                      Sat : 10 AM–2 PM<br/>
                      Sun : Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Card */}
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

          {/* RIGHT COLUMN – form ------------------------------------------- */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we’ll reply as soon as possible.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Global non-field errors */}
                {Array.isArray(state.errors) && state.errors.length > 0 && (
                  <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-800">
                    Something went wrong – please check the highlighted fields.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row: name + phone */}
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

                  {/* Email */}
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

                  {/* Subject */}
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

                  {/* Message */}
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

                  {/* Submit button */}
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
