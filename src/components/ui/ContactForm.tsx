import React, { useState } from 'react';
import type { ContactFormData } from '../../types';
import { siteConfig } from '../../config/siteConfig';
import { Button } from './Button';
import { CheckCircle2, AlertCircle, Loader2, Send, MessageSquare } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    business: '',
    email: '',
    phone: '',
    serviceType: 'New Website',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const serviceOptions = [
    'New Website',
    'Website Redesign',
    'Landing Page',
    'E-commerce',
    'Website Maintenance',
    'Other',
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!formData.business.trim()) {
      newErrors.business = 'Please provide your business or brand name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your phone number.';
    } else if (!phoneRegex.test(formData.phone.trim().replace(/\s+/g, ''))) {
      newErrors.phone = 'Please provide a valid contact number.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us a bit about your project or objectives.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters describing your needs.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      setIsSuccess(true);
      setFormData({
        name: '',
        business: '',
        email: '',
        phone: '',
        serviceType: 'New Website',
        message: '',
      });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppHref = () => {
    const text = encodeURIComponent(
      `Hello ${siteConfig.brandName},\n\nI would like to start a project.\nName: ${formData.name || '-'}\nBusiness: ${formData.business || '-'}\nService: ${formData.serviceType}\nMessage: ${formData.message || '-'}`
    );
    return `https://wa.me/${siteConfig.whatsappNumberRaw}?text=${text}`;
  };

  return (
    <div className="relative rounded-lg border border-studio-750 bg-card-gradient p-8 sm:p-12 shadow-2xl">
      {isSuccess ? (
        <div className="py-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-300 mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-studio-50">
            Enquiry Received
          </h3>
          <p className="mt-4 text-base text-studio-300 font-light max-w-md">
            Thanks. Your project enquiry has been received. We'll get back to you soon.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => setIsSuccess(false)}
              variant="secondary"
              size="md"
            >
              Send Another Message
            </Button>
            <Button
              href={generateWhatsAppHref()}
              variant="champagne"
              size="md"
              target="_blank"
            >
              <span>Connect on WhatsApp</span>
              <MessageSquare className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono uppercase tracking-wider text-studio-300 mb-2"
              >
                Your Name <span className="text-champagne-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Eleanor Vance"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full px-4 py-3.5 bg-studio-900/90 border border-studio-700 rounded-sm text-studio-100 placeholder-studio-600 text-sm focus:border-champagne-500/60 focus:bg-studio-900 transition-colors"
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="business"
                className="block text-xs font-mono uppercase tracking-wider text-studio-300 mb-2"
              >
                Business / Brand <span className="text-champagne-400">*</span>
              </label>
              <input
                id="business"
                name="business"
                type="text"
                value={formData.business}
                onChange={handleChange}
                placeholder="e.g. Vance Architecture"
                aria-invalid={!!errors.business}
                aria-describedby={errors.business ? 'business-error' : undefined}
                className="w-full px-4 py-3.5 bg-studio-900/90 border border-studio-700 rounded-sm text-studio-100 placeholder-studio-600 text-sm focus:border-champagne-500/60 focus:bg-studio-900 transition-colors"
              />
              {errors.business && (
                <p id="business-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.business}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-studio-300 mb-2"
              >
                Email Address <span className="text-champagne-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. contact@vance-arch.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="w-full px-4 py-3.5 bg-studio-900/90 border border-studio-700 rounded-sm text-studio-100 placeholder-studio-600 text-sm focus:border-champagne-500/60 focus:bg-studio-900 transition-colors"
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-mono uppercase tracking-wider text-studio-300 mb-2"
              >
                Phone Number <span className="text-champagne-400">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className="w-full px-4 py-3.5 bg-studio-900/90 border border-studio-700 rounded-sm text-studio-100 placeholder-studio-600 text-sm focus:border-champagne-500/60 focus:bg-studio-900 transition-colors"
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="serviceType"
              className="block text-xs font-mono uppercase tracking-wider text-studio-300 mb-2"
            >
              What do you need?
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-studio-900 border border-studio-700 rounded-sm text-studio-100 text-sm focus:border-champagne-500/60 focus:bg-studio-900 transition-colors cursor-pointer"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-studio-900 text-studio-100 py-2">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-mono uppercase tracking-wider text-studio-300 mb-2"
            >
              Project Details & Objectives <span className="text-champagne-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you're building, your timeline, or current challenges..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className="w-full px-4 py-3.5 bg-studio-900/90 border border-studio-700 rounded-sm text-studio-100 placeholder-studio-600 text-sm focus:border-champagne-500/60 focus:bg-studio-900 transition-colors resize-y min-h-[120px]"
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.message}
              </p>
            )}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <>
                  <span>Start a Project</span>
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            <span className="text-xs text-studio-500 font-mono text-center sm:text-right">
              Direct response within 24 business hours.
            </span>
          </div>
        </form>
      )}
    </div>
  );
};
