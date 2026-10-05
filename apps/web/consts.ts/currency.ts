export const CURRENCIES = [
  { value: "EUR", label: "EUR - Euro" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "HUF", label: "HUF - Hungarian Forint" },
  { value: "CHF", label: "CHF - Swiss Franc" },
  { value: "CZK", label: "CZK - Czech Koruna" },
  { value: "PLN", label: "PLN - Polish Zloty" },
  { value: "RON", label: "RON - Romanian Leu" },
  { value: "RSD", label: "RSD - Serbian Dinar" },
  { value: "AED", label: "AED - United Arab Emirates Dirham" },
];

export type Currency = (typeof CURRENCIES)[number]["value"];
