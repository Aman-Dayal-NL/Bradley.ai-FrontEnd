import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

// Interface for the serializable metadata of a file.
interface FileMetadata {
  name: string;
  size: string; // Stored as a formatted string e.g., "1.23 MB"
}

// Main state interface
interface ElectricBillUploadState {
  fileMetadata: FileMetadata[];
}

interface ElectricBillUploadContextType {
  electricBillUploadState: ElectricBillUploadState;
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileName: string) => void;
}

const ElectricBillUploadContext = createContext<ElectricBillUploadContextType | undefined>(undefined);

// Changed hook name to match convention
export const useElectricBillUploadProvider = () => {
  const context = useContext(ElectricBillUploadContext);
  if (!context) {
    throw new Error('useElectricBillUpload must be used within an ElectricBillUploadProvider');
  }
  return context;
};

const defaultState: ElectricBillUploadState = {
  fileMetadata: [],
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const ElectricBillUploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [electricBillUploadState, setElectricBillUploadState] = useState<ElectricBillUploadState>(() => {
    const savedState = Cookies.get('electricBillUploadState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    // Only fileMetadata and dateRange are in state, so the whole object is safe to save.
    Cookies.set('electricBillUploadState', JSON.stringify(electricBillUploadState));
  }, [electricBillUploadState]);

  const addFiles = (newFiles: File[]) => {
    setElectricBillUploadState(prevState => {
      const newMetadata = newFiles.map(file => ({ 
        name: file.name, 
        size: formatFileSize(file.size) // Store size as formatted text
      }));
      
      const uniqueNewMetadata = newMetadata.filter(
        nm => !prevState.fileMetadata.some(em => em.name === nm.name)
      );
      
      return {
        ...prevState,
        fileMetadata: [...prevState.fileMetadata, ...uniqueNewMetadata],
      };
    });
  };

  const removeFile = (fileName: string) => {
    setElectricBillUploadState(prevState => ({
      ...prevState,
      fileMetadata: prevState.fileMetadata.filter(meta => meta.name !== fileName),
    }));
  };

  return (
    <ElectricBillUploadContext.Provider value={{ electricBillUploadState, addFiles, removeFile }}>
      {children}
    </ElectricBillUploadContext.Provider>
  );
};