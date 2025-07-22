import React from 'react';
import '../styles/Legal.css';

const Cookies = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Cookie Policy</h1>
        <div className="legal-content">
          <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2>1. Introduction</h2>
            <p>
              This Cookie Policy explains how LogiCar uses cookies and similar technologies to recognize you when you visit our website.
              It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
          </section>
          
          <section>
            <h2>2. What are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
              Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, 
              as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, LogiCar) are called "first party cookies". 
              Cookies set by parties other than the website owner are called "third party cookies". 
              Third party cookies enable third party features or functionality to be provided on or through the website 
              (e.g. advertising, interactive content and analytics).
            </p>
          </section>
          
          <section>
            <h2>3. Why Do We Use Cookies?</h2>
            <p>
              We use first and third party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, 
              and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of 
              our users to enhance the experience on our website. Third parties serve cookies through our website for analytics and other purposes.
            </p>
          </section>
          
          <section>
            <h2>4. How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. 
              If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
          </section>
          
          <section>
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us at: <a href="mailto:reply.logicar@gmail.com">reply.logicar@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies; 