import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'cliente',
        },
      },
    });

    if (signUpError) {
      alert('Erro ao registrar: ' + signUpError.message);
      return;
    }

    // ⚠️ IMPORTANTE: loga após o cadastro, se possível
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      alert('Conta criada. Agora verifique seu e-mail para confirmar o cadastro.');
    } else {
      alert('Cadastro completo e login efetuado!');
      // Redireciona ou recarrega
      window.location.href = '/dashboard'; // ou como for sua rota principal
    }
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto mt-20 gap-4">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} className="bg-black text-white p-2 rounded">
        Criar Conta
      </button>
    </div>
  );
}
