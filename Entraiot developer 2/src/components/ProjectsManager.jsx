import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  Plus, 
  TrendingUp, 
  Calendar, 
  User, 
  Tag,
  AlertCircle
} from 'lucide-react';

export default function ProjectsManager({ addLog }) {
  const [activeTab, setActiveTab] = useState('current'); // 'current' or 'upcoming'
  const [showAddForm, setShowAddForm] = useState(false);

  // Projects State
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Entraiot Solutions Dashboard',
      description: 'Developing the main production control panel. Integrating workflow simulation, security audit log console, performance reports, and team collaboration channels.',
      department: 'Frontend Developer Workspace',
      owner: 'Senior Developer',
      status: 'In Progress',
      progress: 85,
      type: 'current',
      milestones: ['Setup Vite + React environment', 'Integrate Collaboration Hub', 'Refactor navigation and state modules'],
      targetDate: '2026-06-30'
    },
    {
      id: 3,
      title: 'AWS Cloud Infrastructure Migration',
      description: 'Scaling database capacity, clustering WebSocket gateway ports, and upgrading staging environment EC2 server instances.',
      department: 'entraiot CTO Workspace',
      owner: 'Chief Technology Officer',
      status: 'Planning',
      progress: 20,
      type: 'upcoming',
      milestones: ['Audit current resource usage', 'Draft AWS CloudFormation templates', 'Schedule maintenance window'],
      targetDate: '2026-07-15'
    },
    {
      id: 4,
      title: 'Unified Corporate Billing & Finance Portal',
      description: 'Developing a secure invoicing tracker, automated client billing generator, and integration with banking gateways.',
      department: 'Entraiot CFO / Finance Department',
      owner: 'Chief Financial Officer',
      status: 'Planning',
      progress: 5,
      type: 'upcoming',
      milestones: ['Draft API payment schemas', 'Verify database security compliance', 'Design UI mockups'],
      targetDate: '2026-08-01'
    }
  ]);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('Frontend Developer Workspace');
  const [owner, setOwner] = useState('Senior Developer');
  const [projectType, setProjectType] = useState('current');
  const [targetDate, setTargetDate] = useState('');

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newProject = {
      id: Date.now(),
      title,
      description,
      department,
      owner,
      status: projectType === 'current' ? 'In Progress' : 'Planning',
      progress: projectType === 'current' ? 10 : 0,
      type: projectType,
      milestones: ['Initial requirements definition', 'Design approval'],
      targetDate: targetDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setProjects([newProject, ...projects]);
    addLog('Project Management', `Created new project: "${title}"`, 'success');
    
    // Reset Form
    setTitle('');
    setDescription('');
    setTargetDate('');
    setShowAddForm(false);
  };

  const filteredProjects = projects.filter(p => p.type === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white m-0">Projects Registry</h1>
          <p className="text-gray-400 text-sm mt-1">Track and manage active corporate workspaces and upcoming initiatives.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-gray-950 border border-gray-800/80 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('current')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'current' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Briefcase size={14} /> Current Projects
            </button>
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'upcoming' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Clock size={14} /> Upcoming Projects
            </button>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-1.5 rounded-xl bg-brand-purple hover:bg-purple-650 text-white font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <Plus size={14} /> Add Project
          </button>
        </div>
      </div>

      {/* Add Project Form Drawer/Modal */}
      {showAddForm && (
        <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4 animate-slide-in">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0 border-b border-gray-900 pb-3">
            <Plus className="text-brand-purple" size={16} /> Register New Project Workspace
          </h2>

          <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase text-gray-500 font-mono tracking-wider font-semibold">Project Title</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sales Integration System"
                  className="w-full mt-1.5 bg-gray-900 border border-gray-800 text-gray-250 text-xs rounded-xl p-3 focus:outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-500 font-mono tracking-wider font-semibold">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe target goals, workspace, and core features..."
                  className="w-full mt-1.5 h-24 bg-gray-900 border border-gray-800 text-gray-250 text-xs rounded-xl p-3 focus:outline-none focus:border-brand-purple custom-scrollbar"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-gray-500 font-mono tracking-wider font-semibold">Department</label>
                  <select 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full mt-1.5 bg-gray-900 border border-gray-800 text-gray-200 text-xs rounded-xl p-3 focus:outline-none focus:border-brand-purple"
                  >
                    <option>Frontend Developer Workspace</option>
                    <option>entraiot CTO Workspace</option>
                    <option>Entraiot CFO / Finance Department</option>
                    <option>Entraiot COO / Operations</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase text-gray-500 font-mono tracking-wider font-semibold">Owner / Lead</label>
                  <select 
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="w-full mt-1.5 bg-gray-900 border border-gray-800 text-gray-200 text-xs rounded-xl p-3 focus:outline-none focus:border-brand-purple"
                  >
                    <option>Senior Developer</option>
                    <option>Managing Director</option>
                    <option>Chief Technology Officer</option>
                    <option>Chief Financial Officer</option>
                    <option>Chief Operating Officer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-gray-500 font-mono tracking-wider font-semibold">Timeline Type</label>
                  <select 
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full mt-1.5 bg-gray-900 border border-gray-800 text-gray-200 text-xs rounded-xl p-3 focus:outline-none focus:border-brand-purple"
                  >
                    <option value="current">Current (In Progress)</option>
                    <option value="upcoming">Upcoming (Planning)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase text-gray-500 font-mono tracking-wider font-semibold">Target Completion</label>
                  <input 
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full mt-1.5 bg-gray-900 border border-gray-800 text-gray-200 text-xs rounded-xl p-3 focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-brand-purple hover:bg-purple-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={14} /> Submit Project Registry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 hover:border-gray-700/80 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-brand-purple/15 text-brand-purple font-semibold">
                  {project.department}
                </span>
                <span className={`inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full ${
                  project.status === 'In Progress' ? 'bg-brand-emerald/10 text-brand-emerald' : 'bg-brand-amber/10 text-brand-amber'
                }`}>
                  <span className="w-1 h-1 rounded-full bg-current animate-pulse"></span>
                  {project.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
                <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">{project.description}</p>
              </div>

              {/* Progress Bar (Visible for current projects) */}
              {project.type === 'current' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 font-semibold uppercase">Development Progress</span>
                    <span className="text-white font-mono">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-brand-purple to-brand-cyan h-full rounded-full transition-all duration-500" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Key Milestones */}
              <div className="space-y-2 pt-2 border-t border-gray-900">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">Key Milestones</span>
                <ul className="space-y-1.5">
                  {project.milestones.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] text-gray-300">
                      <CheckCircle2 size={12} className="text-brand-cyan mt-0.5 flex-shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="flex items-center justify-between text-[10px] text-gray-500 pt-4 border-t border-gray-900 mt-4">
              <span className="flex items-center gap-1">
                <User size={12} /> Lead: {project.owner}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar size={12} /> Target: {project.targetDate}
              </span>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-2 py-10 bg-gray-950 border border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-8 h-8 text-gray-600 mb-2" />
            <span className="text-gray-400 text-sm font-semibold">No Projects Found</span>
            <p className="text-gray-500 text-xs mt-1">Register a new project workspace using the button above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
