import React, { useState } from 'react';
import { 
  Play, 
  Terminal, 
  BookOpen, 
  Plus, 
  Edit3, 
  Power, 
  PowerOff,
  CheckCircle2, 
  XCircle, 
  Send,
  Loader2,
  Trash
} from 'lucide-react';

export default function ApiDevelopment({ apis, setApis, systemStatus, addLog }) {
  const [subTab, setSubTab] = useState('list'); // 'list', 'testing', 'docs'
  const [selectedApiId, setSelectedApiId] = useState(apis[0]?.id || 1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit'
  
  // Test Console States
  const [testingPayload, setTestingPayload] = useState('{\n  "username": "entraiot.admin",\n  "password": "••••••••••••"\n}');
  const [testResponse, setTestResponse] = useState(null);
  const [isRunningTest, setIsRunningTest] = useState(false);

  // Form States
  const [formName, setFormName] = useState('');
  const [formEndpoint, setFormEndpoint] = useState('');
  const [formMethod, setFormMethod] = useState('GET');
  const [formVersion, setFormVersion] = useState('v1.0');
  const [formDesc, setFormDesc] = useState('');
  const [editId, setEditId] = useState(null);

  const activeApi = apis.find(a => a.id === selectedApiId) || apis[0];

  const handleOpenCreate = () => {
    setModalMode('create');
    setFormName('');
    setFormEndpoint('/api/v1/');
    setFormMethod('GET');
    setFormVersion('v1.0');
    setFormDesc('Describe what this endpoint does');
    setShowModal(true);
  };

  const handleOpenEdit = (api) => {
    setModalMode('edit');
    setEditId(api.id);
    setFormName(api.name);
    setFormEndpoint(api.endpoint);
    setFormMethod(api.method);
    setFormVersion(api.version);
    setFormDesc(api.description || '');
    setShowModal(true);
  };

  const handleSaveApi = (e) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newApi = {
        id: Date.now(),
        name: formName,
        endpoint: formEndpoint,
        method: formMethod,
        version: formVersion,
        status: 'Active',
        description: formDesc,
        reqParams: [
          { name: 'Authorization', type: 'String', req: true, desc: 'Bearer JWT token' }
        ],
        mockResponse: { status: 'success', data: { message: `Simulated response for ${formName}` } }
      };
      setApis([...apis, newApi]);
      addLog('API Development', `Created new API endpoint: [${formMethod}] ${formEndpoint}`, 'system');
    } else {
      setApis(apis.map(a => a.id === editId ? { 
        ...a, 
        name: formName, 
        endpoint: formEndpoint, 
        method: formMethod, 
        version: formVersion,
        description: formDesc 
      } : a));
      addLog('API Development', `Updated API endpoint: [${formMethod}] ${formEndpoint}`, 'system');
    }
    setShowModal(false);
  };

  const toggleApiStatus = (id) => {
    setApis(apis.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'Active' ? 'Disabled' : 'Active';
        addLog('API Development', `API status changed to ${nextStatus} for ${a.endpoint}`, 'system');
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const deleteApi = (id) => {
    const apiToDelete = apis.find(a => a.id === id);
    setApis(apis.filter(a => a.id !== id));
    addLog('API Development', `Deleted API endpoint: ${apiToDelete?.endpoint}`, 'warning');
    if (selectedApiId === id) {
      setSelectedApiId(apis[0]?.id);
    }
  };

  const runApiTest = () => {
    if (activeApi.status === 'Disabled') {
      setTestResponse({
        error: true,
        status: 503,
        statusText: 'Service Unavailable',
        responseTime: '2ms',
        body: {
          error: 'API_DISABLED',
          message: 'The requested API endpoint is currently disabled in the backend console.'
        }
      });
      addLog('API Testing', `Test failed for [${activeApi.method}] ${activeApi.endpoint} (Disabled)`, 'error');
      return;
    }

    setIsRunningTest(true);
    setTestResponse(null);

    setTimeout(() => {
      setIsRunningTest(false);
      const isSuccess = Math.random() > 0.05; // 95% success rate
      const resTime = Math.floor(Math.random() * 80) + 40;

      if (isSuccess) {
        setTestResponse({
          error: false,
          status: 200,
          statusText: 'OK',
          responseTime: `${resTime}ms`,
          body: activeApi.mockResponse || { status: 'success', timestamp: new Date().toISOString() }
        });
        addLog('API Testing', `Test PASSED for [${activeApi.method}] ${activeApi.endpoint} in ${resTime}ms`, 'info');
      } else {
        setTestResponse({
          error: true,
          status: 500,
          statusText: 'Internal Server Error',
          responseTime: `${resTime}ms`,
          body: {
            error: 'DB_CONNECTION_TIMEOUT',
            message: 'Database connection failed to resolve within timeout limits.'
          }
        });
        addLog('API Testing', `Test FAILED for [${activeApi.method}] ${activeApi.endpoint} with status 500`, 'error');
      }
    }, 1200);
  };

  const getMethodBadgeClass = (method) => {
    switch (method) {
      case 'GET': return 'bg-cyan-950/80 border-cyan-800 text-brand-cyan';
      case 'POST': return 'bg-emerald-950/80 border-emerald-800 text-brand-emerald';
      case 'PUT': return 'bg-amber-950/80 border-amber-800 text-brand-amber';
      case 'DELETE': return 'bg-rose-950/80 border-rose-800 text-brand-rose';
      default: return 'bg-gray-800 border-gray-700 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white m-0">API Manager</h1>
          <p className="text-gray-400 text-sm mt-1">Develop, test, and document backend application communication paths.</p>
        </div>

        <div className="flex bg-gray-950 border border-gray-800/80 p-1 rounded-xl">
          <button 
            onClick={() => setSubTab('list')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              subTab === 'list' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Terminal size={14} /> API List
          </button>
          <button 
            onClick={() => setSubTab('testing')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              subTab === 'testing' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Play size={14} /> Interactive Testing
          </button>
          <button 
            onClick={() => setSubTab('docs')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              subTab === 'docs' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <BookOpen size={14} /> Documentation
          </button>
        </div>
      </div>

      {/* Main Sections based on Tab */}
      {subTab === 'list' && (
        <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between border-b border-gray-900 pb-4 mb-4">
            <h2 className="text-sm font-semibold text-white m-0">System Endpoint Registry</h2>
            <button 
              onClick={handleOpenCreate}
              className="px-3 py-1.5 rounded-xl bg-brand-cyan hover:bg-cyan-600 text-gray-950 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-lg shadow-cyan-950/20"
            >
              <Plus size={14} /> Create API
            </button>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-900 text-gray-500 font-medium">
                  <th className="py-3 px-4">API Name</th>
                  <th className="py-3 px-4">Endpoint</th>
                  <th className="py-3 px-4 text-center">Method</th>
                  <th className="py-3 px-4 text-center">Version</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900/40">
                {apis.map((api) => (
                  <tr key={api.id} className="hover:bg-gray-900/20 transition-colors group">
                    <td className="py-3.5 px-4 font-semibold text-gray-200">{api.name}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-400">{api.endpoint}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold ${getMethodBadgeClass(api.method)}`}>
                        {api.method}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-400">{api.version}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button 
                        onClick={() => toggleApiStatus(api.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border cursor-pointer select-none transition-colors ${
                          api.status === 'Active' 
                            ? 'bg-brand-emerald/10 border-brand-emerald/20 text-brand-emerald hover:bg-brand-emerald/20' 
                            : 'bg-gray-900 border-gray-800 text-gray-500 hover:bg-gray-850'
                        }`}
                      >
                        {api.status === 'Active' ? <Power size={10} /> : <PowerOff size={10} />}
                        {api.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenEdit(api)}
                          className="p-1 rounded bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                          title="Edit API"
                        >
                          <Edit3 size={12} />
                        </button>
                        <button 
                          onClick={() => deleteApi(api.id)}
                          className="p-1 rounded bg-gray-900 border border-gray-800 text-gray-500 hover:text-brand-rose hover:bg-brand-rose/10 transition-colors"
                          title="Delete API"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'testing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Endpoint Selector & Request Config */}
          <div className="lg:col-span-5 bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0 border-b border-gray-900 pb-3">
              <Terminal className="text-brand-cyan" size={16} /> Request Sandbox
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Target Endpoint</label>
                <select 
                  value={selectedApiId} 
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    setSelectedApiId(id);
                    setTestResponse(null);
                  }}
                  className="w-full mt-1.5 bg-gray-900 border border-gray-800 text-gray-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-cyan"
                >
                  {apis.map(api => (
                    <option key={api.id} value={api.id}>
                      [{api.method}] {api.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center text-[10px] uppercase font-medium tracking-wider">
                  <span className="text-gray-500">Request Body (JSON)</span>
                  <span className="font-mono text-gray-400">Method: {activeApi.method}</span>
                </div>
                <textarea 
                  value={testingPayload}
                  onChange={(e) => setTestingPayload(e.target.value)}
                  className="w-full mt-1.5 h-36 bg-gray-900 border border-gray-800 text-gray-200 font-mono text-xs rounded-xl p-3 focus:outline-none focus:border-brand-cyan custom-scrollbar"
                />
              </div>

              <button 
                onClick={runApiTest}
                disabled={isRunningTest}
                className="w-full py-2.5 rounded-xl bg-brand-cyan text-gray-950 font-bold text-xs hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isRunningTest ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Running API Tests...
                  </>
                ) : (
                  <>
                    <Send size={14} /> Send API Request
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Test Results Output */}
          <div className="lg:col-span-7 bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0 border-b border-gray-900 pb-3">
                <Play className="text-brand-purple" size={16} /> Live Response Feed
              </h2>

              {testResponse ? (
                <div className="mt-4 space-y-4">
                  {/* Status header */}
                  <div className="flex items-center justify-between bg-gray-900 border border-gray-800/50 p-3 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase text-gray-500">Status</span>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold ${
                        testResponse.error 
                          ? 'bg-brand-rose/15 text-brand-rose' 
                          : 'bg-brand-emerald/15 text-brand-emerald'
                      }`}>
                        {testResponse.error ? <XCircle size={12} /> : <CheckCircle2 size={12} />}
                        {testResponse.status} {testResponse.statusText}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                      <div>
                        <span className="text-[10px] uppercase text-gray-500 mr-1.5 font-sans">Latency</span>
                        {testResponse.responseTime}
                      </div>
                    </div>
                  </div>

                  {/* Body block */}
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Response JSON</span>
                    <pre className="mt-1.5 p-3.5 bg-gray-900 border border-gray-850 rounded-xl text-[11px] font-mono text-gray-200 overflow-x-auto custom-scrollbar max-h-56">
                      {JSON.stringify(testResponse.body, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-3">
                  <Terminal size={40} className="text-gray-700 animate-pulse" />
                  <span className="text-xs">Configure request parameters and execute tests in sandbox.</span>
                </div>
              )}
            </div>

            <div className="text-[10px] text-gray-500 mt-4 border-t border-gray-900 pt-3">
              API Uptime is simulated from the active production server cluster.
            </div>
          </div>
        </div>
      )}

      {subTab === 'docs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Docs Selector */}
          <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
            {apis.map(api => (
              <button
                key={api.id}
                onClick={() => setSelectedApiId(api.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  selectedApiId === api.id 
                    ? 'bg-gray-900 border-gray-800 text-white' 
                    : 'bg-gray-950 border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{api.name}</span>
                  <span className={`px-1.5 py-0.2 rounded border text-[9px] font-mono font-extrabold ${getMethodBadgeClass(api.method)}`}>
                    {api.method}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gray-500 truncate">{api.endpoint}</span>
              </button>
            ))}
          </div>

          {/* Docs View */}
          <div className="lg:col-span-8 bg-gray-950 border border-gray-800/80 rounded-2xl p-6 space-y-5">
            <div className="border-b border-gray-900 pb-4">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold ${getMethodBadgeClass(activeApi.method)}`}>
                  {activeApi.method}
                </span>
                <span className="font-mono text-sm text-gray-200">{activeApi.endpoint}</span>
              </div>
              <h2 className="text-base font-bold text-white mt-2.5 mb-1">{activeApi.name} Documentation</h2>
              <p className="text-gray-400 text-xs">{activeApi.description || 'Provide a detailed backend system API endpoint documentation reference.'}</p>
            </div>

            {/* Auth Requirements */}
            <div className="bg-gray-900/30 border border-gray-900 p-3.5 rounded-xl">
              <span className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Authentication Requirement</span>
              <div className="text-xs text-brand-rose font-semibold mt-1">
                JSON Web Token (JWT) Bearer - REQUIRED
              </div>
            </div>

            {/* Request parameters */}
            <div>
              <span className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Required Header Parameters</span>
              <div className="mt-1.5 border border-gray-900 rounded-xl overflow-hidden text-xs">
                <div className="grid grid-cols-3 bg-gray-900 p-2.5 text-gray-400 border-b border-gray-900 font-medium">
                  <div>Parameter</div>
                  <div>Type</div>
                  <div>Description</div>
                </div>
                {activeApi.reqParams?.map((param, index) => (
                  <div key={index} className="grid grid-cols-3 p-2.5 text-gray-300 border-b border-gray-900/50 last:border-0">
                    <div className="font-mono text-brand-cyan">{param.name}</div>
                    <div className="font-mono text-gray-500">{param.type}</div>
                    <div>{param.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Example */}
            <div>
              <span className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Response Payload Schema</span>
              <pre className="mt-1.5 p-3.5 bg-gray-900 border border-gray-850 rounded-xl text-[11px] font-mono text-gray-200 overflow-x-auto custom-scrollbar">
                {JSON.stringify(activeApi.mockResponse, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit API Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-950 border border-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-gray-900 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {modalMode === 'create' ? 'Create New Endpoint' : 'Edit API Endpoint'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-xs px-2 py-1 bg-gray-900 rounded border border-gray-850"
              >
                Close
              </button>
            </div>
            
            <form onSubmit={handleSaveApi} className="p-5 space-y-4">
              <div>
                <label className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">API Name</label>
                <input 
                  type="text" 
                  value={formName} 
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full mt-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
                  placeholder="e.g., IoT Device API"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">HTTP Method</label>
                  <select 
                    value={formMethod} 
                    onChange={(e) => setFormMethod(e.target.value)}
                    className="w-full mt-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
                  >
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>DELETE</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Endpoint Path</label>
                  <input 
                    type="text" 
                    value={formEndpoint} 
                    onChange={(e) => setFormEndpoint(e.target.value)}
                    className="w-full mt-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-brand-cyan"
                    placeholder="/api/v1/..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">API Version</label>
                  <input 
                    type="text" 
                    value={formVersion} 
                    onChange={(e) => setFormVersion(e.target.value)}
                    className="w-full mt-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
                    placeholder="v1.0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Description</label>
                <textarea 
                  value={formDesc} 
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full mt-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white h-20 focus:outline-none focus:border-brand-cyan"
                  placeholder="Purpose of this API..."
                  required
                />
              </div>

              <div className="pt-3 border-t border-gray-900 flex justify-end gap-2.5">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-850 hover:bg-gray-800 text-xs font-semibold text-gray-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-cyan text-gray-950 font-bold text-xs hover:bg-cyan-600 transition-colors"
                >
                  {modalMode === 'create' ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
