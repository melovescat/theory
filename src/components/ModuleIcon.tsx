import {
  BsArrowClockwise,
  BsArrowDownUp,
  BsBarChart,
  BsBatteryCharging,
  BsBroadcast,
  BsCameraVideo,
  BsCloudFog2,
  BsCompass,
  BsDisplay,
  BsGearWideConnected,
  BsGeoAlt,
  BsGrid3X3Gap,
  BsHandIndexThumb,
  BsHeartPulse,
  BsLightningCharge,
  BsPalette,
  BsSpeedometer,
  BsSpeedometer2,
  BsViewList,
  BsWifi,
  BsWind
} from 'react-icons/bs';
import type { IconType } from 'react-icons';

const iconLibrary: Record<string, IconType> = {
  BsArrowClockwise,
  BsArrowDownUp,
  BsBarChart,
  BsBatteryCharging,
  BsBroadcast,
  BsCameraVideo,
  BsCloudFog2,
  BsCompass,
  BsDisplay,
  BsGearWideConnected,
  BsGeoAlt,
  BsGrid3X3Gap,
  BsHandIndexThumb,
  BsHeartPulse,
  BsLightningCharge,
  BsPalette,
  BsSpeedometer,
  BsSpeedometer2,
  BsViewList,
  BsWifi,
  BsWind
};

interface ModuleIconProps {
  icon?: string;
  className?: string;
}

const ModuleIcon = ({ icon = 'BsSpeedometer', className }: ModuleIconProps) => {
  const IconComponent = iconLibrary[icon] ?? BsSpeedometer;
  return <IconComponent className={className} />;
};

export default ModuleIcon;
