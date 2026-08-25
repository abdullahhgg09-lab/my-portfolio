import React from 'react';
import { Code2, Rocket, Database, Sparkles, CheckCircle2, Clock, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectService }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-4 h-4 text-white/80" />;
      case 'Rocket':
        return <Rocket className="w-4 h-4 text-white/80" />;
      case 'Database':
        return <Database className="w-4 h-4 text-white/80" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-white/80" />;
      default:
        return <Cpu className="w-4 h-4 text-white/80" />;
    }
  };

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Scope',
      description: 'Understanding product vision, user archetypes, business requirements, and architectural roadmap.',
    },
    {
      step: '02',
      title: 'Architecture & UI Prototype',
      description: 'Designing interactive wireframes, schema diagrams, API contracts, and technology stack selection.',
    },
    {
      step: '03',
      title: 'Agile Full-Stack Build',
      description: 'Iterative sprint releases with continuous code reviews, live staging previews, and automated testing.',
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'Zero-downtime production deployment, CI/CD pipeline setup, analytics, and 30-day post-launch support.',
    },
  ];

  return (
    <section id="services" className="py-24 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
            <Rocket className="w-3 h-3 text-white/60" />
            <span>SOLUTIONS & CLIENT SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial font-light italic text-white/95 tracking-tight">
            Capabilities & Engagement Models
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light">
            From initial MVP concept to high-load production systems, delivering reliable software tailored to your timeline.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-[#0E0E0E] border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-white/30 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-white/5 border border-white/10">
                    {getServiceIcon(service.icon)}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/50 px-2.5 py-0.5 bg-white/[0.03] border border-white/10 uppercase">
                    <Clock className="w-3 h-3 text-white/50" />
                    <span>{service.timeline}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">
                    SERVICE / 0{index + 1}
                  </div>
                  <h3 className="text-base font-medium uppercase tracking-tight text-white group-hover:text-white/80 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-1.5 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 block">
                    Scope Deliverables:
                  </span>
                  <div className="space-y-1.5">
                    {service.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-white/70 font-light">
                        <CheckCircle2 className="w-3 h-3 text-white/40 flex-shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-white/40 uppercase">Tailored Scope</span>
                <a
                  href="#contact"
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase text-white hover:text-white/70 transition-colors cursor-pointer"
                >
                  <span>Request Scope</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Process Section */}
        <div className="bg-[#0E0E0E] border border-white/10 p-8 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">METHODOLOGY</div>
            <h3 className="text-xl sm:text-3xl font-editorial font-light italic text-white">
              The 4-Step Delivery Protocol
            </h3>
            <p className="text-xs text-white/50 font-light">
              Clear communication, transparent milestone tracking, and zero surprise delays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-5 bg-white/[0.02] border border-white/10 relative space-y-2"
              >
                <span className="text-2xl font-mono text-white/20 block font-light">
                  {step.step}
                </span>
                <h4 className="text-xs font-medium uppercase tracking-tight text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
