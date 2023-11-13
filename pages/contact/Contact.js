import React, { useState } from 'react';
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <header>
        {/* Include your header content here */}
      </header>

      {/* Include the contact form */}
      <div className="contact-form">
        <h2>Póngase en contacto con nosotros</h2>
        <p>Complete el formulario a la izquierda y descubra cómo podemos ayudarlo a hacer crecer su negocio.</p>

        {/* Contact form */}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <label>
            Message:
            <textarea name="message" value={formData.message} onChange={handleChange} />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
