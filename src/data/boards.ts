import type { Board } from '../types';

interface ConnectorZone {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

const createFootprintSvg = (
  label: string,
  width: number,
  height: number,
  connectors: ConnectorZone[]
) => {
  const connectorMarkup = connectors
    .map(
      (connector) => `
        <g>
          <rect x="${connector.x}" y="${connector.y}" width="${connector.width}" height="${connector.height}" rx="1.6" ry="1.6" fill="rgba(56,189,248,0.22)" stroke="rgba(14,165,233,0.7)" stroke-width="0.8" />
          <text x="${connector.x + connector.width / 2}" y="${connector.y + connector.height / 2 + 2}" font-size="4" fill="rgba(148,163,184,0.9)" font-family="'Inter', 'Segoe UI', sans-serif" text-anchor="middle">${connector.label}</text>
        </g>
      `
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="boardGradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="4" ry="4" fill="url(#boardGradient)" stroke="#1d4ed8" stroke-width="1.2" />
  ${connectorMarkup}
  <text x="${width / 2}" y="${height / 2}" font-size="6" fill="#f8fafc" font-family="'Inter', 'Segoe UI', sans-serif" text-anchor="middle">${label}</text>
</svg>`;
};

export const boards: Board[] = [
  {
    id: 'arduino-uno-r3',
    name: 'Arduino Uno R3',
    category: 'arduino',
    manufacturer: 'Arduino',
    description:
      'ATmega328P-based development board with USB connectivity and a robust accessory ecosystem for rapid prototyping.',
    specs: {
      'Microcontroller': 'ATmega328P',
      'Clock Speed': '16 MHz',
      'Flash Memory': '32 KB',
      'SRAM': '2 KB',
      'Operating Voltage': '5 V',
      'GPIO Pins': 14,
      'PWM Channels': 6,
      'Analog Inputs': 6
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg',
    svgFootprint: createFootprintSvg('UNO', 68.6, 53.4, [
      { x: 3.5, y: 3.6, width: 61.6, height: 4.8, label: 'Digital I/O' },
      { x: 3.5, y: 44, width: 36, height: 4.8, label: 'Analog In' },
      { x: 58.5, y: 18, width: 7.6, height: 16, label: 'USB' },
      { x: 5, y: 18, width: 9.6, height: 14, label: 'Power' }
    ]),
    dimensions: { width: 68.6, height: 53.4, thickness: 15 },
    ioSummary: {
      digitalPins: 14,
      analogInputs: 6,
      communication: ['UART', 'I2C', 'SPI']
    },
    power: { supply: '5 V USB / 7–12 V VIN', maxCurrentMa: 500 }
  },
  {
    id: 'arduino-portenta-h7',
    name: 'Arduino Portenta H7',
    category: 'arduino',
    manufacturer: 'Arduino Pro',
    description:
      'Dual-core STM32H747XI SOM with Wi-Fi, Bluetooth, high-speed peripherals and industrial temperature ratings.',
    specs: {
      'Microcontroller': 'STM32H747XI (Cortex-M7 + Cortex-M4)',
      'Clock Speed': '480 MHz / 240 MHz',
      'RAM': '8 MB SDRAM + 1 MB SRAM',
      'Flash Memory': '16 MB QSPI + 2 MB Flash',
      'Wireless': 'Wi-Fi 802.11b/g/n, Bluetooth LE',
      'Security': 'Cryptographic accelerator with secure element'
    },
    image: 'https://content.arduino.cc/assets/PortentaH7_product.png',
    svgFootprint: createFootprintSvg('Portenta', 103.6, 25, [
      { x: 3, y: 2.4, width: 97.6, height: 3.6, label: 'High-Density IO' },
      { x: 3, y: 19, width: 30, height: 3.6, label: 'PMIC' },
      { x: 68, y: 18.5, width: 28, height: 4, label: 'USB-C' }
    ]),
    dimensions: { width: 103.6, height: 25, thickness: 13 },
    ioSummary: {
      digitalPins: 80,
      analogInputs: 16,
      communication: ['UART', 'SPI', 'I2C', 'CAN', 'USB HS', 'ETH']
    },
    power: { supply: '5 V USB-C / 6–36 V VIN', maxCurrentMa: 1500 }
  },
  {
    id: 'adafruit-feather-rp2040',
    name: 'Adafruit Feather RP2040',
    category: 'arduino',
    manufacturer: 'Adafruit',
    description:
      'Feather-format RP2040 board with USB-C, STEMMA QT connector and native CircuitPython support.',
    specs: {
      'Microcontroller': 'Raspberry Pi RP2040',
      'Clock Speed': '133 MHz',
      'Flash Memory': '8 MB QSPI',
      'RAM': '264 KB SRAM',
      'Operating Voltage': '3.3 V',
      'GPIO Pins': 21,
      'Analog Inputs': 4,
      'Connector': 'STEMMA QT / Qwiic'
    },
    image: 'https://cdn-learn.adafruit.com/assets/assets/000/103/820/medium640/adafruit_products_rp2040-feather.png?1614286062',
    svgFootprint: createFootprintSvg('Feather', 50.8, 22.9, [
      { x: 2.4, y: 2.4, width: 46, height: 3.4, label: 'Feather Header A' },
      { x: 2.4, y: 17.1, width: 46, height: 3.4, label: 'Feather Header B' },
      { x: 18, y: 9, width: 14, height: 4.2, label: 'USB-C' }
    ]),
    dimensions: { width: 50.8, height: 22.9, thickness: 8 },
    ioSummary: {
      digitalPins: 21,
      analogInputs: 4,
      communication: ['UART', 'SPI', 'I2C', 'PIO']
    },
    power: { supply: 'USB-C 5 V / LiPo 3.7 V', maxCurrentMa: 600 }
  },
  {
    id: 'sparkfun-redboard-artemis',
    name: 'SparkFun RedBoard Artemis',
    category: 'arduino',
    manufacturer: 'SparkFun',
    description:
      'Ambiq Apollo3-powered Arduino-compatible board with Bluetooth LE and ultra-low-power performance.',
    specs: {
      'Microcontroller': 'Ambiq Apollo3',
      'Clock Speed': '48 MHz (96 MHz burst)',
      'Flash Memory': '1 MB',
      'SRAM': '384 KB',
      'Operating Voltage': '3.3 V',
      'Wireless': 'Bluetooth LE 5.0',
      'GPIO Pins': 23
    },
    image: 'https://cdn.sparkfun.com//assets/parts/1/3/9/6/8/15444-SparkFun_RedBoard_Artemis-01.jpg',
    svgFootprint: createFootprintSvg('Artemis', 68.6, 53.4, [
      { x: 4, y: 4, width: 60, height: 5, label: 'GPIO' },
      { x: 4, y: 44, width: 44, height: 5, label: 'Analog' },
      { x: 55, y: 20, width: 10, height: 18, label: 'USB-C' }
    ]),
    dimensions: { width: 68.6, height: 53.4, thickness: 14 },
    ioSummary: {
      digitalPins: 23,
      analogInputs: 8,
      communication: ['UART', 'SPI', 'I2C', 'Bluetooth LE']
    },
    power: { supply: 'USB-C 5 V / 3.3 V regulated', maxCurrentMa: 600 }
  },
  {
    id: 'raspberry-pi-5-8gb',
    name: 'Raspberry Pi 5 (8 GB)',
    category: 'raspberry-pi',
    manufacturer: 'Raspberry Pi',
    description:
      'Latest flagship Raspberry Pi single-board computer delivering desktop-class Arm performance with PCIe and dual 4K HDMI.',
    specs: {
      CPU: '2.4 GHz quad-core Cortex-A76',
      GPU: 'VideoCore VII @ 1 GHz',
      RAM: '8 GB LPDDR4X',
      Networking: 'Wi-Fi 6, Bluetooth 5.0, Gigabit Ethernet',
      Storage: 'microSD, PCIe 2.0 x1',
      USB: '2× USB 3.0, 2× USB 2.0',
      Video: '2× micro-HDMI 2.1 (4K60)'
    },
    image: 'https://www.raspberrypi.com/app/uploads/2023/10/Raspberry-Pi-5-angled.png',
    svgFootprint: createFootprintSvg('Pi 5', 85, 56, [
      { x: 5, y: 5, width: 75, height: 6, label: '40-pin GPIO' },
      { x: 60, y: 18, width: 20, height: 10, label: 'USB 3.0' },
      { x: 58, y: 34, width: 22, height: 10, label: 'HDMI' },
      { x: 6, y: 18, width: 14, height: 12, label: 'Power' }
    ]),
    dimensions: { width: 85, height: 56, thickness: 17 },
    ioSummary: {
      digitalPins: 28,
      analogInputs: 0,
      communication: ['GPIO', 'I2C', 'SPI', 'UART', 'PCIe', 'MIPI CSI/DSI']
    },
    power: { supply: 'USB-C PD (5 V / 5 A)', maxCurrentMa: 5000 }
  },
  {
    id: 'raspberry-pi-4-model-b-4gb',
    name: 'Raspberry Pi 4 Model B (4 GB)',
    category: 'raspberry-pi',
    manufacturer: 'Raspberry Pi',
    description:
      'Widely deployed single-board computer with quad-core Cortex-A72 CPU, dual micro-HDMI and Gigabit networking.',
    specs: {
      CPU: '1.5 GHz quad-core Cortex-A72',
      GPU: 'VideoCore VI',
      RAM: '4 GB LPDDR4',
      Networking: 'Wi-Fi 5, Bluetooth 5.0, Gigabit Ethernet',
      USB: '2× USB 3.0, 2× USB 2.0',
      Video: '2× micro-HDMI 2.0 (4K30)',
      Storage: 'microSD'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Raspberry_Pi_4_Model_B_-_Side.jpg',
    svgFootprint: createFootprintSvg('Pi 4', 85, 56, [
      { x: 5, y: 5, width: 75, height: 6, label: '40-pin GPIO' },
      { x: 58, y: 18, width: 24, height: 10, label: 'USB 3.0' },
      { x: 58, y: 34, width: 24, height: 10, label: 'micro-HDMI' },
      { x: 6, y: 18, width: 14, height: 12, label: 'USB-C' }
    ]),
    dimensions: { width: 85, height: 56, thickness: 17 },
    ioSummary: {
      digitalPins: 28,
      analogInputs: 0,
      communication: ['GPIO', 'I2C', 'SPI', 'UART', 'MIPI CSI/DSI']
    },
    power: { supply: 'USB-C 5 V / 3 A', maxCurrentMa: 3000 }
  },
  {
    id: 'raspberry-pi-pico-w',
    name: 'Raspberry Pi Pico W',
    category: 'raspberry-pi',
    manufacturer: 'Raspberry Pi',
    description:
      'Dual-core RP2040 microcontroller board with integrated Infineon CYW43439 Wi-Fi for low-power connected applications.',
    specs: {
      'Microcontroller': 'RP2040',
      'Clock Speed': '133 MHz',
      'Flash Memory': '2 MB',
      'RAM': '264 KB SRAM',
      Wireless: '2.4 GHz 802.11n Wi-Fi',
      'Operating Voltage': '1.8–5.5 V',
      'GPIO Pins': 26
    },
    image: 'https://datasheets.raspberrypi.com/picow/PIOP-Pico-W-top.png',
    svgFootprint: createFootprintSvg('Pico W', 51, 21, [
      { x: 2.4, y: 2.2, width: 46.2, height: 3.2, label: 'Header A' },
      { x: 2.4, y: 15.6, width: 46.2, height: 3.2, label: 'Header B' },
      { x: 18, y: 7.5, width: 14, height: 5, label: 'Wi-Fi' }
    ]),
    dimensions: { width: 51, height: 21, thickness: 5 },
    ioSummary: {
      digitalPins: 26,
      analogInputs: 3,
      communication: ['UART', 'SPI', 'I2C', 'PIO']
    },
    power: { supply: 'USB 5 V / VSYS 1.8–5.5 V', maxCurrentMa: 700 }
  },
  {
    id: 'nvidia-jetson-orin-nano',
    name: 'NVIDIA Jetson Orin Nano 8GB Developer Kit',
    category: 'raspberry-pi',
    manufacturer: 'NVIDIA',
    description:
      'AI edge computing kit delivering up to 40 TOPS with an Orin Nano module and rich I/O for robotics and vision workloads.',
    specs: {
      CPU: '6-core Arm Cortex-A78AE',
      GPU: '1024-core NVIDIA Ampere',
      RAM: '8 GB LPDDR5',
      Storage: '64 GB eMMC, microSD slot',
      Networking: '2.5 Gb Ethernet, Wi-Fi via M.2',
      Video: '2× MIPI CSI, 1× DP 1.4a'
    },
    image: 'https://developer.nvidia.com/sites/default/files/akamai/embedded/images/jetson-orin-nano-dev-kit-front-angle.png',
    svgFootprint: createFootprintSvg('Jetson', 100, 80, [
      { x: 5, y: 5, width: 90, height: 8, label: '40-pin Expansion' },
      { x: 8, y: 26, width: 30, height: 12, label: 'DP 1.4a' },
      { x: 62, y: 26, width: 30, height: 12, label: 'USB-C' },
      { x: 40, y: 58, width: 20, height: 14, label: 'M.2 Key' }
    ]),
    dimensions: { width: 100, height: 80, thickness: 25 },
    ioSummary: {
      digitalPins: 40,
      analogInputs: 0,
      communication: ['PCIe', 'I2C', 'SPI', 'UART', 'CAN', 'GPIO']
    },
    power: { supply: 'USB-C 5 V / Barrel 19 V', maxCurrentMa: 6500 }
  },
  {
    id: 'digilent-nexys-a7-100t',
    name: 'Digilent Nexys A7-100T',
    category: 'fpga',
    manufacturer: 'Digilent',
    description:
      'Artix-7 FPGA development board with DDR3 memory, dual Ethernet PHYs and rich expansion for digital design education.',
    specs: {
      FPGA: 'Xilinx XC7A100T-1CSG324C',
      Memory: '128 MB DDR3L, 16 MB Quad-SPI Flash',
      Clocks: '100 MHz on-board oscillator',
      Connectivity: 'Dual USB-UART/JTAG, 10/100 Ethernet, microSD',
      Expansion: 'Pmod, XADC, FMC LPC',
      Power: 'USB or 12 V barrel jack'
    },
    image: 'https://digilent.com/reference/_media/nexys-a7/nexys-a7-100t.png',
    svgFootprint: createFootprintSvg('Nexys A7', 190, 140, [
      { x: 6, y: 6, width: 70, height: 10, label: 'Pmod Bank A' },
      { x: 114, y: 6, width: 70, height: 10, label: 'Pmod Bank B' },
      { x: 10, y: 118, width: 40, height: 12, label: 'Ethernet' },
      { x: 140, y: 118, width: 40, height: 12, label: 'USB / Power' }
    ]),
    dimensions: { width: 190, height: 140, thickness: 20 },
    ioSummary: {
      digitalPins: 200,
      analogInputs: 8,
      communication: ['GPIO', 'Ethernet', 'USB-UART', 'FMC LPC']
    },
    power: { supply: 'USB 5 V / 7–15 V barrel', maxCurrentMa: 2500 }
  },
  {
    id: 'terasic-de10-nano',
    name: 'Terasic DE10-Nano',
    category: 'fpga',
    manufacturer: 'Terasic',
    description:
      'Cyclone V SoC FPGA kit combining dual-core ARM Cortex-A9 with FPGA fabric, HDMI, ADC and extensive GPIO headers.',
    specs: {
      FPGA: 'Intel Cyclone V SE 5CSEBA6U23I7',
      Processor: 'Dual-core ARM Cortex-A9 @ 925 MHz',
      Memory: '1 GB DDR3, 64 MB SDRAM, 8 MB SRAM',
      Storage: '8 GB microSD (included)',
      Connectivity: 'HDMI, USB OTG, Gigabit Ethernet, ADC',
      Expansion: '2× 40-pin GPIO, Arduino Header'
    },
    image: 'https://www.terasic.com.tw/cgi-bin/page/archive.pl?Language=English&No=1046&PartNo=1',
    svgFootprint: createFootprintSvg('DE10-Nano', 120, 70, [
      { x: 4, y: 4, width: 112, height: 8, label: 'GPIO Bank A' },
      { x: 4, y: 58, width: 112, height: 8, label: 'GPIO Bank B' },
      { x: 10, y: 24, width: 30, height: 12, label: 'HDMI' },
      { x: 78, y: 24, width: 32, height: 12, label: 'Ethernet' }
    ]),
    dimensions: { width: 120, height: 70, thickness: 22 },
    ioSummary: {
      digitalPins: 148,
      analogInputs: 6,
      communication: ['GPIO', 'I2C', 'SPI', 'UART', 'ADC', 'Ethernet']
    },
    power: { supply: '5 V barrel jack', maxCurrentMa: 4000 }
  },
  {
    id: 'xilinx-kria-kv260',
    name: 'Xilinx Kria KV260 Vision AI Starter Kit',
    category: 'fpga',
    manufacturer: 'AMD Xilinx',
    description:
      'Adaptive SoM featuring Zynq UltraScale+ MPSoC for embedded vision with pre-built acceleration stacks and M.2 expansion.',
    specs: {
      MPSoC: 'Zynq UltraScale+ XCK26-SFVC784',
      Memory: '4 GB LPDDR4, 16 GB eMMC',
      Connectivity: '2× USB 3.0, Gigabit Ethernet, 2× DisplayPort',
      Acceleration: 'Vision, robotics, sensor fusion apps',
      Expansion: '2× SYZYGY, Raspberry Pi header, M.2 Key M'
    },
    image: 'https://www.xilinx.com/content/dam/xilinx/imgs/products/adaptive-socs-and-fpgas/kria/kv260-starter-kit-angle.png',
    svgFootprint: createFootprintSvg('KV260', 120, 77, [
      { x: 6, y: 6, width: 108, height: 8, label: 'Raspberry Pi Header' },
      { x: 8, y: 28, width: 32, height: 12, label: 'DP Out' },
      { x: 80, y: 28, width: 32, height: 12, label: 'USB 3.0' },
      { x: 42, y: 56, width: 36, height: 12, label: 'SYZYGY' }
    ]),
    dimensions: { width: 120, height: 77, thickness: 24 },
    ioSummary: {
      digitalPins: 180,
      analogInputs: 0,
      communication: ['Gigabit Ethernet', 'USB 3.0', 'DisplayPort', 'MIPI', 'SYZYGY']
    },
    power: { supply: '12 V barrel jack', maxCurrentMa: 3500 }
  },
  {
    id: 'lattice-ecp5-versa',
    name: 'Lattice ECP5 Versa Development Kit',
    category: 'fpga',
    manufacturer: 'Lattice Semiconductor',
    description:
      'ECP5 FPGA platform with SERDES, dual camera connectors and PCIe for communications and industrial automation designs.',
    specs: {
      FPGA: 'LFE5UM-85F-8BG381',
      Memory: '64 MB SDRAM, 32 Mbit SPI Flash',
      Connectivity: 'USB, Gigabit Ethernet, DisplayPort, HDMI',
      Expansion: 'PCIe edge connector, GPIO header, Dual CSI-2',
      Clocking: '125 MHz and 27 MHz oscillators'
    },
    image: 'https://www.latticesemi.com/-/media/LatticeSemi/Documents/DataSheets/ECP5/VersaECP5Board.ashx',
    svgFootprint: createFootprintSvg('ECP5 Versa', 120, 80, [
      { x: 6, y: 6, width: 40, height: 10, label: 'GPIO Header' },
      { x: 74, y: 6, width: 40, height: 10, label: 'DisplayPort' },
      { x: 10, y: 60, width: 40, height: 12, label: 'PCIe Edge' },
      { x: 70, y: 60, width: 40, height: 12, label: 'Ethernet / USB' }
    ]),
    dimensions: { width: 120, height: 80, thickness: 18 },
    ioSummary: {
      digitalPins: 120,
      analogInputs: 0,
      communication: ['PCIe', 'Gigabit Ethernet', 'DisplayPort', 'HDMI', 'GPIO']
    },
    power: { supply: '12 V barrel jack', maxCurrentMa: 3000 }
  }
];

export const defaultBoard = boards[0];

export const boardCategories = [
  { id: 'arduino', label: 'Arduino & Microcontroller', color: 'from-blue-500 via-sky-500 to-cyan-400' },
  { id: 'raspberry-pi', label: 'Raspberry Pi & SBC', color: 'from-emerald-500 via-teal-500 to-cyan-400' },
  { id: 'fpga', label: 'FPGA & SoC', color: 'from-purple-500 via-fuchsia-500 to-pink-400' }
] as const;
