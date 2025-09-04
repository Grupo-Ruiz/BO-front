
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/modules/shared/store/hooks';
import { getWalletQR } from '@/modules/wallet/store/thunks/qrThunks';
import { clearQR } from '@/modules/wallet/store/slices/qrSlice';
import QRCode from 'react-qr-code';
import DataLoader from '@/modules/shared/components/DataLoader';
import { HiOutlinePrinter, HiOutlineDevicePhoneMobile, HiOutlineCheckCircle, HiOutlinePaperAirplane, HiOutlineXMark } from 'react-icons/hi2';


// Botón de acción reutilizable
function ActionButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      className={`flex-1 flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl shadow border transition-all text-sm font-semibold
        ${label === 'Correo' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/40'
        : label === 'SMS/WhatsApp' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-900/40 hover:bg-green-100 dark:hover:bg-green-900/40'
        : 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-800/40'}
        ${active ? 'ring-2 ring-green-400' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className="flex items-center justify-center">
        {icon}
        {active && <HiOutlineCheckCircle className="h-5 w-5 text-green-500 ml-1" />}
      </span>
      <span>{label}</span>
    </button>
  );
}

export default function WalletQRGenerator() {
  const [amount] = useState(1.50); // Mantener el estado para futuras ediciones
  const dispatch = useAppDispatch();
  const { data: qrData, loading: qrLoading, error: qrError } = useAppSelector(state => state.qr || { data: null, loading: false, error: null });
  // Opciones seleccionadas para enviar
  const [selectedOptions, setSelectedOptions] = useState<Array<'email' | 'sms' | 'print'>>([]);
  // Estado de envío
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleGenerateQR = async () => {
    setSelectedOptions([]);
    setSendStatus('idle');
    await dispatch(getWalletQR());
  };

  // Alterna la selección de una opción
  const handleToggleOption = (type: 'email' | 'sms' | 'print') => {
    setSelectedOptions(prev =>
      prev.includes(type) ? prev.filter(opt => opt !== type) : [...prev, type]
    );
  };

  // Simula el envío (mock)
  const handleSend = async () => {
    if (selectedOptions.length === 0) return;
    setSendStatus('sending');
    // Simula un delay de envío
    await new Promise(res => setTimeout(res, 1200));
    setSendStatus('sent');
    setTimeout(() => setSendStatus('idle'), 1800);
  };

  const handleClose = () => {
    setSelectedOptions([]);
    setSendStatus('idle');
    dispatch(clearQR());
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Generar QR - Billete Sencillo</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          Genera un código QR para un viaje único. El cliente podrá escanearlo para validar su billete.
        </p>

        <div className="mb-6 flex flex-col items-center">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Monto del billete
          </label>
          <input
            type="number"
            value={amount}
            readOnly
            className="w-32 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-center"
          />
        </div>

        {!qrData ? (
          <DataLoader
            isLoading={qrLoading}
            error={qrError || undefined}
            empty={false}
            loadingMessage="Generando QR..."
          >
            <button
              className="w-full px-4 py-2 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl hover:from-primary-700 hover:to-blue-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
              onClick={handleGenerateQR}
              disabled={qrLoading}
              aria-label="Generar código QR"
            >
              Generar QR
            </button>
          </DataLoader>
        ) : (
          <div className="space-y-8" aria-live="polite">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-2">
                <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
                  <div className="relative rounded-2xl shadow-2xl border-2 border-primary-500 bg-white p-2" style={{ zIndex: 1 }}>
                    <DataLoader
                      isLoading={qrLoading}
                      error={qrError || undefined}
                      empty={!qrData?.rawCode}
                      loadingMessage="Generando QR..."
                      emptyMessage="No se pudo generar el QR."
                    >
                      <QRCode
                        value={qrData?.rawCode || ''}
                        size={200}
                        bgColor="#fff"
                        fgColor="#111"
                        level="H"
                        style={{ borderRadius: '1rem', background: 'transparent' }}
                      />
                    </DataLoader>
                  </div>
                </div>
              </div>
              {qrError && <span className="text-xs text-red-500 mt-2" role="alert">{qrError}</span>}
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 select-all font-mono tracking-wider">{qrData?.rawCode}</span>
            </div>


            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-stretch" aria-label="Opciones de envío QR">
              <ActionButton
                icon={<HiOutlinePaperAirplane className="h-6 w-6 mb-1" />}
                label="Correo"
                active={selectedOptions.includes('email')}
                onClick={() => handleToggleOption('email')}
              />
              <ActionButton
                icon={<HiOutlineDevicePhoneMobile className="h-6 w-6 mb-1" />}
                label="SMS/WhatsApp"
                active={selectedOptions.includes('sms')}
                onClick={() => handleToggleOption('sms')}
              />
              <ActionButton
                icon={<HiOutlinePrinter className="h-6 w-6 mb-1" />}
                label="Imprimir"
                active={selectedOptions.includes('print')}
                onClick={() => handleToggleOption('print')}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium shadow border border-gray-300 dark:border-gray-600 mb-2 sm:mb-0"
                onClick={handleClose}
                aria-label="Cerrar QR"
              >
                <HiOutlineXMark className="h-5 w-5 mr-1" />
                Cerrar QR
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium shadow transition-colors
                  ${selectedOptions.length === 0 || sendStatus === 'sending' ? 'bg-primary-200 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-800 opacity-60 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white border-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 dark:text-white'}
                `}
                disabled={selectedOptions.length === 0 || sendStatus === 'sending'}
                onClick={handleSend}
                aria-label="Enviar QR"
              >
                {sendStatus === 'sending' ? (
                  <span className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : sendStatus === 'sent' ? (
                  <HiOutlineCheckCircle className="h-5 w-5 mr-1 text-green-500" />
                ) : (
                  <HiOutlinePaperAirplane className="h-5 w-5 mr-1" />
                )}
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}