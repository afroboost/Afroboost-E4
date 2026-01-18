/**
 * CoachLoginModal Component
 * Handles coach authentication with login and password recovery
 * Extracted from App.js for better code organization and performance
 */
import { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const CoachLoginModal = ({ t, onLogin, onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Flux "Mot de passe oublié"
  const [forgotMode, setForgotMode] = useState(false); // Étape 1: Saisir email
  const [resetMode, setResetMode] = useState(false);   // Étape 2: Nouveau mot de passe
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/coach-auth/login`, { email, password });
      if (response.data.success) onLogin();
      else setError(t('wrongCredentials'));
    } catch { setError(t('wrongCredentials')); }
  };

  // Étape 1: Vérifier l'email du coach
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // Récupérer coachAuth depuis localStorage
    const storedAuth = localStorage.getItem('coachAuth');
    if (storedAuth) {
      try {
        const coachAuth = JSON.parse(storedAuth);
        if (coachAuth.email && coachAuth.email.toLowerCase() === forgotEmail.toLowerCase().trim()) {
          // Email correspond - passer à l'étape 2
          setForgotMode(false);
          setResetMode(true);
          setError("");
        } else {
          setError("Cet e-mail ne correspond pas au compte Coach enregistré.");
        }
      } catch {
        setError("Erreur de vérification. Veuillez réessayer.");
      }
    } else {
      // Vérifier aussi l'email par défaut
      if (forgotEmail.toLowerCase().trim() === "coach@afroboost.com") {
        setForgotMode(false);
        setResetMode(true);
        setError("");
      } else {
        setError("Cet e-mail ne correspond pas au compte Coach enregistré.");
      }
    }
  };

  // Étape 2: Définir le nouveau mot de passe
  const handleResetSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Mettre à jour coachAuth dans localStorage
    const newCoachAuth = {
      email: forgotEmail.toLowerCase().trim(),
      password: newPassword
    };
    localStorage.setItem('coachAuth', JSON.stringify(newCoachAuth));

    // Succès
    setResetMode(false);
    setSuccessMessage("✅ Mot de passe mis à jour avec succès ! Vous pouvez maintenant vous connecter.");
    setNewPassword("");
    setConfirmPassword("");
    setForgotEmail("");
  };

  // Retour au login
  const backToLogin = () => {
    setForgotMode(false);
    setResetMode(false);
    setError("");
    setSuccessMessage("");
    setForgotEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass rounded-xl p-8 max-w-md w-full neon-border">
        
        {/* MESSAGE DE SUCCÈS */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-lg text-center" style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e' }}>
            <p className="text-green-400 font-semibold">{successMessage}</p>
          </div>
        )}

        {/* ÉTAPE 1: SAISIR EMAIL POUR RÉCUPÉRATION */}
        {forgotMode && !resetMode && (
          <form onSubmit={handleForgotSubmit}>
            <h2 className="font-bold mb-2 text-center text-white" style={{ fontSize: '24px' }}>🔐 Récupération</h2>
            <p className="text-center text-white/60 text-sm mb-6">Entrez l'adresse e-mail du compte Coach</p>
            
            {error && <div className="mb-4 p-3 rounded-lg text-center" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>{error}</div>}
            
            <div className="mb-6">
              <label className="block mb-2 text-white text-sm">E-mail du Coach</label>
              <input 
                type="email" 
                required 
                value={forgotEmail} 
                onChange={(e) => setForgotEmail(e.target.value)} 
                className="w-full px-4 py-3 rounded-lg neon-input" 
                placeholder="coach@afroboost.com"
                autoFocus
              />
            </div>
            
            <button type="submit" className="btn-primary w-full py-3 rounded-lg font-bold mb-3">
              Vérifier l'e-mail
            </button>
            <button type="button" onClick={backToLogin} className="w-full py-2 rounded-lg glass text-white">
              ← Retour à la connexion
            </button>
          </form>
        )}

        {/* ÉTAPE 2: NOUVEAU MOT DE PASSE */}
        {resetMode && !forgotMode && (
          <form onSubmit={handleResetSubmit}>
            <h2 className="font-bold mb-2 text-center text-white" style={{ fontSize: '24px' }}>🔑 Nouveau mot de passe</h2>
            <p className="text-center text-white/60 text-sm mb-6">Créez votre nouveau mot de passe sécurisé</p>
            
            {error && <div className="mb-4 p-3 rounded-lg text-center" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>{error}</div>}
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-white text-sm">Nouveau mot de passe</label>
                <input 
                  type="password" 
                  required 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg neon-input" 
                  placeholder="••••••••"
                  minLength={6}
                  autoFocus
                />
                <p className="text-xs text-white/40 mt-1">Minimum 6 caractères</p>
              </div>
              <div>
                <label className="block mb-2 text-white text-sm">Confirmer le mot de passe</label>
                <input 
                  type="password" 
                  required 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg neon-input" 
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>
            
            <button type="submit" className="btn-primary w-full py-3 rounded-lg font-bold mb-3">
              ✓ Enregistrer le nouveau mot de passe
            </button>
            <button type="button" onClick={backToLogin} className="w-full py-2 rounded-lg glass text-white">
              ← Annuler
            </button>
          </form>
        )}

        {/* FORMULAIRE DE CONNEXION PRINCIPAL */}
        {!forgotMode && !resetMode && (
          <form onSubmit={handleSubmit}>
            <h2 className="font-bold mb-6 text-center text-white" style={{ fontSize: '24px' }}>{t('coachLogin')}</h2>
            {error && <div className="mb-4 p-3 rounded-lg text-center" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>{error}</div>}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-white text-sm">{t('email')}</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg neon-input" placeholder="coach@afroboost.com" data-testid="coach-login-email" />
              </div>
              <div>
                <label className="block mb-2 text-white text-sm">{t('password')}</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg neon-input" placeholder="••••••••" data-testid="coach-login-password" />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-3 rounded-lg font-bold mb-3" data-testid="coach-login-submit">{t('login')}</button>
            <button 
              type="button" 
              onClick={() => { setForgotMode(true); setError(""); setSuccessMessage(""); }}
              className="w-full text-center mb-4" 
              style={{ color: '#d91cd2', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}
            >
              {t('forgotPassword')}
            </button>
            <button type="button" onClick={onCancel} className="w-full py-2 rounded-lg glass text-white" data-testid="coach-login-cancel">{t('cancel')}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CoachLoginModal;
