import React, { useState } from 'react';
import { 
  Key, 
  Webhook, 
  Code2, 
  Cpu, 
  Plus, 
  Copy, 
  Trash2, 
  Check, 
  RefreshCw, 
  Send, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function DeveloperCentre({ addLog }) {
  // State for API Keys
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production Main API Key', token: 'entraiot_live_a89f...2d81', created: '2026-05-10', status: 'Active', scope: 'Read/Write' },
    { id: 2, name: 'Staging Integration Token', token: 'entraiot_test_392a...98bf', created: '2026-06-01', status: 'Active', scope: 'Read-Only' }
  ]);
  
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyScope, setNewKeyScope] = useState('Read/Write');
  const [newKeyExpiry, setNewKeyExpiry] = useState('30');
  const [generatedKey, setGeneratedKey] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  // State for Webhooks
  const [webhookUrl, setWebhookUrl] = useState('https://api.mycompany.com/entraiot-receiver');
  const [subscribedEvents, setSubscribedEvents] = useState({
    'iot.telemetry.alert': true,
    'client.created': false,
    'security.breach': true
  });
  const [isPinging, setIsPinging] = useState(false);
  const [webhookLogs, setWebhookLogs] = useState([
    { id: 1, event: 'iot.telemetry.alert', status: 200, time: '16:11:42', latency: '48ms', result: 'Success' },
    { id: 2, event: 'security.breach', status: 500, time: '12:04:15', latency: '210ms', result: 'Internal Error' }
  ]);

  // Code Snippet Selection State
  const [activeSnippetTab, setActiveSnippetTab] = useState('node');

  // Quota Metrics
  const rateLimitPercent = 48.2;
  const requestsPerMinute = 142;
  const rpmPercent = (requestsPerMinute / 600) * 100;

  // Generate Key Handler
  const handleCreateKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const randomHex = Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('');
    const fullToken = `entraiot_${newKeyExpiry === 'never' ? 'prod' : 'temp'}_${randomHex.substring(0, 24)}`;
    
    const newKey = {
      id: Date.now(),
      name: newKeyName,
      token: `${fullToken.substring(0, 14)}...${fullToken.substring(fullToken.length - 4)}`,
      created: new Date().toISOString().split('T')[0],
      status: 'Active',
      scope: newKeyScope
    };

    setApiKeys(prev => [newKey, ...prev]);
    setGeneratedKey(fullToken);
    setNewKeyName('');
    addLog('Developer', `Generated new API key: "${newKey.name}"`, 'success');
  };

  // Revoke Key Handler
  const handleRevokeKey = (id, name) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
    addLog('Developer', `Revoked API key: "${name}"`, 'warning');
  };

  // Copy Clipboard Handler
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Webhook Event Checkbox Toggle
  const toggleEvent = (key) => {
    setSubscribedEvents(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Webhook Test Connection (Ping)
  const handlePingWebhook = () => {
    if (isPinging) return;
    setIsPinging(true);
    addLog('Webhooks', 'Triggered test ping to endpoint...', 'info');

    setTimeout(() => {
      const isSuccess = Math.random() > 0.15;
      const status = isSuccess ? 200 : 504;
      const latency = Math.floor(Math.random() * 120) + 30;
      
      const newLog = {
        id: Date.now(),
        event: 'webhook.ping_test',
        status,
        time: new Date().toLocaleTimeString(),
        latency: `${latency}ms`,
        result: isSuccess ? 'Success' : 'Gateway Timeout'
      };

      setWebhookLogs(prev => [newLog, ...prev]);
      setIsPinging(false);
      addLog('Webhooks', `Webhook ping response: status ${status} (${latency}ms)`, isSuccess ? 'success' : 'error');
    }, 1500);
  };

  // Code snippets data
  const codeSnippets = {
    node: `const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://api.entraiot.com/v1/iot/telemetry',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  data: {
    deviceId: 'device_sensor_091',
    metrics: {
      temperature: 24.8,
      humidity: 58.2,
      vibration: 0.04
    }
  }
};

axios.request(options).then(function (response) {
  console.log('Telemetry Packet Sent:', response.data);
}).catch(function (error) {
  console.error(error);
});`,
    python: `import requests

url = "https://api.entraiot.com/v1/iot/telemetry"

payload = {
    "deviceId": "device_sensor_091",
    "metrics": {
        "temperature": 24.8,
        "humidity": 58.2,
        "vibration": 0.04
    }
}

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}

response = requests.request("POST", url, json=payload, headers=headers)
print("Telemetry Response:", response.json())`,
    go: `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {
	url := "https://api.entraiot.com/v1/iot/telemetry"
	payload := strings.NewReader(\`{
		"deviceId": "device_sensor_091",
		"metrics": {
			"temperature": 24.8,
			"humidity": 58.2,
			"vibration": 0.04
		}
	}\`)

	req, _ := http.NewRequest("POST", url, payload)
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", "Bearer YOUR_API_KEY")

	res, _ := http.DefaultClient.Do(req)
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(string(body))
}`,
    curl: `curl --request POST \\
  --url https://api.entraiot.com/v1/iot/telemetry \\
  --header 'Authorization: Bearer YOUR_API_KEY' \\
  --header 'Content-Type: application/json' \\
  --data '{
	"deviceId": "device_sensor_091",
	"metrics": {
		"temperature": 24.8,
		"humidity": 58.2,
		"vibration": 0.04
	}
}'`
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white m-0">Developer Integration Centre</h1>
          <p className="text-gray-400 text-sm mt-1">Configure your API credentials, set up webhook events, and view developer telemetry metrics.</p>
        </div>
      </div>

      {/* New Header Card matching Screenshot layout */}
      <div className="bg-[#080d1a]/60 border border-gray-850 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">5. API Integration & Audits</h2>
          <p className="text-gray-400 text-xs mt-2 leading-relaxed">
            Generate and review corporate API credentials, active token configurations, and live webhook settings. Select a resource below to manage integration parameters.
          </p>
        </div>

        {/* Inline Fields Design from Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-800/80 bg-gray-950/40 rounded-full px-6 py-3.5 flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold">Current Period</span>
            <span className="text-xs font-bold text-white font-mono">June 2026</span>
          </div>
          <div className="border border-gray-800/80 bg-gray-950/40 rounded-full px-6 py-3.5 flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold">Operational Metrics</span>
            <span className="text-xs font-bold text-brand-emerald font-mono">Audited & Locked</span>
          </div>
        </div>
      </div>

      {/* Grid Cards below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Daily Quota Card */}
        <div className="bg-[#080d1a]/50 border border-gray-800/60 rounded-2xl p-5 hover:border-gray-700/80 transition-all flex flex-col justify-between group">
          <div className="flex justify-between items-center text-xs text-brand-cyan font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400">Daily Quota</span>
            <Cpu className="w-4 h-4 text-brand-cyan group-hover:rotate-12 transition-transform" />
          </div>
          <div className="mt-4">
            <h3 className="text-white text-sm font-bold">Daily API Call Quota</h3>
            <p className="text-gray-400 text-[10px] mt-1 font-mono">4,821 / 10,000 requests used today (48.2%)</p>
            <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden mt-3">
              <div className="bg-gradient-to-r from-brand-cyan to-brand-purple h-full rounded-full" style={{ width: `${rateLimitPercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Current Traffic Card */}
        <div className="bg-[#080d1a]/50 border border-gray-800/60 rounded-2xl p-5 hover:border-gray-700/80 transition-all flex flex-col justify-between group">
          <div className="flex justify-between items-center text-xs text-brand-emerald font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400">Traffic Rate</span>
            <RefreshCw className="w-4 h-4 text-brand-emerald group-hover:animate-spin transition-transform" />
          </div>
          <div className="mt-4">
            <h3 className="text-white text-sm font-bold">Current Traffic Rate</h3>
            <p className="text-gray-400 text-[10px] mt-1 font-mono">142 / 600 requests per minute</p>
            <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden mt-3">
              <div className="bg-gradient-to-r from-brand-emerald to-brand-cyan h-full rounded-full" style={{ width: `${rpmPercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Security Shield Card */}
        <div className="bg-[#080d1a]/50 border border-gray-800/60 rounded-2xl p-5 hover:border-gray-700/80 transition-all flex flex-col justify-between group">
          <div className="flex justify-between items-center text-xs text-brand-rose font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400">Credentials Status</span>
            <ShieldCheck className="w-4 h-4 text-brand-rose group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-4">
            <h3 className="text-white text-sm font-bold">MFA & Whitelist Shield</h3>
            <p className="text-gray-400 text-[10px] mt-1">MFA & IP Whitelists are fully configured and secure.</p>
            <div className="flex items-center gap-2 mt-3 text-[10px] text-brand-emerald font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald animate-ping"></span>
              SSL Enforced
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: API Credentials & Webhook Subscriptions */}
        <div className="lg:col-span-7 space-y-6">
          {/* API Keys Panel */}
          <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-900 pb-3">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
                <Key size={16} className="text-brand-cyan" /> Access Authentication Keys
              </h2>
            </div>

            {/* Generated Key Alert Display */}
            {generatedKey && (
              <div className="bg-brand-emerald/5 border border-brand-emerald/20 p-4 rounded-xl space-y-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-brand-emerald">API Key Generated Successfully</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Please copy this secret key now. For your security, we won't show it again.</p>
                  </div>
                  <button 
                    onClick={() => setGeneratedKey(null)}
                    className="text-[10px] font-semibold text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
                <div className="bg-gray-900 p-2.5 rounded-lg border border-gray-850 flex items-center justify-between gap-3">
                  <code className="text-xs font-mono text-gray-200 break-all select-all">{generatedKey}</code>
                  <button 
                    onClick={() => handleCopyToClipboard(generatedKey)}
                    className="p-1.5 rounded bg-gray-950 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                  >
                    {isCopied ? <Check size={14} className="text-brand-emerald" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            )}

            {/* API Keys Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-900 text-[10px] text-gray-500 font-mono uppercase">
                    <th className="py-2.5">Name</th>
                    <th className="py-2.5">Token Preview</th>
                    <th className="py-2.5">Scope</th>
                    <th className="py-2.5">Created</th>
                    <th className="py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900 text-xs">
                  {apiKeys.map(key => (
                    <tr key={key.id} className="text-gray-300 hover:bg-gray-900/10">
                      <td className="py-3 font-semibold text-white">{key.name}</td>
                      <td className="py-3 font-mono text-[11px] text-gray-400">{key.token}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-900 border border-gray-800 text-brand-cyan">
                          {key.scope}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500">{key.created}</td>
                      <td className="py-3 text-right">
                        <button 
                          onClick={() => handleRevokeKey(key.id, key.name)}
                          className="p-1 rounded text-gray-500 hover:text-brand-rose hover:bg-brand-rose/10 transition-all"
                          title="Revoke Token"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {apiKeys.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-4 text-center text-gray-500">No active keys. Create a new token below.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Add New Key Inline Form */}
            <form onSubmit={handleCreateKey} className="pt-3 border-t border-gray-900 flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input 
                  type="text" 
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. Test Sensor Key"
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  value={newKeyScope}
                  onChange={(e) => setNewKeyScope(e.target.value)}
                  className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none"
                >
                  <option value="Read/Write">Read/Write</option>
                  <option value="Read-Only">Read-Only</option>
                  <option value="Admin Access">Admin Access</option>
                </select>
                <select 
                  value={newKeyExpiry}
                  onChange={(e) => setNewKeyExpiry(e.target.value)}
                  className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none"
                >
                  <option value="30">30 Days Expiry</option>
                  <option value="90">90 Days Expiry</option>
                  <option value="never">Never Expires</option>
                </select>
                <button 
                  type="submit" 
                  className="bg-brand-cyan hover:bg-brand-cyan/80 text-gray-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus size={14} /> Create
                </button>
              </div>
            </form>
          </div>

          {/* Webhooks Section */}
          <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-900 pb-3">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
                <Webhook size={16} className="text-brand-purple" /> Webhook Subscriptions
              </h2>
            </div>

            <div className="space-y-4">
              {/* Destination Endpoint Input */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">Destination URL Endpoint</label>
                <div className="flex gap-2">
                  <input 
                    type="url" 
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://api.yourdomain.com/webhook"
                    className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple"
                  />
                  <button 
                    onClick={handlePingWebhook}
                    disabled={isPinging}
                    className="bg-gray-900 border border-gray-800 text-gray-300 hover:border-brand-purple hover:text-white px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isPinging ? <RefreshCw size={12} className="animate-spin text-brand-purple" /> : <Send size={12} />}
                    {isPinging ? 'Pinging...' : 'Test Connection'}
                  </button>
                </div>
              </div>

              {/* Event Subscriptions Checkbox */}
              <div>
                <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">Subscribed Events</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1.5">
                  {Object.keys(subscribedEvents).map(eventKey => (
                    <button
                      key={eventKey}
                      onClick={() => toggleEvent(eventKey)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all ${
                        subscribedEvents[eventKey] 
                          ? 'bg-brand-purple/5 border-brand-purple/20 text-brand-purple font-medium' 
                          : 'bg-gray-900/10 border-gray-800/60 text-gray-400 hover:border-gray-700/80 hover:bg-gray-900/40'
                      }`}
                    >
                      <span className="text-[11px] font-mono">{eventKey}</span>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        subscribedEvents[eventKey] ? 'border-brand-purple bg-brand-purple text-gray-950' : 'border-gray-600 bg-transparent'
                      }`}>
                        {subscribedEvents[eventKey] && <Check size={10} strokeWidth={3} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Webhook Delivery Logs Table */}
              <div className="pt-2">
                <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold block mb-1.5">Recent Deliveries Log</label>
                <div className="overflow-x-auto bg-gray-900/20 border border-gray-900 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-900 text-[9px] text-gray-500 font-mono uppercase">
                        <th className="py-2 px-3">Event Type</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Time</th>
                        <th className="py-2">Latency</th>
                        <th className="py-2 px-3 text-right">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-900 text-[11px]">
                      {webhookLogs.map(log => (
                        <tr key={log.id} className="text-gray-400 hover:bg-gray-900/30">
                          <td className="py-2.5 px-3 font-mono text-[10px] text-gray-200">{log.event}</td>
                          <td className="py-2.5">
                            <span className={`px-1.5 py-0.5 rounded font-mono text-[9px] font-bold ${
                              log.status === 200 ? 'bg-brand-emerald/10 text-brand-emerald' : 'bg-brand-rose/10 text-brand-rose'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-gray-500 font-mono">{log.time}</td>
                          <td className="py-2.5 font-mono text-[10px]">{log.latency}</td>
                          <td className="py-2.5 px-3 text-right text-gray-300">{log.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Snippet Integrations */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-900 pb-3">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
                  <Code2 size={16} className="text-brand-purple" /> SDK Integration Snippets
                </h2>
              </div>

              <p className="text-[11px] text-gray-400">
                Use the following quick start boilerplates to start transmitting telemetry sensor packets to the Entraiot core cloud.
              </p>

              {/* Language Selection Tabs */}
              <div className="flex border-b border-gray-900">
                {['node', 'python', 'go', 'curl'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSnippetTab(tab)}
                    className={`px-3.5 py-2 text-xs font-mono capitalize transition-all border-b-2 ${
                      activeSnippetTab === tab 
                        ? 'border-brand-purple text-white font-medium bg-brand-purple/5' 
                        : 'border-transparent text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {tab === 'node' ? 'Node.js' : tab}
                  </button>
                ))}
              </div>

              {/* Fenced Code Snippet */}
              <div className="relative group bg-gray-900/80 border border-gray-950 p-4 rounded-xl">
                <button
                  onClick={() => handleCopyToClipboard(codeSnippets[activeSnippetTab])}
                  className="absolute right-3 top-3 p-1.5 rounded bg-gray-950/80 hover:bg-gray-800 text-gray-400 hover:text-white transition-all opacity-80 hover:opacity-100 border border-gray-850"
                  title="Copy snippet"
                >
                  {isCopied ? <Check size={12} className="text-brand-emerald" /> : <Copy size={12} />}
                </button>
                <pre className="text-[10px] font-mono text-gray-300 overflow-x-auto max-h-[300px] leading-relaxed custom-scrollbar whitespace-pre">
                  <code>{codeSnippets[activeSnippetTab]}</code>
                </pre>
              </div>
            </div>

            <div className="text-[10px] text-gray-500 pt-3 border-t border-gray-900/60 flex items-center justify-between">
              <span className="flex items-center gap-1">
                Read full integration guide <ExternalLink size={10} />
              </span>
              <span className="font-mono text-brand-purple">v1.4 Endpoints</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
