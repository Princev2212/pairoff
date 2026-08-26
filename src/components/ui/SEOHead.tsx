import React, { useEffect } from 'react';
import { siteConfig } from '../../config/siteConfig';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description }) => {
  useEffect(() => {
    // Dynamic Page Title
    const formattedTitle = title
      ? `${title} | ${siteConfig.brandName}`
      : `${siteConfig.brandName} | Digital Experiences`;

    document.title = formattedTitle;

    // Dynamic Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = description || siteConfig.shortDescription;
    if (metaDescription) {
      metaDescription.setAttribute('content', content);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  return null;
};
