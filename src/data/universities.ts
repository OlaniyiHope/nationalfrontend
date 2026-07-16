export interface University {
  id: string;
  name: string;
  shortName: string;
  location: string;
  state: string;
  type: "federal" | "state" | "private";
  transcriptInfo: {
    processingTime: string;
    fees: {
      local: string;
      international: string;
    };
    successRate: string;
    applicationMethod: string;
    deliveryMethod: string;
    contactEmail: string;
    contactPhone: string;
    website: string;
    additionalNotes?: string;
  };
}

export const universities: University[] = [
  {
    id: "uni-001",
    name: "University of Lagos",
    shortName: "UNILAG",
    location: "Akoka, Yaba",
    state: "Lagos",
    type: "federal",
    transcriptInfo: {
      processingTime: "4-6 weeks",
      fees: {
        local: "₦15,000",
        international: "$150",
      },
      successRate: "92%",
      applicationMethod: "Online Portal + Physical Submission",
      deliveryMethod: "Courier / Collection",
      contactEmail: "transcripts@unilag.edu.ng",
      contactPhone: "+234-1-280-2439",
      website: "https://unilag.edu.ng",
      additionalNotes: "Requires original degree certificate for verification",
    },
  },
  {
    id: "uni-002",
    name: "University of Ibadan",
    shortName: "UI",
    location: "Ibadan",
    state: "Oyo",
    type: "federal",
    transcriptInfo: {
      processingTime: "6-8 weeks",
      fees: {
        local: "₦12,000",
        international: "$120",
      },
      successRate: "88%",
      applicationMethod: "Online Application",
      deliveryMethod: "Courier / Email (verified)",
      contactEmail: "registrar@ui.edu.ng",
      contactPhone: "+234-2-810-1100",
      website: "https://ui.edu.ng",
    },
  },
  {
    id: "uni-003",
    name: "Obafemi Awolowo University",
    shortName: "OAU",
    location: "Ile-Ife",
    state: "Osun",
    type: "federal",
    transcriptInfo: {
      processingTime: "4-6 weeks",
      fees: {
        local: "₦10,000",
        international: "$100",
      },
      successRate: "90%",
      applicationMethod: "Online Portal",
      deliveryMethod: "Courier / Collection",
      contactEmail: "transcripts@oauife.edu.ng",
      contactPhone: "+234-36-230-290",
      website: "https://oauife.edu.ng",
    },
  },
  {
    id: "uni-004",
    name: "Ahmadu Bello University",
    shortName: "ABU",
    location: "Zaria",
    state: "Kaduna",
    type: "federal",
    transcriptInfo: {
      processingTime: "6-10 weeks",
      fees: {
        local: "₦8,000",
        international: "$100",
      },
      successRate: "85%",
      applicationMethod: "Physical Application",
      deliveryMethod: "Courier / Collection",
      contactEmail: "registrar@abu.edu.ng",
      contactPhone: "+234-69-550-811",
      website: "https://abu.edu.ng",
      additionalNotes: "Physical presence may be required for verification",
    },
  },
  {
    id: "uni-005",
    name: "University of Nigeria, Nsukka",
    shortName: "UNN",
    location: "Nsukka",
    state: "Enugu",
    type: "federal",
    transcriptInfo: {
      processingTime: "4-8 weeks",
      fees: {
        local: "₦10,000",
        international: "$120",
      },
      successRate: "87%",
      applicationMethod: "Online Portal",
      deliveryMethod: "Courier / Email",
      contactEmail: "transcripts@unn.edu.ng",
      contactPhone: "+234-42-770-570",
      website: "https://unn.edu.ng",
    },
  },
  {
    id: "uni-006",
    name: "University of Benin",
    shortName: "UNIBEN",
    location: "Benin City",
    state: "Edo",
    type: "federal",
    transcriptInfo: {
      processingTime: "5-7 weeks",
      fees: {
        local: "₦12,000",
        international: "$130",
      },
      successRate: "89%",
      applicationMethod: "Online Application",
      deliveryMethod: "Courier / Collection",
      contactEmail: "registrar@uniben.edu.ng",
      contactPhone: "+234-52-600-443",
      website: "https://uniben.edu.ng",
    },
  },
  {
    id: "uni-007",
    name: "University of Port Harcourt",
    shortName: "UNIPORT",
    location: "Port Harcourt",
    state: "Rivers",
    type: "federal",
    transcriptInfo: {
      processingTime: "4-6 weeks",
      fees: {
        local: "₦15,000",
        international: "$140",
      },
      successRate: "91%",
      applicationMethod: "Online Portal",
      deliveryMethod: "Courier / DHL",
      contactEmail: "transcripts@uniport.edu.ng",
      contactPhone: "+234-84-817-941",
      website: "https://uniport.edu.ng",
    },
  },
  {
    id: "uni-008",
    name: "Federal University of Technology, Minna",
    shortName: "FUTMINNA",
    location: "Minna",
    state: "Niger",
    type: "federal",
    transcriptInfo: {
      processingTime: "3-5 weeks",
      fees: {
        local: "₦8,000",
        international: "$90",
      },
      successRate: "93%",
      applicationMethod: "Online Portal",
      deliveryMethod: "Courier / Collection",
      contactEmail: "registrar@futminna.edu.ng",
      contactPhone: "+234-66-222-604",
      website: "https://futminna.edu.ng",
    },
  },
  {
    id: "uni-009",
    name: "Covenant University",
    shortName: "CU",
    location: "Ota",
    state: "Ogun",
    type: "private",
    transcriptInfo: {
      processingTime: "2-3 weeks",
      fees: {
        local: "₦20,000",
        international: "$200",
      },
      successRate: "98%",
      applicationMethod: "Online Portal",
      deliveryMethod: "Courier / Email",
      contactEmail: "registrar@covenantuniversity.edu.ng",
      contactPhone: "+234-1-790-0724",
      website: "https://covenantuniversity.edu.ng",
      additionalNotes: "Fastest processing among Nigerian universities",
    },
  },
  {
    id: "uni-010",
    name: "Lagos State University",
    shortName: "LASU",
    location: "Ojo",
    state: "Lagos",
    type: "state",
    transcriptInfo: {
      processingTime: "4-6 weeks",
      fees: {
        local: "₦12,000",
        international: "$100",
      },
      successRate: "86%",
      applicationMethod: "Online + Physical",
      deliveryMethod: "Collection",
      contactEmail: "registrar@lasu.edu.ng",
      contactPhone: "+234-1-773-1515",
      website: "https://lasu.edu.ng",
    },
  },
  {
    id: "uni-011",
    name: "Nnamdi Azikiwe University",
    shortName: "UNIZIK",
    location: "Awka",
    state: "Anambra",
    type: "federal",
    transcriptInfo: {
      processingTime: "5-8 weeks",
      fees: {
        local: "₦10,000",
        international: "$110",
      },
      successRate: "84%",
      applicationMethod: "Online Application",
      deliveryMethod: "Courier / Collection",
      contactEmail: "registrar@unizik.edu.ng",
      contactPhone: "+234-48-550-081",
      website: "https://unizik.edu.ng",
    },
  },
  {
    id: "uni-012",
    name: "University of Ilorin",
    shortName: "UNILORIN",
    location: "Ilorin",
    state: "Kwara",
    type: "federal",
    transcriptInfo: {
      processingTime: "3-5 weeks",
      fees: {
        local: "₦10,000",
        international: "$100",
      },
      successRate: "94%",
      applicationMethod: "Online Portal",
      deliveryMethod: "Courier / Email",
      contactEmail: "transcripts@unilorin.edu.ng",
      contactPhone: "+234-31-221-691",
      website: "https://unilorin.edu.ng",
      additionalNotes: "Known for efficient processing",
    },
  },
  {
    id: "uni-013",
    name: "Bayero University, Kano",
    shortName: "BUK",
    location: "Kano",
    state: "Kano",
    type: "federal",
    transcriptInfo: {
      processingTime: "6-8 weeks",
      fees: {
        local: "₦8,000",
        international: "$90",
      },
      successRate: "82%",
      applicationMethod: "Physical Application",
      deliveryMethod: "Collection",
      contactEmail: "registrar@buk.edu.ng",
      contactPhone: "+234-64-666-021",
      website: "https://buk.edu.ng",
    },
  },
  {
    id: "uni-014",
    name: "Pan-Atlantic University",
    shortName: "PAU",
    location: "Lagos",
    state: "Lagos",
    type: "private",
    transcriptInfo: {
      processingTime: "1-2 weeks",
      fees: {
        local: "₦25,000",
        international: "$250",
      },
      successRate: "99%",
      applicationMethod: "Online Portal",
      deliveryMethod: "Courier / Email",
      contactEmail: "registrar@pau.edu.ng",
      contactPhone: "+234-1-270-0722",
      website: "https://pau.edu.ng",
      additionalNotes: "Premium service with guaranteed timelines",
    },
  },
];

export const transcriptSteps = [
  {
    step: 1,
    title: "Identify Your Institution",
    description: "Locate your university in our database and review their specific requirements and processing times.",
    icon: "Search",
  },
  {
    step: 2,
    title: "Gather Required Documents",
    description: "Collect all necessary documents including ID, original certificates, and payment receipts.",
    icon: "FileText",
  },
  {
    step: 3,
    title: "Submit Application",
    description: "Complete the application through the university's designated channel (online or physical).",
    icon: "Send",
  },
  {
    step: 4,
    title: "Make Payment",
    description: "Pay the required fees through approved payment channels and retain proof of payment.",
    icon: "CreditCard",
  },
  {
    step: 5,
    title: "Track Processing",
    description: "Monitor your application status through the university's tracking system or follow up directly.",
    icon: "Clock",
  },
  {
    step: 6,
    title: "Verification Process",
    description: "The university verifies your academic records against their archives.",
    icon: "CheckCircle",
  },
  {
    step: 7,
    title: "Transcript Preparation",
    description: "Your official transcript is prepared and sealed by the registrar's office.",
    icon: "Stamp",
  },
  {
    step: 8,
    title: "Delivery",
    description: "Receive your transcript via your chosen delivery method (courier, collection, or email).",
    icon: "Package",
  },
];

export const commonChallenges = [
  {
    challenge: "Missing Academic Records",
    description: "Some institutions have incomplete archives, especially for older graduates.",
    solution: "Request a record verification first. Afrika Scholar can assist with locating alternative documentation.",
  },
  {
    challenge: "Long Processing Delays",
    description: "Processing times can extend beyond stated timelines due to administrative backlogs.",
    solution: "Apply well in advance of deadlines. Consider using our expedited advisory service.",
  },
  {
    challenge: "Payment Complications",
    description: "International payments or platform issues can delay applications.",
    solution: "Use recommended payment channels and retain all transaction receipts.",
  },
  {
    challenge: "Name Discrepancies",
    description: "Differences between current and enrolled names can cause verification issues.",
    solution: "Provide supporting documents (marriage certificate, affidavit) with your application.",
  },
];

export const requiredDocuments = {
  mandatory: [
    "Valid government-issued ID (National ID, Passport, or Driver's License)",
    "Original or certified copy of degree certificate",
    "Proof of payment for transcript fees",
    "Completed transcript request form",
  ],
  conditional: [
    "Change of name affidavit (if applicable)",
    "Marriage certificate (for name changes)",
    "Power of attorney (if applying on behalf of someone)",
    "Previous transcript copies (for verification)",
  ],
  international: [
    "Passport data page",
    "Proof of international address",
    "Courier account details (DHL, FedEx)",
    "Notarized documents (for some institutions)",
  ],
};
