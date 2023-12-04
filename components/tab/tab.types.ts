export interface TabProps {
  tab: { name: string; icon: any };
  onClick: () => void;
  isFilterTab?: boolean;
  isActive?: string;
}
