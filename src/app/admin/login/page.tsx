"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { StatusModal } from "@/components/molecules/StatusModal";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState<{isOpen: boolean, type: 'success' | 'error', message: string}>({
    isOpen: false, type: 'success', message: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setModalConfig({
          isOpen: true,
          type: 'error',
          message: error.message || 'Credenciales incorrectas.',
        });
      } else if (data.user) {
        // Successful login, middleware/proxy.ts cookies will automatically be set by supabase
        setModalConfig({
          isOpen: true,
          type: 'success',
          message: 'Inicio de sesión exitoso. Redirigiendo...',
        });
      }
    } catch (err) {
      console.error(err);
      setModalConfig({
        isOpen: true,
        type: 'error',
        message: 'Ocurrió un error inesperado al intentar iniciar sesión.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ui-bg relative z-0">
      <StatusModal 
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        message={modalConfig.message}
        onClose={() => {
          setModalConfig({...modalConfig, isOpen: false});
          if (modalConfig.type === 'success') {
            router.push('/admin');
          }
        }}
      />

      <div className="max-w-md w-full p-8 bg-ui-surface rounded-2xl border border-ui-border shadow-2xl animate-fade-in relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-ui-heading">Acceso Admin</h1>
          <p className="text-ui-text text-sm mt-2">Continents Viajes</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-ui-text mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-ui-bg border border-ui-border rounded-xl p-4 outline-none focus:border-secondary transition-colors text-ui-text"
              placeholder="admin@continents.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-ui-text mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-ui-bg border border-ui-border rounded-xl p-4 outline-none focus:border-secondary transition-colors text-ui-text"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 bg-secondary text-white font-bold rounded-xl shadow-md hover:opacity-90 disabled:opacity-50 transition-all text-lg flex justify-center items-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Autenticando...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
