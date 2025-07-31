import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface FileMetadata {
	name: string;
	size: number;
	type: string;
}

interface NaturalGasBillUploadState {
	files: File[];
	fileMetadata: FileMetadata[];
}

interface NaturalGasBillUploadContextType {
	naturalGasBillUploadState: NaturalGasBillUploadState;
	addFiles: (newFiles: File[]) => void;
	removeFile: (fileName: string) => void;
}

const NaturalGasBillUploadContext = createContext<NaturalGasBillUploadContextType | undefined>(undefined);

export const useNaturalGasBillUploadProvider = () => {
	const context = useContext(NaturalGasBillUploadContext);
	if (!context) {
		throw new Error('useNaturalGasBillUpload must be used within an NaturalGasBillUploadProvider');
	}
	return context;
};

const defaultState: NaturalGasBillUploadState = {
	files: [],
	fileMetadata: [],
};

export const NaturalGasBillUploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [naturalGasBillUploadState, setNaturalGasBillUploadState] = useState<NaturalGasBillUploadState>(() => {
		const savedState = Cookies.get('naturalGasBillUploadState');
		if (savedState) {
			const { fileMetadata, dateRange } = JSON.parse(savedState);
			return { files: [], fileMetadata, dateRange };
		}
		return defaultState;
	});

	useEffect(() => {
		const stateToSave = {
			fileMetadata: naturalGasBillUploadState.fileMetadata,
		};
		Cookies.set('naturalGasBillUploadState', JSON.stringify(stateToSave));
	}, [naturalGasBillUploadState.fileMetadata]);

	const addFiles = (newFiles: File[]) => {
		setNaturalGasBillUploadState(prevState => {
			const newMetadata = newFiles.map(file => ({ name: file.name, size: file.size, type: file.type }));
			const uniqueNewFiles = newFiles.filter(nf => !prevState.files.some(ef => ef.name === nf.name));
			const uniqueNewMetadata = newMetadata.filter(nm => !prevState.fileMetadata.some(em => em.name === nm.name));
			
			return {
				...prevState,
				files: [...prevState.files, ...uniqueNewFiles],
				fileMetadata: [...prevState.fileMetadata, ...uniqueNewMetadata],
			};
		});
	};

	const removeFile = (fileName: string) => {
		setNaturalGasBillUploadState(prevState => ({
			...prevState,
			files: prevState.files.filter(file => file.name !== fileName),
			fileMetadata: prevState.fileMetadata.filter(meta => meta.name !== fileName),
		}));
	};

	return (
		<NaturalGasBillUploadContext.Provider value={{ naturalGasBillUploadState, addFiles, removeFile }}>
			{children}
		</NaturalGasBillUploadContext.Provider>
	);
};