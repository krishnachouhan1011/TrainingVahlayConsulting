import React, { useState, useEffect } from "react";
import { X, Key, Cpu, ShieldCheck, Check, AlertCircle, RefreshCw } from "lucide-react";
import { getAIConfig, saveAIConfig } from "../../ai/aiService.js";

export default function AISettingsModal({ isOpen, onClose }) {
  const [config, setConfig] = useState(getAIConfig());
  const [testStatus, setTestStatus] = useState(null); // 'testing' | 'success' | 'error'
  const [testMessage, setTestMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setConfig(getAIConfig());
      setTestStatus(null);
      setTestMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    saveAIConfig(config);
    onClose();
  };

  const handleTestConnection = async () => {
    if (!config.apiKey || config.apiKey.trim().length < 5) {
      setTestStatus("error");
      setTestMessage("Please provide a valid API key first.");
      return;
    }

    setTestStatus("testing");
    setTestMessage("Testing API connection...");

    try {
      if (config.provider === "gemini") {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model || "gemini-1.5-flash"}:generateContent?key=${config.apiKey.trim()}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Hello, reply with 'OK'" }] }]
          })
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || `Status: ${res.status}`);
        }
        setTestStatus("success");
        setTestMessage("Gemini API connection successful! Ready for live streaming.");
      } else {
        // OpenAI or compatible
        const res = await fetch("https://api.openai.com/v1/models", {
          headers: { "Authorization": `Bearer ${config.apiKey.trim()}` }
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || `Status: ${res.status}`);
        }
        setTestStatus("success");
        setTestMessage("OpenAI API connection verified!");
      }
    } catch (err) {
      setTestStatus("error");
      setTestMessage(err.message || "Connection failed. Please check key and model.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-600/20 text-red-400 rounded-lg">
              <Cpu size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base">AI Model & API Configuration</h3>
              <p className="text-xs text-gray-400">Configure your LLM provider for live streaming responses</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              AI Provider
            </label>
            <select
              value={config.provider}
              onChange={(e) => {
                const prov = e.target.value;
                setConfig({
                  ...config,
                  provider: prov,
                  model: prov === "gemini" ? "gemini-1.5-flash" : "gpt-4o-mini"
                });
              }}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition"
            >
              <option value="gemini">Google Gemini (Recommended — Gemini 1.5/2.0 Flash)</option>
              <option value="openai">OpenAI (GPT-4o-mini / GPT-4o)</option>
              <option value="groq">Groq (Llama 3)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Model Name
            </label>
            <input
              type="text"
              value={config.model}
              onChange={(e) => setConfig({ ...config, model: e.target.value })}
              placeholder={config.provider === "gemini" ? "gemini-1.5-flash" : "gpt-4o-mini"}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>API Key</span>
              <span className="text-[11px] font-normal text-gray-500 lowercase">
                {config.provider === "gemini" ? "Google AI Studio Key" : "OpenAI API Key"}
              </span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                placeholder="AIzaSy... or sk-..."
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition font-mono"
              />
              <Key size={16} className="absolute left-3.5 top-3 text-gray-400" />
            </div>
            <p className="text-[11px] text-gray-500 mt-1.5">
              Keys are stored securely in your browser session and used strictly for grounding queries.
            </p>
          </div>

          {/* Test Status Feedback */}
          {testStatus && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${testStatus === "testing" ? "bg-blue-50 text-blue-700 border-blue-200" :
                testStatus === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                  "bg-red-50 text-red-700 border-red-200"
              }`}>
              {testStatus === "testing" && <RefreshCw size={14} className="animate-spin text-blue-600" />}
              {testStatus === "success" && <Check size={14} className="text-emerald-600 font-bold" />}
              {testStatus === "error" && <AlertCircle size={14} className="text-red-600 font-bold" />}
              <span className="flex-1 font-medium">{testMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testStatus === "testing"}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck size={14} />
              <span>Test Connection</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm transition cursor-pointer"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
