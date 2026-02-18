import { useState } from 'react';
import { ChevronDown, Rocket, Briefcase,  GraduationCap, DollarSign, CircleHelp } from 'lucide-react';

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const accordionData = [
  {
    icon: GraduationCap,
    color: 'blue',
    title: 'What Will I Learn?',
    content: 'You’ll gain practical tech skills across software, data, and cloud tools, plus career-ready experience working on 3–5 real projects with tech companies. Graduate with a portfolio that proves you can deliver in the industry.'
  },
  {
    icon: CircleHelp,
    color: 'red',
    title: 'Is the Program Free?',
    content: 'Yes, it’s free to start. You get access to training, projects, and community support at no cost. To unlock premium benefits like 1-on-1 mentorship, advanced resources, and direct guidance from instructors, you can upgrade to the Premium track.'
  },
  {
    icon: DollarSign,
    color: 'green',
    title: 'How Much Can I Earn?',
    content: 'Many top performers secure internships and jobs within 6 months, earning ₦200k–₦500k monthly. The program prepares you with the skills and portfolio companies look for, helping you stand out in Nigeria’s competitive tech market.'
  },
  {
    icon: Briefcase,
    color: 'purple',
    title: 'Will I Get a Job After?',
    content: 'We aren’t just building a community of job hunters; we’re building a network of builders. Our focus is on technical mastery and product ownership. We provide the tools—resume workshops, LinkedIn optimization, and hiring manager intros—but the goal is to make your skills so undeniable that you dont just find a job, you choose your path.'
  },
  {
    icon: Rocket,
    color: 'orange',
    title: 'What Makes This Different?',
    content: 'We don’t train job hunters — we build builders. You work on real products for real companies, operate in sprints, attend standups, receive senior code reviews, and ship features to production. You graduate with real-world experience and a builder’s mindset, not just a polished CV.'
  }
];


  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      iconBg: 'bg-blue-100',
      hoverBorder: 'hover:border-blue-400'
    },
    purple: {
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      iconBg: 'bg-purple-100',
      hoverBorder: 'hover:border-purple-400'
    },
    green: {
      gradient: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      iconBg: 'bg-green-100',
      hoverBorder: 'hover:border-green-400'
    },
    orange: {
      gradient: 'from-orange-500 to-red-500',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600',
      iconBg: 'bg-orange-100',
      hoverBorder: 'hover:border-orange-400'
    },
    pink: {
      gradient: 'from-pink-500 to-rose-500',
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      text: 'text-pink-600',
      iconBg: 'bg-pink-100',
      hoverBorder: 'hover:border-pink-400'
    },
    cyan: {
      gradient: 'from-cyan-500 to-blue-500',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      text: 'text-cyan-600',
      iconBg: 'bg-cyan-100',
      hoverBorder: 'hover:border-cyan-400'
    },
    indigo: {
      gradient: 'from-indigo-500 to-purple-500',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      hoverBorder: 'hover:border-indigo-400'
    },
    red: {
      gradient: 'from-red-500 to-orange-500',
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      iconBg: 'bg-red-100',
      hoverBorder: 'hover:border-red-400'
    }
  };

  return (
    <div className="sm:py-2 py-2 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className='text-center mb-12'> 
           <h2 className="sm:flex flex-wrap justify-center gap-2 text-center font-[500]xl:text-[35px] md:text-[32px] sm:text-[30px] text-[25px] mb-5">
                Why Join 
                <span className="font-extrabold sm:ps-0 ps-1">knownly Internships?</span>
            </h2>
            <p className="m-0 text-center">Unlock your potential and join a network that shapes tech leaders.</p>
        </div>
        {/* Accordion */}
        <div className="space-y-4">
          {accordionData.map((item, index) => {
            const isOpen = openIndex === index;
            const colors = colorClasses[item.color];
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isOpen ? colors.border : 'border-gray-200'
                } ${colors.hoverBorder} shadow-sm hover:shadow-lg`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className={`w-6 h-6 ${isOpen ? colors.text : 'text-gray-400'}`} />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`px-6 pb-6 pt-2 ${colors.bg} border-t ${colors.border}`}>
                    <div className="sm:pl-16">
                      <p className="text-gray-700 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}