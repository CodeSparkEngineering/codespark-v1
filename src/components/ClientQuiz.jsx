import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ClientQuiz = () => {
    const { t, i18n } = useTranslation();

    // Memoize questions to prevent infinite loops due to new array references
    const questions = React.useMemo(() => {
        return t('quiz.questions', { returnObjects: true });
    }, [t, i18n.language]);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [history, setHistory] = useState([
        { type: 'ai', text: t('quiz.welcome') }
    ]);
    const [showBooking, setShowBooking] = useState(false);
    const [bookingData, setBookingData] = useState({ name: '', email: '', whatsapp: '', message: '' });
    const [isTyping, setIsTyping] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const chatContainerRef = useRef(null);

    const generateMarketAnalysis = () => {
        const stageIdx = answers[1];
        const challengeIdx = answers[2];
        const budgetIdx = answers[4];
        const interestIdx = answers[5];

        let analysis = [];

        // Stage-based analysis
        analysis.push({ type: 'heading', text: t('quiz.analysis.heading') });

        if (stageIdx === 0) { // Startup
            analysis.push({ type: 'bold', text: t('quiz.analysis.stage.startup.bold') });
            analysis.push({ type: 'text', text: t('quiz.analysis.stage.startup.opportunity') });
            analysis.push({ type: 'text', text: t('quiz.analysis.stage.startup.focus') });
        } else if (stageIdx === 1) { // Growing
            analysis.push({ type: 'bold', text: t('quiz.analysis.stage.growing.bold') });
            analysis.push({ type: 'text', text: t('quiz.analysis.stage.growing.opportunity') });
            analysis.push({ type: 'text', text: t('quiz.analysis.stage.growing.focus') });
        } else if (stageIdx === 2) { // Established
            analysis.push({ type: 'bold', text: t('quiz.analysis.stage.established.bold') });
            analysis.push({ type: 'text', text: t('quiz.analysis.stage.established.opportunity') });
            analysis.push({ type: 'text', text: t('quiz.analysis.stage.established.focus') });
        } else if (stageIdx === 3) { // Enterprise
            analysis.push({ type: 'bold', text: t('quiz.analysis.stage.enterprise.bold') });
            analysis.push({ type: 'text', text: t('quiz.analysis.stage.enterprise.opportunity') });
            analysis.push({ type: 'text', text: t('quiz.analysis.stage.enterprise.focus') });
        }

        // Challenge-based opportunities
        analysis.push({ type: 'subheading', text: t('quiz.analysis.opportunities.heading') });

        if (challengeIdx === 0) { // Automate
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.automate.roi') });
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.automate.wins') });
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.automate.timeline') });
        } else if (challengeIdx === 1) { // Customers
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.customers.impact') });
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.customers.growth') });
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.customers.recommendation') });
        } else if (challengeIdx === 2) { // Data
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.data.decisions') });
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.data.market') });
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.data.solution') });
        } else if (challengeIdx === 3) { // Collaboration
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.collaboration.gains') });
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.collaboration.remote') });
            analysis.push({ type: 'list', text: t('quiz.analysis.opportunities.collaboration.solution') });
        }

        // Budget-based recommendations
        analysis.push({ type: 'subheading', text: t('quiz.analysis.budget.heading') });

        if (budgetIdx === 0) { // < 10k
            analysis.push({ type: 'bold', text: t('quiz.analysis.budget.tier1.phase') });
            analysis.push({ type: 'text', text: t('quiz.analysis.budget.tier1.roi') });
            analysis.push({ type: 'text', text: t('quiz.analysis.budget.tier1.approach') });
        } else if (budgetIdx === 1) { // 10-50k
            analysis.push({ type: 'bold', text: t('quiz.analysis.budget.tier2.phase1') });
            analysis.push({ type: 'bold', text: t('quiz.analysis.budget.tier2.phase2') });
            analysis.push({ type: 'text', text: t('quiz.analysis.budget.tier2.roi') });
        } else if (budgetIdx === 2) { // 50-150k
            analysis.push({ type: 'bold', text: t('quiz.analysis.budget.tier3.solution') });
            analysis.push({ type: 'text', text: t('quiz.analysis.budget.tier3.roi') });
            analysis.push({ type: 'text', text: t('quiz.analysis.budget.tier3.includes') });
        } else { // 150k+
            analysis.push({ type: 'bold', text: t('quiz.analysis.budget.tier4.package') });
            analysis.push({ type: 'text', text: t('quiz.analysis.budget.tier4.roi') });
            analysis.push({ type: 'text', text: t('quiz.analysis.budget.tier4.includes') });
        }

        // Technology-specific insights
        analysis.push({ type: 'subheading', text: t('quiz.analysis.tech.heading') });

        if (interestIdx === 0) { // AI
            analysis.push({ type: 'bold', text: t('quiz.analysis.tech.ai.market') });
            analysis.push({ type: 'text', text: t('quiz.analysis.tech.ai.cases') });
            analysis.push({ type: 'text', text: t('quiz.analysis.tech.ai.timeline') });
        } else if (interestIdx === 1) { // Cloud
            analysis.push({ type: 'bold', text: t('quiz.analysis.tech.cloud.market') });
            analysis.push({ type: 'text', text: t('quiz.analysis.tech.cloud.benefits') });
            analysis.push({ type: 'text', text: t('quiz.analysis.tech.cloud.timeline') });
        } else if (interestIdx === 2) { // Web/Mobile
            analysis.push({ type: 'bold', text: t('quiz.analysis.tech.web.mobile') });
            analysis.push({ type: 'text', text: t('quiz.analysis.tech.web.pwa') });
            analysis.push({ type: 'text', text: t('quiz.analysis.tech.web.timeline') });
        } else if (interestIdx === 3) { // Data
            analysis.push({ type: 'bold', text: t('quiz.analysis.tech.data.roi') });
            analysis.push({ type: 'text', text: t('quiz.analysis.tech.data.insights') });
            analysis.push({ type: 'text', text: t('quiz.analysis.tech.data.implementation') });
        }

        analysis.push({ type: 'subheading', text: t('quiz.analysis.nextSteps.heading') });
        analysis.push({ type: 'list', text: t('quiz.analysis.nextSteps.consultation') });
        analysis.push({ type: 'list', text: t('quiz.analysis.nextSteps.proposal') });
        analysis.push({ type: 'list', text: t('quiz.analysis.nextSteps.poc') });
        analysis.push({ type: 'bold', text: t('quiz.analysis.nextSteps.cta') });

        return analysis;
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, isTyping, showBooking, formSubmitted]);

    useEffect(() => {
        if (questions && currentQuestion < questions.length) {
            // Prevent adding the same question multiple times
            const lastMsg = history[history.length - 1];
            const nextQuestionText = questions[currentQuestion].text;

            // If the last message is already the current question, don't do anything
            if (lastMsg && lastMsg.type === 'ai' && lastMsg.text === nextQuestionText) {
                return;
            }

            setIsTyping(true);
            const timer = setTimeout(() => {
                setIsTyping(false);
                setHistory(prev => {
                    // Double check inside the setter to be absolutely sure
                    const last = prev[prev.length - 1];
                    if (last && last.type === 'ai' && last.text === nextQuestionText) {
                        return prev;
                    }
                    return [...prev, { type: 'ai', text: nextQuestionText }];
                });
            }, 1000);
            return () => clearTimeout(timer);
        } else if (questions && currentQuestion === questions.length && Object.keys(answers).length === questions.length) {
            // All questions answered, generate analysis
            // Prevent generating analysis multiple times
            const lastMsg = history[history.length - 1];
            if (lastMsg && lastMsg.analysis) return;

            setIsTyping(true);
            const timer = setTimeout(() => {
                setIsTyping(false);
                const analysis = generateMarketAnalysis();
                setHistory(prev => {
                    const last = prev[prev.length - 1];
                    if (last && last.analysis) return prev;
                    return [...prev, { type: 'ai', analysis: analysis }];
                });
                setTimeout(() => {
                    setShowBooking(true);
                }, 1000);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [currentQuestion, answers, questions]);

    const handleOptionClick = (option, index) => {
        setAnswers(prev => ({ ...prev, [currentQuestion + 1]: index }));
        setHistory(prev => [...prev, { type: 'user', text: option }]);
        setCurrentQuestion(prev => prev + 1);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Save to Firestore
            await addDoc(collection(db, "leads"), {
                ...bookingData,
                answers: answers,
                timestamp: serverTimestamp(),
                language: i18n.language
            });

            setFormSubmitted(true);
            setHistory(prev => [...prev, { type: 'ai', text: t('quiz.bookingSuccess') }]);
        } catch (error) {
            console.error("Error adding document: ", error);
            // Optional: Show error message to user
            setHistory(prev => [...prev, { type: 'ai', text: "Error saving your request. Please try again." }]);
        }
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
                <span className="ml-4 text-sm text-gray-400 font-mono">{t('quiz.aiName')}</span>
            </div>

            {/* Chat Area */}
            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-hide">
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
                        <h3 className="text-lg font-bold text-white mb-4">{t('quiz.bookingTitle')}</h3>
                        <form onSubmit={handleFormSubmit} className="space-y-3">
                            <input
                                type="text"
                                placeholder={t('quiz.placeholderName')}
                                required
                                value={bookingData.name}
                                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="email"
                                placeholder={t('quiz.placeholderEmail')}
                                required
                                value={bookingData.email}
                                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="tel"
                                placeholder={t('quiz.placeholderWhatsapp')}
                                required
                                value={bookingData.whatsapp}
                                onChange={(e) => setBookingData({ ...bookingData, whatsapp: e.target.value })}
                                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                            <textarea
                                placeholder={t('quiz.placeholderMessage')}
                                rows="3"
                                value={bookingData.message}
                                onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                            >
                                {t('quiz.bookingSubmit')}
                            </button>
                        </form>
                    </div>
                )}


            </div>

            {/* Options */}
            {questions && currentQuestion < questions.length && !isTyping && (
                <div className="p-4 border-t border-white/10 bg-black/80">
                    <div className="grid grid-cols-1 gap-2">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option, index)}
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
