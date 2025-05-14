
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getFAQs } from "../utils/movieData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = getFAQs();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">الأسئلة الشائعة</h1>
        
        <Accordion type="single" collapsible className="bg-gray-900 rounded-lg overflow-hidden">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-b border-gray-800">
              <AccordionTrigger className="px-6 py-4 text-right hover:bg-gray-800 transition-all">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-gray-800 text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">هل لديك سؤال آخر؟</h2>
          <p className="text-gray-300 mb-6">لم تجد إجابة على سؤالك؟ يمكنك التواصل معنا مباشرة وسنرد عليك في أقرب وقت ممكن.</p>
          <div className="flex justify-center">
            <a href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              تواصل معنا
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
