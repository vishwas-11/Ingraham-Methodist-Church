export default function ContactUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="mb-stack-lg text-center md:text-left mt-8 md:mt-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full animate-fade-in-up">
        <h1 className="font-display-lg-mobile md:font-display-lg text-primary-container mb-stack-sm">Get in Touch</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">
          We would love to hear from you. Whether you have a question, need prayer, or want to get involved, our doors and inboxes are always open.
        </p>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full mb-stack-lg">
        
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
        <div className="lg:col-span-5 flex flex-col gap-gutter reveal-on-scroll delay-100">
          
          {/* Contact Details Card */}
          <div className="bg-secondary-container rounded-xl p-6 md:p-8 flex-grow shadow-sm">
            <h3 className="font-headline-sm text-primary-container mb-6">Contact Details</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-surface-container-lowest p-2 rounded-lg text-primary-container shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="font-label-md text-on-surface mb-1">Visit Us</p>
                  <p className="font-body-md text-on-surface-variant">123 Wesley Way<br/>Ingraham, IL 62434</p>
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

          {/* Map Placeholder */}
          <div className="h-64 bg-surface-container-highest rounded-xl overflow-hidden relative shadow-sm border border-warm-brown flex items-center justify-center group cursor-pointer">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
              alt="Map illustration" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgfnfOLJV7fT7idagn5zQFPGpbVKmX9khq0j3PVyLGQIbdUghXr7GblPZPkldfjbyBI9MKlR2Txdsub7PjFxg0iFkW5418XNkYb3ikQ3maAmKmYVWlk4Kr3Wke3AvnAqcTa5FcyqLnooPRKkSQHqhRNcN8L5p5LWv05oFYgCz4PCEND-8Tt480sdv3Tqc2KlG4_1_QPwN_LqXOs5ohtPLc8g1ay7UV8UaNHnhKS_njFuNoOimDs34f"
            />
            <div className="relative z-10 bg-primary-container text-on-primary p-3 rounded-full shadow-ambient group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined">map</span>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
