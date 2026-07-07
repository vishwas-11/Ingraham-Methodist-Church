export default function ContactUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[614px] min-h-[400px] flex items-center justify-center -mt-[72px] mb-stack-lg">
        <div className="absolute inset-0 z-0 bg-[#4A0F1A]">
          <div 
            className="bg-cover bg-center w-full h-full opacity-40 mix-blend-luminosity" 
            style={{ backgroundImage: "url('/reach_us.png')" }}
          ></div>
          {/* Dark Overlay instead of light gradient */}
          <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none"></div>
          {/* Bottom fade to match page background */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f3e7d3] to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto mt-24">
          <div className="flex flex-col items-center mb-6 w-full">
            <span className="text-[#CDAA63] font-label-md tracking-[0.2em] uppercase text-[12px] md:text-[13px] mb-3" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>Reach Us</span>
            <div className="h-px w-32 bg-[rgba(205,170,99,0.35)]"></div>
          </div>
          <h1 className="font-display-lg text-[48px] md:text-[72px] leading-[1.05] text-[#F4E7D3] mb-6 animate-fade-in-up" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Get in Touch
          </h1>
          <p className="font-body-lg text-[#D9C7B3] max-w-2xl mx-auto animate-smooth-render" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            We would love to hear from you. Whether you have a question, need prayer, or want to get involved, our doors and inboxes are always open.
          </p>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-24 md:pb-32">
        
        {/* Contact Form (Left Span 7) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 md:p-8 border border-warm-brown shadow-sm relative overflow-hidden reveal-on-scroll">
          {/* Subtle texture/accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container rounded-bl-full opacity-30 -z-10"></div>
          
          <h2 className="font-headline-md text-primary-container mb-6">Send a Message</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-label-md text-on-surface-variant mb-2" htmlFor="firstName">First Name</label>
                <input 
                  className="w-full bg-background border border-warm-brown rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container transition-colors" 
                  id="firstName" 
                  placeholder="Jane" 
                  type="text" 
                />
              </div>
              <div>
                <label className="block font-label-md text-on-surface-variant mb-2" htmlFor="lastName">Last Name</label>
                <input 
                  className="w-full bg-background border border-warm-brown rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container transition-colors" 
                  id="lastName" 
                  placeholder="Doe" 
                  type="text" 
                />
              </div>
            </div>
            
            <div>
              <label className="block font-label-md text-on-surface-variant mb-2" htmlFor="email">Email Address</label>
              <input 
                className="w-full bg-background border border-warm-brown rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container transition-colors" 
                id="email" 
                placeholder="jane@example.com" 
                type="email" 
              />
            </div>
            
            <div>
              <label className="block font-label-md text-on-surface-variant mb-2" htmlFor="subject">Subject</label>
              <select 
                className="w-full bg-background border border-warm-brown rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container transition-colors appearance-none text-on-surface" 
                id="subject"
              >
                <option>General Inquiry</option>
                <option>Prayer Request</option>
                <option>Membership</option>
                <option>Events</option>
              </select>
            </div>
            
            <div>
              <label className="block font-label-md text-on-surface-variant mb-2" htmlFor="message">Message</label>
              <textarea 
                className="w-full bg-background border border-warm-brown rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container transition-colors resize-none" 
                id="message" 
                placeholder="How can we help you today?" 
                rows={5}
              ></textarea>
            </div>
            
            <button 
              className="w-full md:w-auto bg-primary-container text-on-primary px-8 py-3 rounded-lg font-label-md hover:bg-primary transition-colors shadow-ambient flex items-center justify-center gap-2" 
              type="submit"
            >
              <span>Send Message</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>

        {/* Info & Map (Right Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-gutter">
          
          {/* Contact Details Card */}
          <div className="bg-secondary-container rounded-xl p-6 md:p-8 flex-grow shadow-sm reveal-on-scroll">
            <h3 className="font-headline-sm text-primary-container mb-6">Contact Details</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-surface-container-lowest p-2 rounded-lg text-primary-container shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="font-label-md text-on-surface mb-1">Visit Us</p>
                  <p className="font-body-md text-on-surface-variant">
                    Ingraham Methodist Church<br/>
                    MFF2+JVG, Hapur Rd, Sector 11, Raj Kunj,<br/>
                    Raj Nagar, Ghaziabad, Uttar Pradesh 201002
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-surface-container-lowest p-2 rounded-lg text-primary-container shrink-0">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="font-label-md text-on-surface mb-1">Call Us</p>
                  <p className="font-body-md text-on-surface-variant">(555) 123-4567</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-surface-container-lowest p-2 rounded-lg text-primary-container shrink-0">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="font-label-md text-on-surface mb-1">Email</p>
                  <p className="font-body-md text-on-surface-variant">hello@ingrahammethodist.org</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-8 pt-6 border-t border-warm-brown">
              <h4 className="font-label-md text-on-surface mb-4">Office Hours</h4>
              <div className="space-y-2 text-on-surface-variant font-body-md">
                <div className="flex justify-between">
                  <span>Mon - Thu</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span>9:00 AM - 12:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>8:00 AM - 1:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="h-64 md:h-80 bg-surface-container-highest rounded-xl overflow-hidden relative shadow-sm border border-warm-brown flex items-center justify-center reveal-on-scroll">
            <iframe 
              src="https://maps.google.com/maps?q=Ingraham%20Methodist%20Church,%20Ghaziabad&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
        </div>
      </div>
    </>
  );
}
