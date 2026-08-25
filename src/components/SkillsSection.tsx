import React from 'react';
import { Layout, Server, Cpu, CheckCircle2, Award, Zap, Code2 } from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillCategories }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-4 h-4 text-white/80" />;
      case 'Server':
        return <Server className="w-4 h-4 text-white/80" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-white/80" />;
      default:
        return <Code2 className="w-4 h-4 text-white/80" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
            <Zap className="w-3 h-3 text-orange-400" />
            <span>TECHNICAL CAPABILITIES & PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial font-light italic text-white/95 tracking-tight">
            Architectural Disciplines & Stack
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light">
            Engineered with deep focus on modern web standards, type safety, low latency, and maintainable cloud architectures.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-[#0E0E0E] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-white/30 transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 border border-white/10">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium tracking-tight uppercase text-white">
                        {category.title}
                      </h3>
                      <p className="text-[10px] font-mono text-white/40">
                        Production-tested
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-white/30 tracking-widest">
                    0{idx + 1}
                  </span>
                </div>

                {/* Skills Progress List */}
                <div className="space-y-4 pt-5">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-white/80 text-[11px] uppercase tracking-wider">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-white/[0.03] text-white/50 border border-white/10">
                            {skill.experience}
                          </span>
                          <span className="text-white/40 font-mono text-[10px]">{skill.level}%</span>
                        </div>
                      </div>
                      <div className="w-full h-1 bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-white/90"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Assurance Note */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-white/40 uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-white/60 flex-shrink-0" />
                <span>Clean Architecture & TDD Principles</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
