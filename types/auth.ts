export interface FormField {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
}

export interface AuthFormProps {
  title: string;
  subtitle: string;
  fields: FormField[];
  submitText: string;
  footer?: React.ReactNode;
  socialAuth?: boolean;
  terms?: boolean;
  includeLogo?: boolean;
}