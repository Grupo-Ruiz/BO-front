import { useState, type FormEvent } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineCurrencyEuro, HiOutlineTrash } from 'react-icons/hi2';
import { Button } from '@/modules/shared/components';
import { cardsApi } from '../store/cardsApi';
import DataLoader from '@/modules/shared/components/DataLoader';
import { CardComponent } from './CardComponent';
import type { CardInfo } from '../types';

export default function CardSearch() {
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
            const found = await cardsApi.getById(input.trim());
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
                        type="text"
                        className="flex-1 rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder="ID o número de tarjeta"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Button
                        type="button"
                        variant="secondary"
                        size="md"
                        disabled={loading}
                        onClick={() => { setInput(''); setCard(null); setError(''); }}
                        className="gap-2"
                    >
                        <HiOutlineTrash className="w-5 h-5" />
                        Vaciar
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={loading}
                        className="gap-2"
                    >
                        <HiOutlineMagnifyingGlass className="w-5 h-5" />
                        Buscar
                    </Button>
                </form>
                <DataLoader isLoading={loading} error={error} empty={!card} emptyMessage="No hay tarjeta seleccionada">
                    {card && <CardComponent card={card} />}

                    {/*Botones de recarga */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Button
                            type="button"
                            variant="success"
                            size="md"
                            disabled={loading || !card}
                            className="gap-2 font-semibold shadow-green-200/40 shadow-md bg-green-600 hover:bg-green-700 text-white"
                        >
                            <HiOutlineCurrencyEuro className="w-5 h-5 opacity-90" />
                            Recargar 5€
                        </Button>
                        <Button
                            type="button"
                            variant="success"
                            size="md"
                            disabled={loading || !card}
                            className="gap-2 font-semibold shadow-green-200/40 shadow-md bg-green-600 hover:bg-green-700 text-white"
                        >
                            <HiOutlineCurrencyEuro className="w-5 h-5 opacity-90" />
                            Recargar 10€
                        </Button>
                        <Button
                            type="button"
                            variant="success"
                            size="md"
                            disabled={loading || !card}
                            className="gap-2 font-semibold shadow-green-200/40 shadow-md bg-green-600 hover:bg-green-700 text-white"
                        >
                            <HiOutlineCurrencyEuro className="w-5 h-5 opacity-90" />
                            Recargar 20€
                        </Button>
                    </div>
                </DataLoader>
            </div>
        </div>
    );
}