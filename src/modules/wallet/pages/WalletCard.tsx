import { useState, type FormEvent } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import { getCardById } from '../services/WalletService';
import type { CardInfo } from '../types/index';
import DataLoader from '@/modules/shared/components/DataLoader';
import { CardComponent } from '../components/CardComponent';

export default function WalletCard() {
    const [input, setInput] = useState('');
    const [card, setCard] = useState<CardInfo | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setCard(null);
        try {
            const found = await getCardById(input.trim());
            if (!found) {
                setError('No se encontró ninguna tarjeta con ese número o ID.');
            } else {
                setCard(found);
            }
        } catch (err) {
            setError('Error buscando la tarjeta.');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gestión de Tarjeta</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Busca una tarjeta por número o ID y realiza operaciones sobre ella.
                </p>
                <form onSubmit={handleSearch} className="flex gap-2 items-center mb-6">
                    <input
                        className="flex-1 px-4 py-2 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
                        placeholder="Introduce el número o ID de la tarjeta"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button type="submit" className="px-4 py-2 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800 transition">Buscar</button>
                </form>
                <DataLoader
                    isLoading={loading}
                    error={error}
                    empty={Boolean(!card && !loading && !error && input)}
                    emptyMessage="No se encontró ninguna tarjeta con ese número o ID."
                    loadingMessage="Buscando tarjeta..."
                >
                    {card && (
                        <div className="flex flex-col items-center space-y-6">
                            <CardComponent card={card} />
                            <div className="flex gap-4 justify-center mt-2">
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-green-100/60 dark:bg-green-900/10 text-green-700 dark:text-green-400 font-semibold shadow hover:bg-green-200/80 dark:hover:bg-green-900/30 border border-green-100 dark:border-green-900/40 transition-all">
                                    <HiOutlinePlusCircle className="h-5 w-5" /> Recargar
                                </button>
                            </div>
                        </div>
                    )}
                </DataLoader>
            </div>
        </div>
    );
}