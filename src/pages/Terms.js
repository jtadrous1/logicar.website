import React from 'react';
import '../styles/Legal.css';

const Terms = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Terms of Service</h1>
        <div className="legal-content">
          <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to LogiCar. These Terms of Service govern your use of our website and services. 
              By using LogiCar, you agree to these terms. Please read them carefully.
            </p>
          </section>
          
          <section>
            <h2>2. Using our Services</h2>
            <p>
              You must follow any policies made available to you within the Services. You may use our Services only as permitted by law.
              We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.
            </p>
            <p>
              Using our Services does not give you ownership of any intellectual property rights in our Services or the content you access.
              These terms do not grant you the right to use any branding or logos used in our Services.
            </p>
          </section>
          
          <section>
            <h2>3. Your LogiCar Account</h2>
            <p>
              You may need a LogiCar Account in order to use some of our Services. You are responsible for safeguarding your account, 
              so use a strong password and limit use of your account to authorized individuals. 
              You are responsible for all activity that occurs under your account.
            </p>
          </section>
          
          <section>
            <h2>4. Privacy and Copyright Protection</h2>
            <p>
              LogiCar's privacy policies explain how we treat your personal data and protect your privacy when you use our Services.
              By using our Services, you agree that LogiCar can use such data in accordance with our privacy policies.
            </p>
          </section>
          
          <section>
            <h2>5. About Software in our Services</h2>
            <p>
              LogiCar gives you a personal, worldwide, royalty-free, non-assignable and non-exclusive license to use the software 
              provided to you by LogiCar as part of the Services. This license is for the sole purpose of enabling you to use and 
              enjoy the benefit of the Services as provided by LogiCar, in the manner permitted by these terms.
            </p>
          </section>
          
          <section>
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at: <a href="mailto:reply.logicar@gmail.com">reply.logicar@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms; 