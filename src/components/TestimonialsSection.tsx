import React from 'react';
import { Star, MessageSquareQuote, ShieldCheck } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
            <Star className="w-3 h-3 text-white/60 fill-white/60" />
            <span>ENDORSEMENTS & CLIENT TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial font-light italic text-white/95 tracking-tight">
            Client Perspectives & Statements
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light">
            Verified feedback from clients and technical teams who trusted me with their mission-critical products.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <div
              key={test.id}
              className="bg-[#0E0E0E] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-white/30 transition-colors"
            >
              <div className="space-y-4">
                {/* Rating Stars & Project Reference */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-white/80">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-white text-white" />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 bg-white/[0.03] text-white/60 border border-white/10">
                    {test.projectTitle}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="font-editorial text-base sm:text-lg text-white/90 italic leading-relaxed">
                  "{test.text}"
                </p>
              </div>

              {/* Client Profile Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-9 h-9 object-cover border border-white/20 filter grayscale"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-medium uppercase tracking-tight text-white truncate">
                    {test.name}
                  </h4>
                  <p className="text-[10px] font-mono text-white/40 truncate">
                    {test.role}, <span className="text-white/60">{test.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
