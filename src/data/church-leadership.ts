export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  category: "pastor" | "committee" | "ministry-leader";
  photoUrl?: string; // empty or undefined indicates picture place under development
  bioPlaceholder: string;
  messagePlaceholder: string;
  order: number;
}

export const pastorInChargeData: LeaderProfile = {
  id: "pastor-in-charge",
  name: "Rev. [Pastor Name]",
  role: "Pastor-in-Charge",
  category: "pastor",
  bioPlaceholder: "[Pastor biography to be supplied by the church]",
  messagePlaceholder: "Grace and peace to you in the name of our Lord Jesus Christ. Welcome to Ingraham Shalom Methodist Church. Our doors and hearts are open to all who seek a community grounded in faith, hope, and love.",
  order: 1
};

export const pastorateCommitteeData: LeaderProfile[] = [
  {
    id: "committee-secretary",
    name: "[Secretary Name]",
    role: "Secretary, Pastorate Committee",
    category: "committee",
    bioPlaceholder: "[Biography to be supplied by church]",
    messagePlaceholder: "[Message to be supplied by church]",
    order: 2
  },
  {
    id: "committee-treasurer",
    name: "[Treasurer Name]",
    role: "Treasurer, Pastorate Committee",
    category: "committee",
    bioPlaceholder: "[Biography to be supplied by church]",
    messagePlaceholder: "[Message to be supplied by church]",
    order: 3
  },
  {
    id: "committee-member-1",
    name: "[Committee Member]",
    role: "Pastorate Committee Member",
    category: "committee",
    bioPlaceholder: "[Biography to be supplied by church]",
    messagePlaceholder: "[Message to be supplied by church]",
    order: 4
  }
];

export const ministryLeadersData: LeaderProfile[] = [
  {
    id: "sunday-school-superintendent",
    name: "[Superintendent Name]",
    role: "Sunday School Superintendent",
    category: "ministry-leader",
    bioPlaceholder: "[Biography to be supplied by church]",
    messagePlaceholder: "[Message to be supplied by church]",
    order: 1
  },
  {
    id: "myf-president",
    name: "[MYF President Name]",
    role: "Methodist Youth Fellowship (MYF) President",
    category: "ministry-leader",
    bioPlaceholder: "[Biography to be supplied by church]",
    messagePlaceholder: "[Message to be supplied by church]",
    order: 2
  },
  {
    id: "wscs-in-charge",
    name: "[WSCS Leader Name]",
    role: "WSCS (Women's Society) In-Charge",
    category: "ministry-leader",
    bioPlaceholder: "[Biography to be supplied by church]",
    messagePlaceholder: "[Message to be supplied by church]",
    order: 3
  }
];
