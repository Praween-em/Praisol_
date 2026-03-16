'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { Smartphone, Play, Download, Clock, CheckCircle, XCircle, Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/builder/atoms/Button';
import { Input } from '@/components/builder/atoms/Input';
import { Deployment } from '@/types';

interface AppBuild {
  id: string;
  deployment_id: string;
  build_type: 'apk' | 'aab';
  status: 'queued' | 'building' | 'done' | 'failed';
  download_url: string | null;
  app_name: string;
  app_version: string;
  created_at: string;
  completed_at: string | null;
}

function BuildsContent() {
  const searchParams = useSearchParams();
  const preselectedSlug = searchParams.get('site');
  
  const [builds, setBuilds] = useState<AppBuild[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeploymentId, setSelectedDeploymentId] = useState('');
  const [buildType, setBuildType] = useState<'apk' | 'aab'>('apk');
  const [appName, setAppName] = useState('');
  const [appVersion, setAppVersion] = useState('1.0.0');
  const [isDeploying, setIsDeploying] = useState(false);
  const [modalError, setModalError] = useState('');

  const fetchData = async () => {
    try {
      const [buildsRes, depsRes] = await Promise.all([
        api.get('/platform/builds'),
        api.get('/platform/deployments')
      ]);
      setBuilds(buildsRes.data.data || []);
      
      const deps = depsRes.data.data || [];
      setDeployments(deps);

      // Optionally pre-select deployment based on URL query
      if (preselectedSlug) {
        const found = deps.find((d: Deployment) => d.slug === preselectedSlug);
        if (found) {
          setSelectedDeploymentId(found.id);
          setAppName(found.name);
        }
      } else if (deps.length > 0) {
        setSelectedDeploymentId(deps[0].id);
        setAppName(deps[0].name);
      }
    } catch (e) {
      console.error('Failed to load builds data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll for updates every 10 seconds if any build is in progress
    const interval = setInterval(() => {
      setBuilds(prev => {
        if (prev.some(b => b.status === 'queued' || b.status === 'building')) {
          fetchData();
        }
        return prev;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [preselectedSlug]);

  const handleDeploymentChange = (depId: string) => {
    setSelectedDeploymentId(depId);
    const dep = deployments.find(d => d.id === depId);
    if (dep) setAppName(dep.name);
  };

  const triggerBuild = async () => {
    if (!selectedDeploymentId) return setModalError('Please select a site');
    if (!appName.trim()) return setModalError('App name is required');
    if (!appVersion.trim()) return setModalError('Version is required');
    
    setIsDeploying(true);
    setModalError('');
    
    try {
      await api.post('/platform/builds', {
        deployment_id: selectedDeploymentId,
        build_type: buildType,
        app_name: appName,
        app_version: appVersion
      });
      setIsModalOpen(false);
      fetchData(); // Refresh list immediately
    } catch (e: any) {
      setModalError(e.response?.data?.message || 'Failed to trigger build');
    } finally {
      setIsDeploying(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return <CheckCircle size={18} className="text-green-500" />;
      case 'failed': return <XCircle size={18} className="text-red-500" />;
      case 'building': return <Loader2 size={18} className="text-indigo-500 animate-spin" />;
      default: return <Clock size={18} className="text-zinc-500" />;
    }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-zinc-500 w-8 h-8" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
            <Smartphone className="text-indigo-400" size={32} />
            Mobile App Builds
          </h1>
          <p className="text-zinc-400 mt-2">Generate Android APKs and Play Store AAB bundles for your sites.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Play size={16} /> New Build
        </Button>
      </div>

      {builds.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center border border-zinc-800">
          <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="text-zinc-400 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-200 mb-2">No builds yet</h3>
          <p className="text-zinc-500 mb-6 max-w-sm mx-auto">Generate a mobile app for any of your deployed sites. We'll handle the React Native packaging and EAS cloud build automatically.</p>
          <Button onClick={() => setIsModalOpen(true)}>Start First Build</Button>
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden border border-zinc-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-800/50 text-zinc-400 text-sm">
                <th className="py-4 px-6 font-semibold border-b border-zinc-800">App Name</th>
                <th className="py-4 px-6 font-semibold border-b border-zinc-800">Site</th>
                <th className="py-4 px-6 font-semibold border-b border-zinc-800">Type</th>
                <th className="py-4 px-6 font-semibold border-b border-zinc-800">Version</th>
                <th className="py-4 px-6 font-semibold border-b border-zinc-800">Status</th>
                <th className="py-4 px-6 font-semibold border-b border-zinc-800">Date</th>
                <th className="py-4 px-6 font-semibold border-b border-zinc-800 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {builds.map(build => {
                const dep = deployments.find(d => d.id === build.deployment_id);
                return (
                  <tr key={build.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                    <td className="py-4 px-6 font-medium text-zinc-100">{build.app_name}</td>
                    <td className="py-4 px-6 text-sm text-zinc-400">{dep?.name || 'Unknown Site'}</td>
                    <td className="py-4 px-6">
                      <span className="bg-zinc-800 text-xs px-2 py-1 rounded-md uppercase font-bold text-zinc-300">
                        {build.build_type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm">{build.app_version}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm capitalize">
                        {getStatusIcon(build.status)}
                        {build.status}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-500">
                      {new Date(build.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {build.status === 'done' && build.download_url ? (
                        <a 
                          href={build.download_url} 
                          target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-sm font-semibold hover:bg-indigo-500/20 transition-colors"
                        >
                          <Download size={14} /> Download
                        </a>
                      ) : (
                        <span className="text-xs text-zinc-600">N/A</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* New Build Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => !isDeploying && setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200"
            >
              <XCircle size={20} />
            </button>
            
            <h2 className="text-xl font-bold mb-6 text-zinc-100">Trigger New Build</h2>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500 uppercase">Target Site</label>
                <select 
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:border-indigo-500 focus:outline-none"
                  value={selectedDeploymentId}
                  onChange={e => handleDeploymentChange(e.target.value)}
                  disabled={isDeploying}
                >
                  <option value="" disabled>Select a site...</option>
                  {deployments.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.slug})</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-1">
                  <label className="text-xs font-semibold text-zinc-500 uppercase">Build Type</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setBuildType('apk')}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold ${buildType === 'apk' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'bg-zinc-800 text-zinc-400 border border-transparent'}`}
                    >
                      APK (Test)
                    </button>
                    <button 
                      onClick={() => setBuildType('aab')}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold ${buildType === 'aab' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'bg-zinc-800 text-zinc-400 border border-transparent'}`}
                    >
                      AAB (Store)
                    </button>
                  </div>
                </div>
              </div>

              <Input 
                label="App Name"
                placeholder="e.g. My School App"
                value={appName}
                onChange={e => setAppName(e.target.value)}
              />

              <Input 
                label="Version"
                placeholder="1.0.0"
                value={appVersion}
                onChange={e => setAppVersion(e.target.value)}
              />

              {modalError && <p className="text-red-400 text-sm mt-2">{modalError}</p>}

              <div className="pt-4">
                <Button fullWidth onClick={triggerBuild} disabled={isDeploying || !selectedDeploymentId}>
                  {isDeploying ? (
                    <div className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Queuing...
                    </div>
                  ) : (
                    'Queue Build'
                  )}
                </Button>
                <p className="text-center text-xs text-zinc-500 mt-3">Builds typically take 5-10 minutes to compile in the cloud.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AppBuildsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-zinc-500 w-8 h-8" />
      </div>
    }>
      <BuildsContent />
    </Suspense>
  );
}
