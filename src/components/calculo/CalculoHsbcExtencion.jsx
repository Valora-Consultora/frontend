import React, { useState, useEffect } from 'react';
import InputNumerico from './inputNumerico';
import { formatearNumero, calcularValorTerreno, calcularValorTotalSuperficie, calcularSuperficieConstruidaTotal } from '../calculo/CalculoUtils';

/**
 * Componente de extensión específica para cálculos HSBC
 * Este componente maneja solo las partes específicas del cálculo HSBC
 */
const CalculoHsbcExtension = ({ 
  tipoPropiedad, 
  superficieTerreno, 
  valorMetroTerreno, 
  valorObraCivil,
  onDataChange 
}) => {
  // Estados para cálculos específicos HSBC
  const [cuotaPartePorcentaje, setCuotaPartePorcentaje] = useState(0);
  const [cuotaParteValor, setCuotaParteValor] = useState(0);
  const [murosDuctosValor, setMurosDuctosValor] = useState(0);
  const [totalObraCivilHsbc, setTotalObraCivilHsbc] = useState(0);
  
  // Estados para bienes comunes de uso exclusivo
  const [bienesExclusivos, setBienesExclusivos] = useState([]);
  const [totalBienesExclusivos, setTotalBienesExclusivos] = useState(0);
  
  // Estados para bienes comunes
  const [bienesComunes, setBienesComunes] = useState([]);
  const [totalBienesComunes, setTotalBienesComunes] = useState(0);

  // Efecto para calcular la cuota parte del terreno
  useEffect(() => {
    if (tipoPropiedad === 'ph' && superficieTerreno && valorMetroTerreno && cuotaPartePorcentaje) {
      const valorTerrenoTotal = calcularValorTerreno(superficieTerreno, valorMetroTerreno);
      const nuevaCuotaParte = (valorTerrenoTotal * cuotaPartePorcentaje) / 100;
      setCuotaParteValor(formatearNumero(nuevaCuotaParte));
    }
  }, [tipoPropiedad, superficieTerreno, valorMetroTerreno, cuotaPartePorcentaje]);

  // Efecto para calcular totales de bienes exclusivos
  useEffect(() => {
    const total = bienesExclusivos.reduce(
      (sum, bien) => sum + parseFloat(bien.valor || 0), 
      0
    );
    setTotalBienesExclusivos(formatearNumero(total));
  }, [bienesExclusivos]);

  // Efecto para calcular totales de bienes comunes
  useEffect(() => {
    // Sumamos los valores de los bienes comunes
    const totalBienes = bienesComunes.reduce(
      (sum, bien) => sum + parseFloat(bien.valor || 0), 
      0
    );
    setTotalBienesComunes(formatearNumero(totalBienes));
  }, [bienesComunes]);

  // Efecto para calcular el total de obra civil
  useEffect(() => {
    // Suma del valor de bienes propios
    const valorBienesPropios = valorObraCivil || 0;
    
    // Suma del valor de bienes exclusivos
    const valorBienesExclusivos = parseFloat(totalBienesExclusivos || 0);
    
    // Suma del valor de bienes comunes más muros y ductos
    const valorBienesComunes = parseFloat(totalBienesComunes || 0) + parseFloat(murosDuctosValor || 0);
    
    // Suma total
    const valorTotal = parseFloat(valorBienesPropios) + valorBienesExclusivos + valorBienesComunes;
    setTotalObraCivilHsbc(formatearNumero(valorTotal));
  }, [valorObraCivil, totalBienesExclusivos, totalBienesComunes, murosDuctosValor]);

  // Notificar al componente padre de los cambios en los datos
  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        cuotaPartePorcentaje,
        cuotaParteValor,
        murosDuctosValor,
        totalObraCivilHsbc,
        bienesExclusivos,
        bienesComunes
      });
    }
  }, [cuotaPartePorcentaje, cuotaParteValor, murosDuctosValor, totalObraCivilHsbc, bienesExclusivos, bienesComunes, onDataChange]);

  // Agregar un nuevo bien común de uso exclusivo
  const agregarBienExclusivo = () => {
    setBienesExclusivos([
      ...bienesExclusivos, 
      { 
        id: Date.now(),
        descripcion: '',
        metros: 0,
        valorMetro: 0,
        valor: 0
      }
    ]);
  };

  // Actualizar un bien común de uso exclusivo
  const actualizarBienExclusivo = (id, campo, valor) => {
    const nuevosBienes = bienesExclusivos.map(bien => {
      if (bien.id === id) {
        const nuevoBien = { ...bien, [campo]: valor };
        
        // Si se actualizó metros o valorMetro, recalcular el valor total
        if (campo === 'metros' || campo === 'valorMetro') {
          nuevoBien.valor = formatearNumero(parseFloat(campo === 'metros' ? valor : bien.metros) * 
                                             parseFloat(campo === 'valorMetro' ? valor : bien.valorMetro));
        }
        
        return nuevoBien;
      }
      return bien;
    });
    
    setBienesExclusivos(nuevosBienes);
  };

  // Eliminar un bien común de uso exclusivo
  const eliminarBienExclusivo = (id) => {
    setBienesExclusivos(bienesExclusivos.filter(bien => bien.id !== id));
  };

  // Agregar un nuevo bien común
  const agregarBienComun = () => {
    setBienesComunes([
      ...bienesComunes, 
      { 
        id: Date.now(),
        descripcion: '',
        metros: 0,
        valorMetro: 0,
        valor: 0
      }
    ]);
  };

  // Actualizar un bien común
  const actualizarBienComun = (id, campo, valor) => {
    const nuevosBienes = bienesComunes.map(bien => {
      if (bien.id === id) {
        const nuevoBien = { ...bien, [campo]: valor };
        
        // Si se actualizó metros o valorMetro, recalcular el valor total
        if (campo === 'metros' || campo === 'valorMetro') {
          nuevoBien.valor = formatearNumero(parseFloat(campo === 'metros' ? valor : bien.metros) * 
                                             parseFloat(campo === 'valorMetro' ? valor : bien.valorMetro));
        }
        
        return nuevoBien;
      }
      return bien;
    });
    
    setBienesComunes(nuevosBienes);
  };

  // Eliminar un bien común
  const eliminarBienComun = (id) => {
    setBienesComunes(bienesComunes.filter(bien => bien.id !== id));
  };

  
  return (
    <>
      {/* Cuota parte del terreno para PH */}
      {tipoPropiedad === 'ph' && (
        <div className="mt-4 p-3 border rounded">
          <h4 className="text-md font-medium text-gray-700">Cuota Parte del Terreno</h4>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Porcentaje (%)</label>
              <InputNumerico
                value={cuotaPartePorcentaje}
                onChange={setCuotaPartePorcentaje}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                min="0"
                max="100"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valor Cuota Parte (USD)</label>
              <input
                type="text"
                value={formatearNumero(cuotaParteValor)}
                className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
                readOnly
              />
            </div>
          </div>
        </div>
      )}

      {/* Bienes Comunes de Uso Exclusivo */}
      <div className="mt-4 p-3 border rounded overflow-x-auto">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium text-gray-700">Bienes Comunes de Uso Exclusivo</h4>
          <button
            type="button"
            onClick={agregarBienExclusivo}
            className="bg-green-900 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
          >
            Agregar
          </button>
        </div>
        
        {bienesExclusivos.length > 0 ? (
          <table className="w-full border-collapse mt-2 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-2 py-2">Descripción</th>
                <th className="border px-2 py-2">m²</th>
                <th className="border px-2 py-2">U$S/m²</th>
                <th className="border px-2 py-2">Valor Total (USD)</th>
                <th className="border px-2 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bienesExclusivos.map((bien) => (
                <tr key={bien.id}>
                  <td className="border px-2 py-2">
                    <input
                      type="text"
                      value={bien.descripcion}
                      onChange={(e) => actualizarBienExclusivo(bien.id, 'descripcion', e.target.value)}
                      className="w-full px-1 py-1 border rounded-sm"
                      placeholder="Ej: Balcón, Terraza"
                    />
                  </td>
                  <td className="border px-2 py-2">
                    <InputNumerico
                      value={bien.metros}
                      onChange={(valor) => actualizarBienExclusivo(bien.id, 'metros', valor)}
                      className="w-full px-1 py-1 border rounded-sm"
                    />
                  </td>
                  <td className="border px-2 py-2">
                    <InputNumerico
                      value={bien.valorMetro}
                      onChange={(valor) => actualizarBienExclusivo(bien.id, 'valorMetro', valor)}
                      className="w-full px-1 py-1 border rounded-sm"
                    />
                  </td>
                  <td className="border px-2 py-2">
                    <InputNumerico
                      value={bien.valor}
                      onChange={(valor) => actualizarBienExclusivo(bien.id, 'valor', valor)}
                      className="w-full px-1 py-1 border rounded-sm"
                    />
                  </td>
                  <td className="border px-2 py-2">
                    <button
                      onClick={() => eliminarBienExclusivo(bien.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-200">
                <td className="border px-2 py-2 font-bold">Total Bienes Comunes de Uso Exclusivo</td>
                <td className="border px-2 py-2 font-bold">
                  {formatearNumero(bienesExclusivos.reduce((total, bien) => total + parseFloat(bien.metros || 0), 0))}
                </td>
                <td className="border px-2 py-2"></td>
                <td className="border px-2 py-2 font-bold">{formatearNumero(totalBienesExclusivos)}</td>
                <td className="border px-2 py-2"></td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gray-500 italic">No hay bienes comunes de uso exclusivo registrados.</p>
        )}
      </div>

      {/* Bienes Comunes */}
      <div className="mt-4 p-3 border rounded">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium text-gray-700">Bienes Comunes</h4>
          <button
            type="button"
            onClick={agregarBienComun}
            className="bg-green-900 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
          >
            Agregar
          </button>
        </div>
        
        {bienesComunes.length > 0 ? (
          <table className="w-full border-collapse mt-2 text-sm mb-4">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-2 py-2">Descripción</th>
                <th className="border px-2 py-2">m²</th>
                <th className="border px-2 py-2">U$S/m²</th>
                <th className="border px-2 py-2">Valor Total (USD)</th>
                <th className="border px-2 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bienesComunes.map((bien) => (
                <tr key={bien.id}>
                  <td className="border px-2 py-2">
                    <input
                      type="text"
                      value={bien.descripcion}
                      onChange={(e) => actualizarBienComun(bien.id, 'descripcion', e.target.value)}
                      className="w-full px-1 py-1 border rounded-sm"
                      placeholder="Ej: Garaje, Muros"
                    />
                  </td>
                  <td className="border px-2 py-2">
                    <InputNumerico
                      value={bien.metros}
                      onChange={(valor) => actualizarBienComun(bien.id, 'metros', valor)}
                      className="w-full px-1 py-1 border rounded-sm"
                    />
                  </td>
                  <td className="border px-2 py-2">
                    <InputNumerico
                      value={bien.valorMetro}
                      onChange={(valor) => actualizarBienComun(bien.id, 'valorMetro', valor)}
                      className="w-full px-1 py-1 border rounded-sm"
                    />
                  </td>
                  <td className="border px-2 py-2">
                    <InputNumerico
                      value={bien.valor}
                      onChange={(valor) => actualizarBienComun(bien.id, 'valor', valor)}
                      className="w-full px-1 py-1 border rounded-sm"
                    />
                  </td>
                  <td className="border px-2 py-2">
                    <button
                      onClick={() => eliminarBienComun(bien.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-200">
                <td className="border px-2 py-2 font-bold">Total Bienes Comunes</td>
                <td className="border px-2 py-2 font-bold">
                  {formatearNumero(bienesComunes.reduce((total, bien) => total + parseFloat(bien.metros || 0), 0))}
                </td>
                <td className="border px-2 py-2"></td>
                <td className="border px-2 py-2 font-bold">{formatearNumero(totalBienesComunes)}</td>
                <td className="border px-2 py-2"></td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gray-500 italic mb-4">No hay bienes comunes registrados.</p>
        )}
        
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">Muros, ductos, circulaciones, etc.</label>
            <InputNumerico
              value={murosDuctosValor}
              onChange={setMurosDuctosValor}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">Total Obra Civil</label>
            <input
              type="text"
              value={formatearNumero(totalObraCivilHsbc)}
              className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculoHsbcExtension;