import React, { useState, useEffect, useRef } from 'react';

const ClientQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [history, setHistory] = useState([
        { type: 'ai', text: "Hello! I'm CodeSpark AI Assistant. I'll help you discover the best technology solutions for your business. Let's start with a few questions to understand your needs." }
    ]);
    const [showBooking, setShowBooking] = useState(false);
    const [bookingData, setBookingData] = useState({ name: '', email: '', message: '' });
    const [isTyping, setIsTyping] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const messagesEndRef = useRef(null);

    const questions = [
        {
            id: 1,
            text: "What is your current business stage?",
            options: [
                "Startup (Idea/MVP stage)",
                "Growing Business (Scaling operations)",
                "Established Company (Optimization needed)",
                "Enterprise (Digital transformation)"
            ]
        },
        {
            id: 2,
            text: "What is your primary business challenge?",
            options: [
                "Need to automate manual processes",
                "Want to reach more customers online",
                "Struggling with data management",
                "Need better team collaboration tools"
            ]
        },
        {
            id: 3,
            text: "What's your current monthly revenue range?",
            options: [
                "Pre-revenue or < $5K/month",
                "$5K - $50K/month",
                "$50K - $200K/month",
                "$200K+/month"
            ]
        },
        {
            id: 4,
            text: "What's your technology budget for the next 6 months?",
            options: [
                "< $10,000",
                "$10,000 - $50,000",
                "$50,000 - $150,000",
                "$150,000+"
            ]
        },
        {
            id: 5,
            text: "Which technology solution interests you most?",
            options: [
                "AI & Machine Learning Integration",
                "Cloud Infrastructure & Scalability",
                "Custom Web/Mobile Applications",
                "Data Analytics & Business Intelligence"
            ]
        }
    ];

    const generateMarketAnalysis = () => {
        const stage = answers[1];
        const challenge = answers[2];
        const revenue = answers[3];
        const budget = answers[4];
        const interest = answers[5];

        let analysis = [];

        // Stage-based analysis
        analysis.push({ type: 'heading', text: '📊 Market Analysis & Recommendations' });

        if (stage?.includes("Startup")) {
            analysis.push({ type: 'bold', text: 'Your Stage: Early-stage startup' });
            analysis.push({ type: 'text', text: 'Market Opportunity: The global startup ecosystem is valued at $3.8T. 90% of startups that leverage technology early have 2.5x higher survival rates.' });
            analysis.push({ type: 'text', text: 'Recommended Focus: MVP development, cloud infrastructure, and scalable architecture.' });
        } else if (stage?.includes("Growing")) {
            analysis.push({ type: 'bold', text: 'Your Stage: Growth phase' });
            analysis.push({ type: 'text', text: 'Market Opportunity: Companies in growth phase that invest in automation see 40% reduction in operational costs and 3x faster scaling.' });
            analysis.push({ type: 'text', text: 'Recommended Focus: Process automation, API integrations, and performance optimization.' });
        } else if (stage?.includes("Established")) {
            analysis.push({ type: 'bold', text: 'Your Stage: Established business' });
            analysis.push({ type: 'text', text: 'Market Opportunity: 78% of established companies report that digital optimization increased revenue by 25-40% within 12 months.' });
            analysis.push({ type: 'text', text: 'Recommended Focus: System modernization, AI integration, and data analytics.' });
        } else if (stage?.includes("Enterprise")) {
            analysis.push({ type: 'bold', text: 'Your Stage: Enterprise level' });
            analysis.push({ type: 'text', text: 'Market Opportunity: Digital transformation market is $2.3T and growing 22% annually. Enterprises see average ROI of 300% within 2 years.' });
            analysis.push({ type: 'text', text: 'Recommended Focus: Cloud migration, AI/ML at scale, and enterprise architecture.' });
        }

        // Challenge-based opportunities
        analysis.push({ type: 'subheading', text: '🎯 Specific Opportunities for Your Challenge' });

        if (challenge?.includes("automate")) {
            analysis.push({ type: 'list', text: 'Automation ROI: Companies save $50K-$500K annually through process automation' });
            analysis.push({ type: 'list', text: 'Quick Wins: RPA (Robotic Process Automation) can automate 60-80% of repetitive tasks' });
            analysis.push({ type: 'list', text: 'Timeline: See results in 2-3 months' });
        } else if (challenge?.includes("customers")) {
            analysis.push({ type: 'list', text: 'Digital Marketing Impact: Businesses with strong online presence see 2.8x more leads' });
            analysis.push({ type: 'list', text: 'E-commerce Growth: Online sales growing 15% YoY globally' });
            analysis.push({ type: 'list', text: 'Recommendation: Custom web platform + SEO + analytics' });
        } else if (challenge?.includes("data")) {
            analysis.push({ type: 'list', text: 'Data-Driven Decisions: Companies using analytics are 5x more likely to make faster decisions' });
            analysis.push({ type: 'list', text: 'Market Size: Business Intelligence market is $27B and growing' });
            analysis.push({ type: 'list', text: 'Solution: Cloud data warehouse + BI dashboards + predictive analytics' });
        } else if (challenge?.includes("collaboration")) {
            analysis.push({ type: 'list', text: 'Productivity Gains: Modern collaboration tools increase team productivity by 30%' });
            analysis.push({ type: 'list', text: 'Remote Work: 74% of companies plan to permanently adopt hybrid work' });
            analysis.push({ type: 'list', text: 'Solution: Custom collaboration platform + integrations + mobile apps' });
        }

        // Budget-based recommendations
        analysis.push({ type: 'subheading', text: '💰 Investment Strategy for Your Budget' });

        if (budget?.includes("< $10,000")) {
            analysis.push({ type: 'bold', text: 'Phase 1 (Months 1-3): MVP development, core features, cloud setup' });
            analysis.push({ type: 'text', text: 'Expected ROI: 150-200% within 6 months' });
            analysis.push({ type: 'text', text: 'Best Approach: Agile development with bi-weekly releases' });
        } else if (budget?.includes("$10,000 - $50,000")) {
            analysis.push({ type: 'bold', text: 'Phase 1: Full product development + integrations' });
            analysis.push({ type: 'bold', text: 'Phase 2: Marketing automation + analytics' });
            analysis.push({ type: 'text', text: 'Expected ROI: 250-350% within 12 months' });
        } else if (budget?.includes("$50,000 - $150,000")) {
            analysis.push({ type: 'bold', text: 'Comprehensive Solution: Custom platform + AI features + mobile apps' });
            analysis.push({ type: 'text', text: 'Expected ROI: 400-600% within 18 months' });
            analysis.push({ type: 'text', text: 'Includes: Dedicated team, ongoing support, scalability planning' });
        } else {
            analysis.push({ type: 'bold', text: 'Enterprise Package: Full digital transformation' });
            analysis.push({ type: 'text', text: 'Expected ROI: 500-800% within 24 months' });
            analysis.push({ type: 'text', text: 'Includes: Custom architecture, AI/ML integration, 24/7 support, dedicated team' });
        }

        // Technology-specific insights
        analysis.push({ type: 'subheading', text: '🚀 Technology Recommendation' });

        if (interest?.includes("AI")) {
            analysis.push({ type: 'bold', text: 'AI/ML Market: $190B industry, 38% annual growth' });
            analysis.push({ type: 'text', text: 'Use Cases: Predictive analytics, customer insights, automation, chatbots' });
            analysis.push({ type: 'text', text: 'ROI Timeline: 6-12 months for measurable impact' });
        } else if (interest?.includes("Cloud")) {
            analysis.push({ type: 'bold', text: 'Cloud Market: $500B industry, companies save 30-40% on infrastructure' });
            analysis.push({ type: 'text', text: 'Benefits: 99.9% uptime, infinite scalability, pay-as-you-go' });
            analysis.push({ type: 'text', text: 'Migration Timeline: 2-4 months for full migration' });
        } else if (interest?.includes("Web/Mobile")) {
            analysis.push({ type: 'bold', text: 'Mobile-First: 60% of web traffic is mobile, apps increase engagement 3x' });
            analysis.push({ type: 'text', text: 'PWA Advantage: Progressive Web Apps combine web + mobile benefits' });
            analysis.push({ type: 'text', text: 'Development Timeline: 3-6 months for full-featured app' });
        } else if (interest?.includes("Data Analytics")) {
            analysis.push({ type: 'bold', text: 'Analytics ROI: Data-driven companies are 23x more likely to acquire customers' });
            analysis.push({ type: 'text', text: 'Real-time Insights: Make decisions 5x faster with live dashboards' });
            analysis.push({ type: 'text', text: 'Implementation: 2-3 months for complete BI solution' });
        }

        analysis.push({ type: 'subheading', text: '✅ Next Steps' });
        analysis.push({ type: 'list', text: 'Free Consultation: 30-min strategy call with our tech experts' });
        analysis.push({ type: 'list', text: 'Custom Proposal: Detailed roadmap and pricing for your specific needs' });
        analysis.push({ type: 'list', text: 'Proof of Concept: Optional 2-week trial to validate the solution' });
        analysis.push({ type: 'bold', text: 'Ready to transform your business? Book your free consultation below!' });

        return analysis;
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, isTyping, showBooking, formSubmitted]);

    useEffect(() => {
        if (currentQuestion < questions.length) {
            setIsTyping(true);
            const timer = setTimeout(() => {
                setIsTyping(false);
                setHistory(prev => [...prev, { type: 'ai', text: questions[currentQuestion].text }]);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (currentQuestion === questions.length && Object.keys(answers).length === questions.length) {
            // All questions answered, generate analysis
            setIsTyping(true);
            const timer = setTimeout(() => {
                setIsTyping(false);
                const analysis = generateMarketAnalysis();
                setHistory(prev => [...prev, { type: 'ai', analysis: analysis }]);
                setTimeout(() => {
                    setShowBooking(true);
                }, 1000);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [currentQuestion, answers]);

    const handleOptionClick = (option) => {
        setAnswers(prev => ({ ...prev, [currentQuestion + 1]: option }));
        setHistory(prev => [...prev, { type: 'user', text: option }]);
        setCurrentQuestion(prev => prev + 1);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setHistory(prev => [...prev, { type: 'ai', text: "Excellent! We've received your details. A CodeSpark engineer will contact you shortly via WhatsApp or email." }]);
    };

    const renderMessage = (msg) => {
        if (msg.analysis) {
            return (
                <div className="space-y-2">
                    {msg.analysis.map((item, i) => {
                        if (item.type === 'heading') {
                            return <h2 key={i} className="text-xl font-bold text-white mt-4 mb-2">{item.text}</h2>;
                        } else if (item.type === 'subheading') {
                            return <h3 key={i} className="text-lg font-semibold text-blue-400 mt-3 mb-2">{item.text}</h3>;
                        } else if (item.type === 'bold') {
                            return <p key={i} className="font-bold text-white my-1">{item.text}</p>;
                        } else if (item.type === 'list') {
                            return <li key={i} className="text-gray-300 ml-4 my-1 list-disc">{item.text}</li>;
                        } else if (item.type === 'text') {
                            return <p key={i} className="text-gray-300 my-1">{item.text}</p>;
                        }
                        return null;
                    })}
                </div>
            );
        }
        return <p className="text-sm leading-relaxed">{msg.text}</p>;
    };

    return (
        <div className="w-full max-w-2xl mx-auto h-[600px] bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-sm text-gray-400 font-mono">CodeSpark AI Assistant</span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-hide">
                {history.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm md:text-base ${msg.type === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white/10 text-gray-200 rounded-tl-none'
                            }`}>
                            {renderMessage(msg)}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                )}

                {/* Booking Form */}
                {showBooking && !formSubmitted && (
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                        <h3 className="text-lg font-bold text-white mb-4">Book Your Free Consultation</h3>
                        <form onSubmit={handleFormSubmit} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                value={bookingData.name}
                                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                required
                                value={bookingData.email}
                                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                            <textarea
                                placeholder="Tell us about your project..."
                                rows="3"
                                value={bookingData.message}
                                onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                            >
                                Schedule Consultation
                            </button>
                        </form>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Options */}
            {currentQuestion < questions.length && !isTyping && (
                <div className="p-4 border-t border-white/10 bg-black/80">
                    <div className="grid grid-cols-1 gap-2">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-3 bg-neutral-900/50 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600 rounded text-gray-300 hover:text-white text-sm text-left transition-all font-mono"
                            >
                                <span className="text-green-500 mr-2">›</span>{option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientQuiz;
