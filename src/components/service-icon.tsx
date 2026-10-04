import {
  AirplaneTilt,
  Boat,
  ChatsCircle,
  FileText,
  Package,
  Stack,
  Truck,
} from "@phosphor-icons/react/ssr";

const icons = {
  "fret-maritime": Boat,
  "fret-aerien": AirplaneTilt,
  groupage: Stack,
  "declaration-douane": FileText,
  transport: Truck,
  degroupage: Package,
  assistance: ChatsCircle,
} as const;

export function ServiceIcon({
  id,
  className,
}: {
  id: keyof typeof icons;
  className?: string;
}) {
  const Icon = icons[id];
  return <Icon size={22} weight="regular" className={className} aria-hidden />;
}
