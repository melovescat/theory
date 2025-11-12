import type { ModuleMetadata } from '../types';
import { boards } from './boards';

const allBoardIds = boards.map((board) => board.id);
const microcontrollerBoards = boards.filter((board) => board.category === 'arduino').map((board) => board.id);
const singleBoardComputers = boards
  .filter((board) => board.category === 'raspberry-pi')
  .map((board) => board.id);
const controllerFriendlyBoards = [...new Set([...microcontrollerBoards, ...singleBoardComputers])];

export const moduleLibrary: ModuleMetadata[] = [
  {
    id: 'mod-bme688',
    name: 'Bosch BME688 Environmental Sensor',
    description: 'High precision humidity, pressure, gas and temperature sensor with AI-based gas scanning.',
    sourceUrl: 'https://www.bosch-sensortec.com/products/environmental-sensors/gas-sensors/bme688/',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 25, height: 25, depth: 5 },
    icon: 'BsCloudFog2',
    electrical: {
      supplyVoltage: '1.71–3.6 V',
      typicalCurrentMa: 3.6,
      ioPins: 2,
      interfaces: ['I2C', 'SPI']
    },
    mechanical: { weightGrams: 3 }
  },
  {
    id: 'mod-vl53l5cx',
    name: 'VL53L5CX Time-of-Flight Array',
    description: '8×8 ToF sensor with wide field of view depth sensing up to 400 cm.',
    sourceUrl: 'https://www.st.com/en/imaging-and-photonics-solutions/vl53l5cx.html',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 18, height: 18, depth: 6 },
    icon: 'BsViewList',
    electrical: {
      supplyVoltage: '2.6–3.5 V',
      typicalCurrentMa: 68,
      ioPins: 2,
      interfaces: ['I2C']
    },
    mechanical: { weightGrams: 2.5 }
  },
  {
    id: 'mod-pixy2',
    name: 'Pixy2 CMUcam5 Smart Vision',
    description: 'Fast vision sensor for color object recognition and line following.',
    sourceUrl: 'https://pixycam.com/pixy2/',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 45, height: 35, depth: 25 },
    icon: 'BsCameraVideo',
    electrical: {
      supplyVoltage: '5 V',
      typicalCurrentMa: 140,
      ioPins: 4,
      interfaces: ['SPI', 'UART', 'I2C']
    },
    mechanical: { weightGrams: 10 }
  },
  {
    id: 'mod-mpu6050',
    name: 'MPU-6050 6-DOF IMU',
    description: '3-axis gyroscope and accelerometer combo sensor for motion tracking.',
    sourceUrl: 'https://invensense.tdk.com/products/motion-tracking/6-axis/mpu-6050/',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 21, height: 16, depth: 4 },
    icon: 'BsCompass',
    electrical: {
      supplyVoltage: '2.3–3.4 V',
      typicalCurrentMa: 3.9,
      ioPins: 2,
      interfaces: ['I2C']
    }
  },
  {
    id: 'mod-apds9960',
    name: 'APDS-9960 Gesture Sensor',
    description: 'RGB light, proximity, and gesture detection sensor for HMI.',
    sourceUrl: 'https://www.broadcom.com/products/optical-sensors/gesture-sensor/apds-9960',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 20, height: 20, depth: 5 },
    icon: 'BsHandIndexThumb',
    electrical: {
      supplyVoltage: '2.4–3.6 V',
      typicalCurrentMa: 5,
      ioPins: 2,
      interfaces: ['I2C']
    },
    mechanical: { weightGrams: 1.8 }
  },
  {
    id: 'mod-max30102',
    name: 'MAX30102 Pulse Oximetry Sensor',
    description: 'Integrated pulse oximeter and heart-rate sensor module for wellness projects.',
    sourceUrl: 'https://www.analog.com/en/products/max30102.html',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 18, height: 18, depth: 6 },
    icon: 'BsHeartPulse',
    electrical: {
      supplyVoltage: '1.8 V core / 3.3–5 V IO',
      typicalCurrentMa: 0.6,
      ioPins: 2,
      interfaces: ['I2C']
    },
    mechanical: { weightGrams: 2.2 }
  },
  {
    id: 'mod-hx711',
    name: 'HX711 Load Cell Amplifier',
    description: '24-bit ADC for weigh scales and industrial control applications.',
    sourceUrl: 'https://www.sparkfun.com/products/13879',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 22, height: 18, depth: 4 },
    icon: 'BsSpeedometer',
    electrical: {
      supplyVoltage: '2.6–5.5 V',
      typicalCurrentMa: 1.5,
      ioPins: 2,
      interfaces: ['SPI']
    }
  },
  {
    id: 'mod-ads1115',
    name: 'ADS1115 16-bit ADC',
    description: 'Precision 16-bit analog to digital converter with programmable gain.',
    sourceUrl: 'https://www.ti.com/product/ADS1115',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 25, height: 22, depth: 4 },
    icon: 'BsBarChart',
    electrical: {
      supplyVoltage: '2.0–5.5 V',
      typicalCurrentMa: 0.2,
      ioPins: 2,
      interfaces: ['I2C']
    }
  },
  {
    id: 'mod-lora-e5',
    name: 'LoRa-E5 Mini Module',
    description: 'LoRaWAN module powered by STM32WLE5 for long-range IoT connectivity.',
    sourceUrl: 'https://www.seeedstudio.com/LoRa-E5-Wireless-Module-p-4743.html',
    category: 'communication',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 40, height: 20, depth: 6 },
    icon: 'BsBroadcast',
    electrical: {
      supplyVoltage: '2.0–3.6 V',
      typicalCurrentMa: 62,
      ioPins: 6,
      interfaces: ['UART', 'I2C', 'SPI']
    }
  },
  {
    id: 'mod-esp32-wroom',
    name: 'ESP32-WROOM Dev Module',
    description: 'Wi-Fi and Bluetooth combo SoC module ideal for IoT prototyping.',
    sourceUrl: 'https://www.espressif.com/en/products/modules/esp32',
    category: 'communication',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 28, height: 18, depth: 6 },
    icon: 'BsWifi',
    electrical: {
      supplyVoltage: '2.3–3.6 V',
      typicalCurrentMa: 180,
      ioPins: 8,
      interfaces: ['UART', 'SPI', 'I2C', 'PWM']
    }
  },
  {
    id: 'mod-ublox-neo-m8n',
    name: 'u-blox NEO-M8N GNSS',
    description: 'Multi-constellation GNSS receiver for GPS, GLONASS, Galileo and BeiDou.',
    sourceUrl: 'https://www.u-blox.com/en/product/neo-m8-series',
    category: 'communication',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 28, height: 30, depth: 8 },
    icon: 'BsGeoAlt',
    electrical: {
      supplyVoltage: '2.7–3.6 V',
      typicalCurrentMa: 67,
      ioPins: 4,
      interfaces: ['UART', 'I2C', 'SPI']
    },
    mechanical: { weightGrams: 10 }
  },
  {
    id: 'mod-ina219',
    name: 'INA219 High-Side Current Sensor',
    description: 'I2C current monitor for precise power profiling of embedded systems.',
    sourceUrl: 'https://www.ti.com/product/INA219',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 26, height: 23, depth: 5 },
    icon: 'BsLightningCharge',
    electrical: {
      supplyVoltage: '3.0–5.5 V',
      typicalCurrentMa: 1,
      ioPins: 2,
      interfaces: ['I2C']
    }
  },
  {
    id: 'mod-scd41',
    name: 'Sensirion SCD41 CO₂ Sensor',
    description: 'Photoacoustic CO₂ sensor with temperature and humidity compensation.',
    sourceUrl: 'https://sensirion.com/products/catalog/SCD41/',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 27, height: 27, depth: 7 },
    icon: 'BsWind',
    electrical: {
      supplyVoltage: '2.4–5.5 V',
      typicalCurrentMa: 12,
      ioPins: 2,
      interfaces: ['I2C']
    }
  },
  {
    id: 'mod-pan1740a',
    name: 'Panasonic PAN1740A BLE Module',
    description: 'Bluetooth Low Energy module featuring Dialog Semiconductor SoC.',
    sourceUrl: 'https://industry.panasonic.eu/products/devices/wireless-connectivity/bluetooth-low-energy/pan1740a',
    category: 'communication',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 15, height: 19, depth: 3 },
    icon: 'BsBluetooth',
    electrical: {
      supplyVoltage: '1.8–3.6 V',
      typicalCurrentMa: 5.5,
      ioPins: 6,
      interfaces: ['UART', 'SPI', 'I2C']
    },
    mechanical: { weightGrams: 1 }
  },
  {
    id: 'mod-as7341',
    name: 'AS7341 11-Channel Spectral Sensor',
    description: '11-channel spectral color sensor for lighting and horticulture analytics.',
    sourceUrl: 'https://ams-osram.com/products/spectral-sensors/as7341',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 16, height: 16, depth: 4 },
    icon: 'BsPalette',
    electrical: {
      supplyVoltage: '2.7–3.6 V',
      typicalCurrentMa: 6,
      ioPins: 2,
      interfaces: ['I2C']
    }
  },
  {
    id: 'mod-ls7366r',
    name: 'LS7366R Quadrature Counter',
    description: '32-bit quadrature counter for precision motion control applications.',
    sourceUrl: 'https://lsicsi.com/datasheets/LS7366R.pdf',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 24, height: 24, depth: 6 },
    icon: 'BsGearWideConnected',
    electrical: {
      supplyVoltage: '4.5–5.5 V',
      typicalCurrentMa: 10,
      ioPins: 4,
      interfaces: ['SPI']
    }
  },
  {
    id: 'mod-lsm9ds1',
    name: 'LSM9DS1 9-DoF IMU',
    description: 'Accelerometer, gyroscope, magnetometer 9-axis motion sensor fusion.',
    sourceUrl: 'https://www.st.com/en/mems-and-sensors/lsm9ds1.html',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 22, height: 22, depth: 6 },
    icon: 'BsArrowRepeat',
    electrical: {
      supplyVoltage: '2.4–3.6 V',
      typicalCurrentMa: 6.9,
      ioPins: 4,
      interfaces: ['I2C', 'SPI']
    }
  },
  {
    id: 'mod-oled128x64',
    name: 'Monochrome OLED 128×64 Display',
    description: 'I2C/SPI OLED display for rapid UI prototyping with crisp text and graphics.',
    sourceUrl: 'https://learn.adafruit.com/monochrome-oled-breakouts',
    category: 'display',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 27, height: 27, depth: 8 },
    icon: 'BsDisplay',
    electrical: {
      supplyVoltage: '3.3–5 V',
      typicalCurrentMa: 20,
      ioPins: 2,
      interfaces: ['I2C', 'SPI']
    }
  },
  {
    id: 'mod-tmc2209',
    name: 'TMC2209 SilentStepStick Driver',
    description: 'Stepper motor driver with StealthChop for silent motion control.',
    sourceUrl: 'https://www.trinamic.com/products/integrated-circuits/details/tmc2209-la/',
    category: 'actuator',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 25, height: 32, depth: 10 },
    icon: 'BsSpeedometer2',
    electrical: {
      supplyVoltage: '4.75–29 V',
      typicalCurrentMa: 20,
      ioPins: 6,
      interfaces: ['UART', 'STEP/DIR']
    },
    mechanical: { weightGrams: 8 }
  },
  {
    id: 'mod-relay4ch',
    name: '4-Channel 10A Relay Board',
    description: 'Opto-isolated relay module for switching high-voltage loads.',
    sourceUrl: 'https://www.sainsmart.com/products/4-channel-5v-relay-module',
    category: 'actuator',
    compatibleBoards: controllerFriendlyBoards,
    status: 'partial',
    dimensions: { width: 65, height: 45, depth: 18 },
    icon: 'BsToggleOn',
    electrical: {
      supplyVoltage: '5 V',
      typicalCurrentMa: 70,
      ioPins: 4,
      interfaces: ['GPIO']
    },
    mechanical: { weightGrams: 55 }
  },
  {
    id: 'mod-servo',
    name: 'MG996R High Torque Servo',
    description: 'Standard high torque servo motor for robotics and RC applications.',
    sourceUrl: 'https://www.towerpro.com.tw/product/mg996r/',
    category: 'actuator',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 40, height: 20, depth: 35 },
    icon: 'BsArrowDownUp',
    electrical: {
      supplyVoltage: '4.8–7.2 V',
      typicalCurrentMa: 500,
      ioPins: 1,
      interfaces: ['PWM']
    },
    mechanical: { weightGrams: 55 }
  },
  {
    id: 'mod-neo-trellis',
    name: 'NeoTrellis RGB Grid',
    description: '4×8 RGB button grid with seesaw I2C driver for creative interfaces.',
    sourceUrl: 'https://learn.adafruit.com/adafruit-neotrellis',
    category: 'display',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 80, height: 60, depth: 12 },
    icon: 'BsGrid3X3Gap',
    electrical: {
      supplyVoltage: '3.3 V',
      typicalCurrentMa: 80,
      ioPins: 2,
      interfaces: ['I2C']
    },
    mechanical: { weightGrams: 45 }
  },
  {
    id: 'mod-qwiic-twist',
    name: 'Qwiic Twist RGB Rotary Encoder',
    description: 'Qwiic enabled rotary encoder with push button and RGB indicator.',
    sourceUrl: 'https://www.sparkfun.com/products/15083',
    category: 'sensor',
    compatibleBoards: controllerFriendlyBoards,
    status: 'compatible',
    dimensions: { width: 28, height: 28, depth: 18 },
    icon: 'BsArrowClockwise',
    electrical: {
      supplyVoltage: '3.3 V',
      typicalCurrentMa: 12,
      ioPins: 2,
      interfaces: ['I2C']
    }
  },
  {
    id: 'mod-powerboost1000',
    name: 'PowerBoost 1000C Power Supply',
    description: 'LiPo boost converter with battery charging for portable builds.',
    sourceUrl: 'https://learn.adafruit.com/adafruit-powerboost-1000c-load-share-usb-charge-boost',
    category: 'power',
    compatibleBoards: allBoardIds,
    status: 'compatible',
    dimensions: { width: 40, height: 22, depth: 8 },
    icon: 'BsBatteryCharging',
    electrical: {
      supplyVoltage: '3.7 V LiPo input / 5 V output',
      typicalCurrentMa: 1000,
      ioPins: 0,
      interfaces: ['Power']
    },
    mechanical: { weightGrams: 16 }
  }
];

export const moduleCategories = [
  { id: 'sensor', label: 'Sensors' },
  { id: 'actuator', label: 'Actuators' },
  { id: 'communication', label: 'Connectivity' },
  { id: 'display', label: 'Display & UI' },
  { id: 'power', label: 'Power & Regulation' }
] as const;
