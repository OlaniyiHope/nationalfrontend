import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./Contact.css";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!form.name.trim()) nextErrors.name = "This is a required question";
    if (!form.email.trim()) {
      nextErrors.email = "This is a required question";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address";
    }
    if (!form.message.trim()) nextErrors.message = "This is a required question";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Replace with real submission logic (API call, email service, etc.)
    console.log("Contact form submitted:", form);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <>
      <Header />

      <main className="contact">
        <div className="container">
          <div className="contactTitle">
            <span></span>
            <h1>Contact Us</h1>
            <div></div>
          </div>

          <div className="contactCard">
            <div className="contactCard__topBar"></div>

            <div className="contactCard__header">
              <h2>Make Enquiry</h2>

              <div className="contactCard__account">
                <span className="contactCard__accountIcon" aria-hidden="true" />
                <div className="contactCard__accountText">
                  <span className="contactCard__email">
                    enquiries@punchng.com
                  </span>
                  <span className="contactCard__notShared">
                    <span className="contactCard__mailIcon" aria-hidden="true" />
                    Not shared
                  </span>
                </div>
              </div>

              <p className="contactCard__required">* Indicates required question</p>
            </div>

            {submitted ? (
              <div className="contactCard__success">
                <h3>Thank you — your message has been received.</h3>
                <p>We'll get back to you as soon as possible.</p>
                <button type="button" onClick={handleReset}>
                  Submit another response
                </button>
              </div>
            ) : (
              <form className="contactForm" onSubmit={handleSubmit} noValidate>
                <div className="contactForm__field">
                  <label htmlFor="name">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your answer"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="fieldError">{errors.name}</span>}
                </div>

                <div className="contactForm__field">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your answer"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="fieldError">{errors.email}</span>}
                </div>

                <div className="contactForm__field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Your answer"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="contactForm__field">
                  <label htmlFor="message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your answer"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <span className="fieldError">{errors.message}</span>
                  )}
                </div>

                <div className="contactForm__actions">
                  <button type="submit">Submit</button>
                  <button
                    type="button"
                    className="contactForm__clear"
                    onClick={handleReset}
                  >
                    Clear form
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
