import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Users, 
  Lock, 
  RefreshCw, 
  ShieldAlert, 
  Eye, 
  EyeOff,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function SecurityConsole({ authMetrics, rolePermissions, setRolePermissions, encryptionPolicies, setEncryptionPolicies, addLog }) {
  const [subTab, setSubTab] = useState('auth'); // 'auth', 'authz', 'encryption'
  const [selectedRole, setSelectedRole] = useState('CEO');
  const [revealKeyId, setRevealKeyId] = useState(null);

  const togglePolicy = (id) => {
    setEncryptionPolicies(encryptionPolicies.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Enabled' ? 'Disabled' : 'Enabled';
        addLog('Security Console', `Encryption policy updated: ${p.name} set to ${nextStatus}`, 'warning');
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const togglePermission = (role, permission) => {
    setRolePermissions({
      ...rolePermissions,
      [role]: {
        ...rolePermissions[role],
        [permission]: !rolePermissions[role][permission]
      }
    });
    addLog('Security Console', `Updated permissions for Role [${role}]: toggled ${permission}`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header and Sub Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white m-0 font-sans">Security Console</h1>
          <p className="text-gray-400 text-sm mt-1">Audit authentication credentials, design role-based access tokens, and verify keys.</p>
        </div>

        <div className="flex bg-gray-950 border border-gray-800/80 p-1 rounded-xl">
          <button 
            onClick={() => setSubTab('auth')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              subTab === 'auth' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Key size={14} /> Authentication
          </button>
          <button 
            onClick={() => setSubTab('authz')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              subTab === 'authz' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users size={14} /> Authorization
          </button>
          <button 
            onClick={() => setSubTab('encryption')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              subTab === 'encryption' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Lock size={14} /> Encryption
          </button>
        </div>
      </div>

      {/* Authentication Sub Tab */}
      {subTab === 'auth' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Auth metrics */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-900 pb-2">
                Verification Statistics
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Active User Sessions</span>
                  <span className="font-mono text-white font-semibold">{authMetrics.activeSessions}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Daily Login Attempts</span>
                  <span className="font-mono text-white font-semibold">{authMetrics.loginAttempts}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Failed Logins (24h)</span>
                  <span className="font-mono text-brand-rose font-semibold">{authMetrics.failedLogins}</span>
                </div>
              </div>
            </div>

            {/* MFA status indicator */}
            <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-900 pb-2 mb-3">
                MFA Enforced Policies
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs p-2 bg-gray-900/40 border border-gray-900 rounded-lg">
                  <span className="text-gray-300">OTP via SMS/Email</span>
                  <span className="text-[10px] font-semibold text-brand-emerald">Enforced</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2 bg-gray-900/40 border border-gray-900 rounded-lg">
                  <span className="text-gray-300">Google Authenticator TOTP</span>
                  <span className="text-[10px] font-semibold text-brand-emerald">Enforced</span>
                </div>
              </div>
            </div>
          </div>

          {/* User authentication logs */}
          <div className="lg:col-span-8 bg-gray-950 border border-gray-800/80 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-white border-b border-gray-900 pb-3 mb-4 flex items-center gap-2">
              <ShieldCheck size={16} className="text-brand-emerald" /> Access Authentication logs
            </h2>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-900 text-gray-500 font-medium">
                    <th className="py-2.5 px-3">User Principal</th>
                    <th className="py-2.5 px-3">Device / IP Address</th>
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/40">
                  <tr className="hover:bg-gray-900/10">
                    <td className="py-3 px-3 font-semibold text-gray-200">ceo@entraiot.com</td>
                    <td className="py-3 px-3 font-mono text-gray-450">Chrome (Windows) | 182.16.8.21</td>
                    <td className="py-3 px-3 text-gray-400 font-mono">16:12:05</td>
                    <td className="py-3 px-3 text-right text-brand-emerald font-semibold">Success</td>
                  </tr>
                  <tr className="hover:bg-gray-900/10">
                    <td className="py-3 px-3 font-semibold text-gray-200">employee.04@entraiot.com</td>
                    <td className="py-3 px-3 font-mono text-gray-450">Firefox (Mac OS) | 182.16.8.99</td>
                    <td className="py-3 px-3 text-gray-400 font-mono">16:09:41</td>
                    <td className="py-3 px-3 text-right text-brand-emerald font-semibold">Success</td>
                  </tr>
                  <tr className="hover:bg-gray-900/10">
                    <td className="py-3 px-3 font-semibold text-gray-200">unknown.admin@guest</td>
                    <td className="py-3 px-3 font-mono text-gray-450">Safari (iOS) | 49.37.102.12</td>
                    <td className="py-3 px-3 text-gray-400 font-mono">15:58:20</td>
                    <td className="py-3 px-3 text-right text-brand-rose font-semibold">MFA Failed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Authorization Sub Tab */}
      {subTab === 'authz' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Roles selector */}
          <div className="lg:col-span-4 space-y-2">
            {Object.keys(rolePermissions).map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1 ${
                  selectedRole === role 
                    ? 'bg-gray-900 border-gray-800 text-white' 
                    : 'bg-gray-950 border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900/40'
                }`}
              >
                <span className="text-xs font-bold tracking-wide">{role} Access Control</span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {Object.values(rolePermissions[role]).filter(Boolean).length} permissions active
                </span>
              </button>
            ))}
          </div>

          {/* Access permissions checklist */}
          <div className="lg:col-span-8 bg-gray-950 border border-gray-800/80 rounded-2xl p-6">
            <div className="border-b border-gray-900 pb-3 mb-5 flex justify-between items-center">
              <div>
                <h2 className="text-sm font-semibold text-white m-0">Permissions Matrix: {selectedRole}</h2>
                <p className="text-gray-500 text-xs mt-1">Define action rights for {selectedRole} instances.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(rolePermissions[selectedRole]).map(permission => {
                const isEnabled = rolePermissions[selectedRole][permission];
                return (
                  <button
                    key={permission}
                    onClick={() => togglePermission(selectedRole, permission)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                      isEnabled 
                        ? 'bg-gray-900/40 border-gray-800 text-white' 
                        : 'bg-gray-900/10 border-gray-900/60 text-gray-500'
                    }`}
                  >
                    <span className="text-xs font-semibold capitalize font-sans">{permission.replace(/([A-Z])/g, ' $1')}</span>
                    {isEnabled ? (
                      <ToggleRight size={24} className="text-brand-cyan" />
                    ) : (
                      <ToggleLeft size={24} className="text-gray-700" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Encryption Sub Tab */}
      {subTab === 'encryption' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Encryption status overview */}
          <div className="lg:col-span-5 bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white border-b border-gray-900 pb-3 flex items-center gap-2 m-0">
              <ShieldAlert className="text-brand-rose" size={16} /> Encryption Governance
            </h2>

            <p className="text-gray-400 text-xs leading-relaxed">
              Verify database column and API transport layer parameters. Ensure passwords and keys comply with hashing standards.
            </p>

            <div className="space-y-3">
              {encryptionPolicies.map(policy => (
                <div key={policy.id} className="p-3.5 bg-gray-900/40 border border-gray-900 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-gray-200">{policy.name}</span>
                    <p className="text-[10px] text-gray-500 mt-0.5 font-mono">{policy.method}</p>
                  </div>
                  
                  <button 
                    onClick={() => togglePolicy(policy.id)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                      policy.status === 'Enabled'
                        ? 'bg-brand-emerald/10 border-brand-emerald/20 text-brand-emerald'
                        : 'bg-gray-900 border-gray-800 text-gray-500'
                    }`}
                  >
                    {policy.status}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* HSM Key Management */}
          <div className="lg:col-span-7 bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white border-b border-gray-900 pb-3 mb-4">
                API Key Management (HSM Vault)
              </h2>

              <div className="space-y-3.5">
                <div className="bg-gray-900/30 border border-gray-900 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-500">JWT Token Signing Secret</span>
                    <div className="font-mono text-xs text-gray-300 mt-1">
                      {revealKeyId === 'jwt' ? 'entraiot_jwt_sha256_super_secret_signing_key_2026' : '••••••••••••••••••••••••••••••••••••••••'}
                    </div>
                  </div>
                  <button 
                    onClick={() => setRevealKeyId(revealKeyId === 'jwt' ? null : 'jwt')}
                    className="p-1 rounded bg-gray-900 border border-gray-850 hover:bg-gray-800 text-[10px] text-gray-400 font-semibold"
                  >
                    {revealKeyId === 'jwt' ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                <div className="bg-gray-900/30 border border-gray-900 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-500">AES-256 Storage Master Key</span>
                    <div className="font-mono text-xs text-gray-300 mt-1">
                      {revealKeyId === 'aes' ? 'entraiot_aes256_master_storage_encryption_key' : '••••••••••••••••••••••••••••••••••••••••'}
                    </div>
                  </div>
                  <button 
                    onClick={() => setRevealKeyId(revealKeyId === 'aes' ? null : 'aes')}
                    className="p-1 rounded bg-gray-900 border border-gray-850 hover:bg-gray-800 text-[10px] text-gray-400 font-semibold"
                  >
                    {revealKeyId === 'aes' ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-gray-500 border-t border-gray-900 pt-3">
              Master keys are rotated automatically every 180 days via Entraiot Vault servers.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
