import React from 'react';
import '../styles/Legal.css';

const Privacy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Privacy Policy</h1>
        <div className="legal-content">
          <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to LogiCar's Privacy Policy. At LogiCar, we respect your privacy and are committed to protecting your personal data.
              This Privacy Policy will inform you about how we look after your personal data when you visit our website and use our services, 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>
          
          <section>
            <h2>2. Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul>
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, 
              time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology 
              on the devices you use to access this website.</li>
              <li><strong>Vehicle Data</strong> includes information about your vehicles, maintenance history, and service records.</li>
            </ul>
          </section>
          
          <section>
            <h2>3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul>
              <li>To register you as a new customer.</li>
              <li>To provide and manage your account.</li>
              <li>To provide our services to you, including vehicle maintenance tracking and reminders.</li>
              <li>To improve our website, products, and services.</li>
              <li>To communicate with you, including service notifications and marketing messages (if you opt in).</li>
            </ul>
          </section>
          
          <section>
            <h2>4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:reply.logicar@gmail.com">reply.logicar@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 