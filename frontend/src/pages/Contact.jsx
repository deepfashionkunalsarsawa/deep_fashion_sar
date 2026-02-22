import Container from "../components/common/Container";

export default function Contact() {
  return (
    <section className="py-16 bg-white min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">

          <h1 className="text-4xl font-bold text-center text-primary">
            Contact Us
          </h1>

          <div className="text-center space-y-2">
            <p><strong>Store Name:</strong> Deep Fashion Sarsawa</p>
            <p><strong>Phone:</strong> +91 9557201975</p>
            <p><strong>Email:</strong> deepfashionshowroom@gmail.com</p>
            <p><strong>Location:</strong> Opposite gurdwara, near Chawla Ultrasound,<br/> Sarsawa, Saharanpur, <br/>Uttar Pradesh, 247232</p>
          </div>

          {/* WhatsApp Button */}
          <div className="text-center">
            <a
              href="https://wa.me/919557201975"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-secondary transition"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Google Map Embed */}
          <div className="mt-8">
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.64832894248!2d77.4012545!3d30.01825269999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eef000b7f731f%3A0xfdcbc50422e0e439!2sDeep%20fashion%20sarsawa!5e0!3m2!1sen!2sin!4v1771327490589!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-xl shadow-md"
            ></iframe>
          </div>

        </div>
      </Container>
    </section>
  );
}
