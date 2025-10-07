import { Check, X, Zap, Crown, Sparkles, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricingSection() {
  const plans = [
    {
      name: 'Free',
      tagline: 'Try Before You Commit',
      icon: Sparkles,
      price: '₦0',
      description: 'Get started and explore our learning materials.',
      features: [
        { text: 'Access to learning materials', included: true },
        { text: 'Community forum access', included: true },
        { text: 'Weekly group webinars', included: true },
        { text: 'Work on small projects', included: true },
        { text: 'Real-world projects', included: false },
        { text: '1-on-1 mentorship', included: false },
        { text: 'Resume & portfolio support', included: false },
        { text: 'Job placement assistance', included: false },
        { text: 'Industry certificate', included: false }
      ],
      highlighted: false,
      color: 'gray',
      cta: 'Start Free',
      link: "/techlaunchng/internships"
    },
    {
      name: 'Premium',
      tagline: 'Unlock Everything',
      icon: Crown,
      price: '₦5,000',
      period: 'one-time payment',
      description: 'Full access to program, projects, mentorship, and career support.',
      features: [
        { text: 'Everything in Free, plus:', included: true, bold: true },
        { text: 'Full 12-week intensive program', included: true },
        { text: '3–5 real-world projects', included: true },
        { text: 'Weekly 1-on-1 mentorship', included: true },
        { text: 'Priority code reviews', included: true },
        { text: 'Resume & portfolio workshops', included: true },
        { text: 'Mock interview preparation', included: true },
        { text: 'Direct company introductions', included: true },
        { text: 'Industry-recognized certificate', included: true },
        { text: 'Lifetime alumni network access', included: true },
        { text: 'Job placement support', included: true, highlight: true },
        { text: 'Certificate of completion', included: true, highlight: true }
      ],
      highlighted: true,
      color: 'gray',
      cta: 'Go Premium',
      link: "/premium",
      badge: 'BEST VALUE'
    }
  ];

  const colorClasses = {
    gray: {
      gradient: 'from-gray-500 to-sky-600',
      bg: 'bg-gray-50',
      text: 'text-gray-600',
      border: 'border-gray-300',
      iconBg: 'bg-gray-100',
      button: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
    },
    purple: {
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-500',
      iconBg: 'bg-purple-100',
      button: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
            <Star className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            One Payment,
            <span className="block bg-gradient-to-r from-sky-600 access via-gray-600 to-sky-600 bg-clip-text text-transparent">
              Lifetime Access
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Try for free or unlock everything with a single payment. No subscriptions. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => {
            const colors = colorClasses[plan.color];
            const Icon = plan.icon;

            return (
              <div
                key={index}
                className={`relative rounded-3xl transition-all duration-300 ${
                  plan.highlighted
                    ? 'transform md:-translate-y-4 shadow-2xl'
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`bg-gradient-to-r ${colors.gradient} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg`}>
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div
                  className={`h-full rounded-3xl border-2 ${
                    plan.highlighted ? colors.border : 'border-gray-200'
                  } bg-white overflow-hidden`}
                >
                  {/* Header */}
                  <div className={`${plan.highlighted ? colors.bg : 'bg-gray-50'} p-8 border-b ${plan.highlighted ? colors.border : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-sm text-gray-500 font-medium">{plan.tagline}</span>
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-6xl font-bold text-gray-900">{plan.price}</span>
                    </div>
                    {plan.period && (
                      <p className="text-sm text-gray-500">{plan.period}</p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          {feature.included ? (
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <X className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                          <span className={`${feature.included ? 'text-gray-700' : 'text-gray-400 line-through'} ${feature.bold ? 'font-semibold' : ''} ${feature.highlight ? 'font-semibold text-green-600' : ''}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link to={plan.link}
                      className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${colors.button} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-10 border-2 border-purple-200">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-sky-500/10 to-sky-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Promise to You
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Complete the program, put in the work, and you’ll have the skills, portfolio, 
              and connections to land a tech job. We’ll support you until you get interview opportunities.
            </p>
            <div className="inline-flex items-center gap-2 text-purple-600 font-semibold">
              <Check className="w-6 h-6" />
              <span>95% of graduates secure jobs within 6 months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}