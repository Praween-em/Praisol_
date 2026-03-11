'use client';
import { useState } from 'react';
import { UnifiedAuthFlow } from './UnifiedAuthFlow';
import { isLoggedIn } from '@/lib/auth';
import { Rocket, X, Check, Globe, Layout, Loader2 } from 'lucide-react';
import { Input } from './atoms/Input';
import { Button } from './atoms/Button';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface DeployModalProps {
  onClose: () => void;
  config: any;
}

export const DeployModal = ({ onClose, config }: DeployModalProps) => {
  const router = useRouter();
  const [step, setStep] = useState<'auth' | 'details' | 'deploying' | 'success'>('auth');
  const [name, setName] = useState('');
  const [systemType, setSystemType] = useState<'school' | 'college' | 'business'>('school');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deployedSlug, setDeployedSlug] = useState('');

  // Skip auth if already logged in
  useState(() => {
    if (isLoggedIn()) setStep('details');
  });

  const handleSiteCreation = async () => {
    if (!name.trim()) return setError('Site name is required');
    setError(''); setLoading(true);
    setStep('deploying');
    try {
      // 1. Create deployment
      const { data: deployRes } = await api.post('/platform/deployments', { 
        name, 
        system_type: systemType 
      });
      const deployment = deployRes.data;

      // 2. Save builder config
      await api.put(`/platform/deployments/${deployment.id}/builder-config`, { 
        builder_config: config 
      });

      setDeployedSlug(deployment.slug);
      setStep('success');
      // Clear local playground on success
      localStorage.removeItem('praisol_playground_config');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Deployment failed');
      setStep('details');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-fade-in">
      <div className="glass w-full max-w-md rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative">
        {step !== 'deploying' && step !== 'success' && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-100 p-2 hover:bg-zinc-800 rounded-full transition-all"
          >
            <X size={18} />
          </button>
        )}

        <div className="p-8">
          {step === 'auth' && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
                  <Rocket className="text-indigo-500 w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">Almost There!</h2>
                <p className="text-zinc-500 text-sm">Verify your phone to save and deploy your site for free.</p>
              </div>
              <UnifiedAuthFlow onSuccess={() => setStep('details')} />
            </>
          )}

          {step === 'details' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">Site Details</h2>
                <p className="text-zinc-500 text-sm">Great job! Now tell us a bit more about your site.</p>
              </div>
              <div className="space-y-6">
                <Input 
                  label="Name your site"
                  placeholder="e.g. Green Valley School"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  error={error}
                  autoFocus
                />
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Select Template Type</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'school', label: 'School CMS', icon: <Globe size={16} /> },
                      { id: 'college', label: 'College Portal', icon: <Layout size={16} /> },
                      { id: 'business', label: 'Business / Shop', icon: <Rocket size={16} /> }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setSystemType(type.id as any)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${systemType === type.id ? 'bg-indigo-600/10 border-indigo-600 text-white' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                      >
                        <div className={`${systemType === type.id ? 'text-indigo-400' : 'text-zinc-500'}`}>{type.icon}</div>
                        <span className="text-sm font-semibold">{type.label}</span>
                        {systemType === type.id && <Check size={16} className="ml-auto text-indigo-400" />}
                      </button>
                    ))}
                  </div>
                </div>
                <Button fullWidth size="lg" onClick={handleSiteCreation}>
                  Start Deployment
                </Button>
              </div>
            </>
          )}

          {step === 'deploying' && (
            <div className="text-center py-10">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <Rocket className="absolute inset-0 m-auto text-indigo-500 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">Deploying...</h2>
              <p className="text-zinc-500 text-sm animate-pulse">Setting up your server, database and site architecture.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-8 text-green-500">
                <Check size={40} />
              </div>
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">Site is Live!</h2>
              <p className="text-zinc-500 text-sm mb-10">Your site has been successfully created and deployed.</p>
              
              <div className="space-y-3">
                <a 
                  href={`https://${deployedSlug}.praisol.com`} 
                  target="_blank" rel="noreferrer"
                  className="block w-full py-3 bg-zinc-100 text-zinc-900 rounded-xl font-bold transition-all hover:bg-white"
                >
                  Visit Live Site
                </a>
                <Button fullWidth variant="ghost" onClick={() => router.push('/dashboard/deployments')}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
