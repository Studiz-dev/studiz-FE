export interface Member {
  id: number;
  name: string;
  profileImage?: string;
  isLeader?: boolean;
}

export type SelectableMember = Member & {
  checked: boolean;
};