export interface Board {
  id: string;
  name: string;
  category: 'arduino' | 'raspberry-pi' | 'fpga';
  manufacturer: string;
  description: string;
  specs: Record<string, string | number>;
  image: string;
  svgFootprint: string;
  dimensions: { width: number; height: number; thickness: number };
  ioSummary: {
    digitalPins: number;
    analogInputs: number;
    communication: string[];
  };
  power: {
    supply: string;
    maxCurrentMa: number;
  };
}

export interface ModuleMetadata {
  id: string;
  name: string;
  description: string;
  sourceUrl: string;
  category: 'sensor' | 'actuator' | 'communication' | 'power' | 'display';
  compatibleBoards: string[];
  status: 'compatible' | 'partial' | 'unsupported';
  dimensions: { width: number; height: number; depth: number };
  icon?: string;
  electrical: {
    supplyVoltage: string;
    typicalCurrentMa: number;
    ioPins: number;
    interfaces: string[];
  };
  mechanical?: {
    weightGrams?: number;
  };
}

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
}
