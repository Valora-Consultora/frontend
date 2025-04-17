import { combineSlices } from "@reduxjs/toolkit";
import apiClient from "./apiClient";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; 

const InformeService = {

    createInforme: async (informeData,bancoSeleccionado) => {
      try {
          const response = await axios.post(`${API_URL}/api/create-informe-${bancoSeleccionado}`, informeData, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          return response.data;
      } catch (error) {
          console.error('Error al crear el informe :', error.data);
          throw error;
      }
    },

    approveInforme: async (id) => {
        try {
            const response = await axios.put(`${API_URL}/api/informe/approve/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al aprobar el informe:', error);
            throw error;
        }
    },

    disapproveInforme: async (id) => {
        try {
            const response = await axios.put(`${API_URL}/api/informe/disapprove/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al aprobar el informe:', error);
            throw error;
        }
    },

    getInformesByTasador: async (tasador) => {  
        try {
            const response = await axios.get(`${API_URL}/api/informe/tasador/${tasador.id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los informes:', error);
            throw error;
        }
    },
    
    getAllInformes: async () => {  
        try {
            const response = await axios.get(`${API_URL}/api/informe`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los informes:', error);
            throw error;
        }
    },

    getInformeById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/api/informe/${id}`);
            //console.log('obtained', response);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el informe:', error);
            throw error;
        }
    },

   /*  updateInspeccion: async (id, inspeccionData) => {
        try {

            //console.log('ingresa en el update de inspeccionService');
            //console.log('inspeccionData', inspeccionData);

            
            const response = await axios.put(`${API_URL}/api/inspecciones/${id}`, inspeccionData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //console.log('response ' + response)
            return response.data;
        } catch (error) {
            console.error('Error al actualizar inspeccion:', error);
            throw error;
        }
    },

    deleteInspeccion: async (id) => {
        try {
            //console.log('Llega al deleteInspeccion ')
          const response = await axios.delete(`${API_URL}/api/inspeccion/${id}`);
          return response.data;
        } catch (error) {
          console.error("Error al eliminar la inspección:", error);
          return null;
        }
    }, */


}

export default InformeService;