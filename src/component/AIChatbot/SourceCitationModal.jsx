import React from "react";
import { X, BookOpen, ShieldCheck, ExternalLink, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { KNOWLEDGE_CHUNKS } from "../../ai/knowledgeBaseData";

export default function SourceCitationModal({ isOpen, onClose, citationTitle }) {
  if (!isOpen) return null;

  // Find matching knowledge chunk or fallback
  const matchedChunk = KNOWLEDGE_CHUNKS.find(
    c => c.sourceReference.toLowerCase().includes(citationTitle.toLowerCase()) ||
         citationTitle.toLowerCase().includes(c.title.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-100 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-500/30">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Verified Training Source</h3>
                <p className="text-xs text-gray-300">Grounded evidence cited by Vahlay AI Trainer</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700/60 transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 bg-red-50 text-red-600 rounded-full border border-red-100">
                  {matchedChunk?.day || "Verified Source"}
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-2">
                  {matchedChunk?.title || citationTitle}
                </h4>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 font-medium">
                <ShieldCheck size={16} />
                <span>Verified Curriculum</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-gray-200/80 text-sm leading-relaxed text-slate-800 whitespace-pre-line font-normal">
              {matchedChunk?.content || (
                `Source Citation: ${citationTitle}\n\nThis material is grounded in the Spectrum Business Training Curriculum. Pricing, speeds, and examples are cited as historical trainer illustrations for candidate learning. Official CRM live verification is required before quoting live rates.`
              )}
            </div>

            {matchedChunk?.examples && (
              <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/70">
                <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                  Recorded Training Example:
                </h5>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {matchedChunk.examples}
                </p>
              </div>
            )}

            {matchedChunk?.keyPoints && (
              <div>
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Key Training Takeaways:
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                  {matchedChunk.keyPoints.map((point, idx) => (
                    <li key={idx} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-[11px] text-blue-700 flex items-start gap-2">
              <span className="font-bold">Compliance Note:</span>
              <span>
                Historical trainer audio statements are for training reference and do not constitute an official carrier rate card or binding policy. Always check the active CRM rate card.
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Source file: <span className="font-medium text-slate-700">Spectrum_Candidate_Chatbot_Knowledge_Base.md</span>
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              Done Reading
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
