import { useState, useRef, useEffect } from 'react';

const AIAssistant = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Olá! Sou o assistente da CodeSpark Engineering. Como posso ajudar você hoje?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const suggestedQuestions = [
        "Quais serviços vocês oferecem?",
        "Quanto custa um projeto?",
        "Quanto tempo leva um projeto?",
        "Vocês trabalham com IA?"
    ];

    const knowledgeBase = {
        "serviços|oferece|fazem": {
            response: "Oferecemos desenvolvimento de sistemas escaláveis, integração de IA, arquitetura de cloud (Google Cloud), desenvolvimento web moderno, e consultoria técnica. Nosso foco é entregar soluções de alta performance e qualidade.",
            keywords: ["serviços", "oferece", "fazem", "trabalho"]
        },
        "preço|custo|valor|quanto custa": {
            response: "Os valores variam de acordo com a complexidade e escopo do projeto. Projetos simples começam em R$5.000, enquanto sistemas complexos podem variar de R$20.000 a R$100.000+. Agende uma consulta gratuita para um orçamento personalizado!",
            keywords: ["preço", "custo", "valor", "quanto"]
        },
        "prazo|tempo|demora|duração": {
            response: "O prazo depende do escopo. Projetos simples: 2-4 semanas. Sistemas médios: 1-3 meses. Projetos complexos: 3-6 meses. Trabalhamos com metodologia ágil para entregas incrementais.",
            keywords: ["prazo", "tempo", "demora", "duração"]
        },
        "ia|inteligência artificial|machine learning|ai": {
            response: "Sim! Somos especialistas em IA. Desenvolvemos modelos de Machine Learning, sistemas de recomendação, chatbots inteligentes, análise preditiva, e integração de APIs de IA (OpenAI, Google AI, etc.).",
            keywords: ["ia", "ai", "inteligência", "machine learning"]
        },
        "cloud|nuvem|google cloud|aws": {
            response: "Somos parceiros Google Cloud. Oferecemos migração para cloud, arquitetura serverless, Kubernetes, CI/CD, e otimização de custos. Também trabalhamos com AWS e Azure.",
            keywords: ["cloud", "nuvem", "google", "aws"]
        },
        "web|site|website|aplicativo": {
            response: "Desenvolvemos sites e aplicativos web modernos usando React, Next.js, Node.js, e tecnologias de ponta. Focamos em performance, SEO, e experiência do usuário excepcional.",
            keywords: ["web", "site", "website", "aplicativo"]
        },
        "contato|falar|agendar|consulta": {
            response: "Ótimo! Entre em contato conosco: 📧 codespark.dev@proton.me | 📱 Instagram: @codesparkengineering | 💻 GitHub: CodeSparkEngineering. Ou use o formulário de contato no site!",
            keywords: ["contato", "falar", "agendar", "email"]
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const findResponse = (userInput) => {
        const normalizedInput = userInput.toLowerCase();

        for (const [pattern, data] of Object.entries(knowledgeBase)) {
            const keywords = pattern.split('|');
            if (keywords.some(keyword => normalizedInput.includes(keyword))) {
                return data.response;
            }
        }

        return "Desculpe, não entendi sua pergunta. Tente perguntar sobre nossos serviços, preços, prazos, IA, cloud, ou como entrar em contato!";
    };

    const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const aiResponse = findResponse(input);
            const aiMessage = { id: Date.now() + 1, text: aiResponse, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleSuggestedQuestion = (question) => {
        setInput(question);
        setTimeout(() => handleSend(), 100);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl overflow-hidden border border-neutral-700 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <img src="./ai.png" alt="AI" className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">CodeSpark AI Assistant</h3>
                    <p className="text-blue-100 text-xs">Online • Pronto para ajudar</p>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent"
                style={{ maxHeight: '300px' }}
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-neutral-700 text-gray-100 rounded-bl-none'
                                }`}
                        >
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-neutral-700 text-gray-100 p-3 rounded-2xl rounded-bl-none">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {suggestedQuestions.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => handleSuggestedQuestion(q)}
                            className="text-xs bg-neutral-700 hover:bg-neutral-600 text-gray-300 px-3 py-1.5 rounded-full transition-colors"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="p-4 bg-neutral-800/50 border-t border-neutral-700">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua pergunta..."
                        className="flex-1 bg-neutral-700 text-white px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-colors text-sm"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
