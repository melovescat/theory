export interface Board {
  id: string;
  name: string;
  category: 'arduino' | 'raspberry-pi' | 'fpga';
  manufacturer: string;
  description: string;
  specs: Record<string, string | number>;
  image: string;
  svgFootprint: string;
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
}

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
}
