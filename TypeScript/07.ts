enum Role {
  DOCTOR = "DOCTOR",
  NURSE = "NURSE",
  ADMIN = "ADMIN",
}

interface Staff {
  id: number;
  name: string;
  role: Role;
}

const staffList: Staff[] = [
  { id: 1, name: "Alice", role: Role.NURSE },
  { id: 2, name: "Bob", role: Role.DOCTOR },
  { id: 3, name: "Charlie", role: Role.ADMIN },
];

function staffSummary(staffList: Staff[]) {
  console.log("_____Staff Summary_____");
  for (const staff of staffList)
    [
      console.log(`
        Staff ID: ${staff.id}
        Staff Name: ${staff.name}
        Staff Role: ${staff.role}`),
    ];
}

staffSummary(staffList);
