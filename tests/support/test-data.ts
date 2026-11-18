const FIRST_NAMES = ['Mariana', 'James', 'Priya', 'Lucas', 'Aisha', 'Tomás', 'Hannah', 'Rafael', 'Sofia', 'Daniel'];
const LAST_NAMES = ['Costa', 'Walker', 'Nair', 'Almeida', 'Okafor', 'Silva', 'Becker', 'Moreau', 'Santos', 'Kowalski'];

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomSuffix(length = 6): string {
  return Math.random().toString(36).slice(2, 2 + length).padEnd(length, '0');
}

export interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  dob: string;
  phone: string;
  address: {
    street: string;
    house_number: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
}

export function newCustomer(): Customer {
  const thirtyYearsAgo = new Date();
  thirtyYearsAgo.setFullYear(thirtyYearsAgo.getFullYear() - 30);

  return {
    first_name: pick(FIRST_NAMES),
    last_name: pick(LAST_NAMES),
    email: `qa.portfolio.${Date.now()}.${randomSuffix()}@example.com`,
    password: `Qa!${randomSuffix(4)}Pw${Math.floor(Math.random() * 90 + 10)}`,
    dob: thirtyYearsAgo.toISOString().slice(0, 10),
    phone: '0612345678',
    address: {
      street: 'Main Street',
      house_number: '12',
      city: 'Utrecht',
      state: 'Utrecht',
      country: 'NL',
      postal_code: '3511AA',
    },
  };
}
