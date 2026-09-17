import React, { useState } from 'react';
import {
  X,
  Plus,
  GitCompare,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Building2,
  DollarSign,
  Layers,
} from 'lucide-react';
import { QuoteItem } from '../types';
import { RFQ_COMPARISONS } from '../mockData';

interface CreateQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveQuote: (quote: QuoteItem) => void;
}

export const CreateQuoteModal: React.FC<CreateQuoteModalProps> = ({
  isOpen,
  onClose,
  onSaveQuote,
}) => {
  const [customer, setCustomer] = useState('');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [margin, setMargin] = useState('25%');
  const [revision, setRevision] = useState('Rev A');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !title || !value) return;

    const newQuote: QuoteItem = {
      id: `Q-2026-${Math.floor(900 + Math.random() * 99)}`,
      title,
      customer,
      value: parseFloat(value) || 50000,
      status: 'Submitted',
      date: 'Today',
      margin: margin.includes('%') ? margin : `${margin}%`,
      revision,
    };

    onSaveQuote(newQuote);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setCustomer('');
      setTitle('');
      setValue('');
      onClose();
    }, 900);
  };

  return (
    <div
      id="modal-create-quote"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl w-full max-w-lg border border-[#EAECEF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F2F5] bg-[#FAFAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Create Commercial Quote
              </h3>
              <p className="text-xs text-slate-500">
                Generate new proposal record for client review
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce mb-3" />
            <h4 className="text-base font-bold text-slate-900">
              Quote Published to Market
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Logged in stateless cache with verified markup constraints.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client / Account
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  required
                  type="text"
                  placeholder="e.g. Lockheed Precision, Honeywell Space"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] focus:bg-white focus:border-[#2563EB] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Package / Assembly Title
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Titanium Manifold Flanges Batch #4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] focus:bg-white focus:border-[#2563EB] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Price ($)
                </label>
                <div className="relative">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  <input
                    required
                    type="number"
                    placeholder="95000"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full pl-7 pr-2 py-2 text-xs bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] focus:bg-white focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Markup / Margin
                </label>
                <input
                  type="text"
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] focus:bg-white focus:border-[#2563EB] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Blueprint Rev
                </label>
                <input
                  type="text"
                  value={revision}
                  onChange={(e) => setRevision(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] focus:bg-white focus:border-[#2563EB] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0F2F5] flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition shadow-xs"
              >
                Publish Quote
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface CompareRfqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompareRfqModal: React.FC<CompareRfqModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-compare-rfq"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl border border-[#EAECEF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F2F5] bg-[#FAFAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#E8830C] flex items-center justify-center font-bold">
              <GitCompare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                RFQ Cost &amp; Tolerance Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Variance comparison between CAD estimate and proposed customer bid
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-2">RFQ / Client</th>
                <th className="pb-2">Part Description</th>
                <th className="pb-2 text-right">Internal Cost</th>
                <th className="pb-2 text-right">Bid Price</th>
                <th className="pb-2 text-right">Margin Spread</th>
                <th className="pb-2 text-center">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RFQ_COMPARISONS.map((rfq) => (
                <tr key={rfq.id} className="hover:bg-[#F9FAFB] transition">
                  <td className="py-3 pr-2">
                    <span className="font-bold text-slate-900 block">
                      {rfq.rfqNumber}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {rfq.client}
                    </span>
                  </td>
                  <td className="py-3 pr-2 text-slate-700 max-w-[180px] truncate">
                    {rfq.partDescription}
                  </td>
                  <td className="py-3 pr-2 text-right font-mono text-slate-600">
                    ${rfq.internalEstimate.toLocaleString()}
                  </td>
                  <td className="py-3 pr-2 text-right font-mono font-bold text-slate-900">
                    ${rfq.quotedPrice.toLocaleString()}
                  </td>
                  <td className="py-3 pr-2 text-right font-mono font-bold text-[#E8830C]">
                    {rfq.deltaPercent}
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        rfq.riskScore === 'Low'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {rfq.riskScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-[#F0F2F5] bg-[#FAFAFC] flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            4 active comparison packages analyzed
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface ViewAllDealsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: QuoteItem[];
}

export const ViewAllDealsModal: React.FC<ViewAllDealsModalProps> = ({
  isOpen,
  onClose,
  quotes,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-view-all-deals"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl w-full max-w-3xl border border-[#EAECEF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F2F5] bg-[#FAFAFC]">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Pipeline Deals &amp; Performance Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Active commercial bids submitted across precision manufacturing accounts
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-x-auto max-h-[60vh]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-2">Quote ID</th>
                <th className="pb-2">Package / Customer</th>
                <th className="pb-2">Revision</th>
                <th className="pb-2 text-right">Value</th>
                <th className="pb-2 text-right">Target Margin</th>
                <th className="pb-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-[#F9FAFB] transition">
                  <td className="py-3 pr-2 font-mono font-bold text-slate-800">
                    {q.id}
                  </td>
                  <td className="py-3 pr-2">
                    <span className="font-semibold text-slate-900 block">
                      {q.title}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {q.customer} • {q.date}
                    </span>
                  </td>
                  <td className="py-3 pr-2 text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px]">
                      {q.revision}
                    </span>
                  </td>
                  <td className="py-3 pr-2 text-right font-mono font-bold text-slate-900">
                    ${q.value.toLocaleString()}
                  </td>
                  <td className="py-3 pr-2 text-right font-mono font-semibold text-[#E8830C]">
                    {q.margin}
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        q.status === 'Won'
                          ? 'bg-emerald-50 text-emerald-700'
                          : q.status === 'Submitted'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-[#F0F2F5] bg-[#FAFAFC] flex items-center justify-between text-xs text-slate-500">
          <span>Displaying current active deals ledger</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
