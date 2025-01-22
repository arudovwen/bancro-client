export const navigation = [
  {
    name: "Home",
    url: "/",
    icon: "solar:buildings-2-outline",
    key: "home",
    disabled: false,
    roles: [
      "superadmin",
      "admin",
      "operations",
      "member",
      "superadmin",
      "developer",
      "owner",
      "finance",
    ],
  },

  {
    name: "Loans ",
    url: "/loans",
    icon: "mingcute:transfer-fill",
    key: "loan",
    disabled: false,
    roles: [
      "superadmin",
      "admin",
      "operations",
      "member",
      "superadmin",
      "developer",
      "owner",
      "finance",
    ],
  },
  {
    name: "Payments",
    icon: "fluent:data-pie-24-regular",
    key: "payment",
    hasChildren: true,
    disabled: false,
    roles: [
      "superadmin",
      "admin",
      "operations",
      "member",
      "superadmin",
      "developer",
      "owner",
      "finance",
    ],
    children: [
      {
        name: "Send money",
        url: "/transfers",
        icon: "mdi:account-box-multiple-outline",
        key: "procurement-my-orders",
      },
      {
        name: "Airtime & Data",
        url: "/airtime-and-data",
        icon: "fluent-mdl2:product",
        key: "account-saved-searches",
      },
      {
        name: "Bill Payment",
        url: "/bill-payment",
        icon: "tabler:user-dollar",
        key: "storefront",
      },
    ],
  },

  {
    name: "Investments",
    url: "/investments",
    icon: "lucide:users",
    key: "investment",
    disabled: true,
    roles: [
      "superadmin",
      "admin",
      "operations",
      "member",
      "superadmin",
      "developer",
      "owner",
      "finance",
    ],
  },

  {
    name: "Savings",
    url: "/savings",
    icon: "oui:users",
    key: "savings",
    disabled: false,
    roles: ["superadmin"],
  },

  {
    name: "Cards",
    url: "/cards",
    icon: "ion:wallet-outline",
    key: "card",
    disabled: true,
    roles: [
      "superadmin",
      "admin",
      "operations",
      "member",
      "superadmin",
      "developer",
      "owner",
      "finance",
    ],
  },

  {
    name: "Account",
    url: "/settings",
    icon: "heroicons:cog-6-tooth",
    key: "account",
    disabled: false,
    hasChildren: true,
    roles: [
      "superadmin",
      "admin",
      "operations",
      "member",
      "superadmin",
      "developer",
      "owner",
      "finance",
    ],
    children: [
      {
        name: "Profile",
        url: "/settings/profile",
        icon: "mdi:account-box-multiple-outline",
        key: "procurement-my-orders",
      },
      {
        name: "Security",
        url: "/settings/security",
        icon: "fluent-mdl2:product",
        key: "account-saved-searches",
      },
      {
        name: "Verifications",
        url: "/settings/verifications",
        icon: "tabler:user-dollar",
        key: "storefront",
      },
    ],
  },
];

export const networks = [
  {
    label: "mtn",
    value: "mtn",
    imgUrl: "/images/mtn.svg",
  },
  {
    label: "airtel",
    value: "airtel",
    imgUrl: "/images/airtel.svg",
  },
  {
    label: "9mobile",
    value: "9mobile",
    imgUrl: "/images/9mobile.svg",
  },
  {
    label: "glo",
    value: "glo",
    imgUrl: "/images/glo.svg",
  },
];
export const subnavigation = [
  {
    name: "Products",
    url: "/storefront/products",
    icon: "fluent-mdl2:product-variant",
    key: "products",
  },
  {
    name: "Store Orders",
    url: "/storefront/orders",
    icon: "lucide:shopping-bag",
    key: "orders",
  },
  {
    name: "Store Requests",
    url: "/storefront/requests",
    icon: "ri:hand-coin-line",
    key: "requests",
  },
  {
    name: "Store Settings",
    url: "/storefront/customization",
    icon: "bx:cog",
    key: "storefront",
  },
];

export const LedgerAction = {
  0: "Debit",
  1: "Credit",
};

export const GenderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];
export const RoleOptions = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Officer",
    value: "officer",
  },
];

export const RelationshipOptions = [
  {
    label: "Brother",
    value: "brother",
  },
  {
    label: "Sister",
    value: "sister",
  },
];
export const CollateralOptions = [
  {
    label: "Collateral is repossesed",
    value: "Collateral is repossesed",
  },
  {
    label: "Collateral is deposited with lender",
    value: "Collateral is deposited with lender",
  },
];

export const BillerOptions = [
  {
    label: "Electricity",
    value: "1",
  },
  {
    label: "Cable Bill",
    value: "2",
  },
  {
    label: "Betting",
    value: "3",
  },
];

export const BillOptions = [];

export const DocumentType = {
  WordDocument: 0,
  PDFDocument: 1,
  ImageDocument: 2,
};
