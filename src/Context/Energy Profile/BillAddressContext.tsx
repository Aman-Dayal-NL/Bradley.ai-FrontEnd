
import /* React, */ { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface Bill {
  id: string;
  name: string;
  size: number;
  type: 'electric' | 'gas';
  dateRange: { start: string; end: string };
}

interface Address {
  id: string;
  address: string;
}

interface BillAddressMapping {
  [billId: string]: string; // addressId
}

interface BillAddressContextType {
  bills: Bill[];
  addBill: (bill: Omit<Bill, 'id'>) => void;
  removeBill: (billId: string) => void;
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  mapping: BillAddressMapping;
  assignAddressToBill: (billId:string, addressId: string) => void;
  getAssignedAddress: (billId: string) => string | undefined;
  getUnassignedAddresses: () => Address[];
  isAddressAssigned: (addressId: string) => boolean;
  updateBillDateRange: (billId: string, dateRange: { start: string; end: string }) => void;
}

const BillAddressContext = createContext<BillAddressContextType | undefined>(undefined);

interface BillAddressProviderProps {
  children: ReactNode;
  appPrefix: string;
}

export const BillAddressProvider = ({ children, appPrefix }: BillAddressProviderProps) => {
  const [bills, setBills] = useState<Bill[]>(() => {
    const saved = Cookies.get(`${appPrefix}_bills`);
    if (saved) {
      const parsedBills = JSON.parse(saved);
      // Migration logic: ensure all bills have a dateRange property
      return parsedBills.map((bill: any) => ({
        ...bill,
        dateRange: bill.dateRange || { start: '', end: '' },
      }));
    }
    return [];
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = Cookies.get(`${appPrefix}_addresses`);
    return saved ? JSON.parse(saved) : [];
  });

  const [mapping, setMapping] = useState<BillAddressMapping>(() => {
    const saved = Cookies.get(`${appPrefix}_mapping`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    Cookies.set(`${appPrefix}_bills`, JSON.stringify(bills));
  }, [bills, appPrefix]);

  useEffect(() => {
    Cookies.set(`${appPrefix}_addresses`, JSON.stringify(addresses));
  }, [addresses, appPrefix]);

  useEffect(() => {
    Cookies.set(`${appPrefix}_mapping`, JSON.stringify(mapping));
  }, [mapping, appPrefix]);

  const addBill = (bill: Omit<Bill, 'id' | 'dateRange'>) => {
    const newBill = { ...bill, id: `bill_${Date.now()}`, dateRange: { start: '', end: '' } };
    setBills(prev => [...prev, newBill]);
  };

  const removeBill = (billId: string) => {
    setBills(prev => prev.filter(b => b.id !== billId));
    const newMapping = { ...mapping };
    delete newMapping[billId];
    setMapping(newMapping);
  };

  const assignAddressToBill = (billId: string, addressId: string) => {
    setMapping(prev => ({ ...prev, [billId]: addressId }));
  };

  const getAssignedAddress = (billId: string) => {
    return mapping[billId];
  };

  const isAddressAssigned = (addressId: string) => {
    return Object.values(mapping).includes(addressId);
  }

  const getUnassignedAddresses = () => {
    const assignedAddressIds = Object.values(mapping);
    return addresses.filter(a => !assignedAddressIds.includes(a.id));
  };

  const updateBillDateRange = (billId: string, dateRange: { start: string; end: string }) => {
    setBills(prev => prev.map(b => b.id === billId ? { ...b, dateRange } : b));
  };

  return (
    <BillAddressContext.Provider value={{
      bills,
      addBill,
      removeBill,
      addresses,
      setAddresses,
      mapping,
      assignAddressToBill,
      getAssignedAddress,
      getUnassignedAddresses,
      isAddressAssigned,
      updateBillDateRange
    }}>
      {children}
    </BillAddressContext.Provider>
  );
};

export const useBillAddress = () => {
  const context = useContext(BillAddressContext);
  if (!context) {
    throw new Error('useBillAddress must be used within a BillAddressProvider');
  }
  return context;
};
